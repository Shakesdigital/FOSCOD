# FOSCOD website + CMS redesign — delta design

Date: 2026-11-12 · Status: awaiting approval
Builds on: existing Next.js 15 + Supabase project in this repo (CMS stages S1–S8 complete, 30 migration files, "Murram & Nile" design system).

## Intent

Deliver the complete FOSCOD site per the 2026-11 brief: public site managed end-to-end through the CMS, restructured GLE (5 experience types, 4 selection dimensions), CEDP re-cast to 3 focus areas, one opportunities directory with applications, partnership + contact forms, donation journey, alumni prepared-but-hidden, all grounded in the two supplied source documents. No invented facts.

## Evidence base (source-of-truth rules)

| Source | Use |
|---|---|
| Director responses (info-request docx) | Names (GLE = Global Learning Exchange Program; CEDP), GLE 5 types + 4 dimensions + ethical-engagement copy |
| Budget brief PDF (Nov 2026) | CEDP accomplishments 2022–Oct 2026 with locations/partner attribution (WRFA, Myriad Canada); legal/contact facts; FY 2027/28 *indicative* priorities |
| `CONTENT.md` (existing verified) | Org facts, mission/vision/values, 2024-verified track record, named partners/projects, 2030 targets, fees/policies where present |
| Unanswered info-request sections | Keep existing verified content; mark gaps in `REMAINING-INPUTS.md`; never invent |

Conflicts resolved: CEDP = 3 focus areas (latest director response wins over old 6 sub-programs); GLE = 5 experience types (internship/volunteer become *classifications* on opportunities and application fields, not top-level programs).

## Approaches considered

1. **Complete on existing codebase (chosen)** — restructure content model + pages, additive migrations, seed from sources. Reuses working CMS, RLS, admin, design system.
2. Fix-gaps-only — rejected: GLE/CEDP content model would still fight the brief.
3. Greenfield rebuild — rejected: abandons working systems, violates "suitable to existing environment".

## What changes

### Public site
- **Home** — 4 purposeful sections: who FOSCOD is + two programs; verified impact strip; how to take part (opportunities/partner/support); latest story. CMS-driven.
- **GLE** — single program page per director's text: intro, 5 experience types (detail template each), 4-dimension selector explainer, "how we develop your experience", ethical commitment, CTA to opportunities + guidance enquiry. Replaces separate /internships, /volunteer program pages (redirects).
- **CEDP** — 3 focus areas (detail template each), budget-brief accomplishments distinguished outputs vs measured change, continuing vs conditional future priorities, communities credited.
- **Opportunities** — one searchable directory; filters: experience type, sector (CEDP 3 + 10 partner sectors), location, participation format, internship/volunteer classification. Detail template: host, purpose, learning goals, tasks, eligibility, supervision, timing, practical arrangements, availability status + last-confirmed date.
- **Plan your experience / Apply** — short multi-step flow (experience type → interests/format → details → review), carries selected opportunity + preferences, guidance-request option, group/trip coordinator path, matching-not-guarantee messaging. One flexible submission model.
- **Fees & practical information** — from CONTENT.md fees content; quotation process where fees unconfirmed.
- **Impact & stories** — 3 headline verified figures with source/period (from budget brief + CONTENT.md), stories/projects linked to program + opportunity.
- **About, Partnerships, Contact** — existing verified content; partnership form distinguishes 4 partner types.
- **Support / Donate** — purpose, giving options (general/project-specific), provider-backed payment structure with server-side verification, support-enquiry fallback until credentials configured. No card data stored.
- **Blog / Insights** — reuse article machinery, renamed public-facing as Insights.
- **Alumni** — page built, removed from public nav until activated; CMS model + moderated submissions ready.
- Footer carries policies, downloads, secondary links.

### Schema (additive migrations 0031+)
- `gle_experience_types` (5 rows), `thematic_sectors` (CEDP 3 + partner 10), `engagement_approaches`, `participation_formats` — CMS-managed taxonomies.
- `opportunities` extended: experience_type, sectors[], engagement_approach, participation_format, classification (internship/volunteer/both/na), learning_focus (trips/tours), availability_status, last_confirmed_at.
- `applications`/`form_submissions`: multi-step payload + type taxonomy (application/guidance/group/trip-coordinator/partnership-4-types/donation-inquiry/alumni/testimonial-moderation).
- `donations`: campaigns + provider-agnostic transactions (status: pending/failed/cancelled/confirmed via server-side webhook), no card fields.
- `alumni_profiles` (opt-in public flags, moderated) + testimonial moderation route.
- CEDP: replace 6-sub-program linkage with 3 focus areas; map existing content.

### CMS
- All new content types editable (draft/publish/unpublish/archive, ordering, alt text, SEO); settings for donation provider + notification routing; existing page-editor pattern reused; plain-language labels.

## Stage map (verifiable artifact each)

1. **S1 Schema + seed** — migrations 0031+ + full seed from sources applied to remote DB. Verify: REST probe returns seeded rows in every new/empty table.
2. **S2 GLE restructure** — GLE page + 5 type detail pages + redirects. Verify: all routes 200, old internship/volunteer URLs redirect.
3. **S3 CEDP restructure** — 3 focus areas + accomplishments with attribution. Verify: routes 200 + figures match budget brief.
4. **S4 Opportunities + apply flow** — directory filters + multi-step application. Verify: submit one of each submission type via UI; rows land in DB; acknowledgement only on success.
5. **S5 Donations** — journey + campaign records + transaction structure + fallback enquiry. Verify: flow renders; provider config surfaced as handoff in REMAINING-INPUTS.md.
6. **S6 Alumni + Insights + Impact** — hidden alumni page, Insights rename, impact page with sourced figures. Verify: alumni absent from nav but reachable by URL; Insights routes 200.
7. **S7 CMS coverage + docs** — every new type editable; CMS-GUIDE.md + REMAINING-INPUTS.md. Verify: edit one field per new collection and see it on public page.
8. **S8 Verify + polish** — build + typecheck clean; mobile nav; accessibility spot-checks; server restarted click-through of core paths. Report complete vs checked vs remaining.

## Non-goals

No extensive automated tests, no social-network features, no invented content, no payment activation without credentials, no alumni public launch.
