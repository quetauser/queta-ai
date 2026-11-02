import type { LegalBlock, LegalDocument, LegalRun } from "@/content/site-content";

function LegalRunView({ run }: { run: LegalRun }) {
  if (run.kind === "break") {
    return <br />;
  }
  if (run.kind === "mail") {
    return (
      <a href="mailto:info@queta.ai" className="text-primary underline">
        info@queta.ai
      </a>
    );
  }
  if (run.kind === "link") {
    return (
      <a
        href={run.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline break-words"
      >
        {run.text}
      </a>
    );
  }
  if (run.kind === "bold") {
    return <strong className="font-semibold text-foreground whitespace-pre-wrap">{run.text}</strong>;
  }
  return <span className="whitespace-pre-wrap">{run.text}</span>;
}

function LegalRuns({ runs }: { runs: readonly LegalRun[] }) {
  return runs.map((run, index) => <LegalRunView key={index} run={run} />);
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.kind === "heading") {
    return (
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">{block.text}</h2>
    );
  }
  if (block.kind === "bullets" || block.kind === "numbers") {
    const ListTag = block.kind === "bullets" ? "ul" : "ol";
    const listClass =
      block.kind === "bullets"
        ? "list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed"
        : "list-decimal pl-6 space-y-2 text-muted-foreground leading-relaxed";
    return (
      <ListTag className={listClass}>
        {block.items.map((item, index) => (
          <li key={index} className="whitespace-pre-wrap">
            <LegalRuns runs={item} />
          </li>
        ))}
      </ListTag>
    );
  }
  return (
    <p className="text-muted-foreground leading-relaxed">
      <LegalRuns runs={block.runs} />
    </p>
  );
}

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="pt-24 pb-10 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {document.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {document.eyebrow}
            </p>
          ) : null}
          <h1
            className={`font-heading font-bold text-foreground leading-tight ${document.title ? "text-3xl sm:text-4xl md:text-5xl" : "text-4xl md:text-5xl"}`}
          >
            {document.title ?? document.navLabel}
          </h1>
          {document.subtitle ? (
            <p className="font-heading text-lg md:text-xl font-semibold text-foreground mt-4">
              {document.subtitle}
            </p>
          ) : null}
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {document.blocks.map((block, index) => (
            <LegalBlockView key={index} block={block} />
          ))}
        </div>
      </section>
    </>
  );
}
