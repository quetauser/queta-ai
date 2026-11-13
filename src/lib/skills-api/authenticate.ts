import { hashApiKey } from "@/lib/skills-api/hash-api-key";
import type { SkillsProductCode, SkillsSqlClient } from "@/lib/skills-api/types";

export type AuthenticateResult =
  | { ok: true; apiKeyId: number }
  | { ok: false; reason: "invalid_credentials" }
  | { ok: false; reason: "database_error" };

export async function authenticateCustomerForProduct(
  sql: SkillsSqlClient,
  input: { email: string; apiKey: string; productCode: SkillsProductCode },
): Promise<AuthenticateResult> {
  const keyHash = hashApiKey(input.apiKey);

  try {
    const rows = await sql`
      SELECT ak.id AS api_key_id
      FROM api_keys ak
      INNER JOIN customers c ON c.id = ak.customer_id
      INNER JOIN products p ON p.id = ak.product_id
      WHERE ak.key_hash = ${keyHash}
        AND lower(c.email) = lower(${input.email})
        AND p.code = ${input.productCode}
        AND p.is_active = true
        AND ak.revoked_at IS NULL
      LIMIT 1
    `;

    if (rows.length === 0) {
      return { ok: false, reason: "invalid_credentials" };
    }

    const apiKeyId = Number(rows[0].api_key_id);
    if (!Number.isFinite(apiKeyId)) {
      return { ok: false, reason: "database_error" };
    }

    try {
      await sql`
        UPDATE api_keys
        SET last_used_at = NOW()
        WHERE id = ${apiKeyId}
      `;
    } catch {
      // Best effort; auth already succeeded.
    }

    return { ok: true, apiKeyId };
  } catch {
    return { ok: false, reason: "database_error" };
  }
}
