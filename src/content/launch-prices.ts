export const launchPrices = {
  "/solutions/lifestyle": { firstYearCents: 27900, renewalCents: 39900 },
  "/solutions/trader": { firstYearCents: 44900, renewalCents: 56900 },
  "/solutions/realtor": { firstYearCents: 56900, renewalCents: 66900 },
} as const;

export type LaunchPriceHref = keyof typeof launchPrices;

export function isLaunchPriceHref(href: string): href is LaunchPriceHref {
  return Object.prototype.hasOwnProperty.call(launchPrices, href);
}

export function formatUsdFromCents(cents: number) {
  const dollars = Math.trunc(cents / 100);
  const fraction = String(Math.abs(cents % 100)).padStart(2, "0");
  return `$${dollars.toLocaleString("en-US")}.${fraction}`;
}

export function launchPriceSubmission(
  lines: readonly { label: string; firstYearCents: number; renewalCents: number }[],
) {
  const firstYearCents = lines.reduce((sum, line) => sum + line.firstYearCents, 0);
  const renewalCents = lines.reduce((sum, line) => sum + line.renewalCents, 0);
  const firstYearTotal = formatUsdFromCents(firstYearCents);
  const renewalTotal = `${formatUsdFromCents(renewalCents)}/year`;
  return {
    first_year_total: firstYearTotal,
    renewal_total: renewalTotal,
    price_summary: [
      ...lines.map(
        (line) =>
          `${line.label}: ${formatUsdFromCents(line.firstYearCents)} first year, then ${formatUsdFromCents(line.renewalCents)}/year`,
      ),
      `First year total ${firstYearTotal}`,
      `After the first year ${renewalTotal}`,
    ].join("\n"),
  };
}
