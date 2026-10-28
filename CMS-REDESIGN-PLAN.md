# FOSCOD CMS Redesign — Stage Plan

Goal: replace the scattered collection-list admin with a Shakes Travel-style,
page-centric CMS. Five sidebar sections: **Pages · Articles · Components ·
Website Settings · Forms** (+ Overview). Public site and schema keep working;
this is admin UI + glue config on top of the existing tables.

Reference design: shakestravel.com/admin — landing-pages list → single page
editor with every section in front-end order, each editable, one Save.

## Stages

- [x] **S1 — New shell.** Sidebar: Overview, Pages, Articles, Components,
      Website Settings, Forms. Remove "Content hub" from nav (keep the
      collection machinery for reuse). Verify: nav renders, build passes.
- [x] **S2 — Page editor framework + Home.** `lib/cms-pages.ts` registry:
      page → ordered section editors (reusing collection field schemas +
      ContentForm machinery). Home editor: hero slides, talking-about-us,
      programs teaser, audience paths, responsible engagement, featured story,
      involvement cards, partners. Verify: save a field, see it on the public
      homepage.
- [x] **S3 — All landing pages via config.** About, CEDP, GLE, Projects,
      Stories, Apply, Volunteer, Internships, Contact, Donate, Team,
      Opportunities. Related lists live inside their page editor.
- [x] **S4 — Articles.** Stories + impact stories with category picker
      (article_categories, seeded defaults), category management, filter.
- [x] **S5 — Forms.** Tabs: Application / Donation / Partnership &
      Collaboration / Newsletter. Submissions under each, with status actions
      (new → reviewing → actioned → archived).
- [x] **S6 — Components (manage-existing scope).** Section/component library
      grouped by type (hero, cards, stats, testimonials, FAQ, CTA, gallery,
      form embed…). No new public-page wiring this pass (user decision).
- [x] **S7 — Website Settings.** Brand colors, fonts, logos, image settings,
      navigation, footer, notification email.
- [x] **S8 — Verify.** (Build + type-check clean; all routes 200. Full
      authenticated click-through with real data still pending — Supabase
      not configured in local `.env.local`.) `next build` clean + browser click-through on dev
      server; fix fallout.

## Rules

- No table drops; migrations only additive (0029 already in place — may need
  seeding of default categories).
- Every save path keeps existing business rules (actions.ts).
- Old routes stay reachable during transition; nav is what changes.
