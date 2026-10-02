"use client";

import { useMemo, useState } from "react";
import type { Testimonial, ProjectListItem } from "@/lib/content";
import type { GridCard } from "@/components/site/blocks";
import { CardGrid } from "@/components/site/blocks";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { TestimonialArchiveFilter, type TestimonialArchiveFilterValue } from "@/components/site/TestimonialArchiveFilter";

const TESTIMONIALS_PER_PAGE = 8;

export function TestimonialArchiveGrid({
  allTestimonials,
  projects,
}: {
  allTestimonials: Testimonial[];
  projects: ProjectListItem[];
}) {
  // Read initial filter state from URL query params (safe for SSR)
  const getInitialFilter = (): TestimonialArchiveFilterValue => {
    try {
      if (typeof window === "undefined") return { program: "ALL", project: "" };
      const params = new URLSearchParams(window.location.search);
      return {
        program: (params.get("program") as TestimonialArchiveFilterValue["program"]) || "ALL",
        project: params.get("project") || "",
      };
    } catch {
      return { program: "ALL", project: "" };
    }
  };

  const [filter, setFilter] = useState<TestimonialArchiveFilterValue>(getInitialFilter);

  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL query params with filter changes
  const handleFilterChange = (next: TestimonialArchiveFilterValue) => {
    setFilter(next);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (next.program !== "ALL") params.set("program", next.program);
    if (next.project) params.set("project", next.project);

    const query = params.toString();
    const url = window.location.pathname + (query ? `?${query}` : "");
    try {
      window.history.replaceState({ filter: next }, "", url);
    } catch {
      // History API may not be available in some edge environments
    }
  };

  const visibleTestimonials = useMemo(() => {
    return allTestimonials.filter((t) => {
      // Primary filter: program
      if (filter.program !== "ALL" && t.linked_program !== filter.program) {
        return false;
      }
      // Project filter
      if (filter.project && t.linked_project_id !== filter.project) {
        return false;
      }
      return true;
    });
  }, [allTestimonials, filter]);

  // Pagination
  const totalPages = Math.ceil(visibleTestimonials.length / TESTIMONIALS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * TESTIMONIALS_PER_PAGE;
  const paginatedTestimonials = visibleTestimonials.slice(startIndex, startIndex + TESTIMONIALS_PER_PAGE);

  // Build cards with person's face, name, testimonial, project, and program
  const cards = paginatedTestimonials.map((t, i) => {
    const project = t.linked_project_id ? projects.find((p) => p.slug === t.linked_project_id) : undefined;
    const projectTitle = project?.title ?? t.linked_project_id ?? "—";

    return {
      key: t.name + i,
      testimonial: t,
      projectTitle,
      tone: (t.linked_program === "GLE" ? "water" : "forest") as "earth" | "water" | "forest",
      photoUrl: t.photo_url,
    };
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Sidebar filters */}
          <TestimonialArchiveFilter
            testimonials={allTestimonials}
            onChange={handleFilterChange}
          />

          {/* Main content: cards + pagination */}
          <div className="min-w-0 flex-1">
            {cards.length ? (
              <>
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--ink-soft)]">
                    Permissioned testimonials
                  </p>
                </div>
                <ul className="grid gap-6 md:grid-cols-2">
                  {cards.map((card) => (
                    <li
                      key={card.key}
                      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
                    >
                      <div className="relative">
                        {card.photoUrl ? (
                          <img
                            src={card.photoUrl}
                            alt={card.testimonial.name}
                            className="h-48 w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <PhotoSlot
                            tone={card.tone}
                            ratio="16/9"
                            caption={card.testimonial.name}
                            className="h-48 border-0 shadow-none"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                          {card.testimonial.cohort || "FOSCOD participant"}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--ink)]">
                          {card.testimonial.name}
                        </h3>
                        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">
                          {card.testimonial.quote}
                        </p>
                        <div className="mt-4 border-t border-[var(--border)] pt-3">
                          <p className="text-xs text-[var(--muted)]">
                            <span className="font-medium">Project:</span> {card.projectTitle}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            <span className="font-medium">Program:</span> {card.testimonial.program || card.testimonial.linked_program || "—"}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {visibleTestimonials.length > TESTIMONIALS_PER_PAGE && (
                  <p className="mt-4 text-center text-sm text-[var(--muted)]">
                    Showing {startIndex + 1}–{Math.min(startIndex + TESTIMONIALS_PER_PAGE, visibleTestimonials.length)} of {visibleTestimonials.length} testimonials
                  </p>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[var(--muted)]">
                  No testimonials match this filter yet. Try adjusting the program or project.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] cursor-not-allowed"
                      : "rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
                  }
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-soft)]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] cursor-not-allowed"
                      : "rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
                  }
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
