"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import {
  OpportunityFilterSidebar,
  GLOBAL_LANDING_FILTERS,
  EMPTY_OPPORTUNITY_FILTER,
  type OpportunityFilterValue,
} from "@/components/site/OpportunityFilterSidebar";
import {
  opportunityCategory,
  type OpportunitySummary,
} from "@/lib/opportunity-model";

const PER_PAGE = 8;

export type OpportunityLandingFacets = {
  projects: string[];
  themes: { slug: string; label: string }[];
};

/** Build the set of experience_type slugs accepted by the active global
 *  landing filters (empty array = no format constraint). */
function selectedExperienceTypes(formats: OpportunityFilterValue["formats"]): string[] {
  if (formats.length === 0) return [];
  return GLOBAL_LANDING_FILTERS.filter((f) => formats.includes(f.key)).flatMap(
    (f) => f.experienceTypes
  );
}

export function OpportunitiesLanding({
  opportunities,
  facets,
  initialType,
}: {
  opportunities: OpportunitySummary[];
  facets: OpportunityLandingFacets;
  /** preselect the internship/volunteer classification (from ?type=) */
  initialType?: "internship" | "volunteer";
}) {
  const [filter, setFilter] = useState<OpportunityFilterValue>(() => ({
    ...EMPTY_OPPORTUNITY_FILTER,
    // `?type=` only narrows the classification; it does not map to a category.
  }));
  const [classification, setClassification] = useState<"all" | "internship" | "volunteer">(
    initialType ?? "all"
  );
  const [page, setPage] = useState(1);

  const handleFilterChange = (next: OpportunityFilterValue) => {
    setFilter(next);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const allowedTypes = selectedExperienceTypes(filter.formats);
    return opportunities.filter((o) => {
      if (filter.category !== "all" && opportunityCategory(o) !== filter.category) return false;
      if (classification !== "all" && o.type !== classification) return false;
      if (filter.project && o.category !== filter.project) return false;
      if (filter.theme && !(o.sector_slugs ?? []).includes(filter.theme)) return false;
      if (allowedTypes.length > 0 && (!o.experience_type || !allowedTypes.includes(o.experience_type)))
        return false;
      return true;
    });
  }, [opportunities, filter, classification]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), pageCount));
    if (typeof window !== "undefined") {
      document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container-page grid gap-8 md:grid-cols-[300px_1fr] md:gap-10">
      {/* Left: sticky filter tool */}
      <OpportunityFilterSidebar
        value={filter}
        onChange={handleFilterChange}
        projectOptions={facets.projects}
        themeOptions={facets.themes}
        resultCount={filtered.length}
      />

      {/* Right: card listings */}
      <div className="min-w-0">
        {/* classification chips (from ?type= deep links) + result count */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Classification">
            {(
              [
                { value: "all", label: "All" },
                { value: "internship", label: "Internships" },
                { value: "volunteer", label: "Volunteering" },
              ] as const
            ).map((c) => {
              const active = classification === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setClassification(c.value);
                    setPage(1);
                  }}
                  className={`rounded-[var(--radius-full)] px-4 py-1.5 text-[0.82rem] font-medium transition-colors ${
                    active
                      ? "bg-[var(--accent-600)] text-white"
                      : "border border-[var(--border-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <p className="font-[family-name:var(--font-text)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>

        {shown.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {shown.map((o, i) => (
              <OpportunityCard key={o.slug} o={o} index={i + (current - 1) * PER_PAGE} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-lg font-medium">No openings match right now</p>
            <p className="mx-auto mt-2 max-w-md text-[var(--ink-soft)]">
              Openings are listed only when a host community, supervisor and role details are confirmed.
              Try clearing a filter, or express general interest and we&apos;ll help you find a fit.
            </p>
          </div>
        )}

        {/* pagination */}
        {pageCount > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
            <button
              type="button"
              disabled={current <= 1}
              onClick={() => goToPage(current - 1)}
              className="rounded-[var(--radius-md)] border border-[var(--border-strong)] px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-[var(--muted)]">
              Page {current} of {pageCount}
            </span>
            <button
              type="button"
              disabled={current >= pageCount}
              onClick={() => goToPage(current + 1)}
              className="rounded-[var(--radius-md)] border border-[var(--border-strong)] px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}