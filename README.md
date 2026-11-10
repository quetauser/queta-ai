# Queta AI site replica

Faithful marketing-site replica of [queta.ai](https://www.queta.ai/) built with Next.js App Router, TypeScript, and Tailwind CSS.

## Commands

- `npm run dev` — local dev server on port 3000
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run build` — production build
- `npm run verify` — full verification harness (see `.cursor/skills/verify-queta-site/`)

## Content

All marketing copy lives in `src/content/site-content.ts`.

## Node

Use Node.js 24.x (see `package.json` engines and CI).

## PayPal setup

The pricing cards use PayPal’s JavaScript SDK Subscribe buttons. No server or secret is required. The public client ID and the three plan IDs come from environment variables. Do not commit those values.

Set these in the Vercel project (Settings → Environment Variables), first for the sandbox, then replace them with the live values after a test purchase:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Sandbox app client ID, later the live app client ID |
| `NEXT_PUBLIC_PAYPAL_PLAN_LIFESTYLE` | Lifestyle plan ID |
| `NEXT_PUBLIC_PAYPAL_PLAN_TRADER` | Trader plan ID |
| `NEXT_PUBLIC_PAYPAL_PLAN_REALTOR` | Realtor plan ID |

Until a card’s client ID or plan ID is missing, that card shows a disabled gold “PayPal — Subscribe” placeholder.

### Sandbox plans

1. Open the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox) and copy the sandbox app’s Client ID into `NEXT_PUBLIC_PAYPAL_CLIENT_ID`. Use the client ID only, not the secret.
2. In the sandbox business account, create one product for Queta subscriptions, then three yearly plans. Each plan needs two billing cycles:
   - Cycle 1, trial, once: the launch price for one year.
   - Cycle 2, regular, ongoing (`total_cycles` 0): the renewal price every year.
3. Create the plans in USD:

| Plan | First year (trial) | Each year after |
| --- | --- | --- |
| Lifestyle | $279 | $399 |
| Trader | $449 | $549 |
| Realtor | $569 | $669 |

4. Copy each plan ID (`P-...`) into the matching `NEXT_PUBLIC_PAYPAL_PLAN_*` variable.
5. Redeploy. The Subscribe buttons replace the placeholders. A sandbox buyer account can approve a subscription; the card then shows the confirmation and the subscription ID.

The launch price is the first year for anyone who subscribes to these plans. After the offer ends (signups through Nov 30, 2026), create replacement plans at the regular yearly price only and update the three plan variables so new subscribers are not still charged the launch price.

### Live

Create the same product and three plans on the live PayPal account, create or open a live app, and replace the four variables with the live client ID and live plan IDs. Redeploy production after that change.
