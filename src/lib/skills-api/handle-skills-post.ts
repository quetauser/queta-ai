import { authenticateCustomerForProduct } from "@/lib/skills-api/authenticate";
import { getSkillsSqlClient } from "@/lib/skills-api/db";
import { loadSkillsJson } from "@/lib/skills-api/load-skills";
import { parseSkillsRequestBody } from "@/lib/skills-api/parse-request";
import type { SkillsProductCode } from "@/lib/skills-api/types";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
} as const;

export async function handleSkillsPost(
  request: Request,
  productCode: SkillsProductCode,
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "invalid request body" },
      { status: 400, headers: JSON_HEADERS },
    );
  }

  const parsed = parseSkillsRequestBody(body, request.headers.get("authorization"));
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: parsed.status, headers: JSON_HEADERS });
  }

  const sql = getSkillsSqlClient();
  if (!sql) {
    return Response.json({ error: "service unavailable" }, { status: 500, headers: JSON_HEADERS });
  }

  const auth = await authenticateCustomerForProduct(sql, {
    email: parsed.email,
    apiKey: parsed.apiKey,
    productCode,
  });

  if (auth.ok === false) {
    if (auth.reason === "invalid_credentials") {
      return Response.json({ error: "invalid credentials" }, { status: 401, headers: JSON_HEADERS });
    }
    return Response.json({ error: "internal error" }, { status: 500, headers: JSON_HEADERS });
  }

  try {
    const skillsRaw = await loadSkillsJson(productCode);
    return new Response(skillsRaw, { status: 200, headers: JSON_HEADERS });
  } catch {
    return Response.json({ error: "internal error" }, { status: 500, headers: JSON_HEADERS });
  }
}

export function methodNotAllowedResponse(): Response {
  return Response.json({ error: "method not allowed" }, { status: 405, headers: JSON_HEADERS });
}
