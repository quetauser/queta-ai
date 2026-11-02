#!/usr/bin/env node
import { spawn, spawnSync, execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "@playwright/test";
import { verifyContactForm } from "./verify-contact-form.mjs";
import { publicRoutes, replicaOnlyRoutes } from "../src/content/site-content.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const evidenceDir = path.join(root, "verification-evidence", runId);
const pidFile = path.join(root, ".verification-dev-server.pid");
const localBase = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3005";
const originalBase = "https://www.queta.ai";

const replicaOnlyHrefs = new Set(replicaOnlyRoutes);

function runStep(label, command, args, options = {}) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
}

async function waitForServer(url, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function freePort3000() {
  const port = new URL(localBase).port || "3005";
  try {
    const pids = execSync(`lsof -ti :${port}`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
    for (const pid of pids) {
      process.kill(Number(pid), "SIGTERM");
    }
    if (pids.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch {
    // port already free or lsof unavailable
  }
}

async function startServer() {
  await freePort3000();
  try {
    const pid = Number(await readFile(pidFile, "utf8"));
    if (pid) {
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        // ignore
      }
    }
  } catch {
    // no pid
  }

  const child = spawn("npm", ["run", "start"], {
    cwd: root,
    env: { ...process.env, PORT: new URL(localBase).port || "3005" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let startupFailed = false;
  child.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    process.stderr.write(chunk);
    if (text.includes("EADDRINUSE") || text.includes("Failed to start server")) {
      startupFailed = true;
    }
  });
  child.stdout.on("data", (chunk) => process.stdout.write(chunk));

  await writeFile(pidFile, String(child.pid));
  await waitForServer(`${localBase}/`);
  if (startupFailed) {
    throw new Error(`next start failed to bind port ${new URL(localBase).port}`);
  }
  return child;
}

async function stopServer(child) {
  if (child && !child.killed) {
    child.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (!child.killed) {
      child.kill("SIGKILL");
    }
  }
  try {
    const pid = Number(await readFile(pidFile, "utf8"));
    if (pid) {
      try {
        process.kill(pid, "SIGKILL");
      } catch {
        // already stopped
      }
    }
  } catch {
    // no pid file
  }
}

async function auditPage(page, baseUrl, route, label) {
  const url = `${baseUrl}${route === "/" ? "/" : route}`;
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText ?? "failed"}`);
  });

  const response = await page.goto(url, {
    waitUntil: "load",
    timeout: 90_000,
  });
  await page.waitForTimeout(750);
  const status = response?.status() ?? 0;

  const brokenImages = await page.evaluate(() => {
    return Array.from(document.images)
      .filter((img) => img.naturalWidth === 0)
      .map((img) => img.src);
  });

  const brokenLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]"))
      .map((anchor) => (anchor).href)
      .filter((href) => href.startsWith("http"));
  });

  for (const viewport of [
    { name: "desktop", width: 1280, height: 720 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const safeRoute = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    await page.screenshot({
      path: path.join(evidenceDir, `${label}-${safeRoute}-${viewport.name}.png`),
      fullPage: true,
    });
  }

  return { url, status, consoleErrors, failedRequests, brokenImages, brokenLinks };
}

async function main() {
  await mkdir(evidenceDir, { recursive: true });
  const log = [];

  runStep("lint", "npm", ["run", "lint"]);
  runStep("typecheck", "npm", ["run", "typecheck"]);
  runStep("build", "npm", ["run", "build"]);

  const browser = await chromium.launch();
  let server;
  const results = [];
  let contactFormResults = null;

  try {
    server = await startServer();

    contactFormResults = await verifyContactForm(browser, evidenceDir, localBase);

    for (const base of [
      { label: "replica", url: localBase },
      { label: "original", url: originalBase },
    ]) {
      const context = await browser.newContext({ ...devices["Desktop Chrome"] });
      const page = await context.newPage();
      // queta.ai does not publish these documents. Its soft 404 is not a text comparison.
      const routes =
        base.label === "original"
          ? publicRoutes.filter((route) => !replicaOnlyHrefs.has(route))
          : publicRoutes;
      for (const route of routes) {
        const result = await auditPage(page, base.url, route, base.label);
        results.push({ ...result, label: base.label, route });
        log.push(
          `${base.label} ${route}: HTTP ${result.status}, consoleErrors=${result.consoleErrors.length}, brokenImages=${result.brokenImages.length}`,
        );
      }
      await context.close();
    }
  } finally {
    await browser.close();
    await stopServer(server);
  }

  const failures = results.filter((result) => {
    if (result.label !== "replica") {
      return result.status !== 200;
    }
    return (
      result.status !== 200 ||
      result.consoleErrors.length > 0 ||
      result.brokenImages.length > 0 ||
      result.failedRequests.length > 0
    );
  });

  const summary = {
    runId,
    evidenceDir,
    routes: publicRoutes,
    contactFormResults,
    results,
    failures: failures.map(({ label, route, status, consoleErrors, brokenImages, failedRequests }) => ({
      label,
      route,
      status,
      consoleErrors,
      brokenImages,
      failedRequests,
    })),
  };

  await writeFile(path.join(evidenceDir, "summary.json"), JSON.stringify(summary, null, 2));
  await writeFile(path.join(evidenceDir, "verify.log"), `${log.join("\n")}\n`);

  console.log(`\nEvidence written to ${evidenceDir}`);
  if (failures.length > 0) {
    console.error("Verification failed:", failures.length, "issues");
    process.exit(1);
  }
  console.log("Verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
