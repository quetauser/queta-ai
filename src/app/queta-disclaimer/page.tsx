import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { QuetaDisclaimerSections } from "@/components/pages/QuetaDisclaimer";

export const metadata: Metadata = {
  title: "Queta Disclaimer — Queta AI",
};

export default function QuetaDisclaimerPage() {
  return (
    <SiteShell>
      <section className="pt-24 pb-10 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Queta Disclaimer
          </h1>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <QuetaDisclaimerSections />
        </div>
      </section>
    </SiteShell>
  );
}
