import type { ReactNode } from "react";

/** StatCard — a single statistics card for the impact story detail page.
 *  Displays a large value, label, and optional unit/note. */
export function StatCard({
  value,
  label,
  note,
  unit,
}: {
  value: string;
  label: string;
  note?: string;
  unit?: string;
}) {
  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 text-center">
      <dd className="font-[family-name:var(--font-text)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
        {value}
        {unit && <span className="ml-1 text-[0.6em] text-[var(--muted)] align-super">{unit}</span>}
      </dd>
      <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{label}</dt>
      {note && (
        <p className="mt-2 font-[family-name:var(--font-text)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
          {note}
        </p>
      )}
    </div>
  );
}

/** StatGrid — renders a responsive grid of StatCard components from CMS data.
 *  Cards are separated with gap spacing, no background wrapper. */
export function StatGrid({
  items,
  count = 4,
}: {
  items: { label: string; value: string; unit?: string; note?: string }[];
  count?: number;
}) {
  if (!items.length) return null;
  const cols = Math.min(items.length, count);
  const colClass = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[cols] ?? "lg:grid-cols-4";

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${colClass}`}>
      {items.map((item) => (
        <StatCard key={item.label} value={item.value} label={item.label} unit={item.unit} note={item.note} />
      ))}
    </div>
  );
}
