import Link from "next/link";
import { Check } from "lucide-react";
import { pricing } from "@/content/site-content";

export function PricingPageView() {
  return (
    <>
      <section className="pt-24 pb-8 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            {pricing.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
            {pricing.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-primary mb-8">
            {pricing.launchBanner}
          </p>
          <div className="grid grid-cols-1 gap-6 items-stretch md:grid-cols-2 lg:grid-cols-3">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className="relative rounded-3xl border flex flex-col border-border bg-white"
              >
                <div className="p-8 border-b border-border">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {tier.name}
                    </p>
                    <p className="shrink-0 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {pricing.launchBadge}
                    </p>
                  </div>
                  <p className="flex flex-wrap items-end gap-x-2 gap-y-1">
                    <del className="mb-1 text-xl text-muted-foreground line-through">
                      <span className="sr-only">Regular price </span>
                      {tier.regularAmount}
                    </del>
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      <span className="sr-only">Launch price </span>
                      {tier.launchAmount}
                    </span>
                    <span className="mb-1.5 text-sm text-muted-foreground">/year</span>
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-primary">
                    Just {tier.launchMonthly}/mo, billed annually
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.offer}</p>
                  {tier.interestKey === "get-started-lifestyle-user" ? (
                    <Link
                      href={pricing.compareLink.href}
                      className="mt-3 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-violet-100"
                    >
                      {pricing.compareLink.label}
                    </Link>
                  ) : null}
                  <p className="mt-4 text-base md:text-lg text-foreground/75 leading-relaxed">{tier.description}</p>
                </div>
                <ul className="p-8 flex flex-col gap-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="p-8 pt-0">
                  <Link
                    href="/subscribe"
                    className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              {pricing.why.eyebrow}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              {pricing.why.title}
            </h2>
            <p className="text-slate-400 leading-relaxed">{pricing.why.body}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {pricing.why.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
