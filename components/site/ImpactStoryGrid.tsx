"use client";

import { useMemo, useState } from "react";
import type { ImpactStory, CedpAreaOfFocus, GleDevelopmentSector, SubProgram } from "@/lib/content";
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

export function ImpactStoryGrid({
  allStories,
  cedpAreas,
  gleSectors,
  subPrograms,
}: {
  allStories: ImpactStory[];
  cedpAreas: CedpAreaOfFocus[];
  gleSectors: GleDevelopmentSector[];
  subPrograms: SubProgram[];
}) {
  const [filter, setFilter] = useState<ArchiveFilterValue>({
    program: "ALL",
    cedpArea: "",
    gleSector: "",
  });

  const visibleStories = useMemo(() => {
    return allStories.filter((story) => {
      // Primary filter: program
      if (filter.program !== "ALL" && story.linked_program !== filter.program) {
        return false;
      }
      // Secondary filter: CEDP area of focus
      if (filter.program === "CEDP" && filter.cedpArea) {
        if (!story.linked_sub_program_id) return false;
        const sub = subPrograms.find((s) => s.id === story.linked_sub_program_id);
        if (!sub || !sub.strategic_goal) return false;
        return goalToCedpArea[sub.strategic_goal] === filter.cedpArea;
      }
      // Secondary filter: GLE development sector
      if (filter.program === "GLE" && filter.gleSector) {
        if (!story.linked_gle_sector_id) return false;
        const sector = gleSectors.find((s) => s.id === story.linked_gle_sector_id);
        return sector?.slug === filter.gleSector;
      }
      return true;
    });
  }, [allStories, filter, subPrograms, gleSectors]);

  const cards: GridCard[] = visibleStories.map((story, i) => ({
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

  return (
    <>
      <ImpactArchiveFilter
        cedpAreas={cedpAreas}
        gleSectors={gleSectors}
        onChange={setFilter}
      />

      {cards.length ? (
        <CardGrid
          eyebrow="Impact stories"
          title="Verified change on the ground"
          intro="Stories are published with evidence and consent from the communities where FOSCOD works."
          items={cards}
          surface
        />
      ) : (
        <section className="py-16 md:py-24">
          <div className="container-page text-center">
            <p className="text-[var(--muted)]">
              No impact stories match this filter yet. Try adjusting the program or sub-filter.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
