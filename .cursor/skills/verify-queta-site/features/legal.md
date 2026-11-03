# Legal

Terms of Use, Privacy Policy, AI and Legal Disclosure, and End User License Policy.

## Sub-features

- `legal-terms` — `/terms-of-use`
- `legal-privacy` — `/privacy-policy`
- `legal-ai-disclosure` — `/ai-legal-disclosure`
- `legal-eula` — `/end-user-license-policy`
- `legal-header-menu` — desktop header Legal menu
- `legal-mobile-menu` — Legal links in the mobile menu
- `legal-footer` — footer Legal column

## How to get to it (user POV)

- Header **Legal** on a wide screen
- Mobile menu **Legal**
- Footer **Legal**
- `/terms-of-use`
- `/privacy-policy`
- `/ai-legal-disclosure`
- `/end-user-license-policy`

## Driving it with Playwright

- Open each legal route on the replica and expect HTTP 200.
- On a desktop viewport, open the header Legal menu and follow each link.
- On a mobile viewport, open the menu and follow each legal link. The menu closes on click.
- Follow each footer legal link.
- Do not compare these routes to https://www.queta.ai.

## Gotchas

- These pages are not on queta.ai. Drive them on the replica only.
- `/privacy-policy` is replica-only. The AI disclosure page links the words Privacy Policy to that route.
- Copy lives in `src/content/site-content.ts`.
