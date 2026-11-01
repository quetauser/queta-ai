---
name: verify-queta-site
description: Launch the Queta AI replica, crawl every public route, capture Playwright screenshots at desktop and mobile widths, compare against live queta.ai captures, and run lint, typecheck, and build. Use before shipping visual or route parity changes.
---

# Verify Queta site

Project-local verification for the Queta AI marketing replica.

## Launch

From the repo root:

```bash
npm install
npx playwright install chromium
npm run build
npm run verify
```

`npm run verify` runs lint, typecheck, build, starts `next start` on port 3005 (override with `VERIFY_BASE_URL`), drives routes, writes evidence, then tears down the server.

Ready when the verify base URL returns HTTP 200 (default `http://127.0.0.1:3005/`).

Teardown: the verify script stops the `next start` process it started and removes `.verification-dev-server.pid`. Do not kill processes by name.

## Doctor

Before driving after a failed run:

```bash
test ! -f .verification-dev-server.pid || echo "stale pid file"
curl -sf http://127.0.0.1:3005/ >/dev/null && echo "verify port in use" || echo "verify port free"
node -v
npm run typecheck
```

Doctor passes when the verify port is free (unless you intentionally run the verify server), Node is 24.x, and typecheck succeeds.

## Drive

Primary harness: `scripts/verify-site.mjs` via `npm run verify`.

Routes that exist on queta.ai (must return 200 on the replica and the original):

- `/`
- `/pricing`
- `/about`
- `/contact`
- `/solutions/lifestyle`
- `/solutions/realtor`
- `/solutions/trader`

Legal routes (must return 200 on the replica). Do not request these from https://www.queta.ai. That site does not publish the documents, so there is no body text to compare:

- `/terms-of-use`
- `/ai-legal-disclosure`
- `/end-user-license-policy`

For each marketing route, on both the replica and the original, the script:

1. Loads the page with Playwright (`load`, short settle).
2. Records HTTP status, console errors, failed network requests, and broken images.
3. Saves full-page PNGs at 1280×720 and 390×844.

Legal routes get the same capture on the replica only.

### Contact form (mocked FormSubmit)

After the replica server is up, `scripts/verify-contact-form.mjs` runs inside the same verify pass:

1. Mocks `https://formsubmit.co/ajax/info@queta.ai` so no real email is sent.
2. Drives a successful submit on `/contact?interest=waitlist` and saves `contact-form-success.png`.
3. Mocks HTTP 500 and drives a failed submit on `/contact`, saving `contact-form-error.png`.
4. Asserts the mocked POST includes `_captcha: false`, empty `_honey`, and `_subject` starting with `New Queta AI contact`.

Compare side-by-side pairs under `verification-evidence/<runId>/`:

- `replica-<route>-desktop.png` next to `original-<route>-desktop.png`
- same for `-mobile.png`

## Evidence

Output directory: `verification-evidence/<iso-run-id>/`

Artifacts:

- `summary.json` — per-route audit results and contact form check results
- `verify.log` — one-line per route summary
- PNG screenshots for replica and original
- `contact-form-success.png` and `contact-form-error.png`

Proof standards:

- Every mapped route returns HTTP 200 on the replica with zero console errors and zero broken images.
- Contact form success and error flows pass with FormSubmit mocked (no live email in CI).
- Lint, typecheck, and `next build` exit 0 inside the same verify run.
- Side-by-side screenshots are the visual parity record; layout and copy should match queta.ai closely.

## Cleanup

The verify script stops the server it started. If a run aborts mid-flight:

```bash
kill "$(cat .verification-dev-server.pid)" 2>/dev/null || true
rm -f .verification-dev-server.pid
```

Never delete `verification-evidence/`.

## Helpers

```bash
npm run verify
node scripts/verify-site.mjs
node scripts/verify-contact-form.mjs
```

Feature map: see [`features/README.md`](features/README.md).
