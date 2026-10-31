# Admin UI Kit Skill

**Use when building a page-centric CMS admin backend for Next.js + Supabase projects that need a Shakes Travel-style content workspace.**

## What this skill covers

This skill documents the complete pattern for building a page-centric admin backend that replaces scattered collection lists with a page-oriented workspace. It is **not** a code generator — it is a reference skill that, when followed, produces the exact same UI structure, file layout, and behavioral patterns as the FOSCOD redesign.

## Core patterns (the "always do these")

### 1. Page registry (`lib/cms-pages.ts`)

Define every public landing page as a `CmsPageDef` entry. Each page has:

- `key` — short identifier used in URLs
- `title` — display name in the sidebar
- `path` — public route
- `description` — shown on the page index
- `sections` — ordered array of `PageSection` values

Each section is one of:

- **records** — editable list of rows from a Supabase collection. Must have:
  - `collection` — key matching an entry in `cmsCollectionMap`
  - `filter` — optional `{ column, value }` to scope rows to this page (e.g. `{ column: "page_slug", value: "home" }`)
  - `sort` — `{ column, ascending }` defaults to `created_at` desc
  - `max` — cap on rows fetched (default 100)
  - `single` — if true, only one row exists; shows an "Add" form + inline editor for that one row
  - `presets` — Record<string, string> pre-filled on "Add" (e.g. `{ page_slug: "home" }`)

- **link** — a "Managed in X" link that points to another section (e.g. featured story linking to `/admin/articles`).

Every section gets a `sectionCollection(section)` selector function that resolves the `CmsCollection` from the registry, and the page editor uses it to fetch rows up-front.

### 2. ContentForm extension (`app/admin/(dashboard)/content/ContentForm.tsx`)

The `ContentForm` component accepts two new props:

- `presets?: Record<string, string>` — values shown as defaults when the "Add" modal opens. The field renderer uses `current?.[field.name] ?? presets?.[field.name]` so the preset wins if no existing row is open.
- `returnTo?: string` — admin path to return to after save (defaults to the collection page). The form renders a hidden `<input name="returnTo" />`; server actions read it and revalidate both the base path and the collection page.

**Field value resolution:** `value={current?.[field.name] ?? presets?.[field.name]}` — presets only apply on the "Add" form, never on inline editors of existing rows.

### 3. Server actions with returnBase (`app/admin/(dashboard)/content/actions.ts`)

Two helpers:

- `returnBase(formData, collectionKey)` — extracts `returnTo` from form data; if it starts with `/` and isn't `//`, uses it; otherwise defaults to `/admin/content/${collectionKey}`.
- **Save flow:** compute `base = returnBase(formData, collectionKey)` → do the Supabase update → `revalidatePath(base)` + `revalidatePath(\"/admin/content/${collectionKey}\")` → `redirect(\`${base}?saved=1\`)`.

**Delete flow:** same `returnBase` pattern → `revalidatePath(base)` + `revalidatePath(\"/admin/content/${collectionKey}\")` → `redirect(\`${base}?deleted=1\`)`.

### 4. Sidebar navigation (`app/admin/(dashboard)/layout.tsx`)

Replace the generic "Content hub" nav with exactly five sections:

```tsx
const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/components", label: "Components" },
  { href: "/admin/settings", label: "Website settings" },
  { href: "/admin/forms", label: "Forms" },
];
```

Keep the collection machinery reachable at `/admin/content/*` as an escape hatch; only the nav changes.

### 5. Page editor (`app/admin/(dashboard)/pages/[page]/page.tsx`)

The page editor for any landing page:

1. Resolves the page def from `cmsPageMap[key]` — fails with `notFound()` if unknown.
2. Fetches rows for every `kind: "records"` section up-front, guarded on `supabase?.from(collection.table)` being truthy before chaining `.eq()` / `.order()` / `.limit()`.
3. Renders an **anchor rail** — `<a href="#section-${section.key}">section-label</a>` — allowing jumps to any section.
4. Each section shows:
   - Header with label + description + filter pill
   - If `section.kind === "link"`: a "Managed in X" card linking out
   - If `section.single`: a `ContentForm` with `current={rows[0]}` and `returnTo={returnTo}` for inline edit of the one row
   - If not single: a "Add {singular}" expandable + a list of existing rows, each with inline `ContentForm` + delete form
5. Save/delete both bounce back to the page editor via `returnTo`.

**Critical guard:** before chaining `builder!.eq(...)` / `builder!.order(...)`, verify `builder` is truthy. Use `builder?.limit(...)` with destructuring default `{ data: [] }` instead of `await builder!.limit(...)`.

### 6. Articles section (`app/admin/(dashboard)/articles/page.tsx`)

Grouped cards linking into the existing collection editors. Each card shows the collection label + description as a link to `/admin/content/${key}`. Groups typically cover:

- Story articles + impact-stories + impact-story-details
- Article categories (every article must fall in a category)
- Supporting evidence / impact-stats

### 7. Components section (`app/admin/(dashboard)/components/page.tsx`)

Manage-existing scope only — grouped cards of reusable building blocks (hero slides, card grids, testimonials, FAQs, modules, media library). Each card links to `/admin/content/${key}`. No new public-page wiring.

### 8. Website Settings (`app/admin/(dashboard)/settings/page.tsx`)

Grouped into three categories:

- **Brand & appearance** — settings, media library (uploads + organizes site images)
- **Navigation** — header, footer, mobile menus, footer columns, quick links
- **Technical** — legacy redirects, shared media records

Each group shows collections as links to `/admin/content/${key}`.

### 9. Forms section (`app/admin/(dashboard)/forms/`)

Four categories with live submission counts, status filter tabs, and status-action buttons per submission:

- **Application** — program applications, internships, volunteer, group bookings
- **Donation** — donation enquiries
- **Partnership & collaboration** — partner apps, collaboration proposals, contact enquiries
- **Newsletter** — signups + subscriber list table

Per category page:

- Header with "All" + status filter pills (new / reviewing / actioned / archived)
- Submission list: each shows type, payload entries, status badge, created_at, and "Move to:" dropdown with forms for each status transition
- Status transition: POST to `/admin/forms/${category}` with `{ id, status, category }` — server action updates the row, revalidates both the category page and `/admin/forms`
- Subscriber table under newsletter (queries `newsletter_subscribers`)
- Statuses: `"new"`, `"reviewing"`, `"actioned"`, `"archived"` — styled with distinctive background classes

**Server action:** `updateSubmissionStatus(formData)` — validates id + status, Supabase update, `revalidatePath(\"/admin/forms/${category}\")` + `revalidatePath(\"/admin/forms\")`.

### 10. Dashboard / overview (`app/admin/(dashboard)/page.tsx`)

Quick counts + quick-links cards:

- `count(table)` helper using Supabase `select(*, { count: "exact", head: true })`
- Cards: Landing pages, Blog stories, Impact stories, Form submissions, Newsletter subscribers — each links to its section
- Section links: Pages, Articles, Components, Settings, Forms

### 11. Supabase URL guard (`lib/supabase/client.ts`)

```ts
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  // Guard placeholders (e.g. PASTE_YOUR_PROJECT_URL_HERE) — invalid URL throws 500 on login.
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  } catch {
    return null;
  }
  return createBrowserClient(url, key);
}
```

This prevents the pre-existing 500 crash when `.env.local` has placeholder values.

## Anti-patterns (never do these)

- **Never chain `.eq()` / `.order()` / `.limit()` on a potentially-falsy supabase client** — always guard with `if (builder)` or use optional chaining `builder?.`.
- **Never omit the `returnBase` revalidation double‑tap** — both `revalidatePath(base)` and `revalidatePath(\"/admin/content/${collectionKey}\")` are required for the page editor to update.
- **Never skip the URL protocol guard** on `createClient` — placeholder URLs cause a 500 on the login page.
- **Never build a new public-page wiring** for components — the skill explicitly says "manage existing scope only."
- **Never forget the `presets` distinction** — presets only apply on "Add", never on inline editors of existing rows. The field renderer must use `current?.[field.name] ?? presets?.[field.name]`.

## Example: minimal project scaffolding

When starting a new Next.js + Supabase project that needs this admin pattern, follow this sequence:

1. **Create `lib/cms-collections.ts`** — define the 5 cluster keys ("pages", "articles", "components", "settings", "forms") and each collection's field schema. Reuse field definitions (text, textarea, wysiwyg, boolean, number, select, date, json, url, image) across collections.
2. **Create `lib/cms-pages.ts`** — define every landing page + its sections + which collection each section maps to + any page_slug filters + presets.
3. **Extend `ContentForm`** with `presets` + `returnTo` props (as documented).
4. **Extend `saveContent` / `deleteContent`** with `returnBase` + double revalidation.
5. **Replace the sidebar nav** with the 5-section layout.
6. **Build the page editor** for your home page first, using the anchor rail pattern.
7. **Add the Articles, Components, Settings, and Forms sections** using the grouped patterns.
8. **Add the URL guard** to `createClient` before testing with placeholder env vars.

## Testing this skill

To verify an agent has correctly applied this skill, check:

- [ ] `lib/cms-pages.ts` has every landing page as a `CmsPageDef` with sections that resolve to collections via `sectionCollection()`.
- [ ] `ContentForm` accepts `presets` and `returnTo`; field renderer uses `current?.[field.name] ?? presets?.[field.name]`.
- [ ] Server actions use `returnBase` and revalidate both `base` and `/admin/content/${collectionKey}`.
- [ ] Sidebar nav has exactly 5 items: Overview, Pages, Articles, Components, Website Settings, Forms.
- [ ] Page editor guards `builder` before chaining `.eq()` / `.order()` and uses `builder?.limit()` with `{ data: [] }` default.
- [ ] Forms section has status pills + transition forms + subscriber table under newsletter.
- [ ] `createClient()` has the URL protocol guard.
- [ ] No new public-page wiring on the Components section.

## Version

1.0 — initial release, matches the FOSCOD redesign exactly.