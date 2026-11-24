"use client";

import type { OpportunityCategory } from "@/lib/opportunity-model";

/** A single global landing filter (maps to one or more `experience_type` slugs). */
export type GlobalLandingFilterKey =
  | "group"
  | "individual"
  | "service-trip"
  | "study-tour";

export type OpportunityFilterValue = {
  /** top-level category, or "all" */
  category: "all" | OpportunityCategory;
  /** project area (opportunity `category` value) or "" for all */
  project: string;
  /** thematic area (sector slug) or "" for all */
  theme: string;
  /** selected global landing filters */
  formats: GlobalLandingFilterKey[];
};

export const EMPTY_OPPORTUNITY_FILTER: OpportunityFilterValue = {
  category: "all",
  project: "",
  theme: "",
  formats: [],
};

/** The four "global landing" filters and the experience_type slugs each maps to. */
export const GLOBAL_LANDING_FILTERS: {
  key: GlobalLandingFilterKey;
  label: string;
  experienceTypes: string[];
}[] = [
  { key: "group", label: "Group projects", experienceTypes: ["group-project", "coordinated-group"] },
  { key: "individual", label: "Individual projects", experienceTypes: ["individual"] },
  { key: "service-trip", label: "Global service trip projects", experienceTypes: ["service-learning-trip"] },
  { key: "study-tour", label: "Study tour projects", experienceTypes: ["study-tour"] },
];

const CATEGORY_OPTIONS: { value: "all" | OpportunityCategory; label: string }[] = [
  { value: "all", label: "All opportunities" },
  { value: "cedp", label: "Community Environment Development" },
  { value: "gle", label: "Global & Education-Led" },
];

function FilterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-[family-name:var(--font-text)] text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent-700)]">
      {children}
    </h4>
  );
}

/**
 * OpportunityFilterSidebar — the vertical filter tool that stays in focus
 * (sticky) while the visitor scrolls the opportunity listings.
 *
 * Sections:
 *   1. Category — Community Environment Development vs Global & Education-Led
 *   2. Filters  — Project (area) and Thematic area
 *   3. Global landing filters — group / individual / service trip / study tour
 */
export function OpportunityFilterSidebar({
  value,
  onChange,
  projectOptions,
  themeOptions,
  resultCount,
}: {
  value: OpportunityFilterValue;
  onChange: (next: OpportunityFilterValue) => void;
  projectOptions: string[];
  themeOptions: { slug: string; label: string }[];
  resultCount: number;
}) {
  const set = (patch: Partial<OpportunityFilterValue>) => onChange({ ...value, ...patch });

  const toggleFormat = (key: GlobalLandingFilterKey) => {
    const next = value.formats.includes(key)
      ? value.formats.filter((f) => f !== key)
      : [...value.formats, key];
    set({ formats: next });
  };

  const hasActiveFilters =
    value.category !== "all" || value.project !== "" || value.theme !== "" || value.formats.length > 0;

  return (
    <aside
      className="md:sticky md:top-24 md:self-start"
      aria-label="Filter opportunities"
    >
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.05rem] font-medium text-[var(--ink)]">Filter opportunities</h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => onChange(EMPTY_OPPORTUNITY_FILTER)}
              className="text-[0.78rem] font-medium text-[var(--accent-700)] underline underline-offset-4 hover:text-[var(--accent-600)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* 1. Category */}
        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <FilterSectionTitle>Category</FilterSectionTitle>
          <div className="mt-3 space-y-1.5" role="radiogroup" aria-label="Category">
            {CATEGORY_OPTIONS.map((opt) => {
              const active = value.category === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => set({ category: opt.value })}
                  className={`flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-left text-[0.88rem] transition-colors ${
                    active
                      ? "bg-[var(--accent-600)] text-white"
                      : "text-[var(--ink-soft)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      active ? "border-white" : "border-[var(--border-strong)]"
                    }`}
                    aria-hidden
                  >
                    {active && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Filters — project + thematic area */}
        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <FilterSectionTitle>Filters</FilterSectionTitle>

          <div className="mt-3">
            <label
              htmlFor="opp-filter-project"
              className="mb-1.5 block text-[0.78rem] font-medium text-[var(--ink-soft)]"
            >
              Project
            </label>
            <select
              id="opp-filter-project"
              value={value.project}
              onChange={(e) => set({ project: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-[0.88rem] outline-none focus:border-[var(--accent-600)]"
            >
              <option value="">All projects</option>
              {projectOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <label
              htmlFor="opp-filter-theme"
              className="mb-1.5 block text-[0.78rem] font-medium text-[var(--ink-soft)]"
            >
              Thematic area
            </label>
            <select
              id="opp-filter-theme"
              value={value.theme}
              onChange={(e) => set({ theme: e.target.value })}
              className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-[0.88rem] outline-none focus:border-[var(--accent-600)]"
            >
              <option value="">All thematic areas</option>
              {themeOptions.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Global landing filters */}
        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <FilterSectionTitle>Global landing filters</FilterSectionTitle>
          <div className="mt-3 space-y-1.5">
            {GLOBAL_LANDING_FILTERS.map((f) => {
              const active = value.formats.includes(f.key);
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleFormat(f.key)}
                  className={`flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-left text-[0.88rem] transition-colors ${
                    active
                      ? "bg-[var(--accent-50)] text-[var(--accent-700)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                      active
                        ? "border-[var(--accent-600)] bg-[var(--accent-600)] text-white"
                        : "border-[var(--border-strong)] bg-[var(--surface)]"
                    }`}
                    aria-hidden
                  >
                    {active && (
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    )}
                  </span>
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <p
          className="mt-5 border-t border-[var(--border)] pt-4 text-[0.8rem] text-[var(--muted)]"
          aria-live="polite"
        >
          {resultCount} {resultCount === 1 ? "opportunity" : "opportunities"} match
        </p>
      </div>
    </aside>
  );
}