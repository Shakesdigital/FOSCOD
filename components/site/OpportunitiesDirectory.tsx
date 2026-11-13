"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import type { OpportunitySummary } from "@/lib/opportunities";

const PER_PAGE = 9;

const CLASSIFICATION_LABELS: Record<string, string> = {
  internship: "Internship",
  volunteer: "Volunteering",
};

export type OpportunityFacets = {
  experienceTypes: { slug: string; label: string }[];
  sectors: { slug: string; label: string }[];
  locations: string[];
  formats: { slug: string; label: string }[];
};

/** Single-select filter pill-row + select hybrid: keep it simple and keyboard-accessible. */
function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={`filter-${label.replace(/\s+/g, "-").toLowerCase()}`}
        className="mb-1.5 block font-[family-name:var(--font-text)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]"
      >
        {label}
      </label>
      <select
        id={`filter-${label.replace(/\s+/g, "-").toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-[0.9rem] outline-none focus:border-[var(--accent-600)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function OpportunitiesDirectory({
  opportunities,
  facets,
  noun = "opportunities",
  initialType,
}: {
  opportunities: OpportunitySummary[];
  facets: OpportunityFacets;
  noun?: string;
  /** preselect the internship/volunteer classification (from ?type=) */
  initialType?: "internship" | "volunteer";
}) {
  const [query, setQuery] = useState("");
  const [experienceType, setExperienceType] = useState("all");
  const [sector, setSector] = useState("all");
  const [location, setLocation] = useState("all");
  const [format, setFormat] = useState("all");
  const [classification, setClassification] = useState(initialType ?? "all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((o) => {
      if (experienceType !== "all" && o.experience_type !== experienceType) return false;
      if (sector !== "all" && !(o.sector_slugs ?? []).includes(sector)) return false;
      if (location !== "all" && o.location !== location) return false;
      if (format !== "all" && o.participation_format !== format) return false;
      if (classification !== "all" && o.type !== classification) return false;
      if (q) {
        const haystack = [o.title, o.category, o.excerpt, o.location, o.duration].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [opportunities, query, experienceType, sector, location, format, classification]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const anyFilter =
    query || experienceType !== "all" || sector !== "all" || location !== "all" || format !== "all" || classification !== "all";

  return (
    <div className="container-page">
      {/* search */}
      <div className="mx-auto max-w-xl">
        <label htmlFor="opp-search" className="sr-only">Search {noun}</label>
        <div className="relative">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            id="opp-search"
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={`Search ${noun} by title, focus, or description…`}
            className="w-full rounded-[var(--radius-full)] border border-[var(--border-strong)] bg-[var(--surface)] py-3 pl-11 pr-4 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
          />
        </div>
      </div>

      {/* filters */}
      <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <FilterSelect
          label="Experience type"
          value={experienceType}
          onChange={(v) => { setExperienceType(v); setPage(1); }}
          options={[
            { value: "all", label: `All ${noun}` },
            ...facets.experienceTypes.map((f) => ({ value: f.slug, label: f.label })),
          ]}
        />
        <FilterSelect
          label="Thematic area"
          value={sector}
          onChange={(v) => { setSector(v); setPage(1); }}
          options={[
            { value: "all", label: "All sectors" },
            ...facets.sectors.map((f) => ({ value: f.slug, label: f.label })),
          ]}
        />
        <FilterSelect
          label="Location"
          value={location}
          onChange={(v) => { setLocation(v); setPage(1); }}
          options={[
            { value: "all", label: "All locations" },
            ...facets.locations.map((l) => ({ value: l, label: l })),
          ]}
        />
        <FilterSelect
          label="Participation format"
          value={format}
          onChange={(v) => { setFormat(v); setPage(1); }}
          options={[
            { value: "all", label: "All formats" },
            ...facets.formats.map((f) => ({ value: f.slug, label: f.label })),
          ]}
        />
        <FilterSelect
          label="Classification"
          value={classification}
          onChange={(v) => { setClassification(v); setPage(1); }}
          options={[
            { value: "all", label: "All classifications" },
            { value: "internship", label: CLASSIFICATION_LABELS.internship },
            { value: "volunteer", label: CLASSIFICATION_LABELS.volunteer },
          ]}
        />
      </div>

      {/* result count + reset */}
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between">
        <p className="text-sm text-[var(--muted)]" aria-live="polite">
          {filtered.length === 0
            ? `No ${noun} match your filters yet`
            : `${filtered.length} ${noun === "opportunities" ? (filtered.length === 1 ? "opportunity" : "opportunities") : noun}`}
        </p>
        {anyFilter && (
          <button
            type="button"
            onClick={() => {
              setQuery(""); setExperienceType("all"); setSector("all");
              setLocation("all"); setFormat("all"); setClassification("all"); setPage(1);
            }}
            className="text-sm text-[var(--accent-700)] underline underline-offset-4 hover:text-[var(--accent-600)]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* grid */}
      {shown.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((o, i) => (
            <OpportunityCard key={o.slug} o={o} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <p className="text-lg font-medium">No openings match right now</p>
          <p className="mx-auto mt-2 max-w-md text-[var(--ink-soft)]">
            Openings are listed only when a host community, supervisor and role details are confirmed. You can
            still express interest without selecting a specific opening, or ask FOSCOD for guidance.
          </p>
        </div>
      )}

      {/* pagination */}
      {pageCount > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
          <button
            type="button"
            disabled={current <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-[var(--radius-md)] border border-[var(--border-strong)] px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-[var(--muted)]">Page {current} of {pageCount}</span>
          <button
            type="button"
            disabled={current >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="rounded-[var(--radius-md)] border border-[var(--border-strong)] px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}

export { CLASSIFICATION_LABELS };
