"use client";

import { useMemo, useState } from "react";
import type { ProjectListItem } from "@/lib/content";
import type { GridCard } from "@/components/site/blocks";
import { CardGrid } from "@/components/site/blocks";
import { ProjectArchiveFilter, type ProjectArchiveFilterValue } from "@/components/site/ProjectArchiveFilter";

const PROJECTS_PER_PAGE = 8;

export function ProjectArchiveGrid({
  allProjects,
}: {
  allProjects: ProjectListItem[];
}) {
  // Read initial filter state from URL query params (safe for SSR)
  const getInitialFilter = (): ProjectArchiveFilterValue => {
    try {
      if (typeof window === "undefined") return { program: "ALL", theme: "" };
      const params = new URLSearchParams(window.location.search);
      return {
        program: (params.get("program") as ProjectArchiveFilterValue["program"]) || "ALL",
        theme: params.get("theme") || "",
      };
    } catch {
      return { program: "ALL", theme: "" };
    }
  };

  const [filter, setFilter] = useState<ProjectArchiveFilterValue>(getInitialFilter);

  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL query params with filter changes
  const handleFilterChange = (next: ProjectArchiveFilterValue) => {
    setFilter(next);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (next.program !== "ALL") params.set("program", next.program);
    if (next.theme) params.set("theme", next.theme);

    const query = params.toString();
    const url = window.location.pathname + (query ? `?${query}` : "");
    try {
      window.history.replaceState({ filter: next }, "", url);
    } catch {
      // History API may not be available in some edge environments
    }
  };

  const visibleProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Primary filter: program
      if (filter.program !== "ALL" && project.linked_program !== filter.program) {
        return false;
      }
      // Theme filter
      if (filter.theme && project.theme !== filter.theme) {
        return false;
      }
      return true;
    });
  }, [allProjects, filter]);

  // Pagination
  const totalPages = Math.ceil(visibleProjects.length / PROJECTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = visibleProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const cards: GridCard[] = paginatedProjects.map((project) => ({
    title: project.title,
    excerpt: `${project.theme}${project.location ? ` · ${project.location}` : ""}`,
    href: `/projects/${project.slug}`,
    tone: project.linked_program === "GLE" ? "water" : "forest",
    media: true,
    imageUrl: project.featured_image_url ?? undefined,
    imageAlt: project.title,
  }));

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[288px_1fr]">
          {/* Sidebar filters — sticky on scroll */}
          <aside className="md:sticky md:top-24 md:self-start">
            <ProjectArchiveFilter
              projects={allProjects}
              onChange={handleFilterChange}
            />
          </aside>

          {/* Main content: cards + pagination */}
          <div className="min-w-0">
            {cards.length ? (
              <>
                <CardGrid
                  eyebrow="Projects"
                  title="Community-led change in action"
                  intro="Each project is designed and led by the communities where FOSCOD works, with evidence and consent."
                  items={cards}
                  columns={2}
                />
                {visibleProjects.length > PROJECTS_PER_PAGE && (
                  <p className="mt-4 text-center text-sm text-[var(--muted)]">
                    Showing {startIndex + 1}–{Math.min(startIndex + PROJECTS_PER_PAGE, visibleProjects.length)} of {visibleProjects.length} projects
                  </p>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[var(--muted)]">
                  No projects match this filter yet. Try adjusting the program or theme.
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
