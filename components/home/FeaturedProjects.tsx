import Link from "next/link";
import { Section, SectionHeader } from "@/components/site/Section";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
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
          <Link
            key={p.slug}
            href={p.href}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
          >
            <PhotoSlot
              tone={toneFor(p.slug)}
              ratio="16/11"
              caption={`${p.title} — field photo`}
              className="rounded-none border-0 border-b border-[var(--border)]"
            />
            <div className="flex flex-1 flex-col p-5">
              <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                {p.theme}
              </p>
              <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                {p.summary}
              </p>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">
                ◍ {p.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
