import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqPageView } from "@/components/pages/FaqPageView";
import { faq } from "@/content/site-content";

export const metadata: Metadata = {
  title: faq.metaTitle,
};

export default function FaqPage() {
  return (
    <SiteShell>
      <FaqPageView />
    </SiteShell>
  );
}
