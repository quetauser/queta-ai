"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, UIEvent, useEffect, useRef, useState } from "react";
import { navigation, subscribe } from "@/content/site-content";
import { QuetaDisclaimerSections } from "@/components/pages/QuetaDisclaimer";
import { SUBSCRIBE_FORM_SUBMIT_AJAX_URL, postFormSubmit } from "@/lib/contact-form";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PolicyChoice = "accept" | "decline" | null;

export function SubscribeForm() {
  const [products, setProducts] = useState<Record<string, boolean>>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [disclaimerChoice, setDisclaimerChoice] = useState<PolicyChoice>(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const disclaimerRef = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);

  const productSelected = navigation.solutions.some((item) => products[item.href]);
  const firstNameValid = firstName.trim().length > 0;
  const lastNameValid = lastName.trim().length > 0;
  const emailValid = EMAIL_PATTERN.test(email.trim());
  const disclaimerAccepted = disclaimerChoice === "accept";
  const canSubscribe = productSelected && firstNameValid && lastNameValid && emailValid && disclaimerAccepted;

  function chooseDisclaimer(choice: Exclude<PolicyChoice, null>) {
    if (choice === "accept" && !scrolledToEnd) {
      return;
    }
    if (choice === "decline" && !disclaimerOpen) {
      return;
    }
    setDisclaimerChoice((current) => (current === choice ? null : choice));
    setConfirmed(false);
  }

  function readDisclaimer() {
    setDisclaimerOpen((open) => !open);
  }

  function markScrolled(element: HTMLDivElement) {
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 24) {
      setScrolledToEnd(true);
    }
  }

  function onDisclaimerScroll(event: UIEvent<HTMLDivElement>) {
    markScrolled(event.currentTarget);
  }

  useEffect(() => {
    if (!disclaimerOpen || !disclaimerRef.current) {
      return;
    }
    markScrolled(disclaimerRef.current);
  }, [disclaimerOpen]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubscribe || sending) {
      return;
    }
    if (honey) {
      return;
    }
    setSending(true);
    setSendError(false);
    const acceptedAtUtc = new Date().toISOString();
    try {
      await postFormSubmit(SUBSCRIBE_FORM_SUBMIT_AJAX_URL, {
        products: navigation.solutions
          .filter((item) => products[item.href])
          .map((item) => item.label)
          .join(", "),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        acknowledgment: `The subscriber confirmed they read and accepted the Terms of Use, Privacy Policy, End User License Agreement, and AI and Legal Disclosure. Accepted at ${acceptedAtUtc} UTC.`,
        _replyto: email.trim(),
        _subject: `New Queta AI subscription: ${firstName.trim()} ${lastName.trim()}`,
        _template: "table",
        _captcha: false,
        _honey: honey,
      });
      setConfirmed(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="overflow-visible pt-20 pb-3 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="overflow-visible font-heading font-bold text-foreground leading-tight text-2xl sm:text-3xl">
            {subscribe.heading}
          </h1>
        </div>
      </section>
      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-border shadow-xl shadow-violet-100 p-5 md:p-6">
            <form className="relative flex flex-col gap-4" onSubmit={onSubmit} noValidate>
              <input
                type="text"
                name="_honey"
                value={honey}
                onChange={(event) => setHoney(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute h-0 w-0 overflow-hidden opacity-0"
                aria-hidden
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
              <fieldset className="flex flex-col gap-2">
                <legend className="text-sm font-semibold text-foreground">{subscribe.productsLegend}</legend>
                {navigation.solutions.map((item) => (
                  <label key={item.href} className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      name="products"
                      value={item.href}
                      checked={Boolean(products[item.href])}
                      onChange={(event) => {
                        setProducts((current) => ({ ...current, [item.href]: event.target.checked }));
                        setConfirmed(false);
                      }}
                      className="size-4 accent-primary"
                    />
                    {item.label}
                  </label>
                ))}
                {productSelected ? null : (
                  <p className="text-sm text-red-700" role="alert">
                    {subscribe.productsRequired}
                  </p>
                )}
              </fieldset>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field
                  id="first-name"
                  label={subscribe.fields.firstName.label}
                  placeholder={subscribe.fields.firstName.placeholder}
                  value={firstName}
                  autoComplete="given-name"
                  error={touched.firstName && !firstNameValid ? subscribe.errors.firstName : undefined}
                  onBlur={() => setTouched((current) => ({ ...current, firstName: true }))}
                  onChange={(value) => {
                    setFirstName(value);
                    setConfirmed(false);
                  }}
                />
                <Field
                  id="last-name"
                  label={subscribe.fields.lastName.label}
                  placeholder={subscribe.fields.lastName.placeholder}
                  value={lastName}
                  autoComplete="family-name"
                  error={touched.lastName && !lastNameValid ? subscribe.errors.lastName : undefined}
                  onBlur={() => setTouched((current) => ({ ...current, lastName: true }))}
                  onChange={(value) => {
                    setLastName(value);
                    setConfirmed(false);
                  }}
                />
                <Field
                  id="email"
                  label={subscribe.fields.email.label}
                  placeholder={subscribe.fields.email.placeholder}
                  value={email}
                  type="email"
                  autoComplete="email"
                  error={
                    touched.email
                      ? email.trim()
                        ? emailValid
                          ? undefined
                          : subscribe.errors.emailFormat
                        : subscribe.errors.email
                      : undefined
                  }
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  onChange={(value) => {
                    setEmail(value);
                    setConfirmed(false);
                  }}
                />
                <Field
                  id="phone"
                  label={subscribe.fields.phone.label}
                  placeholder={subscribe.fields.phone.placeholder}
                  value={phone}
                  type="tel"
                  autoComplete="tel"
                  onChange={(value) => {
                    setPhone(value);
                    setConfirmed(false);
                  }}
                />
              </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <button
                      type="button"
                      onClick={readDisclaimer}
                      className="text-left text-sm font-semibold text-primary underline"
                      aria-expanded={disclaimerOpen}
                    >
                      {subscribe.readDisclaimer}
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <Choice
                      name="disclaimer"
                      label={subscribe.accept}
                      checked={disclaimerChoice === "accept"}
                      disabled={!scrolledToEnd}
                      onChange={() => chooseDisclaimer("accept")}
                    />
                    <Choice
                      name="disclaimer"
                      label={subscribe.decline}
                      checked={disclaimerChoice === "decline"}
                      disabled={!disclaimerOpen}
                      onChange={() => chooseDisclaimer("decline")}
                    />
                  </div>
                </div>
                {disclaimerOpen && !scrolledToEnd ? (
                  <p className="text-xs text-muted-foreground">{subscribe.scrollHint}</p>
                ) : null}
                {disclaimerOpen ? (
                  <div
                    ref={disclaimerRef}
                    onScroll={onDisclaimerScroll}
                    className="max-h-96 overflow-y-auto rounded-xl border border-border bg-slate-50 p-4"
                  >
                    <QuetaDisclaimerSections />
                  </div>
                ) : null}
                {disclaimerAccepted ? null : (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                    {disclaimerChoice === "decline" ? subscribe.disclaimerDeclined : subscribe.disclaimerNeeded}
                  </p>
                )}
              </div>

              {sendError ? (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                  {subscribe.sendError}
                </p>
              ) : null}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!canSubscribe || sending}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:shadow-xl animate-glow-pulse disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-lg"
                >
                  {sending ? subscribe.sendingLabel : subscribe.submitLabel}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {confirmed ? (
                <p className="text-center text-lg font-bold leading-relaxed text-foreground" role="status">
                  {subscribe.confirmationLead}
                  <a href={`mailto:${subscribe.confirmationEmail}`} className="text-primary underline">
                    {subscribe.confirmationEmail}
                  </a>
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  type = "text",
  autoComplete,
  error,
  onBlur,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  autoComplete: string;
  error?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Choice({
  name,
  label,
  checked,
  disabled,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <label className={`flex items-center gap-2 text-sm text-foreground ${disabled ? "opacity-50" : ""}`}>
      <input
        type="checkbox"
        name={`${name}-${label}`}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="size-4 accent-primary disabled:cursor-not-allowed"
      />
      {label}
    </label>
  );
}
