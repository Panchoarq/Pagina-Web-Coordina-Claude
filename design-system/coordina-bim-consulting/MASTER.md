# Design System Master File — coordina BIM Consulting

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** coordina BIM Consulting
**Concept:** "Índice Técnico" — the site behaves like a technical drawing index / document that project photography punches through.
**Generated:** 2026-08-29 (hand-tuned from `ui-ux-pro-max --design-system`, overriding the auto Playfair/blue output to match the agreed brief direction)
**Design Dials:** Variance 8/10 (Bold / Asymmetric) | Motion 8/10 (Complex, but restrained) | Density 6/10 (Standard)

## Non-negotiables (from BRIEF_DISENO_DESDE_CERO.md)

- Project data + images come from Airtable, **server-side, per request**. Image URLs expire — never bake at build time, never cache long. Use `no-store` (hero) or short `revalidate` (≤60s) elsewhere.
- `AIRTABLE_TOKEN` lives only in server env. Never reaches the client bundle.
- Content must be crawlable — real server-rendered HTML, not JS-only.
- Do **not** inherit anything visual from `main` (paper + ink + blue accent) or `diseno-monocromo` (editorial serif). No blue. No serif. No plan/clash-detection motifs.

---

## Global Rules

### Color Palette — pure monochrome, ZERO chromatic accent

The only color on any page is the **project photography**. UI is grayscale end to end. There is no brand accent hue; emphasis comes from weight, scale, and true-black.

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Ink (foreground) | `#0A0A0A` | `--ink` | Near-black. Headlines, primary text. |
| Paper (background) | `#FAFAF9` | `--paper` | Warm off-white. Page ground. |
| Ink 700 | `#2E2E2E` | `--ink-700` | Body text on paper (contrast ≥ 12:1). |
| Ink 500 | `#5C5C5C` | `--ink-500` | Secondary text / mono metadata (contrast ≥ 4.6:1 on paper). Do not go lighter for text. |
| Ink 300 | `#9B9B9B` | `--ink-300` | Disabled, non-text hints only. |
| Hairline | `#DDDCDA` | `--hairline` | 1px rules, grid lines, borders. |
| Panel | `#F2F1EF` | `--panel` | Subtle block fill (e.g. stats strip). |
| Inverse ground | `#0A0A0A` | `--ink` | Dark sections use `--ink` bg + `--paper` text. |
| Focus ring | `#0A0A0A` | `--ink` | 2px solid, 2px offset. |
| Destructive (forms only) | `#B00020` | `--danger` | Error text/borders only; not decorative. |

**CTA = inverted block**, not a colored button: `background: var(--ink); color: var(--paper);` (contrast 19:1). Secondary CTA = `1px solid var(--ink)` on paper.

**Dark sections** (Estudio, footer): swap to `--ink` ground / `--paper` text; hairline becomes `rgba(250,250,249,0.18)`.

### Typography — two sans families, extreme scale contrast

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
```

- **Space Grotesk** — display + body voice. Straight, geometric grotesque.
- **Space Mono** — technical metadata: project codes, m², year, section numbers, spec tables, nav labels, filter chips, captions. Always the "data" layer.

| Token | Family / weight | Size | Tracking | Case |
|-------|-----------------|------|----------|------|
| `--t-hero` | Grotesk 500 | `clamp(3rem, 12vw, 11rem)` | `-0.03em` | UPPERCASE |
| `--t-h1` | Grotesk 500 | `clamp(2.25rem, 5vw, 4rem)` | `-0.02em` | Sentence |
| `--t-h2` | Grotesk 500 | `clamp(1.6rem, 3vw, 2.5rem)` | `-0.015em` | Sentence |
| `--t-body-lg` | Grotesk 400 | `1.25rem` / lh 1.55 | `0` | Sentence |
| `--t-body` | Grotesk 400 | `1.0625rem` / lh 1.6 | `0` | Sentence |
| `--t-mono-label` | Mono 400 | `0.75rem` | `+0.08em` | UPPERCASE |
| `--t-mono-data` | Mono 400 | `0.9375rem` | `0` | as-is |
| `--t-stat` | Mono 700 | `clamp(2.5rem, 7vw, 5.5rem)` | `-0.01em` | tabular-nums |

- Stats/counters: `font-variant-numeric: tabular-nums;` fixed width so digits don't jitter while counting.
- No italics. No serif anywhere.

### Spacing

| Token | Value |
|-------|-------|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `40px` |
| `--space-2xl` | `72px` |
| `--space-3xl` | `120px` (section rhythm on desktop) |

### Grid

- 12-column, `--gutter: 24px`, `--margin: clamp(20px, 5vw, 96px)`, max content width `1600px`.
- The grid is **visible**: 1px `--hairline` column/section rules are part of the aesthetic.
- Sections are numbered `01`–`07` in `--t-mono-label`, sitting in a left "title-block" column like a drawing sheet cartouche.
- Asymmetric by default — headline in cols 1–7, metadata in cols 9–12, etc.

### Corners, borders, elevation

- `border-radius: 0` everywhere. No exceptions.
- Elevation is expressed with **hairline borders**, not shadows. `--shadow-*` tokens are unused. One allowed exception: a soft scrim gradient over the hero photo for text legibility.

---

## Component Specs

### CTA / buttons
```css
.btn { font: 400 var(--t-mono-label); text-transform: uppercase; letter-spacing:.08em;
  padding: 16px 28px; border-radius: 0; cursor: pointer; transition: background 160ms ease, color 160ms ease; }
.btn--primary { background: var(--ink); color: var(--paper); border: 1px solid var(--ink); }
.btn--primary:hover { background: transparent; color: var(--ink); }
.btn--ghost { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
.btn--ghost:hover { background: var(--ink); color: var(--paper); }
.btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
```

### Project card
```css
.proj { position: relative; border: 1px solid var(--hairline); background: var(--paper); }
.proj__img { width:100%; aspect-ratio: 4/3; object-fit: cover;
  filter: grayscale(1) contrast(1.03); transition: filter 300ms ease; }
.proj:hover .proj__img, .proj:focus-within .proj__img { filter: grayscale(0); }
.proj__block { /* cartouche */ font: var(--t-mono-data); padding: var(--space-md);
  display: grid; gap: 2px; border-top: 1px solid var(--hairline); }
.proj__code { font: 400 var(--t-mono-label); color: var(--ink-500); text-transform: uppercase; }
```
- Grayscale→color is **decorative only**. Never the sole carrier of meaning. On touch/mobile, render images in color (no hover state).

### Spec table (project detail)
- Two columns: `--t-mono-label` key / `--t-mono-data` value, each row separated by a 1px `--hairline`. Reads like a title block: Código, Nombre, Mandante, Ubicación, Año, Superficie, Tipología, Servicios, Estado, Software.

### Inputs / filter chips
```css
.chip { font: 400 var(--t-mono-label); text-transform: uppercase; letter-spacing:.08em;
  padding: 8px 14px; border: 1px solid var(--hairline); background: transparent; border-radius:0; cursor:pointer; }
.chip[aria-pressed="true"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.chip:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.input { font: var(--t-body); padding: 12px 14px; border: 1px solid var(--ink); border-radius:0; background: var(--paper); }
.input:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
```

### Header
- Sticky, `--paper` bg, 1px bottom hairline, height 64px.
- Wordmark left (mono, uppercase). Right: `Proyectos / Servicios / Estudio / Contacto` + `ES / EN` toggle, all `--t-mono-label`.
- Nav spine is **Proyectos** and **Servicios** — those two get visual priority.

---

## Motion (dial 8 — choreographed, but never in the way of reading)

Register GSAP + ScrollTrigger once. Wrap every non-essential effect in
`gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`; the reduced branch renders final state and sets counters to their end value.

| Effect | Trigger | Spec |
|--------|---------|------|
| **Stat count-up** | viewport enter (`top 85%`), once | 0 → value, `power2.out`, 1.4–2s, `tabular-nums`, thousands-separated (`es-CL`). Live values (project count, total m²) come from Airtable. |
| **Hairline draw-in** | section enter | `scaleX: 0 → 1`, `transform-origin: left`, 500ms `expo.out`. |
| **Text reveal** | section enter | children `opacity 0→1`, `y 24→0`, `stagger .06`, `power2.out`, ≤8 items per batch. |
| **Hero photo parallax** | scroll (scrub) | photo layer only, `yPercent: 8`, `ease: none`. Never the headline. |
| **Project grid item** | viewport enter | fade + `y 16`; grayscale→color is hover/focus (desktop) only. |
| **Section / route transition** | nav | `expo.inOut`, 500–700ms. Optional single shared-element Flip on the hero photo → project detail (`data-flip-id`), guarded by reduced-motion and element existence. |

- Hover transitions on interactive elements: 150–300ms. No 0ms state changes.
- Do not animate `width`/`height`/`top`/`left` — transform/opacity/filter only.

---

## Hero — random project, per request

1. Server picks a random **Publicado** project each request.
2. Uses its **first available image**: first entry of `project.images` with a usable `url` (`images.find(i => i.url)`).
3. Full-bleed photo (only color on the page) + `--t-hero` headline + a mono cartouche overlay: `código · nombre · tipología · superficie · año`, linking to that project's route.
4. Route is dynamic (`export const dynamic = 'force-dynamic'` / `fetch(..., { cache: 'no-store' })`) so every reload rotates the image. Provide a no-JS static fallback image for crawlers.
5. Scrim gradient (`linear-gradient(...rgba(10,10,10,.55)... )`) behind text for ≥4.5:1.

---

## Page Pattern

**Section order (home):**
`01 Hero (random project photo + headline + cartouche + CTA)` → `02 Qué hacemos (one direct paragraph)` → `03 Cifras (animated counters)` → `04 Servicios (01–08, expandable rows)` → `05 Proyectos (filterable grid, grayscale→color)` → `06 Estudio (trayectoria, mandantes as mono list, casos emblemáticos — dark section)` → `07 Contacto + footer`.

**CTA placement:** Hero (primary "Ver proyectos") + sticky header + bottom contact block.

**Project detail:** its own route (`/[locale]/proyectos/[code]`) for SEO + deep links. Spec table + full gallery, gallery filterable by service via `-NP`/`-ES`/`-AB` filename suffix (already parsed in `api/_airtable.js`).

---

## i18n

- Bilingual ES / EN from v1. Locale-prefixed routes (`/es`, `/en`), `es` default.
- UI strings + all long-form copy in message catalogs. Airtable content is ES-only for now → show ES text with an `[ES]` mono tag when viewing in EN (do not machine-translate project descriptions).
- `<html lang>` set per locale; `hreflang` alternates in `<head>`.

---

## Anti-Patterns (Do NOT use)

- ❌ Any chromatic accent in the UI (especially blue — that's the old `main`).
- ❌ Serif type anywhere.
- ❌ Rounded corners, drop shadows, glassmorphism.
- ❌ Emoji as icons — use a single line-icon set (Lucide), 1.5px stroke, monochrome.
- ❌ Baking Airtable images into the build / long cache / hotlinking expired URLs.
- ❌ Exposing `AIRTABLE_TOKEN` to the client.
- ❌ Content that only exists after JS runs (breaks crawlability).
- ❌ Counters / reveals with no reduced-motion fallback.
- ❌ Grayscale→color as the only way to convey a state.
- ❌ Hero headline in vw units with no `clamp()` cap → horizontal scroll on mobile.
- ❌ Instant (0ms) state changes on hover/press.

---

## Pre-Delivery Checklist

- [ ] UI is fully grayscale; the only color is project photography.
- [ ] Space Grotesk (voice) + Space Mono (data) only; no serif, no third family.
- [ ] Hero image changes on every reload; server-rendered; no-JS fallback present.
- [ ] Airtable fetch is server-side, `no-store` / short revalidate; token not in client bundle.
- [ ] Real HTML content for crawlers (view source shows text + project data).
- [ ] All counters + reveals have a `prefers-reduced-motion` final-state branch.
- [ ] Text contrast ≥ 4.5:1 (secondary text uses `--ink-500` min).
- [ ] Focus-visible: 2px solid `--ink`, 2px offset, on every interactive element.
- [ ] `border-radius: 0` everywhere; elevation via hairlines, not shadows.
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll; no content under the sticky header.
- [ ] cursor: pointer on all clickable elements; hover transitions 150–300ms.
- [ ] ES / EN routes work; `<html lang>` + `hreflang` correct; project copy not machine-translated.
