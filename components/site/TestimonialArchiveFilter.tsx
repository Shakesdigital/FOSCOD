"use client";

import { useMemo, useState } from "react";
import type { Testimonial } from "@/lib/content";

export type TestimonialArchiveFilterValue = {
  program: "ALL" | "CEDP" | "GLE";
  project: string;
};

export function TestimonialArchiveFilter({
  testimonials,
  onChange,
}: {
  testimonials: Testimonial[];
  onChange?: (value: TestimonialArchiveFilterValue) => void;
}) {
  const [program, setProgram] = useState<TestimonialArchiveFilterValue["program"]>("ALL");
  const [project, setProject] = useState("");

  const value: TestimonialArchiveFilterValue = useMemo(
    () => ({ program, project }),
    [program, project],
  );

  // Notify parent of filter changes
  useMemo(() => {
    onChange?.(value);
  }, [value, onChange]);

  // Derive unique projects from the testimonial list
  const projects = useMemo(() => {
    const seen = new Set<string>();
    testimonials.forEach((t) => {
      if (t.linked_project_id && !seen.has(t.linked_project_id)) seen.add(t.linked_project_id);
    });
    return Array.from(seen).sort();
  }, [testimonials]);

  const handleProgramChange = (next: TestimonialArchiveFilterValue["program"]) => {
    setProgram(next);
  };

  const handleReset = () => {
    setProgram("ALL");
    setProject("");
  };

  const hasActiveFilters = program !== "ALL" || project !== "";

  return (
    <aside className="w-full border-b border-[var(--border)] bg-[var(--surface)] md:border-r md:border-b-0 md:w-72 md:flex-shrink-0 md:sticky md:top-24">
      <div className="flex flex-col items-center gap-6 py-6 md:py-8 md:px-6">
        <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--ink-soft)]">
          Filter testimonials
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
            All
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

        {/* Project filter */}
        {projects.length > 0 && (
          <div className="w-full max-w-sm border-t border-[var(--border)] pt-4">
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
                <option key={p} value={p}>{p}</option>
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
