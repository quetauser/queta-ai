import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ComparePageView } from "@/components/pages/ComparePageView";
import { compare } from "@/content/site-content";

export const metadata: Metadata = {
  title: compare.metaTitle,
};

export default function ComparePage() {
  return (
    <SiteShell>
      <ComparePageView />
    </SiteShell>
  );
}
