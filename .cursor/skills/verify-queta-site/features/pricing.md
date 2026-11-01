# Pricing

Pricing tiers and founder story band.

## Sub-features

- `pricing-tiers` — monthly equivalents lead each card (Lifestyle $23.25/mo, Trader $37.42/mo, Realtor $47.42/mo), billed yearly at the first-year prices
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
