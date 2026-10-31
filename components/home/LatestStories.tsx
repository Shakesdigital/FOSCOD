import Link from "next/link";
import { Section, SectionHeader } from "@/components/site/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import type { Story } from "@/lib/content";

export function LatestStories({ stories }: { stories: Story[] }) {
  if (!stories.length) return null;
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s, i) => (
          <div key={s.slug} className="group h-full">
            <ContentCard
              title={s.title}
              excerpt={s.excerpt}
              href={s.href}
              ctaLabel="Read more"
              kicker={s.category}
              imageRatio="16/10"
              tone={i % 2 === 0 ? "forest" : "water"}
              imageUrl={s.imageUrl}
              imageAlt={s.imageAlt}
              tag={s.date}
              meta={s.date}
              asLink={true}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
