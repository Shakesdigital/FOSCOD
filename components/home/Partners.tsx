import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface-2)] py-14">
      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Trusted collaborators</Eyebrow>
          <p className="mt-3 max-w-lg text-[0.95rem] text-[var(--muted)]">
            Universities, community organizations, NGOs, and climate funders we
            work alongside. Add real partner logos in the CMS.
          </p>
        </div>
        <ul className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p.name}
              className="flex flex-col items-center justify-center gap-1 bg-[var(--surface-2)] px-3 py-7 text-center"
            >
              <span className="font-[family-name:var(--font-display)] text-[0.95rem] text-[var(--ink-soft)]">
                {p.name}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                {p.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
