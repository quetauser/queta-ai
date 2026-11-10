"use client";

import { FormEvent, useState } from "react";
import { legalDocuments, navigation, subscribe } from "@/content/site-content";
import type { LegalDocument } from "@/content/site-content";
import { LegalDocumentBody } from "@/components/pages/LegalDocumentView";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PolicyChoice = "accept" | "decline" | null;

const initialChoices = Object.fromEntries(
  legalDocuments.map((document) => [document.href, null]),
) as Record<LegalDocument["href"], PolicyChoice>;

export function SubscribeForm() {
  const [products, setProducts] = useState<Record<string, boolean>>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [choices, setChoices] = useState(initialChoices);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);

  const productSelected = navigation.solutions.some((item) => products[item.href]);
  const firstNameValid = firstName.trim().length > 0;
  const lastNameValid = lastName.trim().length > 0;
  const emailValid = EMAIL_PATTERN.test(email.trim());
  const policiesAccepted = legalDocuments.every((document) => choices[document.href] === "accept");
  const canSubscribe = productSelected && firstNameValid && lastNameValid && emailValid && policiesAccepted;

  const declined = legalDocuments.filter((document) => choices[document.href] === "decline");
  const unanswered = legalDocuments.filter((document) => choices[document.href] === null);

  function choose(href: LegalDocument["href"], choice: Exclude<PolicyChoice, null>) {
    setChoices((current) => ({
      ...current,
      [href]: current[href] === choice ? null : choice,
    }));
    setConfirmed(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubscribe) {
      return;
    }
    // TODO: The subscribe action will be defined later. This does not submit to a backend or send email.
    setConfirmed(true);
  }

  return (
    <>
      <section className="overflow-visible pt-28 pb-12 bg-gradient-to-br from-violet-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="overflow-visible font-heading font-bold text-foreground mb-6 py-2 leading-normal text-2xl sm:text-3xl lg:text-4xl">
            {subscribe.heading}
          </h1>
        </div>
      </section>
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-border shadow-xl shadow-violet-100 p-8 md:p-10">
            <form className="flex flex-col gap-8" onSubmit={onSubmit} noValidate>
              <fieldset className="flex flex-col gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

              <fieldset className="flex flex-col gap-4">
                <legend className="text-sm font-semibold text-foreground">{subscribe.policiesLegend}</legend>
                {legalDocuments.map((document) => (
                  <div key={document.href} className="rounded-2xl border border-border">
                    <details>
                      <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                        {document.navLabel}
                      </summary>
                      <div className="px-4 pb-4">
                        <div className="max-h-64 overflow-y-auto rounded-xl border border-border bg-slate-50 p-4">
                          <LegalDocumentBody document={document} />
                        </div>
                      </div>
                    </details>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
                      <a
                        href={document.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary underline"
                      >
                        {subscribe.openFullPage}
                      </a>
                      <div className="flex gap-4">
                        <Choice
                          name={document.href}
                          label={subscribe.accept}
                          checked={choices[document.href] === "accept"}
                          onChange={() => choose(document.href, "accept")}
                        />
                        <Choice
                          name={document.href}
                          label={subscribe.decline}
                          checked={choices[document.href] === "decline"}
                          onChange={() => choose(document.href, "decline")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {policiesAccepted ? null : (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                    {subscribe.policyNeeded}{" "}
                    {declined.length > 0 ? `${subscribe.declinedLead} ${declined.map((document) => document.navLabel).join(", ")}.` : null}{" "}
                    {unanswered.length > 0
                      ? `${subscribe.unansweredLead} ${unanswered.map((document) => document.navLabel).join(", ")}.`
                      : null}
                  </p>
                )}
              </fieldset>

              {confirmed ? (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3" role="status">
                  {subscribe.confirmation}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={!canSubscribe}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {subscribe.submitLabel}
              </button>
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
        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" name={`${name}-${label}`} checked={checked} onChange={onChange} className="size-4 accent-primary" />
      {label}
    </label>
  );
}
