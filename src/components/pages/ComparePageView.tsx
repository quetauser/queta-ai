import Image from "next/image";
import { compare } from "@/content/site-content";

function ComparableApp({
  app,
  href,
  logo,
  logoAlt,
}: {
  app: string;
  href?: string;
  logo: string;
  logoAlt: string;
}) {
  const name = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
    >
      {app}
    </a>
  ) : (
    app
  );
  return (
    <span className="inline-flex items-center gap-1.5">
      <Image src={logo} alt={logoAlt} width={24} height={24} className="h-6 w-6 shrink-0 rounded-md" />
      {name}
    </span>
  );
}

export function ComparePageView() {
  return (
    <section className="pt-20 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight mb-4">
          {compare.title}
        </h1>
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-violet-50/70">
                <th scope="col" className="px-3 py-2 font-semibold text-foreground sm:px-4">
                  {compare.columns.agent}
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-foreground sm:px-4">
                  {compare.columns.app}
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-3 py-2 text-right font-semibold text-foreground sm:px-4"
                >
                  {compare.columns.cost}
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((row) => (
                <tr key={row.agent} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-3 py-2 font-medium text-foreground sm:px-4">
                    {row.agent}
                  </th>
                  <td className="px-3 py-2 text-foreground/80 sm:px-4">
                    <ComparableApp
                      app={row.app}
                      href={"href" in row ? row.href : undefined}
                      logo={row.logo}
                      logoAlt={row.logoAlt}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-foreground sm:px-4">
                    {row.cost}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground/15 bg-slate-50">
                <th scope="row" className="px-3 py-2 font-bold text-foreground sm:px-4">
                  {compare.totalLabel}
                </th>
                <td className="px-3 py-2 sm:px-4" />
                <td className="whitespace-nowrap px-3 py-2 text-right font-bold tabular-nums text-foreground sm:px-4">
                  {compare.totalCost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-center font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Against Queta price of <span className="whitespace-nowrap text-primary">$29 / month</span>
        </p>
      </div>
    </section>
  );
}
