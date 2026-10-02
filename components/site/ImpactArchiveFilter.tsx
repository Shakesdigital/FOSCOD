"use client";

import { useMemo, useState } from "react";
import type { CedpAreaOfFocus, GleDevelopmentSector, ProjectListItem } from "@/lib/content";

export type ArchiveFilterValue = {
  program: "ALL" | "CEDP" | "GLE";
  cedpArea: string;
  gleSector: string;
  project: string;
};

export function ImpactArchiveFilter({
  cedpAreas,
  gleSectors,
  projects,
  onChange,
}: {
  cedpAreas: CedpAreaOfFocus[];
  gleSectors: GleDevelopmentSector[];
  projects: ProjectListItem[];
  onChange?: (value: ArchiveFilterValue) => void;
}) {
  const [program, setProgram] = useState<ArchiveFilterValue["program"]>("ALL");
  const [cedpArea, setCedpArea] = useState("");
  const [gleSector, setGleSector] = useState("");
  const [project, setProject] = useState("");

  const value: ArchiveFilterValue = useMemo(
    () => ({ program, cedpArea, gleSector, project }),
    [program, cedpArea, gleSector, project],
  );

  // Notify parent of filter changes
  useMemo(() => {
    onChange?.(value);
  }, [value, onChange]);

  const handleProgramChange = (next: ArchiveFilterValue["program"]) => {
    setProgram(next);
    setCedpArea("");
    setGleSector("");
  };

  const handleReset = () => {
    setProgram("ALL");
    setCedpArea("");
    setGleSector("");
    setProject("");
  };

  const activeFiltersCount = [cedpArea, gleSector, project].filter(Boolean).length;
  const hasActiveFilters = program !== "ALL" || activeFiltersCount > 0;

  return (
    <aside className="w-full border-b border-[var(--border)] bg-[var(--surface)] md:border-r md:border-b-0 md:w-72 md:flex-shrink-0 md:overflow-y-auto">
      <div className="py-6 md:py-8 md:px-0 md:pl-4">
        <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--ink-soft)]">
          Filter stories
        </h3>

        {/* Program tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleProgramChange("ALL")}
            className={
              program === "ALL"
                ? "rounded-[var(--radius-full)] bg-[var(--accent-600)] px-3 py-1.5 text-sm font-medium text-[var(--accent-fg)]"
                : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
            }
          >
            All stories
          </button>
          <button
            type="button"
            onClick={() => handleProgramChange("CEDP")}
            className={
              program === "CEDP"
                ? "rounded-[var(--radius-full)] bg-[var(--forest-700)] px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
            }
          >
            CEDP
          </button>
          <button
            type="button"
            onClick={() => handleProgramChange("GLE")}
            className={
              program === "GLE"
                ? "rounded-[var(--radius-full)] bg-[var(--water-700)] px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
            }
          >
            GLE
          </button>
        </div>

        {/* Secondary filters: CEDP areas of focus */}
        {(program === "ALL" || program === "CEDP") && cedpAreas.filter((a) => a.slug).length > 0 ? (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <label className="block text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
              CEDP area of focus
            </label>
            <select
              value={cedpArea}
              onChange={(e) => setCedpArea(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <option value="">All areas</option>
              {cedpAreas
                .filter((a) => a.slug)
                .map((a) => (
                  <option key={a.slug} value={a.slug ?? ""}>
                    {a.title}
                  </option>
                ))}
            </select>
          </div>
        ) : null}

        {/* Secondary filters: GLE development sectors */}
        {(program === "ALL" || program === "GLE") && gleSectors.length > 0 ? (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <label className="block text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
              GLE development sector
            </label>
            <select
              value={gleSector}
              onChange={(e) => setGleSector(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <option value="">All sectors</option>
              {gleSectors.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {/* Project filter */}
        {projects.length > 0 && (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <label className="block text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
              Project
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <option value="">All projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset button */}
        {hasActiveFilters && (
          <div className="mt-6 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-[var(--accent-700)] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
