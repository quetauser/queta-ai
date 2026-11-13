import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";

import { hashApiKey } from "./hash-api-key";

describe("hashApiKey", () => {
  it("returns lowercase hex SHA-256 of UTF-8 key", () => {
    const raw = "test-key-eve.test@example.com-trader";
    const expected = createHash("sha256").update(raw, "utf8").digest("hex").toLowerCase();
    assert.equal(hashApiKey(raw), expected);
  });
});
