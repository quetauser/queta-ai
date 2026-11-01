# Pricing

Pricing tiers and founder story band.

## Sub-features

- `pricing-tiers` — Lifestyle User at $399 with the label "all agents", Trader, and Realtor
- `pricing-why` — dark band with stats

## How to get to it (user POV)

- Header link **Pricing**
- `/pricing`

## Driving it with Playwright

Preconditions:

- Replica server on port 3000.

Steps:

- Go to `/pricing`
- Expect HTTP 200
- Compare `replica-pricing-*.png` to `original-pricing-*.png`

## Gotchas

- **Get Started** links route to `/contact` with a prefilled `interest` query for each tier.
