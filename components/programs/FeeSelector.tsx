"use client";

import { useState } from "react";

const durations = ["4 weeks", "8 weeks", "10 weeks", "12 weeks"] as const;
type Duration = (typeof durations)[number];

// Placeholder figures — FOSCOD to confirm exact fees in the CMS before launch.
const fees: Record<Duration, { internship: string; volunteer: string }> = {
  "4 weeks": { internship: "Fee to confirm", volunteer: "Fee to confirm" },
  "8 weeks": { internship: "Fee to confirm", volunteer: "Fee to confirm" },
  "10 weeks": { internship: "Fee to confirm", volunteer: "Fee to confirm" },
  "12 weeks": { internship: "Fee to confirm", volunteer: "Fee to confirm" },
};

export function FeeSelector() {
  const [duration, setDuration] = useState<Duration>("8 weeks");
  const current = fees[duration];

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <div role="tablist" aria-label="Program duration" className="flex flex-wrap gap-2">
        {durations.map((d) => {
          const active = d === duration;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={active}
              onClick={() => setDuration(d)}
              className={`rounded-[var(--radius-full)] px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--accent-600)] text-[var(--accent-fg)]"
                  : "border border-[var(--border-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {(["internship", "volunteer"] as const).map((track) => (
          <div key={track} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
              {track}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
              {current[track]}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">for {duration}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--muted)]">
        ◷ Exact amounts are confirmed in the CMS before launch — we never publish
        unverified figures.
      </p>
    </div>
  );
}
