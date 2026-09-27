@AGENTS.md

# Paraval landing page

Waitlist landing page for Paraval, the human data and evaluation layer for AI, starting with Nigerian languages.

## Stack
- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4, deployed on Vercel.
- Supabase project `paraval` (ref `fhcbihqauijfarsqatam`, region eu-west-2).
- Three.js for the hero's chrome orbit ring (`src/components/hero/OrbitScene.tsx`), lazy-loaded.

## Data
- Tables: `contributor_waitlist`, `company_waitlist`, `benchmark_updates`.
- Row-level security: the public (anon/publishable) key may only INSERT. No select/update/delete.
- Inserts happen in server actions (`src/app/actions.ts`); allowed values live in `src/lib/options.ts`.
  Keep the DB check constraints in sync when changing options.
- Env: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Design rules
- Colors: ink #050505, graphite #2A2A2A, grey #8A8A8A, paper #F5F5F5. Monochrome only.
- Type: Instrument Serif for headings (`.display`, `<em>` for italic accents), Inter for body.
- Motifs: orbit lines, a single bright star, constellations, film grain. No clip-art robots.
- Budget: keep the page under 1 MB on slow networks; heavy visuals load lazily and respect reduced motion.
- Components from 21st.dev live in `src/components/ui/` with attribution comments.

## Placeholders to fill
- `src/lib/site.ts`: contact email and social links (hidden while empty).
- Privacy policy and terms are drafts; get a lawyer's review before the first paid contract.
