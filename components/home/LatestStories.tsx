import Link from "next/link";
import { Section, SectionHeader } from "@/components/site/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { Story } from "@/lib/content";

export function LatestStories({ stories }: { stories: Story[] }) {
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="Stories from the field" title="Latest from FOSCOD" />
        <Link
          href="/stories"
          className="text-[0.95rem] font-medium text-[var(--accent-700)] hover:underline"
        >
          All stories →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((s, i) => (
          <Link
            key={s.slug}
            href={s.href}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
          >
            <PhotoSlot
              tone={i % 2 === 0 ? "forest" : "water"}
              ratio="16/10"
              caption={`${s.title} — story image`}
              className="rounded-none border-0 border-b border-[var(--border)]"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                {s.category}
              </p>
              <h3 className="mt-2 text-xl leading-snug">{s.title}</h3>
              <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                {s.excerpt}
              </p>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">
                {s.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
