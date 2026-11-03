import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { SolutionPage } from "@/components/pages/SolutionPage";
import { solutions, type PersonaSlug } from "@/content/site-content";

const slugs: PersonaSlug[] = ["lifestyle", "realtor", "trader"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = solutions[slug as PersonaSlug];
  if (!content) {
    return { title: "Queta AI" };
  }
  return { title: content.metaTitle };
}

export default async function SolutionRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = solutions[slug as PersonaSlug];
  if (!content) {
    notFound();
  }

  return (
    <SiteShell>
      <SolutionPage
        content={content}
        productVideo={
          slug === "trader"
            ? {
                src: "/videos/queta-trader.mp4",
                poster: "/videos/queta-trader-poster.jpg",
                label: "Queta Trader",
              }
            : slug === "lifestyle"
              ? {
                  src: "/videos/queta-lifestyle.mp4",
                  poster: "/videos/queta-lifestyle-poster.jpg",
                  label: "Queta Lifestyle",
                  placement: "beside",
                }
              : slug === "realtor"
                ? {
                    label: "Queta Realtor",
                    placement: "beside" as const,
                  }
                : undefined
        }
      />
    </SiteShell>
  );
}
