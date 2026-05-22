---
name: Mahbod Tavassoli — Visual Artist & AI Creative
description: A studio-floor portfolio. Workshop made visible.
colors:
  pitch: "#0c0a09"
  char: "#1c1814"
  lead: "#2c261f"
  iron: "#4e463c"
  concrete: "#766858"
  bone: "#a99a87"
  chalk: "#d6cbbb"
  paper: "#ece3d4"
  linen: "#f4ecdf"
  reactor: "#ff3d00"
  reactor-deep: "#cc3100"
typography:
  display:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "clamp(4rem, 15vw, 16rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "0.01em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.15em"
rounded:
  none: "0"
spacing:
  hair: "4px"
  micro: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.reactor}"
    textColor: "{colors.pitch}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.reactor-deep}"
    textColor: "{colors.linen}"
  button-ghost:
    backgroundColor: "{colors.pitch}"
    textColor: "{colors.linen}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.reactor}"
    textColor: "{colors.pitch}"
  card:
    backgroundColor: "{colors.pitch}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "32px 24px"
  card-hover:
    backgroundColor: "{colors.char}"
  input:
    backgroundColor: "{colors.pitch}"
    textColor: "{colors.linen}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
---

# Design System: Mahbod Tavassoli — Visual Artist & AI Creative

## 1. Overview

**Creative North Star: "The Studio Floor"**

A portfolio that reads as the workshop, not the showroom. The viewer is standing inside the studio at the hour after the work is finished and before it is cleaned up. Concrete underfoot. Cables. Ember of a soldering iron. A printed reference taped to the wall. The site has the temperature of a place where things are actually made, not a brochure printed about them.

What it explicitly rejects: clean SaaS landing surfaces (Linear, Stripe, Vercel marketing), luxury polished brand sites (serif headlines, gold accents, lifestyle photography), generic portfolio templates (Squarespace / Wix grids of identical tiles), and futuristic AI cliché (neon-on-black, decorative glitch, "the future is here" copy). Anything that could appear on a SaaS landing page or in a fashion-house lookbook is wrong.

The system is built around three commitments: warm-pitch dark (never neutral, never pure), one reactor-orange accent that earns every appearance, and **mechanical & weighted** component shapes — right-angled, heavy, made of one decisive material per surface. Components feel like instruments, not interface chrome.

**Key Characteristics:**
- Warm-pitch dark by default; tinted toward the reactor-orange hue.
- Single accent. The orange occupies <10% of any frame.
- Zero rounded corners. Hard edges only.
- Type does the heaviest lifting; the 3D scene is a peripheral accent, not the hero.
- Flat surfaces. No shadows. Depth comes from typographic weight and color blocks.
- Generous, irregular whitespace. Same gap everywhere would be a SaaS tell.

## 2. Colors: The Pitch & Ember Palette

A warm, soot-tinted darkness lit by a single combustion-orange. Every neutral pulls slightly toward the reactor hue so the surface never reads as cold lab black — it reads as the inside of a working studio at night.

### Primary

- **Reactor** (`#ff3d00` / `oklch(65% 0.22 30)`): The combustion color. Used on ≤10% of any given frame. Eyebrow labels, hovered links, the brand mark of accent ringing one moment per scroll. Never on a body of text. Never as a gradient. Never paired with another saturated hue.

### Neutral

- **Pitch** (`#0c0a09` / `oklch(8% 0.012 30)`): The site surface. Warm-tinted darkness. Read as the studio's ambient light, not a void.
- **Char** (`#1c1814` / `oklch(14% 0.013 30)`): The next layer up. Hover-surface for cards, marquee accent stripe.
- **Lead** (`#2c261f` / `oklch(20% 0.014 30)`): Dividers, hair-fine borders, the threshold between sections.
- **Iron** (`#4e463c` / `oklch(36% 0.015 30)`): Disabled, deeply muted body, secondary metadata.
- **Concrete** (`#766858` / `oklch(54% 0.014 30)`): Mono labels, footnotes, dates.
- **Bone** (`#a99a87` / `oklch(70% 0.013 30)`): Body copy on dark surfaces. Reads at 4.6:1 against Pitch.
- **Chalk** (`#d6cbbb` / `oklch(85% 0.012 30)`): Active body, secondary headings.
- **Paper** (`#ece3d4` / `oklch(91% 0.010 30)`): Primary surface for typography. The "white" of the system, never neutral.
- **Linen** (`#f4ecdf` / `oklch(94% 0.008 30)`): Hero display type, the most luminous element on screen.

### Named Rules

**The One Voice Rule.** Reactor is used on ≤10% of any rendered frame, measured in pixels not elements. It announces; it never decorates. If you find a second saturated color creeping in, kill it.

**The Tinted Neutral Rule.** No #000 or #ffffff. Every neutral pulls toward the Reactor hue with chroma 0.005–0.015. Pure neutrals read as scientific or corporate; the studio floor is warm.

**The No-Gradient Rule.** Color shifts are categorical, not gradient. A solid block of Pitch meets a solid block of Char with a hard line. Gradient anywhere — text, background, button — is the polished-luxury trap.

## 3. Typography

**Display Font:** Anton (with Impact, sans-serif as fallback)
**Body Font:** Space Grotesk (with system-ui fallback)
**Label / Mono Font:** JetBrains Mono (with Consolas, monospace fallback)

**Character:** Anton at extreme scale is the hand-painted sign in the studio entrance: condensed, weight-heavy, brutally legible across a room. Space Grotesk is the inventory ledger pinned beside it: geometric, dry, scaled down small so the display can shout. JetBrains Mono is the console log on the screen in the corner. The three voices never argue; each one has its register and stays in it.

### Hierarchy

- **Display** (Anton 400, `clamp(4rem, 15vw, 16rem)`, line-height 0.86, tracking -0.045em): Hero name. Section title for Work / Contact. Used at most twice per page.
- **Headline** (Space Grotesk 700, `clamp(2rem, 4.5vw, 3.5rem)`, line-height 0.95, tracking -0.03em): Manifesto statements (About, Contact CTA). Project card titles.
- **Title** (Space Grotesk 600, `clamp(1.1rem, 1.8vw, 1.5rem)`, line-height 1.15): Discipline group names. Brand-tile labels. Subsection titles.
- **Body** (Space Grotesk 300, `1rem`, line-height 1.6): All running text. Max line length 65ch, never wider. Use Bone or Chalk against Pitch.
- **Label** (JetBrains Mono 500, `0.65rem`, tracking 0.15em, UPPERCASE): All operational metadata — section eyebrow, year, client name, technical credit, footer copyright. Used everywhere and nowhere visually loud.

### Named Rules

**The Two-Voice Rule.** Display and Label may share one composition. Display + Headline + Body + Label is one too many. When in doubt, drop the Headline and let the Display + Label carry the weight.

**The Tracking Rule.** Display tracks negative (-0.045em) to feel compact and heavy. Label tracks wide (+0.15em) to read as machine-printed signage. Body stays neutral. Never invert these. Wide-tracked display reads as a wedding invitation; tight-tracked label reads as a logo.

**The Single Italic Ban.** No italics. Anywhere. Emphasis comes from scale, weight, or color shift to Reactor — never slant.

## 4. Elevation

The studio floor is flat. There are no shadows in this system at rest. Depth is built from typographic weight contrast (Anton at 200px sitting next to JetBrains Mono at 10px) and from color block contrast (Pitch against Reactor) — not from blur or layering. Modal overlays, when they exist, are full-surface Pitch at 92% opacity with film grain on top; no soft drop shadow lifts the panel.

### Shadow Vocabulary

The system has none. Cards do not float. Buttons do not lift. Cards do not have shadows because they do not have a sky.

If a future component genuinely needs to indicate it has been picked up off the surface (drag handle, dropdown menu open), the response is a 1px Reactor outline, not a shadow.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Hover and focus respond with color shift or outline, never with `box-shadow`. If a shadow exists in your CSS, you have made a mistake.

**The No-Glow Rule.** No bloom, no soft glow, no rgba shadow-with-blur for "premium" feel. The studio's light is hard. So is the design.

## 5. Components

For every component: hard-edged, weighted, built from one decisive material. They look like instruments — chunky, deliberate, with an obvious affordance. Pressing them feels like pressing a real button on a console, not a screen surface.

### Buttons

- **Shape:** Right-angled. `border-radius: 0` everywhere, no exceptions. Width is content-fit + 32px horizontal padding. Height is 48px minimum (touch target).
- **Primary:** Reactor surface (`#ff3d00`), Pitch text (`#0c0a09`), JetBrains Mono label-style typography (uppercase, tracked +0.15em). Padding 16px / 32px.
- **Hover (Primary):** Background shifts to Reactor-Deep (`#cc3100`); text becomes Linen. Transition 300ms ease-out-quart. **No transform, no scale, no lift.** The button is heavy; it does not bob.
- **Ghost:** Pitch surface, Linen text, 1px Reactor outline. Same padding and type.
- **Hover (Ghost):** Outline becomes solid Reactor fill; text becomes Pitch.
- **Focus:** A 2px Reactor outset (`outline: 2px solid var(--reactor); outline-offset: 2px`). Always visible.

### Cards (Project Cards)

- **Corner Style:** Right-angled. No radius.
- **Background:** The visual block uses one of five categorical accent hues (Reactor, an off-blue, Linen, an off-yellow, an off-green) over Pitch. The hue is the only signal of which discipline.
- **Border:** None at rest. Lead-color 1px hairline at the bottom only, between siblings in a list.
- **Internal Padding:** 32px on the surface text below the color block.
- **Hover:** Visual block scales to 0.98 with a 600ms ease-out-expo curve. Title letter-spacing tightens by 0.01em. **No lift.** The card weighs something; it doesn't float up to greet you.

### Inputs / Fields

- **Style:** Pitch background, 1px Iron border, no radius. Padding 14px horizontal, 18px vertical (heavier than browser default).
- **Focus:** Border switches to Reactor, 1px → 2px width. No glow.
- **Error:** Border switches to a deeper Reactor at 100% saturation; helper text below in the same color.

### Navigation

- The site has no traditional top navigation. The studio is a single long corridor; you walk it from top to bottom. The brand mark (`MT · artemis.studio`) lives in the upper-left at all times. The discipline list at the bottom of the hero acts as informal navigation by stating contents up front.

### Custom Cursor (Signature Component)

- **Idle:** 12px Linen-fill circle. `mix-blend-mode: difference`.
- **Hover (links, buttons):** Expands to 40px outline. No fill.
- **Label (project cards, brand tiles):** Expands to 96px Reactor disc with Pitch text inside ("VIEW", "READ", "REACH"). The cursor IS the affordance.
- **Movement:** Heavy lerp (0.18). The cursor has weight; it catches up to the mouse, doesn't track it instantly.

### Marquee (Signature Component)

- Two strips, opposing direction, different speeds (35s and 50s). One is filled JetBrains-mono text in Iron. The other is Reactor-outlined display text. The mismatch is the point: the studio is two machines running at different tempos.

### Grain Overlay (Signature Component)

- An SVG `feTurbulence` noise layer at 3.5% opacity, animated through 11 keyframes at 0.5s step. Always on top. Not decoration — it gives every surface the temperature of film, not screen. **Disabled under `prefers-reduced-motion`** (the keyframe shimmer stops; the static grain stays).

### 3D Scene (Peripheral Accent)

- A small fractured matte-black monolith. Lives in the upper-right corner of the hero at 38vw width, **never centered behind type**. Scroll causes it to sink with gravity and rotate; mouse causes a slight parallax tilt. **Disabled and replaced with a static still under `prefers-reduced-motion` or `prefers-reduced-data`.**

## 6. Do's and Don'ts

### Do:

- **Do** keep Reactor under 10% of any rendered frame. Measured in pixels, not elements.
- **Do** tint every neutral toward the Reactor hue (chroma 0.005–0.015). Never reach for `#000` or `#fff`.
- **Do** make components feel mechanical and weighted. Right-angled corners. Heavy padding. No lift on hover. Color or outline shifts only.
- **Do** let the type carry the hero. The 3D monolith is a peripheral accent; if the page works as a static screenshot with the 3D removed, the page is correct.
- **Do** vary spacing rhythm intentionally — section gaps of 120px, internal gaps of 24-48px, micro detail at 8-16px. Same padding everywhere reads as SaaS.
- **Do** honor `prefers-reduced-motion`: kill scroll-linked parallax, the 3D idle motion, split-text reveals, and marquee scrolls. The site stays comprehensible.
- **Do** preserve focus rings. Reactor outline at 2px, offset 2px, always visible on keyboard focus.

### Don't:

- **Don't** introduce a second saturated color. Reactor is alone. No teal/yellow/purple support roles.
- **Don't** use gradients — for backgrounds, for text (`background-clip: text` is banned), for buttons, anywhere. The polished-luxury trap.
- **Don't** use `border-radius` greater than 0 on any structural element. Hard edges only. Rounded corners are the SaaS tell.
- **Don't** add `box-shadow` to anything. Surfaces are flat. Depth is typographic and color-block, not lifted.
- **Don't** make components float on hover (`transform: translateY(-2px)`, scale-up bobs). They are heavy; they shift color or outline, not position.
- **Don't** stack identical project cards in a 3-column grid. Cargo / Wix tell. Use the horizontal-scroll showcase or asymmetric editorial layout.
- **Don't** caption every project with marketing prose. Name the client, state the medium, state the scale. The work is the proof.
- **Don't** introduce em dashes (`—`). Use commas, colons, periods, or parentheses. Tooling-generated AI-slop signal.
- **Don't** treat the 3D scene as the centerpiece. The moment it competes with the type, it has failed its job.
- **Don't** ship a "futuristic" neon / cyber / glitch decoration. PRODUCT.md anti-reference: AI cyber cliché.
- **Don't** use lifestyle photography, serif display headlines, or champagne/gold accents. PRODUCT.md anti-reference: luxury polished.
- **Don't** build "About / Work / Contact" as the literal anatomy. Reorder, rename, fold sections together. The resume layout is the SaaS-portfolio tell.
