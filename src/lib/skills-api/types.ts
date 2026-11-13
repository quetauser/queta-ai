export type SkillsProductCode = "lifestyle" | "trader";

export type SkillsSqlClient = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<Record<string, unknown>[]>;
