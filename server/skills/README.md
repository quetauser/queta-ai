# Private product skills (server-only)

These JSON files are read exclusively by the skills API route handlers (`POST /api/skills/lifestyle`, `POST /api/skills/trader`). They are **not** under `public/` and must not be linked from client code.

## Updating a version

1. Download the current file from the public bot CDN (do not remove or change those URLs; legacy bots still fetch them):
   - Lifestyle: https://queta-files.vercel.app/qls-xyz.json
   - Trader: https://queta-files.vercel.app/qtd-xyz.json
2. Replace `qls.json` or `qtd.json` in this directory.
3. Confirm the top-level `name` field in the JSON matches the intended release.
4. Deploy; no app code changes are required unless routes or product codes change.

## Bundled versions

| File       | Product   | Source URL                          | Bundled `name` (check file) |
| ---------- | --------- | ----------------------------------- | --------------------------- |
| `qls.json` | lifestyle | `qls-xyz.json` on queta-files       | See `name` in file          |
| `qtd.json` | trader    | `qtd-xyz.json` on queta-files       | See `name` in file          |
