import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseSkillsRequestBody } from "./parse-request";

describe("parseSkillsRequestBody", () => {
  it("accepts email and api_key in JSON body", () => {
    const result = parseSkillsRequestBody(
      { email: "eve.test@example.com", api_key: "secret" },
      null,
    );
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.email, "eve.test@example.com");
      assert.equal(result.apiKey, "secret");
    }
  });

  it("accepts Bearer token with email in body", () => {
    const result = parseSkillsRequestBody(
      { email: "eve.test@example.com" },
      "Bearer my-api-key",
    );
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.apiKey, "my-api-key");
    }
  });

  it("prefers body api_key over Authorization header", () => {
    const result = parseSkillsRequestBody(
      { email: "eve.test@example.com", api_key: "from-body" },
      "Bearer from-header",
    );
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.apiKey, "from-body");
    }
  });

  it("returns 400 when email is missing", () => {
    const result = parseSkillsRequestBody({ api_key: "x" }, null);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 400);
    }
  });

  it("returns 400 when api_key and bearer are missing", () => {
    const result = parseSkillsRequestBody({ email: "a@b.co" }, null);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 400);
    }
  });

  it("returns 400 for non-object body", () => {
    const result = parseSkillsRequestBody("not-json", null);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 400);
    }
  });
});
