import Link from "next/link";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import type { SolutionPageContent } from "@/content/site-content";
import { navigation } from "@/content/site-content";
import { heroThemeBackground, personaThemeClasses } from "@/lib/persona-theme";
import { ProductVideo } from "@/components/pages/ProductVideo";

export function SolutionPage({
  content,
  productVideo,
}: {
  content: SolutionPageContent;
  productVideo?: { src: string; poster: string; label: string; placement?: "below" | "beside" };
}) {
  const theme = personaThemeClasses[content.theme];
  const heroBg = heroThemeBackground[content.theme];
  const sectionY = productVideo ? "py-16" : "py-12";
  const beside = productVideo?.placement === "beside";
  const lifestyle = content.slug === "lifestyle";

  return (
    <>
      <section className={`pt-24 ${lifestyle ? "pb-8" : productVideo ? "pb-16" : "pb-12"} bg-gradient-to-br ${heroBg}`}>
        <div
          className={
            beside
              ? "max-w-7xl mx-auto px-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
              : `mx-auto px-6 ${productVideo ? "max-w-5xl text-center" : "max-w-7xl"}`
          }
        >
          <div className={beside ? "max-w-xl" : productVideo ? "mx-auto max-w-3xl" : "max-w-3xl"}>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${theme.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
              {content.personaLabel}
            </div>
            <h1
              className={
                beside
                  ? "font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6"
                  : productVideo
                    ? "font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-normal mb-4"
                    : "font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight"
              }
            >
              {content.heroHeadline}
            </h1>
            <p
              className={`text-lg text-muted-foreground leading-relaxed ${beside ? "mb-8 max-w-xl" : productVideo ? "mx-auto max-w-2xl" : "mb-8 max-w-2xl"}`}
            >
              {content.heroDescription}
            </p>
            {beside ? (
              <Link
                href={navigation.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-200"
              >
                {navigation.cta.label}
                <ArrowRight size={18} />
              </Link>
            ) : null}
          </div>
          {productVideo ? (
            <ProductVideo
              src={productVideo.src}
              poster={productVideo.poster}
              label={productVideo.label}
              className={beside ? "w-full" : undefined}
            />
          ) : null}
          {beside ? null : (
            <Link
              href={navigation.cta.href}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 ${productVideo ? "mt-8" : ""}`}
            >
              {navigation.cta.label}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>

      <section className={`${lifestyle ? "pt-8 pb-16" : sectionY} bg-white`}>
        <div className="max-w-7xl mx-auto px-6">
          {lifestyle ? null : (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              All Personas
            </p>
          )}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">
            {content.featuresHeading ?? "What your agent does"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature) => (
              <div
                key={feature.title}
                className="flex h-full flex-col rounded-2xl border border-border p-7 bg-white shadow-sm"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </p>
                <p className={`mt-auto text-sm font-medium ${theme.text}`}>{feature.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-slate-50`}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            In practice
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
            See it in action.
          </h2>
          <div className="flex flex-col gap-5">
            {content.scenarios.map((item) => (
              <div
                key={item.scenario}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl border border-border bg-white overflow-hidden"
              >
                <div className="p-7 border-b md:border-b-0 md:border-r border-border">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Scenario
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    &quot;{item.scenario}&quot;
                  </p>
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Outcome
                  </p>
                  <div className="flex items-start gap-2">
                    <CircleCheckBig size={16} className={`${theme.check} mt-0.5 shrink-0`} />
                    <p className="text-base font-medium text-foreground">{item.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.ctaHeadline ? (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content.ctaHeadline}
            </h2>
            <p className="text-muted-foreground mb-8">{content.ctaDescription}</p>
            <Link
              href={navigation.cta.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {navigation.cta.label}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
