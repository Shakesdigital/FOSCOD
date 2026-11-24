# GLE Five-Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the five connected GLE pages and an adaptive application that preserves the current FOSCOD look and existing GLE content.

**Architecture:** Keep source-document copy in `lib/gle-pages.ts`; retain existing Volunteer/Internship copy in `lib/gle-landing.ts` and current CMS getters. Use a small pure helper for URL serialization/prefill and one shared client selector for themes and engagement options.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Node 22 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-23-gle-five-page-restructure-design.md`

## Global Constraints

- Do not change the site theme, brand colors, typography, logo, global header, footer, or unrelated pages.
- New GLE copy comes verbatim from the Word document; only typographic spacing may be corrected.
- Preserve existing GLE content, imagery, and URLs unless this request explicitly changes placement or links.
- Use only existing site photos and existing design-system components; add no dependencies.
- Every addition to rendered UI copy must be listed under `[ADDED]` in the final report.

## Review Focus

- Repeated, missing, or invalid query parameters: test that valid multi-select choices round-trip and irrelevant values do not become selected.
- A visitor requesting guidance without selecting a program: test that the flow can advance while retaining any other selections.
- Service-Learning Trip and Study Tour: test that they expose only in-person participation and learning focus, not virtual participation or engagement checkboxes.
- Empty selections: test that the summary tray remains usable and the application guidance option is non-blocking.
- Keyboard/mobile behavior: verify labels, visible focus, and compact accordion/disclosure behavior at a narrow viewport.

---

### Task 1: URL state and program-mode helpers

**Files:**
- Create: `lib/gle-selections.ts`
- Create: `tests/gle-selections.test.mjs`

**Interfaces:**
- Produces `buildGleApplicationHref(pathway, selections, applicationPath?)`, `parseGleApplicationSelections(searchParams, allowedThemes)`, and `isGleLearningFocusProgram(program)`.
- Repeated `theme` and `engagement` parameters preserve multiple selections; optional values include `pathway`, `primary`, `programGuidance`, `themeGuidance`, and `approachGuidance`.

- [x] **Step 1: Write failing tests** for multi-value URL round-trip, absent/invalid values, and trip/tour program detection.
- [x] **Step 2: Run** `node --experimental-default-type=module --experimental-strip-types --test tests/gle-selections.test.mjs`; confirmed the expected missing-module failure.
- [x] **Step 3: Implement** the smallest pure helper using `URLSearchParams`.
- [x] **Step 4: Re-run** `node --experimental-default-type=module --experimental-strip-types --test tests/gle-selections.test.mjs`; all 3 assertions passed.

### Task 2: Shared thematic and engagement selectors

**Files:**
- Create: `components/site/gle-selectors.tsx`
- Modify: `components/site/gle-page.tsx` only if needed to remove obsolete display-only selector exports.

**Interfaces:**
- `GleSelectionSections({ pathway })` renders thematic cards, complementary engagement checkboxes, the optional primary emphasis, guidance checkboxes, placement notes, and the summary tray.
- Thematic choices span both CEDP and partner sectors without a category-first interaction.

- [x] **Step 1: Use the Task 1 helper to generate the Application URL** with the current pathway and all selections.
- [x] **Step 2: Implement** the two selector sections and a summary tray using current tokens, cards, pills, and button styles.
- [x] **Step 3: Verify** repeated selections and both guidance flags round-trip; multi-select and primary-choice cleanup pass tests, and typecheck passes.

### Task 3: Overview and Opportunities pages

**Files:**
- Modify: `app/programs/global-learning-exchange/page.tsx`
- Modify: `app/programs/global-learning-exchange/opportunities/page.tsx`
- Modify: `components/site/gle-page.tsx`
- Modify: `app/sitemap.ts`

- [x] **Step 1: Integrate** the document introduction, Explore copy, and Matching section on Page 1 in the requested order.
- [x] **Step 2: Restore the existing overview About, Volunteer/Internship cards, six benefit cards, and photo CTA** using existing copy and current GLE photo sources.
- [x] **Step 3: Render all five document program types on Page 4** with current GLE photos and distinct destinations for the individual vs. other program types.
- [x] **Step 4: Add the five-page switcher and sitemap entries** without touching the global navigation or footer.

### Task 4: Volunteer and Internship pages

**Files:**
- Modify: `app/programs/global-learning-exchange/volunteer/page.tsx`
- Modify: `app/programs/global-learning-exchange/internship/page.tsx`
- Modify: `lib/gle-landing.ts`

- [x] **Step 1: Retain the existing page sections and copy** from the current shared page data and render in the user-specified section order.
- [x] **Step 2: Insert shared selectors** after Volunteer Opportunities on Page 2 and after Internship Packages & Benefits on Page 3.
- [x] **Step 3: Add pathway breadcrumbs and anchor links** for Thematic Areas and Engagement Approach.
- [x] **Step 4: Repoint application CTAs and the first How to Apply step link** to Page 5 with `pathway=volunteer` or `pathway=internship`.

### Task 5: Application page and form

**Files:**
- Modify: `app/programs/global-learning-exchange/apply/page.tsx`
- Modify: `components/forms/GleApplicationForm.tsx`

- [x] **Step 1: Keep Page 5 document sections in order**, adding the ethical-engagement photo/text layout and the existing application form.
- [x] **Step 2: Parse pathway and selection parameters** into initial form state; add the individual Internship/Volunteer sub-choice.
- [x] **Step 3: Adapt Steps 3 and 4** for placements vs. trips/tours, with in-person default for trips/tours and no virtual option there.
- [x] **Step 4: Keep inline validation, review, and placement caveat**; `/api/submit` remains the form submission endpoint.

### Task 6: Verification

**Files:**
- Test: `tests/gle-selections.test.mjs`
- Verify the five GLE routes and their internal links.

- [x] Run `node --experimental-default-type=module --experimental-strip-types --test tests/gle-selections.test.mjs`.
- [x] Run `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Smoke-check all five GLE routes, selector-to-application prefill, trip/tour vs. group participation options, and route console errors in a browser. Checked the 566px browser viewport and existing `focus-visible`/`focus-within` styles; the in-app browser did not dispatch Tab to a control for a keyboard interaction test.

**Verification note:** The production build passed after the code fixes. A later identical rerun failed during page-data collection with a Windows write/path error while an unowned `next start -p 3010` process was active in this workspace; that process was left untouched.
