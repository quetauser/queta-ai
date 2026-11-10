import { NextResponse } from "next/server";
import { navigation } from "@/content/site-content";
import { SUBSCRIBE_FORM_SUBMIT_AJAX_URL, postFormSubmit } from "@/lib/contact-form";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const productLabels = new Map<string, string>(navigation.solutions.map((item) => [item.href, item.label]));

type SubscribeBody = {
  honey?: unknown;
  products?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  accepted?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SubscribeBody | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (String(body.honey ?? "").trim()) {
    return NextResponse.json({ error: "Unable to send your request." }, { status: 400 });
  }

  const products = Array.isArray(body.products) ? body.products.filter((item): item is string => typeof item === "string") : [];
  const selected = products.filter((href) => productLabels.has(href));
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (selected.length === 0 || !firstName || !lastName || !EMAIL_PATTERN.test(email) || body.accepted !== true) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  const acceptedAtUtc = new Date().toISOString();
  try {
    await postFormSubmit(SUBSCRIBE_FORM_SUBMIT_AJAX_URL, {
      _subject: "New Queta AI subscription",
      _captcha: false,
      _honey: "",
      _template: "table",
      _replyto: email,
      products: selected.map((href) => productLabels.get(href) ?? href).join(", "),
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || "Not provided",
      acknowledgment:
        "The subscriber confirmed they read and accepted the Terms of Use, Privacy Policy, End User License Agreement, and AI and Legal Disclosure.",
      accepted_at_utc: acceptedAtUtc,
    });
  } catch {
    return NextResponse.json({ error: "Unable to send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
