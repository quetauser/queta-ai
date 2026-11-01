# Contact

Contact hero and FormSubmit-backed demo request form.

## Sub-features

- `contact-form` — name, email, phone, interest, comments, submit via FormSubmit AJAX
- `contact-form-success` — inline confirmation after mocked or real POST
- `contact-form-error` — inline error when POST fails

## How to get to it (user POV)

- Header **Contact**, or **Request a Demo** on any page except Contact
- On `/contact` the header does not show **Request a Demo**
- Pricing **Get Started** or **Join the waitlist** (prefilled interest query)
- `/contact` and `/contact?interest=waitlist` (or other interest keys)

## Driving it with Playwright

Preconditions:

- Replica server on port 3000 (`npm run verify` starts it).

Steps:

- Mock `**/formsubmit.co/ajax/**` so no real email is sent.
- Success path: open `/contact?interest=waitlist`, fill required fields, submit, wait for `[data-testid="contact-form-status-success"]`. POST body must include `_captcha: false`, empty `_honey`, and `_subject` starting with `New Queta AI contact`.
- Error path: mock FormSubmit HTTP 500, submit on `/contact`, wait for `[data-testid="contact-form-status-error"]`.
- Screenshots: `contact-form-success.png` and `contact-form-error.png` in the verify evidence directory.

## Gotchas

- First real submission to FormSubmit triggers a one-time activation email to info@queta.ai that must be clicked.
- Verification always mocks the FormSubmit network call; never rely on live delivery in CI.
