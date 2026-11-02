import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { FeedbackForm } from "@/components/pages/FeedbackForm";
import { feedback } from "@/content/site-content";

export const metadata: Metadata = {
  title: feedback.metaTitle,
};

export default function FeedbackPage() {
  return (
    <SiteShell>
      <FeedbackForm />
    </SiteShell>
  );
}
