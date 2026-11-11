"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { traderSamples } from "@/content/site-content";

type TraderSampleOutputsProps = {
  variant?: "section" | "compact";
};

export function TraderSampleOutputs({ variant = "section" }: TraderSampleOutputsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const active = activeIndex === null ? null : traderSamples.items[activeIndex];
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => (current === null ? current : (current + 1) % traderSamples.items.length));
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + traderSamples.items.length) % traderSamples.items.length,
        );
        return;
      }
      if (event.key !== "Tab" || !dialog) {
        return;
      }
      const focusable = [...dialog.querySelectorAll<HTMLElement>("button:not([disabled])")];
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  function open(index: number) {
    setActiveIndex(index);
  }

  const lightbox = active ? (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 p-4"
      onClick={() => setActiveIndex(null)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p id={titleId} className="text-sm font-semibold text-foreground">
            {active.caption}
          </p>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={traderSamples.closeLabel}
            onClick={() => setActiveIndex(null)}
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="flex min-h-0 items-center gap-2 px-2 py-4 sm:px-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-foreground hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={traderSamples.previousLabel}
            onClick={() =>
              setActiveIndex((current) =>
                current === null ? current : (current - 1 + traderSamples.items.length) % traderSamples.items.length,
              )
            }
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <div className="flex min-w-0 flex-1 justify-center">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              unoptimized
              className="h-auto max-h-[70vh] w-auto max-w-full object-contain"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-foreground hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={traderSamples.nextLabel}
            onClick={() =>
              setActiveIndex((current) => (current === null ? current : (current + 1) % traderSamples.items.length))
            }
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (variant === "compact") {
    return (
      <>
        <button
          type="button"
          className="inline-flex max-w-full shrink-0 cursor-pointer items-center gap-2 text-left text-xs font-semibold text-emerald-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => open(0)}
        >
          <span className="flex shrink-0 items-center" aria-hidden>
            {traderSamples.items.map((item, index) => (
              <Image
                key={item.src}
                src={item.src}
                alt=""
                width={32}
                height={32}
                unoptimized
                className={`h-8 w-8 rounded-md border-2 border-white object-cover object-top ${index === 0 ? "" : "-ml-2"}`}
              />
            ))}
          </span>
          {traderSamples.openLabel}
        </button>
        {lightbox}
      </>
    );
  }

  return (
    <section className="bg-white pb-16" aria-labelledby="trader-sample-outputs">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="trader-sample-outputs" className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {traderSamples.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{traderSamples.subtext}</p>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {traderSamples.items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto"
              onClick={() => open(index)}
            >
              <span className="relative block h-48 w-full bg-slate-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 30vw, 82vw"
                  className="object-cover object-top"
                />
              </span>
              <span className="block px-4 py-3 text-sm font-semibold text-foreground">{item.caption}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{traderSamples.disclaimer}</p>
      </div>
      {lightbox}
    </section>
  );
}
