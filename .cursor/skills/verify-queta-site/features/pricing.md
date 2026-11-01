# Pricing

Pricing tiers and founder story band.

## Sub-features

- `pricing-tiers` — yearly launch price leads each card, with a violet note for the monthly equivalent
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
