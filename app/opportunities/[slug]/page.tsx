import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getOpportunity, allOpportunitySlugs } from "@/lib/opportunities";

export function generateStaticParams() {
  return allOpportunitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const o = await getOpportunity(slug);
  if (!o) return {};
  return {
    title: `${o.title} — FOSCOD`,
    description: o.excerpt,
    openGraph: { title: `${o.title} — FOSCOD`, description: o.excerpt },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-600)]" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)] text-[var(--accent-700)]">{children}</h2>;
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const o = await getOpportunity(slug);
  if (!o) notFound();

  const isVolunteer = o.type === "volunteer";
  const backHref = isVolunteer ? "/volunteer/opportunities" : "/internships/opportunities";
  const reqHeading = isVolunteer ? "Volunteer Requirements" : "Intern Requirements";
  const whyHeading = isVolunteer ? "Why choose this volunteer program?" : "Why choose this internship?";
  const galleryCount = o.gallery.length || 6;

  return (
    <>
      {/* teal hero band */}
      <section className="bg-[var(--accent-600)] text-white">
        <div className="container-page py-14 text-center md:py-16">
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-white/70">
            {o.category}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium leading-[1.1] [text-wrap:balance]">
            {o.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/85">{o.excerpt}</p>
          <div className="mt-7">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-white/15 px-7 py-3 font-medium text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white hover:text-[var(--accent-700)]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* content + sidebar */}
      <section className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <div>
              <SectionHeading>About the Project</SectionHeading>
              <div className="mt-4 max-w-[var(--measure)] space-y-4 text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
                {o.about.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            {o.highlights.length > 0 && (
              <div className="border-t border-[var(--border)] pt-8">
                <SectionHeading>Program Highlights</SectionHeading>
                <p className="mt-3 text-[var(--muted)]">As a {o.category} {isVolunteer ? "volunteer" : "intern"}, you will:</p>
                <BulletList items={o.highlights} />
              </div>
            )}

            {o.requirements.length > 0 && (
              <div className="border-t border-[var(--border)] pt-8">
                <SectionHeading>{reqHeading}</SectionHeading>
                <p className="mt-3 text-[var(--muted)]">We welcome applicants who:</p>
                <BulletList items={o.requirements} />
              </div>
            )}

            {o.whyChoose.length > 0 && (
              <div className="border-t border-[var(--border)] pt-8">
                <SectionHeading>{whyHeading}</SectionHeading>
                <p className="mt-3 text-[var(--muted)]">By joining this program, you will:</p>
                <BulletList items={o.whyChoose} />
              </div>
            )}
          </div>

          {/* sidebar */}
          <aside>
            <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
              {o.sdgs.length > 0 && (
                <div>
                  <h3 className="text-center text-lg text-[var(--accent-700)]">SDG Alignment</h3>
                  <div className="mt-3 space-y-2">
                    {o.sdgs.map((s) => (
                      <span key={s} className="block rounded-[var(--radius-md)] bg-[var(--accent-600)] px-3 py-2 text-center text-[0.8rem] font-medium text-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 text-center">
                <h3 className="text-lg text-[var(--accent-700)]">Location</h3>
                <p className="mt-1 text-[0.95rem] italic text-[var(--ink-soft)]">{o.location}</p>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg text-[var(--accent-700)]">Duration</h3>
                <p className="mt-1 text-[0.95rem] italic text-[var(--ink-soft)]">{o.duration}</p>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-700)]"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-[var(--surface-2)] py-14 md:py-16">
        <div className="container-page">
          <h2 className="text-center text-[clamp(1.4rem,2.6vw,1.9rem)] text-[var(--accent-700)]">Project Gallery</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: galleryCount }).map((_, i) => (
              <PhotoSlot key={i} tone={(["forest", "water", "earth"] as const)[i % 3]} ratio="4/3" caption={`${o.title} — photo ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* closing apply */}
      <section className="py-12 md:py-16">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[var(--accent-700)]"
          >
            Apply Now
          </Link>
          <Link href={backHref} className="text-[0.9rem] text-[var(--accent-700)] hover:underline">
            ← Back to all {isVolunteer ? "volunteer" : "internship"} opportunities
          </Link>
        </div>
      </section>
    </>
  );
}
