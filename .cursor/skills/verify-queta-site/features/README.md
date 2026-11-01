# Queta site verification map

Maintained source for user-visible routes on the Queta AI replica. Read this index before driving the app, then open the matching feature file.

## Baseline preconditions

- Run from repo root on branch under test.
- `npm install` and `npx playwright install chromium` completed.
- Port 3005 free before `npm run verify` unless `VERIFY_BASE_URL` points elsewhere (the script starts its own `next start`).
- Evidence survives cleanup under `verification-evidence/<runId>/`.

## Driving conventions

- Use `npm run verify` as the default full pass.
- Compare replica PNGs to original PNGs from the same run id.
- Treat any replica console error or broken image as failure.

## Features

- [Home](./home.md)
- [Pricing](./pricing.md)
- [About](./about.md)
- [Contact](./contact.md)
- [Solution pages](./solutions.md)
- [Legal](./legal.md)
