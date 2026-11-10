export const FORM_SUBMIT_AJAX_URL = "https://formsubmit.co/ajax/info@queta.ai";

export const SUBSCRIBE_FORM_SUBMIT_AJAX_URL = "https://formsubmit.co/ajax/subscribe@queta.ai";

export const SUBSCRIBE_FORM_SUBMIT_URL = "https://formsubmit.co/subscribe@queta.ai";

export const CONTACT_EMAIL_SUBJECT_BASE = "New Queta AI contact";

const INTEREST_LABELS: Record<string, string> = {
  waitlist: "Waitlist",
  "get-started-lifestyle-user": "Get Started — Lifestyle User",
  "get-started-trader": "Get Started — Trader",
  "get-started-realtor": "Get Started — Realtor",
  "get-started-realtor-office-manager": "Get Started — Realtor",
};

export function contactPageHref(interest?: string): string {
  if (!interest) {
    return "/contact";
  }
  return `/contact?interest=${encodeURIComponent(interest)}`;
}

export function interestLabel(interest: string | null | undefined): string | null {
  if (!interest) {
    return null;
  }
  return INTEREST_LABELS[interest] ?? interest;
}

export function emailSubjectForInterest(interest: string | null | undefined): string {
  const label = interestLabel(interest);
  if (!label) {
    return CONTACT_EMAIL_SUBJECT_BASE;
  }
  return `${CONTACT_EMAIL_SUBJECT_BASE} — ${label}`;
}

export type FormSubmitPayload = {
  name: string;
  email: string;
  phone: string;
  comments: string;
  interest: string;
  _subject: string;
  _captcha: false;
  _honey: string;
};

function formSubmitReportedFailure(data: unknown): string | null {
  if (!data || typeof data !== "object" || !("success" in data)) {
    return null;
  }
  const success = data.success;
  if (success !== false && success !== "false") {
    return null;
  }
  if ("message" in data && typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }
  return "FormSubmit reported failure";
}

export async function postFormSubmit(
  url: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text().catch(() => "");
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }
  const reported = formSubmitReportedFailure(data);
  if (!response.ok) {
    throw new Error(reported ?? (text || `FormSubmit responded with ${response.status}`));
  }
  if (reported) {
    throw new Error(reported);
  }
}

export async function submitContactForm(payload: FormSubmitPayload): Promise<void> {
  await postFormSubmit(FORM_SUBMIT_AJAX_URL, payload);
}

