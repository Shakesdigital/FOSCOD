# GLE Volunteer & Internship landing pages — design (small change)

## Intent
Two full-detail landing pages selling the Volunteer and Internship programs to their
target audiences, borrowing the section structure of the former FOSCOD website's
volunteer/internship pages but rebuilt in the current design system, with content
drafted from the "FOSCOD website information request" brief (GLE description, program
types, thematic areas, engagement approaches, ethical-engagement commitment).

## Approaches considered
1. CMS-driven (new Supabase tables per section) — matches the CMS-first pattern but
   heavy: migrations, admin wiring, seed data for two pages before anything renders.
2. **Static content in `lib/gle-landing.ts` + reusable section components (chosen)** —
   pages render fully today, follow the existing fallback-data convention
   (CMS tables can be added later per section if needed), smallest diff.
3. Single parameterized route `/programs/global-learning-exchange/[type]` — less code,
   but the two pages need genuinely different CTAs, tones and section emphasis, and
   dynamic segments complicate metadata/sitemap. Rejected.

## Structure (both pages, distinct content/tone)
HeroSlider → sticky anchor sub-nav → About (#about) → Program types (#types, image
cards with expandable "read more") → Package & benefits (#package, expandable cards) →
Who can apply (#eligibility, photo band) → Live opportunities (#opportunities,
CardsCarousel of CMS listings filtered by type) → Impact (#impact, verified
impact_stats) → Start dates (#dates, CMS ProgramDatesTable with empty-state) → Fees
(#fees band → /programs/program-fees, no invented figures) → Duration (#duration) →
Location (#location, Buikwe/Jinja/Iganga) → How to apply (#how, numbered cards — the
brief's five "How we develop your experience" stages) → FAQs (#faqs) → participant
voices (#voices, TestimonialCarousel filtered by intern/volunteer alumni) → CTABand.

Volunteer page: forest tone, service/cultural-exchange framing, volunteer package &
benefits, volunteer alumni quotes.
Internship page: water tone, career/academic framing, internship package & benefits,
named-supervisor/outputs/handover emphasis, intern alumni quotes.

## New code
- `lib/gle-landing.ts` — all content for both pages + testimonial filter.
- `components/site/gle-landing.tsx` — SubNav (sticky anchor strip), PhotoBand
  (duotone/photo section with overlay card), ExpandableCard ("read more" card).
  All server components (details/summary — no JS).
- `app/programs/global-learning-exchange/{volunteer,internship}/page.tsx`.

## Wiring changes
- `lib/site.ts` — Volunteer/Internship as children of the GLE nav item.
- `lib/content.ts` — heroSlides keys `gle-volunteer`/`gle-internship`;
  `gleProgramCardsFallback` hrefs → new pages.
- `app/apply/page.tsx` — TYPE_ALIASES `volunteer`/`internship` → individual placement row.
- `app/sitemap.ts` — two new routes.

## Non-goals
No new Supabase tables/migrations; no invented fees, dates, or statistics (fees link
out; dates render from CMS with an honest empty state; stats come from verified
impact_stats). No fabricated photos — existing gradient/photo-slot system is used
until real photography is loaded.
