import Link from "next/link";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { OpportunitySummary } from "@/lib/opportunities";

const tones = ["forest", "water", "earth"] as const;

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden className="shrink-0">
      <path d="M7 1.2c-2.2 0-4 1.7-4 3.9 0 2.8 4 7.7 4 7.7s4-4.9 4-7.7c0-2.2-1.8-3.9-4-3.9z" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <circle cx="7" cy="5.1" r="1.4" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden className="shrink-0">
      <circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path d="M7 4.2V7l2 1.3" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}

/** OpportunityCard — a polished internship/volunteer project card
 *  (image + category badge, location & duration meta, green Read More). */
export function OpportunityCard({ o, index = 0 }: { o: OpportunitySummary; index?: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className="relative">
        <PhotoSlot
          tone={tones[index % 3]}
          ratio="16/10"
          caption={o.title}
          className="rounded-none border-0 border-b border-[var(--border)]"
        />
        {o.category && (
          <span className="absolute right-3 top-3 z-10 rounded-[var(--radius-full)] bg-[var(--accent-600)] px-3 py-1 text-[0.68rem] font-medium text-white shadow-[var(--shadow-sm)]">
            {o.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] font-medium leading-snug text-[var(--ink)]">{o.title}</h3>

        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">
          {o.location && <span className="inline-flex items-center gap-1.5"><PinIcon />{o.location}</span>}
          {o.duration && <span className="inline-flex items-center gap-1.5"><ClockIcon />{o.duration}</span>}
        </div>

        <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">{o.excerpt}</p>

        <Link
          href={`/opportunities/${o.slug}`}
          className="mt-5 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--green-cta)] px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[var(--green-cta-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green-cta)]"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
