# GLE five-page restructure design

## Intent

Organize Global Learning Exchange (GLE) information across the existing overview, Volunteer and Internship URLs, plus the already-started Opportunities and Application URLs. Help visitors understand the five program types, choose cross-cutting themes and complementary approaches, and carry those selections into an adaptive application.

## Goals

- Use the Word document verbatim for new GLE content, correcting only typographic spacing.
- Preserve existing GLE page copy, photos, URLs, global header/footer, and FOSCOD design tokens/components.
- Provide multi-select themes, complementary engagement choices, guidance options, and a prefilled application.
- Keep the existing experience responsive and keyboard-accessible.

## Non-goals

- No redesign of the site theme, header, footer, or unrelated pages.
- No stock photography, new external dependencies, or CMS schema migration.
- No automatic promise or confirmation of a specific placement.

## Approaches

1. Add CMS tables and an editor for each new section. Rejected: this adds schema and administration work unrelated to the requested page reorganization.
2. **Reuse the in-progress GLE content module and current page components, with a small URL-state helper and a shared client selector. Chosen:** keeps document copy centralized, reuses existing page content and photo sources, and needs no new dependencies.
3. Build five independent page implementations. Rejected: it duplicates shared thematic/engagement content and makes selection behavior inconsistent.

## Structure and decisions

- Page URLs: `/programs/global-learning-exchange`, `/volunteer`, `/internship`, `/opportunities`, and `/apply` under the existing GLE route.
- Page 1 retains the existing GLE hero and overview content while adding the document introduction, opportunity copy, and matching section.
- Pages 2 and 3 retain their existing page content and add the shared thematic and engagement selector after the specified existing section.
- Pages 4 and 5 use the current GLE hero, navigation strip, cards, section bands, and timeline patterns.
- Selection state travels to Page 5 in URL parameters (`pathway`, repeated `theme` and `engagement`, optional `primary`, and guidance flags).
- Trip/tour programs use learning focus and in-person participation; other placements can choose engagement approaches and participation format.
- Existing dirty GLE route/component changes are in-scope user work and must be integrated, not reset.

## Constraints

- Do not modify the global design tokens, site header, footer, or unrelated routes.
- Use existing site photo sources only.
- Keep all GLE document wording, headings, lists, and italic notes intact.
- Add only functional UI copy; list all additions in the completion report.
