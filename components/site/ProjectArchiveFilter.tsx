"use client";

import { useMemo, useState } from "react";
import type { ProjectListItem } from "@/lib/content";

export type ProjectArchiveFilterValue = {
  program: "ALL" | "CEDP" | "GLE";
  theme: string;
};

export function ProjectArchiveFilter({
  projects,
  onChange,
}: {
  projects: ProjectListItem[];
  onChange?: (value: ProjectArchiveFilterValue) => void;
}) {
  const [program, setProgram] = useState<ProjectArchiveFilterValue["program"]>("ALL");
  const [theme, setTheme] = useState("");

  const value: ProjectArchiveFilterValue = useMemo(
    () => ({ program, theme }),
    [program, theme],
  );

  // Notify parent of filter changes
  useMemo(() => {
    onChange?.(value);
  }, [value, onChange]);

  // Derive unique themes from the project list
  const themes = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => {
      if (p.theme && !seen.has(p.theme)) seen.add(p.theme);
    });
    return Array.from(seen).sort();
  }, [projects]);

  const handleProgramChange = (next: ProjectArchiveFilterValue["program"]) => {
    setProgram(next);
  };

  const handleReset = () => {
    setProgram("ALL");
    setTheme("");
  };

  const hasActiveFilters = program !== "ALL" || theme !== "";

  return (
    <aside className="w-full border-b border-[var(--border)] bg-[var(--surface)] md:border-r md:border-b-0 md:w-72 md:flex-shrink-0 md:sticky md:top-24">
      <div className="flex flex-col items-center gap-6 py-6 md:py-8 md:px-6">
        <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--ink-soft)]">
          Filter projects
        </h3>

        {/* Program tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleProgramChange("ALL")}
            className={
              program === "ALL"
                ? "rounded-[var(--radius-full)] bg-[var(--accent-600)] px-3 py-1.5 text-sm font-medium text-[var(--accent-fg)]"
                : "rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
            }
          >
            All projects
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

        {/* Theme filter */}
        {themes.length > 0 && (
          <div className="w-full max-w-sm border-t border-[var(--border)] pt-4">
            <label className="block text-xs font-medium uppercase tracking-wider text-[var(--ink-soft)]">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
            >
              <option value="">All themes</option>
              {themes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}

        {/* Reset button */}
        {hasActiveFilters && (
          <div className="pt-2">
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
