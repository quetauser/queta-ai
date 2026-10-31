import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { LegalDocumentView } from "@/components/pages/LegalDocumentView";
import { legalDocuments } from "@/content/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocuments.map((document) => ({
    slug: document.href.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = legalDocuments.find((document) => document.href.slice(1) === slug);
  if (!content) {
    return { title: "Queta AI" };
  }
  return { title: content.metaTitle };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = legalDocuments.find((document) => document.href.slice(1) === slug);
  if (!content) {
    notFound();
  }

  return (
    <SiteShell>
      <LegalDocumentView document={content} />
    </SiteShell>
  );
}
