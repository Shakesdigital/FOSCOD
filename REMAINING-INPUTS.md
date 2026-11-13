# Remaining inputs, credentials and dependencies

Everything below is blocked on FOSCOD-side decisions or external accounts. The site is built to work around each gap without inventing content.

## Factual inputs (unanswered sections of the website information request)

1. **About page detail** — founding-year history text for public display, board/staff names approved for publication, communities-served framing (info-request §3). Currently the site uses only verified `CONTENT.md` facts (registration INDR143472008NB, Kasigwa Road Plot 2 office, board chair and executive director names from the fact sheet).
2. **Approved public contacts & social links** — confirm which email/phone are public and which social accounts are official (§4). Site uses the budget-brief contact set (foscoduganda@gmail.com, +256 772 989971) and the social handles in `lib/site.ts` — needs FOSCOD sign-off.
3. **Fees** — approved fees or the quotation process, inclusions/exclusions, accommodation/transport arrangements, cancellation terms per opportunity (§10). The Fees page currently describes the structure without inventing amounts; CMS `program-fees` content needs real figures.
4. **Program dates** — `program_dates` table is empty; the dates section renders only when rows exist. The old hardcoded "2027 intake schedule" was removed because it was unverifiable.
5. **Testimonials and impact stories** — all 18 seeded testimonial/story records were demoted to draft: their names, quotes and figures were authored as illustrative content, never verified. Real stories need a named person, confirmed permission, and what may be published (§21). The Impact page now leads with budget-brief accomplishments (dated, sourced).
6. **Opportunities** — the 8 seeded opportunities are `draft`: each needs host confirmation, named supervisor, dates, capacity and availability status before publishing (§23–24). Partner-hosted listings also need partner permission to name the organization.
7. **Alumni content** — `alumni_profiles` table is live but empty; profiles come from verified participation records with consent (§ on alumni). The Alumni Network page stays out of public navigation until activated.

## Credentials / external accounts

8. **Payment provider** — online giving is structured but NOT active. Needed: provider choice (e.g. Flutterwave/Paystripe-class gateway supporting Uganda/UGX), account approval, API keys (server-side only). Then: configure the provider, connect checkout to `donation_transactions`, deploy the server-side confirmation webhook, and update the donate page FAQ. Until then the donate page records giving enquiries only.
9. **Email notifications** — form submissions are saved to the database; admin email notification needs `RESEND_API_KEY` set as a Supabase secret and `supabase functions deploy notify-form-submission`. Visitor-facing acknowledgement emails are not automated.
10. **First admin user** — create a user in Supabase Auth, then set their `profiles.role` to `super_admin`.

## Environment

- Supabase project connected (URL + anon + service keys in `.env.local`, never committed).
- JWT secret shared in chat during setup should be rotated in the Supabase dashboard (treat as exposed).

## Known limitations

- Draft/publish status is enforced by RLS; the admin UI is defense-in-depth. Full authenticated click-through of every admin screen has not been performed (no admin account exists yet).
- Section headings are code-managed by design; all copy/records are CMS-editable.
- The opportunities directory shows only published openings; with none published it shows an honest empty state with alternative actions.
