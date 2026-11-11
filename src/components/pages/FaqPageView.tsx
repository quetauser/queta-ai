import { ChevronDown } from "lucide-react";
import { faq } from "@/content/site-content";
import { ProductVideo } from "@/components/pages/ProductVideo";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

type FaqRun =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "link"; readonly label: string; readonly href: string };

function FaqRuns({ runs }: { runs: readonly FaqRun[] }) {
  return runs.map((run, index) =>
    run.kind === "link" ? (
      <a
        key={index}
        href={run.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block max-w-full break-words px-0.5 py-2.5 -my-2.5 align-baseline text-primary underline underline-offset-2"
      >
        {run.label}
      </a>
    ) : (
      <span key={index}>{run.text}</span>
    ),
  );
}

function runsText(runs: readonly FaqRun[]) {
  return runs.map((run) => (run.kind === "text" ? run.text : `${run.label} (${run.href})`)).join("");
}

function answerText(item: (typeof faq.groups)[number]["items"][number]) {
  const parts: string[] = [];
  if ("intro" in item) {
    parts.push(runsText(item.intro));
  }
  if ("answer" in item) {
    parts.push(item.answer);
  }
  if ("steps" in item) {
    item.steps.forEach((step, index) => {
      parts.push(`${index + 1}. ${runsText(step)}`);
    });
  }
  if ("links" in item) {
    parts.push(item.links.map((link) => `${link.label} (${link.href})`).join(" "));
  }
  return parts.join(" ");
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerText(item),
      },
    })),
  ),
};

export function FaqPageView() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <section className="pt-20 pb-6 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {faq.headline}
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">{faq.intro}</p>
          <a
            href={faq.grokCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {faq.grokCta.label}
          </a>
        </div>
      </section>
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {faq.groups.map((group, groupIndex) => (
            <div key={group.title}>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">{group.title}</h2>
              <div className="mt-3 rounded-2xl border border-border bg-white px-5">
                {group.items.map((item, itemIndex) => (
                  <details
                    key={item.question}
                    className="group border-b border-border last:border-b-0"
                    {...(groupIndex === 0 && itemIndex === 0 ? { open: true } : {})}
                  >
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <ChevronDown
                        aria-hidden
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="pb-4 text-sm leading-6 text-muted-foreground">
                      {"intro" in item ? (
                        <p>
                          <FaqRuns runs={item.intro} />
                        </p>
                      ) : null}
                      {"answer" in item ? <p>{item.answer}</p> : null}
                      {"steps" in item ? (
                        <ol className="mt-3 list-decimal space-y-4 pl-5">
                          {item.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>
                              <FaqRuns runs={step} />
                            </li>
                          ))}
                        </ol>
                      ) : null}
                      {"video" in item ? (
                        <ProductVideo
                          src={item.video.src}
                          poster={item.video.poster}
                          label={item.video.label}
                          autoplay={false}
                          className="mt-3 w-full"
                        />
                      ) : null}
                      {"links" in item ? (
                        <ul className={"answer" in item ? "mt-3 flex flex-col gap-2" : "flex flex-col gap-2"}>
                          {item.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                {...(isExternal(link.href)
                                  ? { target: "_blank", rel: "noopener noreferrer" }
                                  : {})}
                                className="inline-flex min-h-11 max-w-full items-center whitespace-normal text-primary underline break-words underline-offset-2"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
