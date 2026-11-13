import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";

import { authenticateCustomerForProduct } from "./authenticate";
import type { SkillsSqlClient } from "./types";

function hashTestKey(email: string, productCode: string): string {
  const raw = `test-key-${email}-${productCode}`;
  return createHash("sha256").update(raw, "utf8").digest("hex").toLowerCase();
}

function createMockSql(match: { apiKeyId: number } | null, shouldThrow = false): SkillsSqlClient {
  return async (strings: TemplateStringsArray, ...values: unknown[]) => {
    if (shouldThrow) {
      throw new Error("db down");
    }
    const query = strings.join("?");
    if (query.includes("SELECT ak.id")) {
      if (match) {
        return [{ api_key_id: match.apiKeyId }];
      }
      return [];
    }
    if (query.includes("UPDATE api_keys")) {
      return [];
    }
    throw new Error(`unexpected query: ${query} ${JSON.stringify(values)}`);
  };
}

describe("authenticateCustomerForProduct", () => {
  it("succeeds when hash and email match mocked row", async () => {
    const email = "eve.test@example.com";
    const productCode = "trader";
    const rawKey = `test-key-${email}-${productCode}`;
    const sql = createMockSql({ apiKeyId: 42 });
    const result = await authenticateCustomerForProduct(sql, {
      email,
      apiKey: rawKey,
      productCode,
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.apiKeyId, 42);
    }
    assert.equal(hashTestKey(email, productCode), hashTestKey(email, productCode));
  });

  it("returns invalid_credentials when no row matches", async () => {
    const sql = createMockSql(null);
    const result = await authenticateCustomerForProduct(sql, {
      email: "alice.test@example.com",
      apiKey: "wrong-key",
      productCode: "lifestyle",
    });
    assert.deepEqual(result, { ok: false, reason: "invalid_credentials" });
  });

  it("returns database_error when query throws", async () => {
    const sql = createMockSql(null, true);
    const result = await authenticateCustomerForProduct(sql, {
      email: "eve.test@example.com",
      apiKey: "x",
      productCode: "lifestyle",
    });
    assert.deepEqual(result, { ok: false, reason: "database_error" });
  });
});
