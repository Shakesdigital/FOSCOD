# FOSCOD — website + Supabase CMS

A rebuild of [foscod.org](https://www.foscod.org) as a modern **Next.js 15** site backed by a **Supabase** CMS (Postgres + Auth + Storage + RLS). Built from the *FOSCOD Website Rebuild Content Pack*.

Design system **"Murram & Nile"**: warm limestone paper, biochar near-black ink, and a tri-accent rooted in the work — murram red (action), Nile teal (water/WASH), solar-maize gold (energy), with a quiet forest green. Type: **Fraunces** (display) + **Public Sans** (body) + **IBM Plex Mono** (eyebrows & impact data). Everything is token-driven, and branding tokens are overridable from the CMS.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

The site renders with built-in default content **before** Supabase is connected, so you can preview the design immediately. The admin panel shows a "connect Supabase" notice until env is set.

## Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.local.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose)
   - `NEXT_PUBLIC_SITE_URL`
3. Apply the schema (SQL editor or CLI), in order:
   - `supabase/migrations/0001_foundation.sql`
   - `supabase/migrations/0002_content.sql`
   - `supabase/seed.sql` (settings, redirects, starter content)
4. Restart `npm run dev`. The public pages now read from the database, and the admin panel unlocks.

### Create the first admin

1. In the Supabase dashboard → Authentication → add a user (email + password).
2. In Table editor → `profiles`, set that user's `role` to `super_admin`.
3. Sign in at `/admin/login`.

## Architecture

| Area | Where |
| --- | --- |
| Design tokens | `app/globals.css` (`:root` vars + Tailwind `@theme`) |
| Public pages | `app/` (home, about, programs, projects, impact, stories, get-involved, contact) |
| Shared UI | `components/ui`, `components/site/blocks.tsx` |
| Admin CMS | `app/admin/` (login + guarded `(dashboard)` group) |
| Content layer | `lib/content.ts`, `lib/projects.ts` (Supabase → built-in fallback) |
| Settings → tokens | `lib/settings.ts` injects branding overrides into `:root` |
| Supabase clients | `lib/supabase/{client,server,admin}.ts` |
| Auth + pathname | `middleware.ts` |
| Schema + RLS | `supabase/migrations/` |
| Redirects (legacy URLs) | `next.config.mjs` + `redirects` table |
| SEO | per-page metadata, `app/sitemap.ts`, `app/robots.ts` |

### Security model

- Row Level Security on every table. Public reads are limited to `published` / `visible` rows and safe settings groups; all writes require a staff role (`super_admin`/`admin`/`editor`) enforced in the database via `is_staff()` / `is_admin()`.
- The admin route guard (`app/admin/(dashboard)/layout.tsx`) is defense-in-depth, **not** the security boundary — RLS is.
- Secrets (email/provider keys) belong in env vars / Edge Function secrets, never the editable `settings` table.

## What's complete vs. next

**Complete:** design system; all primary public pages (so nothing in the nav 404s); homepage with pathways, featured projects, impact, testimonials, partners, stories; interactive program finder + fee selector; all public forms wired to `form_submissions`; full Supabase schema + RLS + seed; legacy redirect map; sitemap/robots; auth + guarded admin shell with dashboard, projects list, submissions viewer, and a branding-aware settings editor.

**Next (schema already supports it):** rich create/edit forms for every entity (programs, projects, stories, team, partners, testimonials, FAQs, pages, impact metrics); media library + Storage upload/picker; replace photo placeholders with real FOSCOD field photography; payment gateway on Donate; email notifications on submissions (Edge Function); per-entity SEO editing UI.

> Photos: the site uses designed placeholders (`components/ui/PhotoSlot.tsx`) wherever real FOSCOD field photography belongs. Swap these for media-library images as they're uploaded.
