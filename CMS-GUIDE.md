# FOSCOD CMS — content management guide

A plain-language guide for nontechnical staff. Sign in at `/admin/login` (Supabase Auth account with an approved role in `profiles`).

## The five admin areas

| Area | What it manages |
|---|---|
| **Pages** | Every public landing page, section by section, in front-end order. Edit a section's records, save, and the public page updates. |
| **Articles** | Stories, impact records, insights, testimonials, alumni profiles, project evidence. |
| **Components** | Shared building blocks: heroes, cards, stats, FAQs, galleries. |
| **Website Settings** | Menus, footer, contacts, branding, notification email, sector taxonomies, GLE experience types, engagement approaches, participation formats. |
| **Forms** | Applications, donation enquiries, partnership enquiries, newsletter subscribers, donation campaigns and transaction records — with statuses and internal review. |

## Everyday workflows

**Publish a page section:** Pages → pick the page → edit the section's record → Save. Draft/publish status controls public visibility; `visible`/`order` controls placement.

**Add an opportunity:** Pages → Opportunities → Open opportunities → create a record. Fill every field a listing needs: host, purpose, learning goals, tasks, eligibility, supervision, timing, practical arrangements, capacity, costs, application requirements, availability status and "date last confirmed". Set status `published` only when details are verified. The directory filters (experience type, thematic area, location, format, internship/volunteering classification) read from these fields.

**Handle an application:** Forms → Application submissions. Status flow: new → reviewing → actioned → archived. Every submission is stored with its full payload; nothing is published automatically. Acknowledgement emails to visitors are not automated — reply from the team inbox.

**Partnership enquiries:** Forms → Partnership. The form distinguishes local host organizations, universities/educational institutions, development/funding/technical partners, and other proposals.

**Donation enquiries:** Forms → Donation. Online payment is not yet active (see REMAINING-INPUTS.md); enquiries are recorded, and `Donations: Campaigns` manages what donors can support. `Donations: Transactions` holds provider-linked payment records once a provider is connected — statuses are confirmed only through the provider's server-side process.

**Publish a story or testimonial:** Articles → the record → set status `published` only when consent (for people) or verification (for figures) is on record. Seeded testimonial/story records were demoted to draft because their names, quotes and figures were never verified — re-publish from the CMS only with real consent and evidence.

**Alumni (prepared, not launched):** Articles → Alumni profiles. A profile goes public only when the alumni member's consent is recorded AND staff set it visible; contact emails are staff-only and never render publicly. The Alumni Network page is reachable at `/alumni` but deliberately kept out of the main navigation until activated.

## Content rules

1. Never publish a figure without a date and a source (the accomplishments section shows its source line automatically).
2. Image records require alt text — the media library enforces it.
3. Distinguish delivered outputs from measured changes; label future priorities as indicative.
4. Credit communities and partners (e.g. WRFA, Myriad Canada) — attribution fields exist on every evidence record.
5. GLE is "Global Learning Exchange Program (GLE)"; CEDP is "Community Empowerment and Development Program (CEDP)" — always in full at first mention.

## What is code-managed

Section headings and structural templates live in the codebase (a deliberate design decision from the CMS rebuild); all copy, records, lists, menus, footer, contacts and settings are CMS-editable. To change headings or add a new section type, ask the developer.
