# HANDOFF — Mahbod Tavassoli Portfolio

> One-stop context for picking the project up in a new Claude Code session.
> Read this first, then proceed with the user's next ask.

---

## 1 · TL;DR

Personal portfolio for **Mahbod Tavassoli** — Tehran-based Visual Artist
& AI Creative (VFX, Video Mapping, AI Visual Production, Motion, Live
Visual). The site is a **single-page React app** with three real routes
(`/`, `/work`, `/work/:slug`) inside an editorial dark theme (with a
working light-theme toggle).

The design language is called **"Studio Floor"** — raw, brutalist, sharp
corners, intentional whitespace, reactor-orange (`#FF5500`) as the only
saturated accent at ≤10% of any frame.

---

## 2 · Locations

| Thing                  | Path |
|------------------------|------|
| Portfolio app          | `C:\Users\Home\Desktop\porjects\portfolio` |
| Remotion teaser project | `C:\Users\Home\Desktop\porjects\teaser-renderer` |
| Raw source clips (NOT in repo) | `C:\Users\Home\Desktop\porjects\media` |
| Live dev               | `http://localhost:5173` |

```bash
cd portfolio
npm run dev    # vite
npx tsc --noEmit   # typecheck
npx vite build      # production verify
```

---

## 3 · Stack

- **Vite 8** + **React 18** + **TypeScript** (strict)
- **react-router-dom** v6 (BrowserRouter, 3 routes)
- **framer-motion** v11 (all animation)
- **lenis** (smooth scroll, owns the scroll position)
- **CSS Modules** (`*.module.css`) — no Tailwind, no CSS-in-JS
- **OKLCH** color tokens (light/dark via `[data-theme]`)
- **No backend** — fully static, ready for Vercel/Netlify

Sibling Remotion project for teasers:
- **Remotion 4** + **@remotion/google-fonts** (Syne + JetBrains Mono)
- Renders 1080×1080 / 7s teasers using system Chrome
- ffmpeg-pre-processed source clips in `teaser-renderer/public/sources/`

---

## 4 · Design system

The source of truth lives in two files at the project root:

- **`PRODUCT.md`** — register (brand), users, voice, principles, anti-references
- **`DESIGN.md`** — color tokens, typography scale, motion curves, anti-bans

### Hard rules

- **Single accent**: reactor orange `#FF5500` (`var(--reactor)`) only
- **No pure black / pure white** — `var(--pitch)` (8% L) / `var(--linen)` (94% L)
- **No `border-radius`** above ~4px (one exception: cursor + theme toggle)
- **No gradients** except very subtle radial spotlights inside cards
- **No glassmorphism** except the cursor and Nav (intentional liquid-glass)
- **No em dashes (—)** anywhere in copy (impeccable's hard ban)
- **No `&&` for JSX conditionals** — use ternary
- Typography: **Syne 800** (display), **DM Sans 300-500** (body), **JetBrains Mono** (labels)

### Color tokens (OKLCH)

Defined in `src/index.css` with light-mode overrides:

```
--pitch   --char    --lead    --iron    --concrete
--bone    --chalk   --paper   --linen   --reactor
--border-faint / -soft / -strong
--wash-soft / -strong
```

In light theme the L% flips so `var(--pitch)` becomes "page surface"
in both modes. Borders/washes flip from white-on-dark to black-on-light.

---

## 5 · File map

```
portfolio/
├─ PRODUCT.md, DESIGN.md, HANDOFF.md (this file)
├─ scripts/
│   └─ build-case-videos.sh        # regenerates 30s case-study video.mp4 per project
├─ public/
│   ├─ mt-logo.png                  # extracted from old artemis site
│   ├─ work/
│   │   ├─ <slug>/
│   │   │   ├─ preview.mp4          # 7s teaser, 1080² — card hover
│   │   │   ├─ video.mp4            # 30s case-study, 1920×1080 with audio
│   │   │   └─ poster.jpg
│   │   └─ horizon.mp4              # final frame at end of Work scroll
│   └─ scenes/                       # ScrollChapters assets (user-authored, pending)
├─ src/
│   ├─ index.css                     # tokens, cursor, grain, reset
│   ├─ main.tsx                      # BrowserRouter + ScrollToTopOnNavigate
│   ├─ App.tsx                       # home: composes 13 sections
│   ├─ data/projects.ts              # ★ single source of truth for projects
│   ├─ hooks/
│   │   ├─ useSmoothScroll.ts        # Lenis init + scroll progress
│   │   ├─ useMouseInteraction.ts    # cursor ref + hover state + mouse XY
│   │   └─ useTheme.ts               # dark/light, localStorage
│   ├─ routes/
│   │   ├─ CaseStudy.tsx             # /work/:slug
│   │   └─ WorkIndex.tsx             # /work (grid + category filter)
│   └─ components/
│       ├─ Nav.tsx                   # backdrop-blur liquid-glass, route-aware
│       ├─ Hero.tsx                  # title card, scanlines, no 3D
│       ├─ Manifesto.tsx             # scroll-driven word colour-in
│       ├─ Numbers.tsx               # counter animations
│       ├─ ScrollChapters.tsx        # stacked sticky scenes
│       ├─ SceneStage.tsx            # generic scene (image/video/GLB)
│       ├─ Process.tsx               # sticky-pin "how I work" + diagram
│       ├─ ProcessDiagram.tsx        # SVG node-wire animation
│       ├─ Disciplines.tsx           # 6 skill cards with 3D tilt
│       ├─ Marquee.tsx               # dual opposing typographic strips
│       ├─ Work.tsx                  # horizontal scroll, 4 featured
│       ├─ Collaborations.tsx        # client grid
│       ├─ NowPlaying.tsx            # current project widget
│       ├─ About.tsx                 # dossier + narrative + timeline
│       ├─ Contact.tsx               # CTA + email/phone/studio
│       ├─ Footer.tsx                # wordmark + clock + 4 link cols
│       ├─ BackToTop.tsx             # fixed bottom-right scroll-drawn brackets
│       ├─ IntroLoader.tsx           # session-gated first-paint veil
│       ├─ ThemeToggle.tsx           # sun/moon button in nav
│       ├─ ScrollToTopOnNavigate.tsx # resets scroll on route change
│       ├─ SplitText.tsx             # per-char reveal (word-safe wrapping)
│       ├─ CTAButton.tsx             # magnetic pull + fill-on-hover
│       ├─ HorizonMedia.tsx          # img/video/gif auto-detection
│       └─ InlinePill.tsx            # (unused for now, kept as primitive)

teaser-renderer/                     # SIBLING project
├─ package.json, remotion.config.ts, tsconfig.json
├─ render-all.mjs                    # batch-renders all teasers → portfolio/public/work/*/preview.mp4
└─ src/
    ├─ index.tsx, Root.tsx           # registers one Composition per project
    ├─ Teaser.tsx                    # the brutalist 7s composition
    └─ projects.ts                   # mirror of portfolio's projects (subset)
```

---

## 6 · Projects data (`data/projects.ts`)

11 projects. **4 marked `featured: true`** appear on home; **all 11** appear on `/work`.

```
01  Alireza Ghorbani (featured)        — Architectural Mapping  2025  [video pending]
02  Oliver Twist (featured)            — AI Teaser + Stage Map.   2025
03  My Baby                            — Architectural Mapping    2025
04  Tehran Univ. of Art (featured)     — Video Mapping · Workshop 2024
05  Music Video VFX (featured)         — Greenscreen · CGI · AI   2024
06  Esteghlal                          — Architectural Mapping    2025
07  Tigard                             — Video Mapping             2025
08  U Bank                             — VFX & Compositing         2025
09  CGI Carkook                        — CGI · VFX                 2025
10  Serkan Filter                      — Ad Roll · Compositing     2025
11  Fashion Documentary                — Editing · Title Design    2024
```

Each project has `slug, featured?, id, title, caseStudyTitle, client, category,
year, description, longDescription, accent, tags`.

Helper: `getProject(slug)` and `FEATURED_PROJECTS` exported.

---

## 7 · Site structure / scroll narrative

Home `/` (App.tsx) composes 13 sections in this exact order:

```
1.  Hero            — title card. SETS register.
2.  Manifesto       — "Made in Tehran." scroll-colour-in words.
3.  Numbers         — 10+ YEARS · 50+ PROJECTS · 14 CLIENTS · 6 DISCIPLINES.
4.  ScrollChapters  — 4 cinematic placeholder scenes (user-authored assets).
5.  Process         — sticky-pin "how I work" + animated SVG diagram.
6.  Disciplines     — 6 skill cards (3D tilt + cursor spotlight).
7.  Marquee         — dual opposing typographic strips.
8.  Work            — 4 featured + endcap link to /work index.
9.  Collaborations  — 14-brand grid (auto-fill).
10. NowPlaying      — current project widget (manually updated).
11. About           — dossier (passport-style) + narrative + 6-step timeline.
12. Contact         — "Let's make / something / real." CTA + email.
13. Footer          — "BUILT IN TEHRAN" wordmark + live Tehran clock + 4 link cols.
```

---

## 8 · Conventions

### CSS

- All borders use `var(--border-faint|soft|strong)` — never raw oklch.
- All surfaces use `var(--pitch|char|lead|...|linen)` — never raw oklch.
- Transitions: **`cubic-bezier(0.32, 0.72, 0, 1)`** (Apple spring) for major,
  **`var(--ease-out-expo)`** for everything else. No `linear` / `ease-in-out`.
- Animate only `transform` and `opacity`. Never width/height/top/left.

### React

- Single mousemove listener (`useMouseInteraction`) — never add another global one.
- Use refs for transient/frequent values (tilt, parallax) — not state.
- `passive: true` on all global event listeners.
- `content-visibility: auto` + `contain-intrinsic-size` on long sections.
- Conditional rendering: `cond ? <X /> : null`, never `cond && <X />`.

### Naming

- Routes live in `src/routes/`, regular components in `src/components/`.
- Hooks in `src/hooks/`, all start with `use`.
- One project = one folder under `public/work/<slug>/` containing exactly 3 files.

---

## 9 · Media pipeline

### Card hover loop (preview.mp4)

7s, 1080×1080 square, Remotion-rendered, no audio, no big text overlays.
Composition is `teaser-renderer/src/Teaser.tsx` — just the source full-bleed
with a small `/NN` number top-left + `● MT · ARTEMIS` bottom-right.

To re-render all teasers:
```bash
cd teaser-renderer
node render-all.mjs   # writes to ../portfolio/public/work/*/preview.mp4
```

To re-render one project:
```bash
npx remotion render teaser-<slug> "../portfolio/public/work/<slug>/preview.mp4" \
  --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Sources for Remotion come from `teaser-renderer/public/sources/<slug>.mp4` —
each is an 8s clip built by `ffmpeg` from 3 non-contiguous segments of the
raw source (jump-cut compilation).

### Case study video (video.mp4)

30s, 1920×1080, with audio, built by `scripts/build-case-videos.sh` (uses
ffmpeg). Picks one continuous 30s slice from the strongest part of each
source. Run:

```bash
bash portfolio/scripts/build-case-videos.sh
```

---

## 10 · Theme system

Toggle in nav top-right. Defaults to user's `prefers-color-scheme`.
Persisted in `localStorage` as `mt-theme = 'dark' | 'light'`.

Mechanism: `[data-theme="light"]` on `<html>` swaps the lightness scale
of every OKLCH token. Borders flip from white-translucent to black-
translucent via separate `--border-*` tokens that also redefine.

If you add a new component, **use semantic tokens** (`var(--pitch)`,
`var(--border-soft)`, etc.) — never raw `oklch(...)` in component CSS.

---

## 11 · Cursor

- IDLE: northwest-pointing arrow, hairline reactor stroke,
  backdrop-filter glass (no own colour, see through to page).
- HOVER: SAME arrow (intentionally — user disabled the disc swap).
- LABEL: REMOVED. No text on cursor anywhere.
- Driver: `useMouseInteraction` (one global passive mousemove).

Touched in: `src/index.css` (`.cursor`, `.cursor-arrow-glass`,
`.cursor-arrow-outline`, `.cursor-disc`) + `src/App.tsx` (JSX shell).

---

## 12 · Skills used (impeccable etc.)

Loaded during this build (some context retained):

- **impeccable** — PRODUCT.md + DESIGN.md system, design critique
- **ui-ux-pro-max** — UX patterns, animation guidance
- **high-end-visual-design** — premium aesthetic rules
- **gpt-taste** — Awwwards-level brutalist rules (banned fonts, layouts)
- **vercel-react-best-practices** — perf (passive listeners, content-visibility)
- **vercel-composition-patterns** — architecture (no boolean prop proliferation)
- **seo-audit** — recommendations not all applied yet (see Open work)
- **copywriting** — voice tuning
- **remotion** + **remotion-official** — teaser pipeline
- **webapp-testing** — mentioned, not invoked
- **frontend-design**, **design-taste-frontend** — initial design pass

PRODUCT.md sets register = **brand** (design IS the product, portfolio).
Personality: experimental · weird · fearless. Anti-refs: SaaS-cream,
generic portfolio grids, AI-hype copy.

---

## 13 · Open / pending work

### High priority

- **Alireza Ghorbani video**: user has files elsewhere. When provided:
  drop source mp4 anywhere; run a `multi` ffmpeg extract (see
  `teaser-renderer/public/sources` for pattern); run
  `npx remotion render teaser-alireza-ghorbani ...preview.mp4`; run
  `scripts/build-case-videos.sh` (add a `make_case_video` line for it).

### Recommended but not blocking

- **SEO meta tags** (from seo-audit findings, not yet applied):
  - Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
  - Twitter cards
  - Canonical URL
  - JSON-LD Person schema (Mahbod, occupation, sameAs)
  - `robots.txt` + `sitemap.xml` in `public/`
  - Favicon set (currently just MT logo)
- **ScrollChapters assets**: 4 chapters still render as `placeholder`.
  When user makes AI / Blender scenes, swap `type: 'placeholder'` →
  `type: 'image' | 'video' | 'model3d'` in App.tsx's `chapters` array
  and drop assets in `public/scenes/`.
- **Light-mode polish pass**: borders done, but some shadows/effects
  may still feel dark-tuned in light mode.

### Optional

- Playwright smoke test (decided "yes" earlier, not built yet)
- Component split: Footer could be 3 subcomponents
- Inline typography pill — tried and removed (user didn't love any of
  4 placements). Component `InlinePill.tsx` still exists if needed.

---

## 14 · User preferences (important!)

- **Persian conversation** by default (mixed Persian/English is fine).
- Keep technical terms in `[brackets]` like `[API]`, `[WebSocket]` —
  improves Persian readability.
- **Concise** explanations preferred. No long preambles.
- Show file paths with line numbers when discussing code.
- When unsure between two approaches, **present both briefly and ask**.
- User **dismisses dropdown questions** sometimes — that means "wait,
  I'll come back with my own answer" — do NOT proceed with a default.
- User commits work themselves — DO NOT push to remote without explicit
  ask. **No git remote configured.**
- Cursor should ALWAYS be the arrow (no disc on hover).
- No big text overlays on preview videos.
- No quick text flashes — generous timing.

---

## 15 · Important decisions log

| # | Decision | Why |
|---|----------|-----|
| 1 | Killed initial generic 3D blob | User: "doesn't represent me" |
| 2 | "Studio Floor" design language | impeccable shape interview |
| 3 | Reactor #FF5500 (not #FF3D00) | Matches user's prior artemis site |
| 4 | Syne + DM Sans (not Anton + Schibsted) | User found Anton pixelated; Syne is from old site |
| 5 | Liquid-glass cursor, no text labels | User said "no labels like READ" |
| 6 | Single H1 per page | SEO + a11y |
| 7 | Lazy-load R3F NOT applied | User declined |
| 8 | 4 featured + /work index split | "too many cards in home scroll" |
| 9 | preview.mp4 / video.mp4 split | User: "card hover is just teaser, full video on click" |
| 10 | No big text on teasers | User: "too many quick cuts, can't see project" |
| 11 | Multi-segment source teasers | User: "use the interesting parts" |
| 12 | Cards 1:1 everywhere | User: "home is square, /work should be too" |
| 13 | Years bumped +1 (2024→2025) | User correction |
| 14 | ScrollToTopOnNavigate | User: "page starts at bottom on nav" |

---

## 16 · Quick continuation prompts

When the user is back, common asks:

- **"Add Ghorbani video"** → see "High priority" above
- **"Tighten X timing"** → adjust frame counts in relevant component
- **"Light mode looks wrong on Y"** → check Y's CSS for raw oklch borders/surfaces
- **"Add a new project"** → push entry to `data/projects.ts` + create `public/work/<slug>/` + produce 3 media files
- **"New section after Y"** → add component, import in App.tsx, place in narrative order
- **"Re-render teasers"** → `cd teaser-renderer && node render-all.mjs`

---

## 17 · Git state

Repo at portfolio root. ~20 commits. No remote. Branch: `master`.

Latest landmarks:
- `cc1af45` work: home shows 4 featured, /work index shows full 11 archive
- `2f63754` media: integrate work videos + horizon + cursor stays arrow
- `12d5614` work: split files (preview.mp4 / video.mp4) + scroll-to-top + years +1
- `f9220bf` cards: 1:1 square visual everywhere

Use `git log --oneline -20` to see full history.

---

## 18 · One-line summary

**An Awwwards-level personal portfolio for a Tehran VFX/AI artist, built in
Vite + React with a hand-tuned "Studio Floor" design system, dark/light theme
toggle, custom liquid-glass arrow cursor, per-project Remotion-rendered 7s
brutalist teasers on card hover, 30s case-study pages at `/work/:slug`, and
a full archive at `/work`. ~11 projects. Lots of intentional polish. One
real pending asset (Alireza Ghorbani video).**
