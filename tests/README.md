# Tests

A single Playwright smoke test that loads the site, asserts critical landmarks,
fails on console errors, and captures full-page screenshots at desktop / tablet
/ mobile.

## Setup (once)

```bash
pip install playwright
playwright install chromium
```

## Run

```bash
# If Vite isn't running, use the bundled helper which boots it for you:
python ../../.claude/skills/webapp-testing/scripts/with_server.py \
  --server "npm run dev" --port 5173 -- python tests/smoke.py

# If Vite is already running:
python tests/smoke.py
```

Screenshots are written to `tests/screenshots/{desktop,tablet,mobile}.png`.

Exit code 0 = pass. Non-zero = at least one assertion failed.
