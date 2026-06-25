import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/blocks";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { projectDetails } from "@/lib/projects";

export const metadata = pageMeta(
  "FOSCOD Projects",
  "Explore community-led projects across WASH, renewable energy, livelihoods, health, education, environment, research, and social inclusion."
);

const categories = [
  "WASH & Public Health", "Renewable Energy", "Biochar & Climate",
  "Sustainable Livelihoods", "Women & Youth Empowerment",
  "Food Security & Nutrition", "Education & Skills", "Research & Monitoring",
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Project library"
        title="Community-led projects across Uganda"
        intro="Explore work spanning WASH, renewable energy, livelihoods, health, education, environment, research, and social inclusion. Filter and detail views are wired to the CMS."
      />

      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3.5 py-1.5 text-sm text-[var(--ink-soft)]"
            >
              {c}
            </span>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectDetails.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <PhotoSlot
                  tone={p.tone}
                  ratio="16/10"
                  caption={`${p.title} — field photo`}
                  className="rounded-none border-0 border-b border-[var(--border)]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                    {p.theme}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                    {p.subhead}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">
                    ◍ {p.location}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTABand
        title="Fund or join a project"
        actions={[
          { href: "/donate", label: "Donate" },
          { href: "/partners", label: "Partner with us", variant: "secondary" },
          { href: "/apply", label: "Apply", variant: "ghost" },
        ]}
      />
    </>
  );
}
