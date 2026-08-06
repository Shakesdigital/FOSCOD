# FOSCOD website and Supabase CMS

A Next.js 15 website and editorial CMS for the Foundation for Sustainable Community-Based Development (FOSCOD). Public copy and seed content are grounded in the 2026 Online Audit Report, the 2026-2030 Strategic Plan, and the approved website fact sheet in `CONTENT.md`.

The design system, “Murram & Nile,” uses warm limestone, biochar, murram red, Nile teal, solar-maize gold, and forest green. Typography uses Fraunces, Public Sans, and IBM Plex Mono.

## Run locally

```bash
npm install
npm run dev
```

The public site has conservative source-grounded fallbacks, so it can be reviewed before Supabase is connected. Unverified stories, testimonials, opportunities, dates, and outcome figures are not published as fallback content.

## Connect Supabase

1. Create a Supabase project.
2. Copy `.env.local.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
   - `NEXT_PUBLIC_SITE_URL`
3. Apply every SQL file in `supabase/migrations` in numeric order (`0001` through `0011`).
4. Run `supabase/seed.sql` once the migrations finish.
5. Restart the development server.

### Create the first administrator

1. Add a user in Supabase Authentication.
2. In `profiles`, set that user’s role to `super_admin`.
3. Sign in at `/admin/login`.

## Editorial workflow

- `/admin/content` manages pages, reusable modules, programs, sub-programs, activities, projects, impact stories, statistics, team, partners, testimonials, resources, FAQs, heroes, opportunities, and module ordering.
- `/admin/media` uploads approved field images to the `foscod-media` bucket. Alt text is mandatory.
- `/admin/submissions` receives public form submissions.
- `/admin/settings` manages safe public settings and branding values.
- Keep records in `draft` until names, permissions, dates, images, statistics, and partner claims are verified.
- Impact statistics marked `verified` require an as-of date and source note.
- Testimonials require confirmed permission; quoted impact stories require confirmed or anonymized consent.

## Architecture

| Area | Location |
| --- | --- |
| Approved content source | `CONTENT.md` |
| Public pages | `app/` |
| Shared interface | `components/ui`, `components/site` |
| Admin CMS | `app/admin/` |
| CMS collection definitions | `lib/cms-collections.ts` |
| Content layer | `lib/content.ts`, `lib/projects.ts`, `lib/opportunities.ts` |
| Supabase clients | `lib/supabase/` |
| Schema and RLS | `supabase/migrations/` |
| Starter content | `supabase/seed.sql` |
| SEO | route metadata, `app/sitemap.ts`, `app/robots.ts` |

## Security and accessibility

- Row Level Security protects every CMS table. Public reads are restricted to published or visible records, while staff writes require an approved role.
- The admin route guard is defense-in-depth; RLS remains the data security boundary.
- Secrets belong in environment variables or Supabase secrets, never in editable settings.
- Image-bearing CMS records enforce alt text, and the media library will not accept an upload without it.

Payment processing and outbound email still require the organization’s chosen providers and credentials before activation.
