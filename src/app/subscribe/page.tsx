import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { SubscribeForm } from "@/components/pages/SubscribeForm";
import { subscribe } from "@/content/site-content";

export const metadata: Metadata = {
  title: subscribe.metaTitle,
};

export default function SubscribePage() {
  return (
    <SiteShell>
      <SubscribeForm />
    </SiteShell>
  );
}
