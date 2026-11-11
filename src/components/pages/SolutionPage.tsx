import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  KeyRound,
  Link2,
  ListChecks,
  Rocket,
  ShieldAlert,
  Signpost,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { SolutionFeature, SolutionFeatureGroup, SolutionPageContent } from "@/content/site-content";
import { navigation } from "@/content/site-content";
import { heroThemeBackground, personaThemeClasses } from "@/lib/persona-theme";
import { ProductVideo } from "@/components/pages/ProductVideo";
import { TraderSampleOutputs } from "@/components/pages/TraderSampleOutputs";

const groupAccents: Record<string, { icon: LucideIcon; chip: string; bar: string; card: string }> = {
  "Buyer Side": {
    icon: KeyRound,
    chip: "bg-blue-600 text-white",
    bar: "bg-gradient-to-r from-blue-600 to-blue-400",
    card: "border-blue-100 border-l-blue-600",
  },
  "Seller Side": {
    icon: Signpost,
    chip: "bg-violet-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-fuchsia-400",
    card: "border-violet-100 border-l-violet-600",
  },
  "Linked Deals": {
    icon: Link2,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-violet-500",
  },
  "Deal Tracker": {
    icon: ListChecks,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-blue-600",
  },
  "Referral Pages": {
    icon: Users,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-violet-500",
  },
  "How it works": {
    icon: Sparkles,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-violet-500",
  },
  "Getting started": {
    icon: Rocket,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-blue-600",
  },
  "What it doesn't do": {
    icon: ShieldAlert,
    chip: "bg-gradient-to-br from-violet-600 to-blue-600 text-white",
    bar: "bg-gradient-to-r from-violet-600 to-blue-500",
    card: "border-violet-100 border-l-violet-600",
  },
};

const brandAccent = groupAccents["How it works"];

function accentFor(title: string) {
  return groupAccents[title] ?? brandAccent;
}

function SectionHeading({ title }: { title: string }) {
  const accent = accentFor(title);
  const Icon = accent.icon;
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2.5">
        <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent.chip}`}>
          <Icon size={16} aria-hidden />
        </span>
        <h2 className="min-w-0 bg-gradient-to-r from-violet-700 to-blue-700 bg-clip-text font-heading text-2xl font-bold leading-tight tracking-tight text-transparent md:text-3xl">
          {title}
        </h2>
      </div>
      <div className={`mt-1.5 h-1 w-14 rounded-full ${accent.bar}`} />
    </div>
  );
}

function FeatureCard({ feature, cardClass }: { feature: SolutionFeature; cardClass: string }) {
  return (
    <div className={`rounded-2xl border border-l-4 bg-white p-4 shadow-sm ${cardClass}`}>
      <h3 className="mb-1.5 text-lg font-bold text-foreground">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      {feature.points?.length ? (
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          {feature.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FeatureGroup({ group }: { group: SolutionFeatureGroup }) {
  const stacked = group.span === "half";
  const cardClass = accentFor(group.title).card;
  return (
    <div>
      <SectionHeading title={group.title} />
      <div className={stacked ? "flex flex-col gap-3" : "grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3"}>
        {group.features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} cardClass={cardClass} />
        ))}
      </div>
    </div>
  );
}

function FeatureGroups({ groups }: { groups: readonly SolutionFeatureGroup[] }) {
  const blocks: ReactNode[] = [];
  for (let index = 0; index < groups.length; index += 1) {
    const group = groups[index];
    const next = groups[index + 1];
    if (group.span === "half" && next?.span === "half") {
      blocks.push(
        <div key={group.title} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <FeatureGroup group={group} />
          <FeatureGroup group={next} />
        </div>,
      );
      index += 1;
    } else {
      blocks.push(<FeatureGroup key={group.title} group={group} />);
    }
  }
  return <div className="space-y-6">{blocks}</div>;
}

export function SolutionPage({
  content,
  productVideo,
}: {
  content: SolutionPageContent;
  productVideo?: { src?: string; poster?: string; label: string; placement?: "below" | "beside" };
}) {
  const theme = personaThemeClasses[content.theme];
  const heroBg = heroThemeBackground[content.theme];
  const sectionY = productVideo ? "py-16" : "py-12";
  const beside = productVideo?.placement === "beside";
  const guide = content.guide;

  return (
    <>
      <section className={`pt-24 pb-8 bg-gradient-to-br ${heroBg}`}>
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

      <section className={content.featureGroups ? "bg-white pt-4 pb-4" : `pt-8 ${productVideo ? "pb-16" : "pb-12"} bg-white`}>
        <div className="max-w-7xl mx-auto px-6">
          {content.featuresHeading ? (
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">
              {content.featuresHeading}
            </h2>
          ) : null}
          {content.featureGroups ? (
            <FeatureGroups groups={content.featureGroups} />
          ) : (
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
          )}
        </div>
      </section>

      {content.slug === "trader" ? <TraderSampleOutputs /> : null}

      {guide ? (
        <>
          <section className="py-8 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {guide.howItWorks.eyebrow}
              </p>
              <SectionHeading title={guide.howItWorks.title} />
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {guide.howItWorks.steps.map((step, index) => (
                  <li key={step.title} className={`rounded-2xl border border-l-4 bg-white p-4 ${accentFor(guide.howItWorks.title).card}`}>
                    <p className={`text-xs font-semibold ${theme.text}`}>{index + 1}</p>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-3 flex flex-wrap gap-2">
                {guide.howItWorks.principles.map((principle) => (
                  <li
                    key={principle}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground"
                  >
                    <CircleCheckBig size={14} className={`${theme.check} shrink-0`} aria-hidden />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title={guide.gettingStarted.title} />
              <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {guide.gettingStarted.steps.map((step, index) => (
                  <li key={step.title} className={`rounded-2xl border border-l-4 bg-white p-4 ${accentFor(guide.gettingStarted.title).card}`}>
                    <p className={`text-xs font-semibold ${theme.text}`}>{index + 1}</p>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section className="pt-0 pb-8 bg-slate-950 text-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{guide.closing}</h2>
              <Link
                href={navigation.cta.href}
                className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {navigation.cta.label}
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </>
      ) : null}

      {content.scenarios.length > 0 ? (
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
      ) : null}

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
