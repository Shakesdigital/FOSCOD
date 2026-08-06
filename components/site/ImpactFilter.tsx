"use client";

import { useMemo, useState } from "react";
import type { ImpactStat, SubProgram } from "@/lib/content";

export function ImpactFilter({ stats, subPrograms }: { stats: ImpactStat[]; subPrograms: SubProgram[] }) {
  const [program, setProgram] = useState("ALL");
  const [subProgram, setSubProgram] = useState("ALL");
  const visibleStats = useMemo(() => stats.filter((item) => {
    if (program !== "ALL" && item.program !== program) return false;
    if (subProgram !== "ALL" && item.sub_program_id !== subProgram) return false;
    return true;
  }), [program, stats, subProgram]);

  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap gap-4">
          <label className="text-sm font-medium">Program<select value={program} onChange={(event) => { setProgram(event.target.value); setSubProgram("ALL"); }} className="ml-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2"><option value="ALL">All programs</option><option value="GLE">Global Learning & Exchange</option><option value="CEDP">Community Empowerment & Development</option><option value="ORG">Organization-wide</option></select></label>
          {program === "CEDP" ? <label className="text-sm font-medium">Sub-program<select value={subProgram} onChange={(event) => setSubProgram(event.target.value)} className="ml-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2"><option value="ALL">All CEDP sub-programs</option>{subPrograms.filter((item) => item.id).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label> : null}
        </div>
        {subProgram !== "ALL" ? <p className="mb-5 text-sm text-[var(--muted)]">Sub-program figures appear after editors link verified statistics to this sub-program in the CMS.</p> : null}
        <dl className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {visibleStats.map((item) => <div key={item.metric_name} className="bg-[var(--surface)] p-6"><dd className="font-[family-name:var(--font-display)] text-4xl">{item.current_value}{item.unit ? <span className="ml-1 text-xl text-[var(--accent-700)]">{item.unit}</span> : null}</dd><dt className="mt-3 text-[var(--ink-soft)]">{item.metric_name}</dt><p className="mt-3 text-xs text-[var(--muted)]">{item.as_of_date ? `As of ${new Date(item.as_of_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}` : item.source_note}</p></div>)}
          {!visibleStats.length ? <div className="col-span-full bg-[var(--surface)] p-10 text-center text-sm text-[var(--muted)]">No verified figures match this filter yet.</div> : null}
        </dl>
      </div>
    </section>
  );
}
