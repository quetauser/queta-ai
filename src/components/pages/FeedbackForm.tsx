"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { feedback } from "@/content/site-content";
import { submitFeedbackForm, validateFeedback, type FeedbackErrors } from "@/lib/contact-form";

type FormStatus = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

export function FeedbackForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [honeypot, setHoneypot] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honeypot) {
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      comments: String(formData.get("comments") ?? ""),
    };
    const nextErrors = validateFeedback(fields, feedback.form.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    try {
      await submitFeedbackForm(fields, honeypot);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="pt-20 pb-6 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {feedback.headline}
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">{feedback.description}</p>
        </div>
      </section>
      <section className="pb-10">
        <div className="max-w-xl mx-auto px-6">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-violet-100 md:p-8">
            {status === "success" ? (
              <p
                data-testid="feedback-form-status-success"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700"
                role="status"
              >
                {feedback.form.successMessage}
              </p>
            ) : (
              <>
                {status === "error" ? (
                  <p
                    data-testid="feedback-form-status-error"
                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {feedback.form.errorMessage}
                  </p>
                ) : null}
                <form className="relative flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                  <input
                    type="text"
                    name="_honey"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden
                  />
                  <Field
                    id="feedback-name"
                    name="name"
                    label={feedback.form.fields.name.label}
                    placeholder={feedback.form.fields.name.placeholder}
                    error={errors.name}
                  />
                  <Field
                    id="feedback-email"
                    name="email"
                    type="email"
                    label={feedback.form.fields.email.label}
                    placeholder={feedback.form.fields.email.placeholder}
                    error={errors.email}
                  />
                  <Field
                    id="feedback-phone"
                    name="phone"
                    type="tel"
                    label={feedback.form.fields.phone.label}
                    placeholder={feedback.form.fields.phone.placeholder}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedback-comments" className="text-sm font-semibold text-foreground">
                      {feedback.form.fields.comments.label}
                    </label>
                    <textarea
                      id="feedback-comments"
                      name="comments"
                      rows={5}
                      placeholder={feedback.form.fields.comments.placeholder}
                      aria-invalid={Boolean(errors.comments)}
                      aria-describedby={errors.comments ? "feedback-comments-error" : undefined}
                      className={`${fieldClass} resize-none`}
                    />
                    {errors.comments ? (
                      <p id="feedback-comments-error" className="text-xs text-red-700">
                        {errors.comments}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    data-testid="feedback-form-submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-violet-200 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                    {status === "sending" ? feedback.form.sendingLabel : feedback.form.submitLabel}
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

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
