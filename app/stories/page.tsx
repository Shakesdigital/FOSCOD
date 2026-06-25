import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/blocks";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getLatestStories } from "@/lib/content";

export const metadata = pageMeta(
  "Stories From the Field",
  "Project updates, impact reports, alumni reflections, host family stories, and research from FOSCOD's work in Uganda."
);

const categories = [
  "Project updates", "Impact reports", "Alumni reflections",
  "Host family stories", "Internship opportunities", "Research & learning", "News",
];

export default async function StoriesPage() {
  const stories = await getLatestStories();
  return (
    <>
      <PageHero
        eyebrow="Stories from the field"
        title="Stories from the field"
        intro="Project updates, impact reports, alumni reflections, host family stories, and research — published from the CMS."
      />

      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3.5 py-1.5 text-sm text-[var(--ink-soft)]">
              {c}
            </span>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <PhotoSlot tone={i % 2 ? "water" : "forest"} ratio="16/10" caption={`${s.title} — story image`} className="rounded-none border-0 border-b border-[var(--border)]" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">{s.category}</p>
                  <h2 className="mt-2 text-xl leading-snug">{s.title}</h2>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">{s.excerpt}</p>
                  <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">{s.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTABand
        title="Be part of the next story"
        actions={[
          { href: "/apply", label: "Apply to a program" },
          { href: "/alumni", label: "Share your story", variant: "secondary" },
        ]}
      />
    </>
  );
}
