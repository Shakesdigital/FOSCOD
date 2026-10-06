# FOSCOD website and Supabase CMS

A Next.js 15 website and editorial CMS for the Foundation for Sustainable Community-Based Development (FOSCOD). Public copy and seed content are grounded in the 2026 Online Audit Report, the 2026-2030 Strategic Plan, and the approved website fact sheet in `CONTENT.md`.

The design system, "Murram & Nile," uses warm limestone, biochar, murram red, Nile teal, solar-maize gold, and forest green. Typography uses Fraen, Public Sans, and IBM Plex Mono.

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
   - `RESEND_API_KEY` (see [Form submission notifications](#form-submission-notifications))
3. Apply every SQL file in `supabase/migrations` in numeric order (`0001` through `0024`).
4. Run `supabase/seed.sql` once the migrations finish.
5. Deploy the Edge Function: `supabase functions deploy notify-form-submission`.
6. Restart the development server.

### Create the first administrator

1. Add a user in Supabase Authentication.
2. In `profiles`, set that user's role to `super_admin`.
3. Sign in at `/admin/login`.

## Editorial workflow

- `/admin/content` manages pages, reusable modules, programs, sub-programs, activities, projects, impact stories, statistics, team, partners, testimonials, resources, FAQs, heroes, opportunities, and module ordering.
- `/admin/media` uploads approved field images to the `foscod-media` bucket. Alt text is mandatory.
- `/admin/submissions` receives public form submissions.
- `/admin/settings` manages safe public settings and branding values.
- Keep records in `draft` until names, permissions, dates, images, statistics, and partner claims are verified.
- Impact statistics marked `verified` require an as-of date and source note.
- Testimonials require confirmed permission; quoted impact stories require confirmed or anonymized consent.

## Form submission notifications

When a visitor submits a form on the site (application, contact, donation inquiry, etc.), the submission is saved to the `form_submissions` table and an automated email notification is sent to the admin address.

**How it works:**

1. `/api/submit` saves the submission to `form_submissions`.
2. The API route invokes the `notify-form-submission` Supabase Edge Function.
3. The Edge Function reads the notification email from `settings.notification_email` and sends an HTML email via [Resend](https://resend.com).
4. A record is inserted into `form_submission_notifications` for audit trail.

**Setup:**

1. Create a Resend account and generate an API key at https://resend.dev.
2. Set `RESEND_API_KEY` as a Supabase secret: `supabase secrets set RESEND_API_KEY=re_...`
3. Optionally update the notification email in the admin panel at `/admin/settings` or directly via SQL:
   ```sql
   UPDATE public.settings SET value = '{"email":"your-email@example.org"}' WHERE key = 'notification_email';
   ```
4. Deploy the Edge Function: `supabase functions deploy notify-form-submission`
5. Run Supabase locally with `supabase start`, then serve functions: `supabase functions serve`

**Admin panel:** View sent notifications and submission records at `/admin/submissions`.

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
| Edge Functions | `supabase/functions/` |
| SEO | route metadata, `app/sitemap.ts`, `app/robots.ts` |

## Security and accessibility

- Row Level Security protects every CMS table. Public reads are restricted to published or visible records, while staff writes require an approved role.
- The admin route guard is defense-in-depth; RLS remains the data security boundary.
- Secrets belong in environment variables or Supabase secrets, never in editable settings.
- Image-bearing CMS records enforce alt text, and the media library will not accept an upload without it.

Payment processing and outbound email still require the organization's chosen providers and credentials before activation.
