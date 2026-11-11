"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contact } from "@/content/site-content";
import {
  CONTACT_EMAIL_SUBJECT_BASE,
  emailSubjectForInterest,
  interestLabel,
  submitContactForm,
} from "@/lib/contact-form";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");
  const prefilledInterest = useMemo(
    () => interestLabel(interestParam) ?? "",
    [interestParam],
  );

  const [status, setStatus] = useState<FormStatus>("idle");
  const [interest, setInterest] = useState(prefilledInterest);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (prefilledInterest) {
      setInterest(prefilledInterest);
    }
  }, [prefilledInterest]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honeypot) {
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const comments = String(formData.get("comments") ?? "");
    const interestValue = String(formData.get("interest") ?? "");
    const subject = interestParam
      ? emailSubjectForInterest(interestParam)
      : interestValue
        ? `${CONTACT_EMAIL_SUBJECT_BASE} — ${interestValue}`
        : CONTACT_EMAIL_SUBJECT_BASE;

    try {
      await submitContactForm({
        name,
        email,
        phone,
        comments,
        interest: interestValue,
        _subject: subject,
        _captcha: false,
        _honey: honeypot,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="overflow-visible pt-28 pb-12 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="overflow-visible font-heading font-bold text-foreground mb-6 py-2 leading-normal whitespace-nowrap text-sm sm:text-2xl lg:text-3xl">
            {contact.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground">{contact.hero.description}</p>
        </div>
      </section>
      <section className="py-6">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-border shadow-xl shadow-violet-100 p-8 md:p-10">
            {status === "success" ? (
              <p
                data-testid="contact-form-status-success"
                className="text-center text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3"
                role="status"
              >
                {contact.form.successMessage}
              </p>
            ) : (
              <>
                <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{contact.form.nextSteps}</p>
                {status === "error" ? (
                  <p
                    data-testid="contact-form-status-error"
                    className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5"
                    role="alert"
                  >
                    {contact.form.errorMessage}
                  </p>
                ) : null}
                <form className="relative flex flex-col gap-5" onSubmit={onSubmit}>
                  <input
                    type="text"
                    name="_honey"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      {contact.form.fields.name.label}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={contact.form.fields.name.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      {contact.form.fields.email.label}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={contact.form.fields.email.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                      {contact.form.fields.phone.label}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={contact.form.fields.phone.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="interest" className="text-sm font-semibold text-foreground">
                      {contact.form.fields.interest.label}
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      type="text"
                      required
                      value={interest}
                      onChange={(event) => setInterest(event.target.value)}
                      placeholder={contact.form.fields.interest.placeholder}
                      readOnly={Boolean(prefilledInterest)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all read-only:opacity-90"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="comments" className="text-sm font-semibold text-foreground">
                      {contact.form.fields.comments.label}
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={5}
                      required
                      placeholder={contact.form.fields.comments.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="contact-form-submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {status === "sending" ? contact.form.sendingLabel : contact.form.submitLabel}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
