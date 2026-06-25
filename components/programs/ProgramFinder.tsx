"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Program = {
  title: string;
  type: "Internship" | "Volunteer" | "Group" | "Research";
  sector: string;
  duration: string;
  location: string;
  forWho: string;
  feeFrom: string;
  href: string;
};

const programs: Program[] = [
  { title: "WASH & Public Health Internship", type: "Internship", sector: "WASH", duration: "8 weeks", location: "Busoga", forWho: "Students", feeFrom: "TBC", href: "/internships" },
  { title: "Renewable Energy Volunteer", type: "Volunteer", sector: "Renewable energy", duration: "4 weeks", location: "Mukono", forWho: "Professionals", feeFrom: "TBC", href: "/volunteer" },
  { title: "Biochar & Climate Research", type: "Research", sector: "Climate", duration: "12 weeks", location: "Kalagala", forWho: "Researchers", feeFrom: "TBC", href: "/projects/biochar-uganda" },
  { title: "University Cohort: Community Health", type: "Group", sector: "Health", duration: "10 weeks", location: "Buikwe", forWho: "University groups", feeFrom: "TBC", href: "/internships" },
  { title: "Livelihoods & Enterprise Internship", type: "Internship", sector: "Livelihoods", duration: "8 weeks", location: "Buikwe", forWho: "Students", feeFrom: "TBC", href: "/internships" },
  { title: "Communications & Storytelling", type: "Volunteer", sector: "Communications", duration: "4 weeks", location: "Jinja", forWho: "Professionals", feeFrom: "TBC", href: "/volunteer" },
];

const filters = {
  type: ["All", "Internship", "Volunteer", "Group", "Research"],
  duration: ["All", "4 weeks", "8 weeks", "10 weeks", "12 weeks"],
};

export function ProgramFinder() {
  const [type, setType] = useState("All");
  const [duration, setDuration] = useState("All");

  const results = useMemo(
    () =>
      programs.filter(
        (p) =>
          (type === "All" || p.type === type) &&
          (duration === "All" || p.duration === duration)
      ),
    [type, duration]
  );

  return (
    <div>
      <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:grid-cols-2">
        <Filter label="Program type" value={type} setValue={setType} options={filters.type} />
        <Filter label="Duration" value={duration} setValue={setDuration} options={filters.duration} />
      </div>

      <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
        {results.length} program{results.length === 1 ? "" : "s"} found
      </p>

      <ul className="mt-4 grid gap-4">
        {results.map((p) => (
          <li key={p.title}>
            <Link
              href={p.href}
              className="group flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                  {p.type} · {p.sector}
                </p>
                <h3 className="mt-1 text-lg leading-snug">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {p.duration} · {p.location} · {p.forWho}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-[var(--accent-700)]">
                View program →
              </span>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] p-8 text-center text-[var(--muted)]">
            No programs match those filters yet. Try widening your search, or{" "}
            <Link href="/contact" className="text-[var(--accent-700)] underline">
              ask us directly
            </Link>
            .
          </li>
        )}
      </ul>
    </div>
  );
}

function Filter({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => setValue(o)}
              aria-pressed={active}
              className={`rounded-[var(--radius-full)] px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-[var(--ink)] text-[var(--bg)]"
                  : "border border-[var(--border-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
