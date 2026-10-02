"use client";

import { useMemo, useState } from "react";
import type { ImpactStory, CedpAreaOfFocus, GleDevelopmentSector, ProjectListItem, SubProgram } from "@/lib/content";
import type { GridCard } from "@/components/site/blocks";
import { CardGrid } from "@/components/site/blocks";
import { ImpactArchiveFilter, type ArchiveFilterValue } from "@/components/site/ImpactArchiveFilter";

/** Strategic goals that map to each CEDP area of focus. */
const goalToCedpArea: Record<number, string> = {
  1: "clean-energy-climate-resilience",
  2: "clean-energy-climate-resilience",
  3: "water-sanitation-health-communities",
  4: "sustainable-livelihoods-economic-empowerment",
  5: "sustainable-livelihoods-economic-empowerment",
  6: "clean-energy-climate-resilience",
};

const STORIES_PER_PAGE = 8;

export function ImpactStoryGrid({
  allStories,
  cedpAreas,
  gleSectors,
  subPrograms,
  projects,
}: {
  allStories: ImpactStory[];
  cedpAreas: CedpAreaOfFocus[];
  gleSectors: GleDevelopmentSector[];
  subPrograms: SubProgram[];
  projects: ProjectListItem[];
}) {
  // Read initial filter state from URL query params (safe for SSR)
  const getInitialFilter = (): ArchiveFilterValue => {
    try {
      if (typeof window === "undefined") return { program: "ALL", cedpArea: "", gleSector: "", project: "" };
      const params = new URLSearchParams(window.location.search);
      return {
        program: (params.get("program") as ArchiveFilterValue["program"]) || "ALL",
        cedpArea: params.get("area") || "",
        gleSector: params.get("sector") || "",
        project: params.get("project") || "",
      };
    } catch {
      return { program: "ALL", cedpArea: "", gleSector: "", project: "" };
    }
  };

  const [filter, setFilter] = useState<ArchiveFilterValue>(getInitialFilter);

  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL query params with filter changes
  const handleFilterChange = (next: ArchiveFilterValue) => {
    setFilter(next);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (next.program !== "ALL") params.set("program", next.program);
    if (next.cedpArea) params.set("area", next.cedpArea);
    if (next.gleSector) params.set("sector", next.gleSector);
    if (next.project) params.set("project", next.project);

    const query = params.toString();
    const url = window.location.pathname + (query ? `?${query}` : "");
    try {
      window.history.replaceState({ filter: next }, "", url);
    } catch {
      // History API may not be available in some edge environments
    }
  };

  const visibleStories = useMemo(() => {
    return allStories.filter((story) => {
      // Primary filter: program
      if (filter.program !== "ALL" && story.linked_program !== filter.program) {
        return false;
      }
      // Secondary filter: CEDP area of focus
      if (filter.cedpArea) {
        if (!story.linked_sub_program_id) return false;
        const sub = subPrograms.find((s) => s.id === story.linked_sub_program_id);
        if (!sub || !sub.strategic_goal) return false;
        if (goalToCedpArea[sub.strategic_goal] !== filter.cedpArea) return false;
      }
      // Secondary filter: GLE development sector
      if (filter.gleSector) {
        if (!story.linked_gle_sector_id) return false;
        const sector = gleSectors.find((s) => s.id === story.linked_gle_sector_id);
        if (sector?.slug !== filter.gleSector) return false;
      }
      // Project filter
      if (filter.project) {
        if (story.linked_project_id !== filter.project) return false;
      }
      return true;
    });
  }, [allStories, filter, subPrograms, gleSectors]);

  // Pagination
  const totalPages = Math.ceil(visibleStories.length / STORIES_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const paginatedStories = visibleStories.slice(startIndex, startIndex + STORIES_PER_PAGE);

  const cards: GridCard[] = paginatedStories.map((story) => ({
    title: story.title,
    excerpt:
      story.quote ||
      (story.narrative
        ? story.narrative.slice(0, 140) + (story.narrative.length > 140 ? "…" : "")
        : null) ||
      "Verified community-led change from FOSCOD's work.",
    href: `/impact/stories/${story.slug}/full`,
    tone: story.linked_program === "GLE" ? "water" : "forest",
    media: true,
    imageUrl: story.hero_image_url,
    imageAlt: story.community_voice || story.title,
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
            <ImpactArchiveFilter
              cedpAreas={cedpAreas}
              gleSectors={gleSectors}
              projects={projects}
              onChange={handleFilterChange}
            />
          </aside>

          {/* Main content: cards + pagination */}
          <div className="min-w-0">
            {cards.length ? (
              <>
                <CardGrid
                  eyebrow="Impact stories"
                  title="Verified change on the ground"
                  intro="Stories are published with evidence and consent from the communities where FOSCOD works."
                  items={cards}
                  columns={2}
                />
                {visibleStories.length > STORIES_PER_PAGE && (
                  <p className="mt-4 text-center text-sm text-[var(--muted)]">
                    Showing {startIndex + 1}–{Math.min(startIndex + STORIES_PER_PAGE, visibleStories.length)} of {visibleStories.length} stories
                  </p>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[var(--muted)]">
                  No impact stories match this filter yet. Try adjusting the program or sub-filter.
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
