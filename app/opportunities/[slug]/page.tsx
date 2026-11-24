import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/site/HeroSlider";
import { type HeroSlide } from "@/lib/content";
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

  const backHref = "/opportunities";
  const isVolunteer = o.type === "volunteer";
  const reqHeading = isVolunteer ? "Volunteer Requirements" : "Intern Requirements";
  const whyHeading = isVolunteer ? "Why choose this volunteer program?" : "Why choose this internship?";
  const galleryCount = o.gallery.length || 6;

  const heroSlides: HeroSlide[] = [{
    eyebrow: o.category,
    title: o.title,
    intro: o.excerpt,
    cta: { href: `/apply?opportunity=${o.slug}`, label: "Apply for this opportunity" },
    tone: "water",
    imageUrl: o.featured_image_url ?? undefined,
  }];

  return (
    <>
      <HeroSlider slides={heroSlides} />

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

            {(o.host_organization || o.purpose || o.learning_goals.length > 0 || o.tasks.length > 0 || o.supervision || o.timing || o.practical_arrangements || o.capacity || o.costs || o.learning_focus) && (
              <div className="border-t border-[var(--border)] pt-8">
                <SectionHeading>About this opportunity</SectionHeading>
                <dl className="mt-4 max-w-[var(--measure)] space-y-4 text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
                  {o.host_organization && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Host</dt>
                      <dd>{o.host_organization}</dd>
                    </div>
                  )}
                  {o.purpose && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Purpose</dt>
                      <dd>{o.purpose}</dd>
                    </div>
                  )}
                  {o.learning_focus && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Learning focus</dt>
                      <dd>{o.learning_focus}</dd>
                    </div>
                  )}
                  {o.learning_goals.length > 0 && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Learning goals</dt>
                      <dd><BulletList items={o.learning_goals} /></dd>
                    </div>
                  )}
                  {o.tasks.length > 0 && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Main tasks and expected outputs</dt>
                      <dd><BulletList items={o.tasks} /></dd>
                    </div>
                  )}
                  {o.eligibility && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Who can apply</dt>
                      <dd>{o.eligibility}</dd>
                    </div>
                  )}
                  {o.supervision && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Supervision</dt>
                      <dd>{o.supervision}</dd>
                    </div>
                  )}
                  {o.timing && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Timing</dt>
                      <dd>{o.timing}</dd>
                    </div>
                  )}
                  {o.capacity && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Capacity</dt>
                      <dd>{o.capacity}</dd>
                    </div>
                  )}
                  {o.practical_arrangements && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Practical arrangements</dt>
                      <dd>{o.practical_arrangements}</dd>
                    </div>
                  )}
                  {o.costs && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Costs and support</dt>
                      <dd>{o.costs}</dd>
                    </div>
                  )}
                  {o.application_requirements && (
                    <div>
                      <dt className="font-medium text-[var(--ink)]">Application requirements</dt>
                      <dd>{o.application_requirements}</dd>
                    </div>
                  )}
                </dl>
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
                <h3 className="text-lg text-[var(--accent-700)]">Availability</h3>
                <p className="mt-1 text-[0.95rem] italic text-[var(--ink-soft)]">
                  {o.availability_status === "planned" ? "Planned — dates being confirmed" : o.availability_status === "paused" ? "Paused" : "Open"}
                </p>
                {o.last_confirmed_at && (
                  <p className="mt-1 text-[0.78rem] text-[var(--muted)]">
                    Last confirmed {new Date(o.last_confirmed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href={`/apply?opportunity=${o.slug}`}
                  className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-700)]"
                >
                  Apply or enquire
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
            href={`/apply?opportunity=${o.slug}`}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[var(--accent-700)]"
          >
            Apply or enquire
          </Link>
          <Link href={backHref} className="text-[0.9rem] text-[var(--accent-700)] hover:underline">
            ← Back to all opportunities
          </Link>
        </div>
      </section>
    </>
  );
}
