import { readFile } from "node:fs/promises";
import path from "node:path";

import type { SkillsProductCode } from "@/lib/skills-api/types";

const SKILLS_FILENAME: Record<SkillsProductCode, string> = {
  lifestyle: "qls.json",
  trader: "qtd.json",
};

export async function loadSkillsJson(productCode: SkillsProductCode): Promise<string> {
  const filename = SKILLS_FILENAME[productCode];
  const filePath = path.join(process.cwd(), "server", "skills", filename);
  return readFile(filePath, "utf8");
}
