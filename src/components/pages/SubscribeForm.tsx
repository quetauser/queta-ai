"use client";

import { ArrowRight, ChevronDown, CircleCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, UIEvent, useEffect, useRef, useState } from "react";
import { navigation, subscribe } from "@/content/site-content";
import { formatUsdFromCents, isLaunchPriceHref, launchPriceSubmission, launchPrices } from "@/content/launch-prices";
import { QuetaDisclaimerSections } from "@/components/pages/QuetaDisclaimer";
import { SUBSCRIBE_FORM_SUBMIT_AJAX_URL, SUBSCRIBE_FORM_SUBMIT_URL, postFormSubmit } from "@/lib/contact-form";

const fieldErrorClassName = "text-[14px] text-red-700";
const alertErrorClassName = "text-[16px] text-red-700";

const SUBMISSION_KEY = "queta.subscribe.submission";

type StoredSubmission = {
  email: string;
  submittedAt: string;
};

function readSubmission(): StoredSubmission | null {
  try {
    const raw = window.localStorage.getItem(SUBMISSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("email" in parsed) || !("submittedAt" in parsed)) {
      return null;
    }
    if (typeof parsed.email !== "string" || typeof parsed.submittedAt !== "string" || !parsed.email) {
      return null;
    }
    return { email: parsed.email, submittedAt: parsed.submittedAt };
  } catch {
    return null;
  }
}

function rememberSubmission(email: string) {
  const record: StoredSubmission = {
    email: email.trim().toLowerCase(),
    submittedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(SUBMISSION_KEY, JSON.stringify(record));
}

function clearSubmission() {
  window.localStorage.removeItem(SUBMISSION_KEY);
}

function submissionMatches(email: string) {
  const stored = readSubmission();
  return stored !== null && stored.email === email.trim().toLowerCase();
}

function postSubscribeForm(fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = SUBSCRIBE_FORM_SUBMIT_URL;
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.append(input);
  }
  document.body.append(form);
  form.submit();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PolicyChoice = "accept" | "decline" | null;

export function SubscribeForm() {
  const [products, setProducts] = useState<Record<string, boolean>>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productsTouched, setProductsTouched] = useState(false);
  const [submitReached, setSubmitReached] = useState(false);
  const [disclaimerChoice, setDisclaimerChoice] = useState<PolicyChoice>(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [readPercent, setReadPercent] = useState(0);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const disclaimerRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const submitGuard = useRef(false);
  const formPosted = useRef(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);

  const productSelected = navigation.solutions.some((item) => products[item.href]);
  const selectedProducts = navigation.solutions.flatMap((item) => {
    if (!products[item.href] || !isLaunchPriceHref(item.href)) {
      return [];
    }
    return [{ label: item.label, href: item.href, ...launchPrices[item.href] }];
  });
  const firstNameValid = firstName.trim().length > 0;
  const lastNameValid = lastName.trim().length > 0;
  const emailValid = EMAIL_PATTERN.test(email.trim());
  const emailsMatch = confirmEmail.trim().length > 0 && confirmEmail.trim() === email.trim();
  const disclaimerAccepted = disclaimerChoice === "accept";
  const canSubscribe = productSelected && firstNameValid && lastNameValid && emailValid && emailsMatch && disclaimerAccepted;
  const showProductError = !productSelected && (productsTouched || submitReached);
  const showDisclaimerError = !disclaimerAccepted && (disclaimerChoice === "decline" || submitReached);
  const missingRequirements = [
    !firstNameValid ? "first name" : null,
    !lastNameValid ? "last name" : null,
    !emailValid ? "a valid email" : null,
    !emailsMatch ? "a matching confirm email" : null,
    !productSelected ? "at least one product" : null,
    !disclaimerAccepted ? (scrolledToEnd ? "Accept" : "reading the disclaimer to the end, then Accept") : null,
  ].filter((item): item is string => item !== null);

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

  function updateScroll(element: HTMLDivElement) {
    const maxScroll = element.scrollHeight - element.clientHeight;
    const atEnd = maxScroll <= 24 || element.scrollTop + element.clientHeight >= element.scrollHeight - 24;
    const percent = maxScroll <= 0 ? 100 : Math.min(100, Math.round((element.scrollTop / maxScroll) * 100));
    setReadPercent(atEnd ? 100 : percent);
    if (atEnd) {
      setScrolledToEnd(true);
    }
  }

  function onDisclaimerScroll(event: UIEvent<HTMLDivElement>) {
    updateScroll(event.currentTarget);
  }

  useEffect(() => {
    if (!disclaimerOpen || !disclaimerRef.current) {
      return;
    }
    updateScroll(disclaimerRef.current);
  }, [disclaimerOpen]);

  useEffect(() => {
    function showStoredConfirmation() {
      const params = new URLSearchParams(window.location.search);
      if (readSubmission() || params.get("submitted") === "1") {
        setConfirmed(true);
      }
    }
    showStoredConfirmation();
    setStorageChecked(true);
    window.addEventListener("pageshow", showStoredConfirmation);
    return () => window.removeEventListener("pageshow", showStoredConfirmation);
  }, []);

  useEffect(() => {
    if (confirmed) {
      confirmationRef.current?.focus();
    }
  }, [confirmed]);

  function startOver() {
    clearSubmission();
    submitGuard.current = false;
    formPosted.current = false;
    setSending(false);
    setSendError(false);
    setConfirmed(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("submitted")) {
      url.searchParams.delete("submitted");
      window.history.replaceState(null, "", `${url.pathname}${url.search}`);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitGuard.current || formPosted.current) {
      return;
    }
    setSubmitReached(true);
    setProductsTouched(true);
    setTouched({ firstName: true, lastName: true, email: true, confirmEmail: true });
    if (!canSubscribe || sending) {
      return;
    }
    if (honey) {
      return;
    }
    if (submissionMatches(email)) {
      setConfirmed(true);
      return;
    }
    submitGuard.current = true;
    setSending(true);
    setSendError(false);
    const acceptedAtUtc = new Date().toISOString();
    const priceFields = launchPriceSubmission(selectedProducts);
    const fields = {
      products: selectedProducts.map((item) => item.label).join(", "),
      first_year_total: priceFields.first_year_total,
      renewal_total: priceFields.renewal_total,
      price_summary: priceFields.price_summary,
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
    };
    try {
      await postFormSubmit(SUBSCRIBE_FORM_SUBMIT_AJAX_URL, fields);
      rememberSubmission(fields.email);
      setConfirmed(true);
      setSending(false);
    } catch (error) {
      const blockedBeforeResponse = error instanceof TypeError;
      if (blockedBeforeResponse && !formPosted.current) {
        try {
          formPosted.current = true;
          rememberSubmission(fields.email);
          postSubscribeForm({
            products: fields.products,
            first_year_total: fields.first_year_total,
            renewal_total: fields.renewal_total,
            price_summary: fields.price_summary,
            first_name: fields.first_name,
            last_name: fields.last_name,
            email: fields.email,
            phone: fields.phone,
            acknowledgment: fields.acknowledgment,
            _replyto: fields._replyto,
            _subject: fields._subject,
            _template: fields._template,
            _captcha: "false",
            _honey: fields._honey,
            _next: `${window.location.origin}/subscribe?submitted=1`,
          });
          window.setTimeout(() => {
            clearSubmission();
            formPosted.current = false;
            submitGuard.current = false;
            setSending(false);
            setSendError(true);
          }, 2500);
          return;
        } catch {
          formPosted.current = false;
          submitGuard.current = false;
          clearSubmission();
          setSending(false);
          setSendError(true);
          return;
        }
      }
      submitGuard.current = false;
      setSending(false);
      setSendError(true);
    }
  }

  if (!storageChecked) {
    return <section className="min-h-[70vh]" aria-hidden />;
  }

  if (confirmed) {
    return (
      <section
        className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 px-6 py-16"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <CircleCheck className="size-16 text-emerald-600" aria-hidden />
          <h1
            ref={confirmationRef}
            tabIndex={-1}
            className="mt-6 font-heading text-xl font-normal leading-relaxed text-foreground outline-none sm:text-2xl"
          >
            {subscribe.confirmationBefore}
            <span className="font-bold">{subscribe.confirmationNextSteps}</span>
            {subscribe.confirmationBetween}
            <span className="font-bold">{subscribe.confirmationGuide}</span>
            {subscribe.confirmationAfter}
            <a href={`mailto:${subscribe.confirmationEmail}`} className="text-primary underline">
              {subscribe.confirmationEmail}
            </a>
          </h1>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-violet-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {subscribe.backHome}
          </Link>
          <button
            type="button"
            onClick={startOver}
            className="mt-4 text-sm text-muted-foreground underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {subscribe.startOver}
          </button>
        </div>
      </section>
    );
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
              <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  id="first-name"
                  label={subscribe.fields.firstName.label}
                  required
                  placeholder={subscribe.fields.firstName.placeholder}
                  value={firstName}
                  autoComplete="given-name"
                  error={(touched.firstName || submitReached) && !firstNameValid ? subscribe.errors.firstName : undefined}
                  onBlur={() => setTouched((current) => ({ ...current, firstName: true }))}
                  onChange={(value) => {
                    setFirstName(value);
                    setConfirmed(false);
                  }}
                />
                <Field
                  id="last-name"
                  label={subscribe.fields.lastName.label}
                  required
                  placeholder={subscribe.fields.lastName.placeholder}
                  value={lastName}
                  autoComplete="family-name"
                  error={(touched.lastName || submitReached) && !lastNameValid ? subscribe.errors.lastName : undefined}
                  onBlur={() => setTouched((current) => ({ ...current, lastName: true }))}
                  onChange={(value) => {
                    setLastName(value);
                    setConfirmed(false);
                  }}
                />
                <Field
                  id="email"
                  label={subscribe.fields.email.label}
                  required
                  placeholder={subscribe.fields.email.placeholder}
                  value={email}
                  type="email"
                  autoComplete="email"
                  error={
                    touched.email || submitReached
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
                  id="confirm-email"
                  label={subscribe.fields.confirmEmail.label}
                  required
                  placeholder={subscribe.fields.confirmEmail.placeholder}
                  value={confirmEmail}
                  type="email"
                  autoComplete="email"
                  error={(touched.confirmEmail || submitReached) && !emailsMatch ? subscribe.errors.emailMatch : undefined}
                  onBlur={() => setTouched((current) => ({ ...current, confirmEmail: true }))}
                  onChange={(value) => {
                    setConfirmEmail(value);
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
              <fieldset
                className="flex flex-col gap-3"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setProductsTouched(true);
                  }
                }}
              >
                <legend className="sr-only">{subscribe.productsLegend}</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {navigation.solutions.map((item) => (
                  <label key={item.href} className="flex min-h-11 items-center gap-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      name="products"
                      value={item.href}
                      checked={Boolean(products[item.href])}
                      onChange={(event) => {
                        setProducts((current) => ({ ...current, [item.href]: event.target.checked }));
                        setProductsTouched(true);
                        setConfirmed(false);
                      }}
                      className="size-5 shrink-0 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    {item.label}
                  </label>
                ))}
                </div>
                <PriceSummary lines={selectedProducts} />
                {showProductError ? (
                  <p className={alertErrorClassName} role="alert">
                    {subscribe.productsRequired}
                  </p>
                ) : null}
              </fieldset>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={readDisclaimer}
                  className="w-fit text-left text-sm font-semibold text-primary underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-expanded={disclaimerOpen}
                  aria-controls="disclaimer-panel"
                >
                  {subscribe.readDisclaimer}
                </button>
                {disclaimerOpen ? (
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div
                        className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={readPercent}
                        aria-label="Disclaimer read progress"
                      >
                        <div className="h-full rounded-full bg-primary" style={{ width: `${readPercent}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{readPercent}% read</span>
                    </div>
                    <div className="relative">
                      <div
                        id="disclaimer-panel"
                        ref={disclaimerRef}
                        tabIndex={0}
                        onScroll={onDisclaimerScroll}
                        className="max-h-96 overflow-y-auto rounded-xl border border-border bg-slate-50 p-4 pb-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        aria-label="Queta Disclaimer"
                      >
                        <QuetaDisclaimerSections />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl border-t border-border bg-gradient-to-t from-slate-50 via-slate-50 to-transparent px-4 py-2">
                        {scrolledToEnd ? (
                          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700" role="status">
                            <CircleCheck size={16} aria-hidden />
                            {subscribe.reachedEnd}
                          </p>
                        ) : (
                          <p id="disclaimer-scroll-hint" className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                            <ChevronDown size={16} aria-hidden />
                            {subscribe.scrollHint}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="flex gap-4">
                  <Choice
                    name="disclaimer"
                    label={subscribe.accept}
                    checked={disclaimerChoice === "accept"}
                    disabled={!scrolledToEnd}
                    describedBy={disclaimerOpen && !scrolledToEnd ? "disclaimer-scroll-hint" : undefined}
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
                {showDisclaimerError ? (
                  <p className={`${alertErrorClassName} bg-red-50 border border-red-200 rounded-xl px-4 py-3`} role="alert">
                    {disclaimerChoice === "decline" ? subscribe.disclaimerDeclined : subscribe.disclaimerNeeded}
                  </p>
                ) : null}
              </div>

              {sendError ? (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                  {subscribe.sendErrorLead}
                  <a href={`mailto:${subscribe.sendErrorEmail}`} className="underline">
                    {subscribe.sendErrorEmail}
                  </a>
                  {subscribe.sendErrorTail}
                </p>
              ) : null}

              <div className="flex flex-col items-center gap-2">
                <button
                  type="submit"
                  disabled={sending}
                  aria-disabled={!canSubscribe || sending}
                  aria-describedby={canSubscribe ? undefined : "subscribe-still-needed"}
                  onFocus={() => setSubmitReached(true)}
                  className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:shadow-xl subscribe-submit animate-glow-pulse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${!canSubscribe || sending ? "cursor-not-allowed opacity-60 hover:shadow-lg" : ""}`}
                >
                  {sending ? subscribe.sendingLabel : subscribe.submitLabel}
                  <ArrowRight size={18} className="transition-transform motion-safe:group-hover:translate-x-1" />
                </button>
                {canSubscribe ? null : (
                  <p id="subscribe-still-needed" className="text-center text-sm text-muted-foreground">
                    {subscribe.stillNeeded} {missingRequirements.join(", ")}.
                  </p>
                )}
              </div>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function PriceSummary({
  lines,
}: {
  lines: readonly { label: string; firstYearCents: number; renewalCents: number }[];
}) {
  const firstYearCents = lines.reduce((sum, line) => sum + line.firstYearCents, 0);
  const renewalCents = lines.reduce((sum, line) => sum + line.renewalCents, 0);

  return (
    <div className="@container mt-1 rounded-xl border border-border bg-slate-50 px-4 py-3" aria-live="polite" aria-atomic="true">
      {lines.length === 0 ? (
        <p className="text-sm text-muted-foreground">{subscribe.priceHint}</p>
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {lines.map((line) => (
              <li
                key={line.label}
                className="flex flex-col gap-0.5 text-sm @min-[27rem]:flex-row @min-[27rem]:items-baseline @min-[27rem]:justify-between @min-[27rem]:gap-4"
              >
                <span className="font-medium text-foreground">{line.label}</span>
                <span className="min-w-0 text-right tabular-nums text-muted-foreground">
                  <span className="font-semibold text-foreground">{formatUsdFromCents(line.firstYearCents)}</span>
                  {` ${subscribe.priceLineThen} `}
                  <span className="font-semibold text-foreground">{formatUsdFromCents(line.renewalCents)}</span>
                  {subscribe.pricePerYear}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-border pt-3">
            <p className="flex items-baseline justify-between gap-4 text-sm font-semibold text-foreground">
              <span>{subscribe.priceFirstYear}</span>
              <span className="tabular-nums">{formatUsdFromCents(firstYearCents)}</span>
            </p>
            <p className="mt-1 flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
              <span>{subscribe.priceAfter}</span>
              <span className="tabular-nums font-semibold text-foreground">
                {formatUsdFromCents(renewalCents)}
                {subscribe.pricePerYear}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  required = false,
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
  required?: boolean;
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
        {required ? <span className="text-red-700" aria-hidden> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      />
      {error ? (
        <p id={`${id}-error`} className={fieldErrorClassName}>
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
  describedBy,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  describedBy?: string;
  onChange: () => void;
}) {
  return (
    <label className={`flex items-center gap-2 text-sm text-foreground ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
      <input
        type="checkbox"
        name={`${name}-${label}`}
        checked={checked}
        disabled={disabled}
        aria-describedby={describedBy}
        onChange={onChange}
        className="size-4 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed"
      />
      {label}
    </label>
  );
}
