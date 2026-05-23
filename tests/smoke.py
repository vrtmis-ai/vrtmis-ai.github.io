"""
Smoke test for the Mahbod Tavassoli portfolio.

Verifies:
  1.  Page loads without console errors.
  2.  Critical landmarks exist (nav, hero h1, work section, contact).
  3.  Screenshots at desktop + tablet + mobile for visual review.

Run via the bundled helper (it boots Vite, waits for the port, then runs us):
    python ../../.claude/skills/webapp-testing/scripts/with_server.py \
        --server "npm run dev" --port 5173 -- python tests/smoke.py

Or, if Vite is already running on :5173, just:
    python tests/smoke.py
"""
from playwright.sync_api import sync_playwright
import sys
import os

URL = "http://localhost:5173"

# Selectors that MUST exist for the build to be considered "alive"
LANDMARKS = [
    "nav",                # top navigation
    "h1",                 # the single hero h1
    "section#top",        # hero section
    "section#work",       # work section
    "section#contact",    # contact CTA
]

# Desktop + tablet + mobile viewports for screenshot review
VIEWPORTS = [
    ("desktop", 1440, 900),
    ("tablet",  1024, 768),
    ("mobile",  390,  844),
]

OUT_DIR = "tests/screenshots"


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for label, width, height in VIEWPORTS:
            ctx = browser.new_context(viewport={"width": width, "height": height})
            page = ctx.new_page()

            # Capture any console errors during load
            console_errors: list[str] = []
            page.on("console", lambda msg: console_errors.append(msg.text)
                    if msg.type == "error" else None)
            page.on("pageerror", lambda exc: console_errors.append(str(exc)))

            print(f"\n[{label} {width}x{height}] navigating ...")
            page.goto(URL, wait_until="networkidle", timeout=30_000)

            # Verify each landmark
            for selector in LANDMARKS:
                count = page.locator(selector).count()
                if count == 0:
                    errors.append(f"[{label}] missing landmark: {selector}")
                else:
                    print(f"  OK {selector} ({count} match)")

            # Single H1 check (SEO + a11y requirement)
            h1_count = page.locator("h1").count()
            if h1_count != 1:
                errors.append(f"[{label}] expected exactly 1 <h1>, found {h1_count}")
            else:
                print(f"  OK exactly 1 <h1>")

            # Console error check
            if console_errors:
                for err in console_errors:
                    errors.append(f"[{label}] console error: {err}")
            else:
                print(f"  OK no console errors")

            # Full-page screenshot
            screenshot_path = f"{OUT_DIR}/{label}.png"
            page.screenshot(path=screenshot_path, full_page=True)
            print(f"  OK screenshot -> {screenshot_path}")

            ctx.close()

        browser.close()

    print("\n" + "=" * 60)
    if errors:
        print(f"FAILED -- {len(errors)} issue(s):")
        for e in errors:
            print(f"  FAIL {e}")
        return 1
    else:
        print("PASSED -- all landmarks present, no console errors, all viewports OK")
        return 0


if __name__ == "__main__":
    sys.exit(main())
