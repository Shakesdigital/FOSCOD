"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import type { OpportunitySummary } from "@/lib/opportunities";

const PER_PAGE = 9;

export function OpportunityBrowser({
  opportunities,
  categories,
  noun = "opportunities",
}: {
  opportunities: OpportunitySummary[];
  categories: string[];
  noun?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Projects");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((o) => {
      const matchesCategory = category === "All Projects" || o.category === category;
      const matchesQuery =
        !q ||
        o.title.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q) ||
        o.excerpt.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [opportunities, query, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function pick(cat: string) {
    setCategory(cat);
    setPage(1);
  }

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
            placeholder={`Search ${noun} by title, category, or description…`}
            className="w-full rounded-[var(--radius-full)] border border-[var(--border-strong)] bg-[var(--surface)] py-3 pl-11 pr-4 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
          />
        </div>
      </div>

      {/* category pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => pick(cat)}
              aria-pressed={active}
              className={`rounded-[var(--radius-full)] px-4 py-1.5 text-[0.82rem] font-medium transition-colors ${
                active
                  ? "bg-[var(--accent-600)] text-white"
                  : "border border-[var(--border-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* count */}
      <p className="mt-6 text-center font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
        Showing {shown.length} of {filtered.length} {noun}
      </p>

      {/* grid */}
      {shown.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((o, i) => (
            <OpportunityCard key={o.slug} o={o} index={i + (current - 1) * PER_PAGE} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-[var(--muted)]">
          No {noun} match your search. Try another category or keyword.
        </p>
      )}

      {/* pagination */}
      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current}
              className={`h-9 w-9 rounded-[var(--radius-md)] text-[0.9rem] font-medium transition-colors ${
                n === current
                  ? "bg-[var(--accent-600)] text-white"
                  : "border border-[var(--border-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
