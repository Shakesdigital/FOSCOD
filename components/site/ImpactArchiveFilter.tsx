"use client";

import { useMemo, useState } from "react";
import type { CedpAreaOfFocus, GleDevelopmentSector } from "@/lib/content";

export type ArchiveFilterValue = {
  program: "ALL" | "CEDP" | "GLE";
  cedpArea: string;
  gleSector: string;
};

export function ImpactArchiveFilter({
  cedpAreas,
  gleSectors,
  onChange,
}: {
  cedpAreas: CedpAreaOfFocus[];
  gleSectors: GleDevelopmentSector[];
  onChange?: (value: ArchiveFilterValue) => void;
}) {
  const [program, setProgram] = useState<ArchiveFilterValue["program"]>("ALL");
  const [cedpArea, setCedpArea] = useState("");
  const [gleSector, setGleSector] = useState("");

  const value: ArchiveFilterValue = useMemo(
    () => ({ program, cedpArea, gleSector }),
    [program, cedpArea, gleSector]
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

  const showCedpArea = program === "CEDP" && cedpAreas.filter((a) => a.slug).length > 0;
  const showGleSector = program === "GLE" && gleSectors.length > 0;
  const secondaryFilterAvailable = showCedpArea || showGleSector;

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)] py-8 md:py-10">
      <div className="container-page">
        <div className="mb-6 flex flex-wrap items-end gap-x-8 gap-y-6">
          {/* Primary filter: program toggle */}
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
              Program
            </span>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => handleProgramChange("ALL")}
                className={
                  program === "ALL"
                    ? "rounded-[var(--radius-full)] bg-[var(--accent-600)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)]"
                    : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
                }
              >
                All stories
              </button>
              <button
                type="button"
                onClick={() => handleProgramChange("CEDP")}
                className={
                  program === "CEDP"
                    ? "rounded-[var(--radius-full)] bg-[var(--forest-700)] px-4 py-2 text-sm font-medium text-white"
                    : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
                }
              >
                CEDP
              </button>
              <button
                type="button"
                onClick={() => handleProgramChange("GLE")}
                className={
                  program === "GLE"
                    ? "rounded-[var(--radius-full)] bg-[var(--water-700)] px-4 py-2 text-sm font-medium text-white"
                    : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
                }
              >
                GLE
              </button>
            </div>
          </div>

          {/* Secondary filter: CEDP areas of focus */}
          {showCedpArea ? (
            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
                CEDP area of focus
              </label>
              <select
                value={cedpArea}
                onChange={(e) => setCedpArea(e.target.value)}
                className="mt-2 w-64 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              >
                <option value="">All CEDP areas</option>
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

          {/* Secondary filter: GLE development sectors */}
          {showGleSector ? (
            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
                GLE development sector
              </label>
              <select
                value={gleSector}
                onChange={(e) => setGleSector(e.target.value)}
                className="mt-2 w-64 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              >
                <option value="">All GLE sectors</option>
                {gleSectors.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        {secondaryFilterAvailable ? (
          <p className="text-sm text-[var(--muted)]">
            {showCedpArea
              ? "Stories are grouped by the CEDP strategic goal their linked sub-program maps to."
              : "Stories are tagged with the development sector they contributed to."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
