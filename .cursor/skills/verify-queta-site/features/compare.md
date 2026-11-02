# Compare

Monthly cost comparison of Queta Lifestyle agents and standalone apps. Replica only. Not linked from the header or footer.

## Sub-features

- `compare-table` — agent, comparable app, and monthly cost, with a total row
- `compare-callout` — Queta price called out under the table

## How to get to it (user POV)

- `/compare` directly. It is not in the nav.

## Driving it with Playwright

Preconditions:

- Replica server on port 3000.

Steps:

- Go to `/compare`
- Expect HTTP 200 on the replica only. Do not request this route from queta.ai.

## Gotchas

- Some app names are links that open in a new tab. Rows without a URL are plain text.
- Asterisks stay on the costs that include them. There is no footnote.
