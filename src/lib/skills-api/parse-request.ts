export type ParsedSkillsRequest =
  | { ok: true; email: string; apiKey: string }
  | { ok: false; status: 400; error: string };

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed || !trimmed.includes("@")) {
    return null;
  }
  return trimmed;
}

function extractBearerApiKey(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }
  const match = /^Bearer\s+(.+)$/i.exec(authorizationHeader.trim());
  if (!match) {
    return null;
  }
  const token = match[1].trim();
  return token.length > 0 ? token : null;
}

export function parseSkillsRequestBody(
  body: unknown,
  authorizationHeader: string | null,
): ParsedSkillsRequest {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, error: "invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const email = normalizeEmail(record.email);
  if (!email) {
    return { ok: false, status: 400, error: "email is required" };
  }

  const bodyKey =
    typeof record.api_key === "string" && record.api_key.trim().length > 0
      ? record.api_key.trim()
      : null;
  const bearerKey = extractBearerApiKey(authorizationHeader);
  const apiKey = bodyKey ?? bearerKey;

  if (!apiKey) {
    return { ok: false, status: 400, error: "api_key is required" };
  }

  return { ok: true, email, apiKey };
}
