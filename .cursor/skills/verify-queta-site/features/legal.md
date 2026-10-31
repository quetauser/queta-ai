# Legal

Terms of Use, AI and Legal Disclosure, and End User License Policy.

## Sub-features

- `legal-terms` — `/terms-of-use`
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
- There is no privacy policy route. The words Privacy Policy stay plain text.
- Copy lives in `src/content/site-content.ts`.
