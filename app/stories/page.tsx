import Link from "next/link";
import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getLatestStories } from "@/lib/content";

export const metadata = pageMeta(
  "Blog — Stories From the Field",
  "Project updates, impact reports, alumni reflections, host family stories, and research from FOSCOD's work in Uganda."
);

const categories = [
  "Project updates", "Impact reports", "Alumni reflections",
  "Host family stories", "Research & learning", "News",
];

export default async function BlogPage() {
  const [heroSlides, stories] = await Promise.all([
    getHeroSlides("stories"),
    getLatestStories(),
  ]);
  const [featured, ...rest] = stories;

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* blog header — white */}
      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>From the FOSCOD blog</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Stories, updates, and reflections</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            A running record of the work — what communities are building, what
            our alumni learned, and what we&rsquo;re seeing in the field.
          </p>
        </div>
      </section>

      {/* posts + sidebar — mint */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* main grid */}
          <ul className="grid gap-6 sm:grid-cols-2">
            {stories.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <PhotoSlot tone={(["forest", "water", "earth"] as const)[i % 3]} ratio="16/10" caption={`${s.title} — story image`} className="rounded-none border-0 border-b border-[var(--border)]" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">{s.category}</p>
                    <h3 className="mt-2 text-lg leading-snug">{s.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[var(--muted)]">{s.excerpt}</p>
                    <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--muted)]">{s.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* sidebar */}
          <aside className="space-y-8">
            {featured && (
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
                <div className="border-b border-[var(--border)] bg-[var(--accent-600)] px-5 py-3">
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.16em] text-white">Featured</p>
                </div>
                <div className="p-5">
                  <h3 className="text-lg leading-snug">{featured.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--muted)]">{featured.excerpt}</p>
                  <PhotoSlot tone="water" ratio="16/9" caption={`${featured.title}`} className="mt-4" />
                  <div className="mt-4">
                    <Button href={featured.href} variant="secondary" size="md">Read the story</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-lg">Browse by topic</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c}>
                    <span className="inline-block rounded-[var(--radius-full)] border border-[var(--border-strong)] px-3 py-1.5 text-[0.8rem] text-[var(--ink-soft)]">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {rest.length > 0 && (
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="text-lg">Recent posts</h3>
                <ul className="mt-4 space-y-3">
                  {rest.slice(0, 4).map((s) => (
                    <li key={s.slug}>
                      <Link href={s.href} className="block text-[0.92rem] leading-snug text-[var(--ink-soft)] transition-colors hover:text-[var(--accent-700)]">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
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
