import Link from "next/link";
import { Section, SectionHeader } from "@/components/site/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import type { FeaturedProject } from "@/lib/content";

const toneFor = (slug: string): "earth" | "water" | "forest" => {
  if (slug.includes("wash")) return "water";
  if (slug.includes("renewable")) return "earth";
  if (slug.includes("livelihood") || slug.includes("biochar")) return "forest";
  return "earth";
};

export function FeaturedProjects({ projects }: { projects: FeaturedProject[] }) {
  return (
    <Section surface>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Flagship work"
          title="Community-led projects, field-tested"
        />
        <Link
          href="/projects"
          className="text-[0.95rem] font-medium text-[var(--accent-700)] hover:underline"
        >
          View the project library →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <div key={p.slug} className="group h-full">
            <ContentCard
              title={p.title}
              excerpt={p.summary}
              href={p.href}
              ctaLabel="View project"
              kicker={p.theme}
              imageRatio="16/11"
              tone={toneFor(p.slug)}
              tag={p.location}
              meta={p.location}
              asLink={true}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
