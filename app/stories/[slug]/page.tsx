import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Prose, CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getLatestStories } from "@/lib/content";

async function findStory(slug: string) {
  const stories = await getLatestStories();
  return stories.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await findStory(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.excerpt,
    openGraph: { title: `${s.title} — FOSCOD`, description: s.excerpt },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await findStory(slug);
  if (!s) notFound();

  return (
    <>
      <article className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-[var(--measure)]">
          <Eyebrow>{s.category}</Eyebrow>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)]">{s.title}</h1>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            {s.date}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <PhotoSlot tone="forest" ratio="21/9" caption={`${s.title} — lead image`} />
        </div>

        <div className="mx-auto mt-10">
          <Prose>
            <p className="text-xl text-[var(--ink)]">{s.excerpt}</p>
            <p>
              This is a placeholder body. The full story text, gallery, and
              related links are managed in the CMS Story editor — including
              category, author, location, theme, and SEO fields.
            </p>
            <p>
              Migrate the existing FOSCOD posts here (host families, the
              solar-powered salon in Naluvule, the 2025 internship debrief, the
              Kalagala greening project, the Water is Life project in Lubani
              Village, and the Rice University menstrual-health project), each
              categorized by theme, location, year, and program pillar.
            </p>
          </Prose>
        </div>

        <p className="mx-auto mt-10 max-w-[var(--measure)]">
          <Link href="/stories" className="text-[var(--accent-700)] hover:underline">
            ← Back to all stories
          </Link>
        </p>
      </article>

      <CTABand
        title="Start your own FOSCOD story"
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/stories", label: "Read more stories", variant: "secondary" },
        ]}
      />
    </>
  );
}
