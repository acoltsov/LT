# LinkTrades — Marketing Website

**One network for the trades.** This is the pre-launch marketing site for LinkTrades, a mobile-first job marketplace for the trades launching in the window & door install niche. It replaces fragmented WhatsApp/Facebook groups with a single, searchable industry network built on a verified, confirmed-job reputation system.

Single-page site: sticky nav → hero (with Helper ⇄ Contractor toggle + animated app mockup) → mission → interactive how-it-works stepper → **reputation centerpiece** (animated stats, Crew Card tier explorer, double-blind review demo, anti-gaming rules) → features → audiences → pricing → FAQ → waitlist → footer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-checks (tsc -b) + production build to dist/
npm run preview  # serve the production build locally
```

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 (CSS-first config in `src/index.css`) · Framer Motion · lucide-react.

Fonts: **Raleway** (display), **Inter** (body), **JetBrains Mono** (data/numbers), loaded from Google Fonts in `index.html`.

## Where to edit content

All copy that changes often lives in `src/data/` — edit there, not in components:

| File | Contents |
|---|---|
| `src/data/tiers.ts` | The 5 Crew Card tiers (names, taglines, colors) + a typical sample profile per tier |
| `src/data/reviewQuestions.ts` | Review questions for both directions + "what stood out" tags |
| `src/data/jobFlow.ts` | How-it-works stages, product wording, off-ramp note |
| `src/data/features.ts` | Feature grid + trade types for the marquee |
| `src/data/pricing.ts` | Plans, Featured Job add-on, pricing disclaimer |
| `src/data/faq.ts` | FAQ questions & answers |

Section-specific copy (hero headlines, mission story, audience benefits) lives at the top of the matching component in `src/components/`.

## Waitlist backend — TODO

The form is fully wired UI-side (role select, validation, loading, success states) but **does not store signups anywhere**. The integration point is `src/lib/waitlist.ts` → `submitWaitlist()` — replace its body with a real backend call (a commented Supabase example is included in the file). The "#N on the list" number shown on success is a **per-device localStorage demo counter**, labeled as such in the UI; remove or replace it when the backend is real.

## Design system (short version)

- **Pure white** base with ink/navy neutrals (`slate` scale). Highlights: **lime green** (`lime-400/500` fills with ink text, `lime-700` for small text on white), **pale green** tints (`lime-500/15` washes, pale gridlines), and **off-white** section bands (`--color-cream`, `#f7f8f1`). Trust-green `#10B981` stays reserved for reliability/positive stats.
- **Interactive gridlines**: the blueprint grid in the hero, reputation, and waitlist sections is a canvas (`src/components/ui/WarpGrid.tsx`) that behaves like a spacetime fabric — the cursor acts as a dense mass and nearby lines are pulled inward, gravity-well style, springing back when it leaves. On touch, press and hold: the longer you hold, the deeper and wider the well gets (scrolling releases it). It renders a static grid under `prefers-reduced-motion` and only animates while on-screen.
- Dark mode: class-based (`dark` on `<html>`), persisted to `localStorage("lt-theme")`, defaults to system preference; a pre-paint script in `index.html` prevents theme flash.
- CTA fills use dark ink text on lime (not white) deliberately — white-on-lime fails WCAG contrast.
- All motion respects `prefers-reduced-motion` (Framer Motion `useReducedMotion` + CSS media query for the marquee).

## Deployment

Pushed to GitHub with a Pages workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)): every push to `main` builds and deploys. The page carries `<meta name="robots" content="noindex, nofollow">` so it stays out of search engines — share it by URL.

## Assumptions & content notes

- **Pricing is indicative.** The source plan only names "premium packages" and "sponsored/featured job listings"; the Free/Pro/Business tiers, dollar amounts, and Featured Job add-on price are invented placeholders and labeled *"Indicative — pre-launch"* on the page.
- **No real traction is claimed.** There are no user counts, press logos, or testimonials. The profile ("Marco D."), contractor ("Alex M."), jobs, and reviews shown are demo/sample data — the profile is tagged "Sample profile" and the review demo is labeled as a demo.
- **App store buttons are placeholders** marked "Coming soon"; social icons are placeholders (generic icons, no live links).
- **Tier wording** ("Crew Card") is lightly polished from the source doc per the brief (e.g. "Can watch you working. No-show. BS." → "Unreliable — a history of no-shows." / "Not recommended").
- Tagline chosen: **"One network for the trades."** The other two candidates appear as supporting copy (hero sub-line and footer).
- Locations/pay rates in demo job cards (Etobicoke, Oakville, $28/hr…) are plausible GTA examples informed by the source plan's Ontario context, not real postings.
- The Helper ⇄ Contractor toggle state is shared across hero, audiences, and the waitlist role pre-selection via a small React context (`src/hooks/useRole.tsx`).
