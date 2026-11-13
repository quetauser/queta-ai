import { neon } from "@neondatabase/serverless";

import type { SkillsSqlClient } from "@/lib/skills-api/types";

export function getSkillsSqlClient(): SkillsSqlClient | null {
  const databaseUrl = process.env.QUETA_SITE_DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }
  return neon(databaseUrl) as SkillsSqlClient;
}
