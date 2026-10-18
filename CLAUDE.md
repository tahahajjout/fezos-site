# Fezo's Beauty Lounge — Luxury Demo Website

> **Read this whole file before writing any code. Design quality is the #1 priority of this project.**

---

## 0. Your role

Act as a **premium frontend creative director and expert React developer**.
You are building a stunning, luxury, editorial website for **Fezo's Beauty Lounge**, a beauty salon (*salon esthétique*) in Fès, Morocco.
Every decision (spacing, type, motion, imagery) must feel intentional, calm and high-end — like a luxury hotel spa or a fashion magazine, never like a generic template.

**Plugins / skills to use (installed in my Claude Code):**
- `/ui-ux-pro-max:ui-styling` — use it for styling decisions, tokens and component polish.
- My **taste** plugin/skill — use it to review every section before calling it done (anti-generic check).
- Use any other installed design skill that helps. Quality > speed.

---

## 1. Working rules (IMPORTANT — avoid stalling)

- **Work in small steps.** Do only the step I ask for (see §14 Build order). Don't plan the whole site upfront, don't write planning documents. Start coding immediately.
- **Never run interactive commands** (e.g. `npm create vite` without flags, prompts waiting for input). Always use non-interactive flags (`--yes`, `--template`, etc.).
- After each step: run the dev server check (`npm run build` must pass), then give me a 3-line summary of what changed.
- Keep components small (< 200 lines). One component per file.
- Ask me only if something truly blocks you; otherwise make the tasteful choice and note it.

---

## 2. Business data (real — from Instagram, Google Maps, reviews, Oct 2026)

| Field | Value |
|---|---|
| Name | **Fezo's Beauty Lounge** |
| Type | Salon de beauté — Coiffure · Onglerie · Esthétique |
| Instagram | @fezos_beautylounge |
| Bio | "Beauty Lounge à Fès 🧡" |
| Address | Blad Tazi, Champs de Course, n°22 lotissement, Fès 30000 |
| Phone / WhatsApp | 06 70 85 35 30 → `+212670853530` → `https://wa.me/212670853530` |
| Google rating | **4.9★ (29 avis)** |
| Coordinates | 34.0377896, -5.0162399 |
| Maps link | https://maps.app.goo.gl/Sid9PLjydTBSJF73A |
| Hours | Lun 10:30–20:30 · Mar–Dim 10:30–20:00 (ouvert 7j/7) |

**Booking today:** every Instagram post says "Réservez via WhatsApp" → the site sends bookings to WhatsApp (no backend).

### Real services (use these — do NOT invent services they don't offer, e.g. no laser)
**Coiffure & Soins capillaires**
- Lissage brésilien — sans formol, sans acide glyoxylique; protéines, filler, vitamines *(confirmed promo: 780 DH)*
- Lissage Pro Filler
- Soin hydratant boucles — Soin21
- Soin réparateur après l'été (sel, chlore, soleil)
- Brushing · Tresses · Chignon invitée (mariages)

**Onglerie**
- BIAB "clean & natural"
- Manucure · Pose
- Pédicure médicale — gamme Eucalyptus PN Pronails (partenariat FEZOS × PRONAILS) — massage des pieds inclus

**Visage & Regard**
- Hydrafacial
- Brow Lift · Lash Lift

**Prices:** only 780 DH (lissage promo) is confirmed. All other prices = realistic placeholders with `confirmed: false` in the data file.

### Social proof (Google reviews — paraphrase, attribute first name + "Avis Google")
- Accueil chaleureux, équipe attentionnée, on se sent chouchoutée
- Café et eau offerts à l'arrivée
- Rendez-vous respectés à l'heure
- Massage des pieds offert avec manucure/pédicure
- Décoration magnifique, ambiance raffinée
- Team named in reviews: Lala Fatima Zohra (accueil), Aziza (brushing)

### Offers pattern
Short limited offers ("Packs Spécial Rentrée", "Lissage brésilien 780 DH du 5 au 12 octobre — places limitées") → editable offer banner with auto-expiry.

---

## 3. Aesthetic direction

### Philosophy
- **Quiet luxury, editorial.** Think Aesop, Augustinus Bader, Six Senses spa, Vogue layouts.
- **Whitespace is the luxury.** Generous margins, few elements per screen, one idea per section.
- **Typography does the heavy lifting.** Huge refined serif headlines vs. small, spaced-out sans labels. Deep hierarchy.
- **Asymmetry over centered blocks.** Offset images, text overlapping image edges, staggered grids.
- **Slow, soft motion.** Nothing bounces, nothing flashes.

### Reference
https://infinityspa.ma (a spa in Fès) — take the **concept** (dark photo hero, italic accent word in headline, uppercase eyebrows, numbered cards, price rows with ↗, mobile bottom bar, booking modal). Do it **better**: Infinity overflows horizontally on mobile, hides content until JS animations fire, uses system fonts, and has no reviews.

### ❌ Forbidden (generic AI look)
- Purple/blue/pink gradients, neon, glassmorphism everywhere, glowing blobs
- Emoji as icons, stock "3 cards with icon on top" feature rows
- Centered-everything layouts, identical section after identical section
- Rounded-2xl bubbly cards with heavy drop shadows
- Bouncy/spring-overshoot animations, parallax that causes jank
- Pure #000 or pure #FFF
- Lorem ipsum, "Welcome to our website", "Your beauty, our passion"
- More than one accent color

---

## 4. Design tokens (define ONCE in Tailwind theme — no raw values in components)

### Colors
| Token | Hex | Use |
|---|---|---|
| `alabaster` | `#FDFBF7` | Main page background |
| `linen` | `#F4F1EA` | Alternate sections, cards, inputs |
| `sand` | `#E9E3D8` | Hairlines, dividers, borders |
| `charcoal` | `#1A1A1A` | Text, dark sections background |
| `charcoal-soft` | `#2B2926` | Dark section cards |
| `stone` | `#6B655D` | Secondary text (passes AA on alabaster) |
| `champagne` | `#D4AF37` | **Decorative only**: thin lines, icons, stars, accent on dark backgrounds |
| `champagne-deep` | `#9C7C2B` | Gold **text** on light backgrounds (AA contrast) — italic accent words, prices, eyebrows |
| `champagne-soft` | `#F3EAD3` | Subtle highlight backgrounds (offer banner) |

Rules:
- `#D4AF37` fails contrast as text on light backgrounds → use `champagne-deep` for gold text on light, `champagne` for gold on `charcoal`.
- Gold is used **sparingly** (≤ 5% of the screen): italic headline words, prices, eyebrows, hairlines, CTA hover.
- **Brand note:** Fezo's real brand color is orange. Keep the accent as a single token so I can swap `champagne` → Fezo's orange (`#D9772B`) in one line if the owner prefers.

### Typography
- **Display / headings:** `Cormorant Garamond` (300, 400, 500 + *italic*). Alternative: `Playfair Display`.
- **Body / UI:** `Jost` (300, 400, 500) — clean geometric sans. Alternative: `DM Sans`.
- Self-host via `@fontsource` (no Google Fonts requests).
- Fluid scale with `clamp()`:

| Role | Size | Style |
|---|---|---|
| Display (hero H1) | `clamp(3rem, 8vw, 7.5rem)` | Cormorant 300, line-height 0.95, letter-spacing -0.02em |
| H2 | `clamp(2.25rem, 5vw, 4.5rem)` | Cormorant 300, lh 1.05 |
| H3 | `clamp(1.5rem, 2.5vw, 2rem)` | Cormorant 400 |
| Eyebrow | `0.75rem` | Jost 500, UPPERCASE, letter-spacing 0.25em, `champagne-deep` |
| Body L | `1.125rem` | Jost 300, lh 1.7 |
| Body | `1rem` | Jost 400, lh 1.7 |
| Small / meta | `0.8125rem` | Jost 400, letter-spacing 0.02em |
| Price | `1.25rem` | Cormorant 500 italic, `champagne-deep` |

- **Signature move:** one word of every H1/H2 in *italic gold* — e.g. "Votre moment *beauté.*", "L'art du *soin.*"
- Max line length 60ch for body text.

### Spacing & layout
- 4px base scale. Section padding: `py-32` desktop / `py-20` mobile — identical everywhere.
- Container: max 1320px, side padding `px-6` mobile / `px-12` desktop.
- 12-column grid on desktop; use asymmetric spans (7/5, 5/7, offset columns).

### Shape, lines, depth
- Radius: **0–2px** on buttons, cards, images (sharp = editorial). Only badges/pills are fully round.
- Prefer **1px `sand` hairlines** over shadows. One soft shadow allowed (modal).
- Thin gold rule (40px wide, 1px) under eyebrows as a recurring motif.

### Imagery treatment
- Warm, soft, natural light; cream/beige/stone interiors; skin, hands, hair close-ups; marble, linen, plants.
- Same aspect ratios: hero 16:9 desktop / 4:5 mobile; treatment cards 4:5; gallery mixed 4:5 + 1:1 + 16:9.
- Subtle warm overlay on dark sections: `linear-gradient(to bottom, rgba(26,26,26,0.25), rgba(26,26,26,0.65))`.
- Images can slightly overlap section edges or text blocks for depth.

### Motion tokens (Framer Motion — import from `motion/react` or `framer-motion`)
- Easing: `[0.22, 1, 0.36, 1]` (easeOutQuint-like) everywhere.
- Durations: micro 0.3s · reveal 0.9s · image zoom 1.2s.
- **Reveal on scroll:** `opacity 0→1`, `y 24→0`, `whileInView`, `viewport={{ once: true, margin: "-10%" }}`, stagger children 0.08s.
- **Image hover:** scale 1 → 1.05 over 1.2s, inside `overflow-hidden` frame.
- **Buttons:** arrow `↗` (Lucide `ArrowUpRight`) translates 2px up-right on hover; underline grows from left on text links.
- **Hero load:** headline words fade/glide up one by one (stagger 0.12s), image slowly scales 1.08 → 1 over 2s.
- **Content must be visible without JS** (SSR-safe initial state) and all motion disabled with `useReducedMotion()`.
- No spring overshoot, no bounce, no rotate.

### Icons
- **Lucide React** only, `strokeWidth={1.25}`, size 18–20px, color `stone` or `champagne`.

---

## 5. Components (build these first, reuse everywhere)

`Container` · `Section` (variants: `alabaster` / `linen` / `charcoal`) · `Eyebrow` (text + gold rule) · `SectionTitle` (props: `children`, `accent` word in italic gold, `align`) · `Button` (variants: `solid` charcoal, `outline`, `ghost-light` for dark bg, `whatsapp`; all with optional `ArrowUpRight`) · `TextLink` · `Reveal` (motion wrapper) · `ImageFrame` (overflow-hidden + hover zoom + lazy + aspect ratio) · `TreatmentCard` · `PriceRow` · `PackCard` · `ReviewCard` · `Modal` · `Tabs` · `PanoramaViewer` · `StickyMobileBar` · `LanguageSwitcher`.

---

## 6. Sections (in order) — detailed specs

### 6.1 Header
- Logo: wordmark "Fezo's" in Cormorant italic + small "BEAUTY LOUNGE" in Jost spaced caps.
- Nav: Soins · Visite 360° · Packs · Avis · Contact. Right: FR / EN / AR + "Réserver ↗".
- Transparent over hero (light text), becomes `alabaster/90` + backdrop blur + hairline on scroll.
- Mobile: burger → full-screen `charcoal` overlay, huge serif links staggering in.

### 6.2 Hero
- Full viewport (`min-h-[100svh]`). Layout desktop: text left (cols 1–6), tall image right (cols 7–12) bleeding to the edge, OR full-bleed image with dark gradient — choose the more striking one.
- Eyebrow: "BEAUTY LOUNGE · FÈS"
- H1: "Votre moment *beauté.*"
- Subline (Body L, max 40ch): "Coiffure, onglerie et soins visage dans un lounge pensé pour vous — au cœur de Champs de Course."
- CTAs: **"Réserver une expérience ↗"** (solid) + "WhatsApp" (outline).
- Trust line: "★ 4.9 sur Google · Ouvert 7j/7 · Café offert à l'arrivée"
- Small scroll cue at bottom (thin animated line).

### 6.3 Offer banner (thin, elegant)
- `champagne-soft` strip: "Offre du moment — Lissage brésilien *780 DH* · jusqu'au 12 octobre ↗". Auto-hidden after end date (data-driven).

### 6.4 L'expérience Fezo's (intro)
- Asymmetric: large serif statement left ("Un lounge où l'on prend *le temps.*"), short paragraph + 3 small stats right (4.9★ Google · 7j/7 · Café offert).

### 6.5 Nos soins — Treatments grid
- Eyebrow "NOS SOINS", title "L'art du *soin.*"
- 4 numbered cards (01–04): **Coiffure & Lissages · Onglerie · Pédicure médicale · Visage & Regard**.
- Staggered grid (cards at different vertical offsets on desktop), image 4:5 with slow hover zoom, number in gold, title serif, one-line description, "Découvrir ↗".
- Hover: image scales, gold hairline extends under title.

### 6.6 Carte des soins — Price list
- Tabs: Coiffure · Onglerie · Visage & Regard.
- `PriceRow`: `Name ············ duration ············ price ↗` with dotted leader; whole row clickable → opens booking modal with that service preselected. "Sur demande" when no price. Placeholder prices visually identical (flag only in data).

### 6.7 Visite virtuelle 360° — Panorama viewer (signature feature)
Custom, **zero-dependency** `PanoramaViewer` component:
- Wide panoramic salon interior image (≥ 3:1 ratio, e.g. 4000×1200) inside a 16:9 (desktop) / 4:5 (mobile) frame, `charcoal` section.
- **Drag to pan** with Pointer Events (mouse + touch + pen) — `pointerdown/move/up`, `setPointerCapture`, `touch-action: pan-y` so vertical page scroll still works on phones.
- **Seamless infinite loop:** render the image twice side by side and wrap the offset (modulo image width) so panning never hits an edge.
- **Inertia:** on release, keep velocity and decay smoothly (`requestAnimationFrame`, friction ~0.95).
- **Idle auto-drift** (very slow, ~10px/s) until first interaction; stops on interaction; disabled with reduced motion.
- **Keyboard:** focusable, ← → arrows pan; `aria-label="Visite virtuelle du salon, faites glisser pour explorer"`, `role="img"` + description.
- **Overlay hint:** centered circular glass badge with Lucide `Move` / `MoveHorizontal` icon + "Faites glisser pour explorer l'espace 360°" (EN: "Drag to explore the space 360°"). Cursor `grab` / `grabbing`. Hint fades out after first drag.
- Optional thin progress bar showing position in the panorama.
- Performance: use `transform: translate3d`, no React re-render per frame (use refs).
- Caption under: "Image indicative — visite réelle bientôt disponible" (until we have the real salon panorama).

### 6.8 Packs
- Eyebrow "PACKS", title "Des rituels *complets.*"
- 4 numbered pack cards (placeholders, `confirmed:false`): Pack Mariée · Pack Mains & Pieds · Pack Éclat Visage · Pack Rentrée. Price in gold italic, 1-line description, "Réserver ↗".

### 6.9 Pourquoi Fezo's (dark `charcoal` section)
- 4 promises in a refined list with gold numerals or thin Lucide icons: Café d'accueil · Ponctualité · Massage des pieds offert · Produits professionnels (PN Pronails, Soin21, Hydrafacial).
- Large serif quote from a review.

### 6.10 Galerie
- Editorial masonry (mixed ratios), hover zoom, click → lightbox (keyboard + swipe, Esc to close).

### 6.11 Avis
- "4.9★ sur Google — 29 avis" large; horizontal carousel (drag/swipe) of `ReviewCard`s: serif italic quote, name, "Avis Google", gold stars.

### 6.12 Localisation & horaires
- Split: left — address, hours table (today highlighted + live badge "Ouvert maintenant / Fermé", Africa/Casablanca time), phone, Instagram, "Itinéraire ↗"; right — Google Maps embed (grayscale+sepia CSS filter to match palette).

### 6.13 CTA final
- Full-width image band with overlay: "Prête pour votre *moment Fezo's ?*" + "Réserver une expérience ↗".

### 6.14 Footer
- Wordmark, short line, contact, socials, legal line + demo credit (§12).

### 6.15 StickyMobileBar (mobile only)
- Fixed bottom, `charcoal`, 3 equal actions with Lucide icons: Appeler (`Phone`) · Itinéraire (`MapPin`) · Réserver (`CalendarHeart` → opens modal). Safe-area padding (`env(safe-area-inset-bottom)`).

### 6.16 Booking modal
- Opens from every "Réserver" button. Fields: Soin (grouped select, preselectable) → Date (no past dates) → Heure (30-min slots within opening hours of that day) → Prénom → Téléphone (optional) → Note (optional) → consent checkbox.
- Submit → opens WhatsApp with prefilled, encoded message:
  `Bonjour Fezo's 🧡 Je souhaite réserver : {soin} — {jour date} à {heure}. Prénom : {prénom}.`
- Small note: "Votre demande sera confirmée par notre équipe sur WhatsApp."
- Focus trap, Esc to close, scroll lock, `aria-modal`.

---

## 7. Internationalization
- FR default, EN, AR. All strings in `src/data/salon.js` (or `src/i18n/`).
- AR: `dir="rtl"`, mirrored layout, Arabic font pairing (`Noto Naskh Arabic` or `Amiri` for headings, `Noto Sans Arabic` body). Panorama drag direction stays natural.

---

## 8. Responsive (mobile is where the owner will see it first)
- Design mobile-first, then enhance. Test widths: **360, 375, 390, 430, 768, 1024, 1280, 1440, 1920**.
- **Zero horizontal overflow** at any width (check `document.documentElement.scrollWidth === innerWidth`).
- Hero text never covered; tap targets ≥ 44px; no hover-only information on touch.
- Desktop must not look like a stretched phone: use the 12-col asymmetric grid.

---

## 9. Images (Unsplash)
- Use high-resolution Unsplash images via `https://images.unsplash.com/photo-...?auto=format&fit=crop&w=XXXX&q=80` so the site works out of the box.
- Themes: luxury spa interior, minimalist salon interior, skincare, hair care, manicure close-up, marble/linen textures, panoramic salon/spa interior for the 360° viewer.
- **Verify every URL loads** (no broken images). Prefer warm/neutral tones; avoid cold blue images.
- Always set `width`, `height`, `alt` (French), `loading="lazy"` (except hero), `decoding="async"`; use `srcSet` with `w=` sizes.
- Centralize all image URLs in `src/data/images.js` so they can be swapped for the salon's real photos later.
- Never use Fezo's Instagram photos without permission.

---

## 10. Accessibility & performance
- WCAG AA contrast (see color rules), visible focus rings (thin gold outline), semantic landmarks, one H1.
- Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- Preload hero image + display font; lazy-load the rest; avoid layout shift (CLS < 0.1).

---

## 11. Security
v1 is static (no backend, no secrets).
- No secrets in repo; `.env` in `.gitignore`.
- Booking form: validate (service from fixed list, date ≥ today, time within hours, name ≤ 50 chars letters/spaces, phone digits only). Build WhatsApp URL with `encodeURIComponent` only.
- No `dangerouslySetInnerHTML`, no `eval`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- `vercel.json` headers: CSP (`default-src 'self'; img-src 'self' https://images.unsplash.com data:; frame-src https://www.google.com https://maps.google.com; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'`), HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- `npm audit` clean before deploy.

---

## 12. Repo, deploy & demo rules
- Private GitHub repo `fezos-site`, clear commits, README (run, deploy, how to edit data/images).
- Vercel deploy from GitHub (auto-deploy on push).
- Demo until the owner approves:
  - `<meta name="robots" content="noindex, nofollow">` + `robots.txt` disallow all.
  - Footer credit: "Démo réalisée par Taha Hajjout — proposition de site web".
- SEO ready for launch: French title "Fezo's Beauty Lounge — Salon de beauté à Fès", meta description, `BeautySalon` JSON-LD, Open Graph image, hreflang FR/EN/AR.

---

## 13. Tech stack & structure
- **Vite + React** (JS or TS), **Tailwind CSS v4** (`@tailwindcss/vite`, tokens in `@theme`), **Framer Motion** (`motion` package), **Lucide React**, `@fontsource/cormorant-garamond`, `@fontsource/jost`.
- No other UI libraries. The panorama viewer and carousel are custom.

```
src/
  data/salon.js        # business info, services, packs, reviews, hours, offer, i18n strings
  data/images.js       # all image URLs
  components/ui/       # Button, Eyebrow, SectionTitle, Section, Container, Reveal, ImageFrame, Modal, Tabs...
  components/sections/ # Header, Hero, OfferBanner, Intro, Treatments, PriceList, PanoramaTour, Packs, Why, Gallery, Reviews, Location, FinalCta, Footer, StickyMobileBar, BookingModal
  hooks/               # useOpenStatus, useLang, useScrollHeader
  lib/whatsapp.js      # safe message builder
  App.jsx
```

---

## 14. Build order (one step per prompt — wait for my "next")
1. Tailwind tokens (§4), fonts, base styles, `Reveal` + motion constants.
2. `src/data/salon.js` + `src/data/images.js` (verify image URLs load).
3. UI components (§5).
4. Header + Hero + Offer banner.
5. Intro + Treatments grid.
6. Price list (tabs) + Packs.
7. **PanoramaViewer** + Visite 360° section.
8. Pourquoi Fezo's + Gallery (lightbox) + Reviews.
9. Location & hours + Final CTA + Footer + StickyMobileBar.
10. Booking modal + WhatsApp builder.
11. i18n FR/EN/AR (RTL).
12. SEO, noindex, robots.txt, `vercel.json`, a11y + Lighthouse pass, overflow check at 360px.
13. **Taste review:** go section by section with the taste plugin + ui-styling; list weaknesses and fix them.

---

## 15. Definition of done (check every section)
- [ ] Looks premium at 375px AND 1440px (screenshot both).
- [ ] Uses only tokens; no raw hex/px in components.
- [ ] One italic gold accent word per main title.
- [ ] Reveal animation smooth, content visible without JS, reduced-motion respected.
- [ ] No horizontal overflow, no broken images, no console errors.
- [ ] Nothing from the "Forbidden" list (§3).
- [ ] All text real (no lorem), French correct with accents.

---

## 16. Later (v2 — not now)
Real booking backend (Node/Express + MySQL), admin dashboard (appointments, slots, no-shows), WhatsApp/SMS reminders, owner edits services/prices/offers → monthly subscription.

## 17. To confirm with the owner
Real price list & durations · real photos + a real 360° panorama of the salon · team & specialties · logo file & exact brand color (orange vs gold) · Arabic version wanted?
