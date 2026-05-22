# Product

## Register

brand

## Users

**Primary:** Creative directors, art directors, and producers at advertising agencies and brands — international (FWA / Awwwards-aware) and Iran-based — sourcing VFX, video mapping, and AI-driven visual work. They land here from a referral, an awards reel, or a search for "AI visual production Iran." They have 30 seconds to decide whether to remember the name.

**Secondary:** Award-show juries (Awwwards SOTD, FWA, CSSDA), digital-craft writers, festival curators evaluating the site itself as a candidate.

**Tertiary:** Live-event and theatre producers, music artists, and gallery curators commissioning architectural mapping and AI-generated imagery.

The job to be done: prove — in the first five seconds — that the person behind this site can build something they have not seen before, and that they will not waste a brand's budget doing it.

## Product Purpose

A personal portfolio for Mahbod Tavassoli (Tehran-based visual artist & AI creative, 10+ years, artemis.studio). It is not a brochure of past work — it is a single, sustained demonstration of taste, restraint, and craft. The site exists to win festival recognition and convert that recognition into commission inquiries from brands that already trust their visual budget to experimental work.

**Success looks like:**
- Awwwards SOTD or FWA Site of the Day mention within 6 months
- Inbound email from at least one international agency per month sourced via the site
- Industry references in Twitter / Are.na threads about portfolio sites worth studying

## Brand Personality

**Three words:** Experimental · Weird · Fearless.

**Voice:** Direct, dry, occasionally provocative. Confident enough not to sell. Statements end. Sentences are short or deliberately not. No marketing voice. No "We believe…" sentences. No client-pleasing softness.

**Emotional target:** Reverence. The visitor's first instinct should be to slow down, not to scan. The site itself reads as an artwork — a piece of craft they are walking through, not a UI they are using.

## Anti-references

This site must not resemble:

- **Clean SaaS / corporate landing pages** (Linear, Stripe, Vercel marketing). Soft gradients, generous whitespace as a "professional" tic, friendly product tour copy, polished onboarding screenshots. Designed to convert, not to be remembered.
- **Luxury polished brand sites.** Tall serif headlines, gold or champagne accents, lifestyle photography, "elevated minimalism." The fashion-house playbook, applied to a creative who doesn't sell handbags.
- **Generic portfolio templates.** Squarespace / Wix / Cargo grids of identically sized project tiles. Three-column case-study walls. Resume-style "About / Work / Contact" anatomy. Anything that could be the same file with a different name swapped in.
- **Futuristic AI/cyber cliché.** Neon green on black, decorative glitch, gridlines as decoration, scanlines as decoration, "the future is here" copy. The pattern AI artists fall into when they want to look advanced.
- **Decoration without purpose.** Animations on every element. Hover effects without intent. Particles. Floating chrome blobs as centerpieces. Decoration that exists because the tool allows it, not because it earns its frame time.

If a section could appear on a SaaS landing page, redesign it. If it could appear in a luxury brand lookbook, redesign it.

## Design Principles

1. **The container is the artwork.** This site is not a frame around the work — it is itself a piece of work. Every element must read as an intentional, hand-made decision. No default Material, no Tailwind preset, no off-the-shelf component shape without alteration.

2. **Weird is the baseline.** The unexpected interaction is the default. If a layout, transition, or pacing choice would be at home on a SaaS marketing page, replace it. Restraint of an unusual move is still an unusual move.

3. **Reverence through restraint.** Quiet authority beats loud showmanship. Empty space is content. A single heavy moment lands harder than ten light ones. Pacing — when nothing happens, and then suddenly something does — is a primary tool.

4. **Confidence without pitch.** Show the work. State the fact. Don't justify, don't sell, don't explain why he's good. Captions name the client; numbers state the scale; the rest is the work itself.

5. **Performance is part of the craft.** A site that lags is not experimental, it is broken. Heavy aesthetic, light bytes. Every motion has a budget. Every asset earns its weight. Iran-internet readiness is a craft constraint, not an excuse.

## Accessibility & Inclusion

**WCAG AA baseline.** Contrast 4.5:1 for body text and 3:1 for large text against the chosen surface. Visible focus rings on every interactive element — including the custom cursor target. Keyboard navigation reaches every link and project case without trap. All decorative imagery `aria-hidden`; meaningful images carry `alt`.

**Performance-first as accessibility.** Iran-side internet is unreliable. Hero scene degrades gracefully on slow connections; third-party fonts ship with `font-display: swap`; the 3D scene is replaceable with a static still on `prefers-reduced-motion` or low-power devices. LCP under 2.5s on a 4G profile is the line.

**Reduced motion is honored, not avoided.** `prefers-reduced-motion: reduce` disables scroll-linked parallax, the 3D scene's idle motion, split-text reveals, and marquee scrolls. The site is fully comprehensible — and still feels deliberate — without motion.

No bilingual EN/FA implementation in scope for v1. Persian-language version is a deliberate later phase.
