export const FORM_SUBMIT_AJAX_URL = "https://formsubmit.co/ajax/info@queta.ai";

export const FEEDBACK_FORM_SUBMIT_AJAX_URL = "https://formsubmit.co/ajax/sushant@queta.ai";

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

  if (!response.ok) {
    throw new Error(`FormSubmit responded with ${response.status}`);
  }

  const data: unknown = await response.json().catch(() => null);
  if (data && typeof data === "object" && "success" in data && data.success === false) {
    throw new Error("FormSubmit reported failure");
  }
}

export async function submitContactForm(payload: FormSubmitPayload): Promise<void> {
  await postFormSubmit(FORM_SUBMIT_AJAX_URL, payload);
}

export type FeedbackFields = {
  name: string;
  email: string;
  phone: string;
  comments: string;
};

export type FeedbackField = "name" | "email" | "comments";

export type FeedbackErrors = Partial<Record<FeedbackField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFeedback(
  fields: FeedbackFields,
  messages: { name: string; email: string; emailFormat: string; comments: string },
): FeedbackErrors {
  const errors: FeedbackErrors = {};
  if (!fields.name.trim()) {
    errors.name = messages.name;
  }
  if (!fields.email.trim()) {
    errors.email = messages.email;
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = messages.emailFormat;
  }
  if (!fields.comments.trim()) {
    errors.comments = messages.comments;
  }
  return errors;
}

export async function submitFeedbackForm(fields: FeedbackFields, honey: string): Promise<void> {
  await postFormSubmit(FEEDBACK_FORM_SUBMIT_AJAX_URL, {
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
    comments: fields.comments.trim(),
    _subject: "New Queta AI feedback",
    _captcha: false,
    _honey: honey,
  });
}
