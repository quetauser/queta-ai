import type { LegalDocument } from "@/content/site-content";
import { legalDocuments } from "@/content/site-content";
import { LegalDocumentBody } from "@/components/pages/LegalDocumentView";

const disclaimerHrefs = [
  "/terms-of-use",
  "/end-user-license-policy",
  "/ai-legal-disclosure",
  "/privacy-policy",
] as const satisfies readonly LegalDocument["href"][];

export function QuetaDisclaimerSections() {
  const documents = disclaimerHrefs.map((href) => {
    const document = legalDocuments.find((item) => item.href === href);
    if (!document) {
      throw new Error(`Missing legal document ${href}`);
    }
    return document;
  });

  return (
    <div className="space-y-10">
      {documents.map((document) => (
        <section key={document.href} className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">{document.navLabel}</h2>
          <LegalDocumentBody document={document} />
        </section>
      ))}
    </div>
  );
}
