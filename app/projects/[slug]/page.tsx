import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/site/HeroSlider";
import { type HeroSlide, getProjectActivities, getProjectImpactCards } from "@/lib/content";
import { SplitSection, Prose, CTABand } from "@/components/site/blocks";
import { ActivityList } from "@/components/site/ActivityList";
import { ImpactGrid } from "@/components/site/ImpactGrid";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { projectDetails, getProjectDetail } from "@/lib/projects";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.subhead,
    openGraph: { title: `${p.title} — FOSCOD`, description: p.subhead },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) notFound();

  // Fetch CMS-driven activities and impact cards for this project
  const [projectActivities, projectImpactCards] = await Promise.all([
    getProjectActivities(slug),
    getProjectImpactCards(slug),
  ]);

  const heroSlides: HeroSlide[] = [{
    eyebrow: p.theme,
    title: p.title,
    intro: p.subhead,
    tone: p.tone,
    imageUrl: p.heroImage,
    cta: p.ctas[0] ? { href: p.ctas[0].href, label: p.ctas[0].label } : undefined,
    cta2: p.ctas[1] ? { href: p.ctas[1].href, label: p.ctas[1].label } : undefined,
    cta3: p.ctas[2] ? { href: p.ctas[1].href, label: p.ctas[2].label } : undefined,
  }];

  /* ------------------------------------------------------------------ */
  /* Section backgrounds alternate: white → mint → white → mint → etc.  */
  /*   white  = no inline bg  (defaults to --bg)                       */
  /*   mint   = bg-[var(--surface-2)]  (#eaf5ee)                       */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* 1. Hero (kept as-is) */}
      <HeroSlider slides={heroSlides} />

      {/* 2. The Challenge (image left, text right, centered eyebrow, mint bg) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">What we're responding to</h2>
          </div>

          <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
            <div>
              <PhotoSlot
                tone={p.tone}
                ratio="16/9"
                imageUrl={p.challengeImage}
                alt={p.challengeImage ? undefined : "The challenge"}
                caption={p.title}
                className="shadow-[var(--shadow-lg)]"
              />
            </div>
            <div>
              <Prose>
                <p>{p.challenge}</p>
              </Prose>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Activities (alternating image + full description, white bg) */}
      {projectActivities.length > 0 && (
        <ActivityList
          items={projectActivities}
          eyebrow="Activities"
          title="What happened in this project"
          intro="Each activity below is a step in the community-led journey — designed, implemented, and sustained with the people who lead them."
          tone={p.tone}
        />
      )}

      {/* 4. Project Impact (3-card horizontal grid, mint bg) */}
      {projectImpactCards.length > 0 && (
        <ImpactGrid
          items={projectImpactCards}
          eyebrow="Project impact"
          title="Verified outcomes from this project"
          intro="Evidence-backed results from the work — each reflecting the priorities communities set for themselves."
          surface
        />
      )}

      {/* IMAGE GALLERY */}
      {(p.gallery && p.gallery.length > 0) && (
        <section className="py-12 md:py-16">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Project gallery</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">From the field</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {p.gallery.map((img, i) => (
                <PhotoSlot
                  key={i}
                  tone={p.tone}
                  ratio="4/3"
                  imageUrl={img.url}
                  caption={img.caption || img.alt || `${p.title} — ${img.beforeAfter ? "Before/After" : "Field photo"}`}
                  className="shadow-[var(--shadow-md)]"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {(p.timeline && p.timeline.length > 0) && (
        <section className="bg-[var(--surface-2)] py-16 md:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Timeline</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Key milestones</h2>
            </div>
            <ol className="mt-10 max-w-2xl mx-auto space-y-6">
              {p.timeline.map((t, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-700)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-0.5 h-full bg-[var(--border)] mt-2 flex-1" />
                  </div>
                  <div className="flex-1">
                    <time className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {new Date(t.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </time>
                    <h3 className="mt-1 text-lg font-semibold">{t.milestone}</h3>
                    <p className="mt-1 text-[var(--ink-soft)]">{t.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* VERIFIED OUTCOMES */}
      {(p.outcomes && p.outcomes.length > 0) && (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Verified outcomes</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Structured results we can stand behind</h2>
            </div>
            <div className="mt-10">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {p.outcomes.map((o, i) => (
                  <div key={o.metric + i} className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
                    {o.status === "verified" ? (
                      <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--forest-700)]">✓ Verified</span>
                    ) : (
                      <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--gold-700)]">◷ Being updated</span>
                    )}
                    <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--ink)]">
                      {o.value} {o.unit || ""}
                    </p>
                    <p className="mt-1 text-[0.92rem] text-[var(--muted)]">{o.metric}</p>
                    {o.note && <p className="mt-2 text-sm text-[var(--muted)]">{o.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMMUNITY VOICE */}
      {p.communityVoice && (
        <section className="bg-[var(--surface-2)] py-16 md:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl">
              <blockquote className="text-center text-xl md:text-2xl leading-relaxed text-[var(--ink-soft)]">
                &ldquo;{p.communityVoice.quote}&rdquo;
              </blockquote>
              {p.communityVoice.name && (
                <figcaption className="mt-6 flex items-center justify-center gap-3 text-[var(--muted)]">
                  <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em]">—</span>
                  <span className="font-medium">{p.communityVoice.name}</span>
                  {p.communityVoice.role && <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em]">{p.communityVoice.role}</span>}
                </figcaption>
              )}
            </div>
          </div>
        </section>
      )}

      {/* DOWNLOADABLE PROJECT BRIEF */}
      {p.projectBriefUrl && (
        <section className="py-12 md:py-16">
          <div className="container-page">
            <a
              href={p.projectBriefUrl}
              className="inline-flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-8 py-6 transition-all hover:border-[var(--accent-600)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-100)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--accent-700)]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">Project Brief</p>
                <p className="font-semibold text-[var(--ink)]">{p.title} — Full Project Brief</p>
                <p className="text-sm text-[var(--muted)]">PDF download with technical design, budget, and methodology</p>
              </div>
              <span className="ml-auto text-[var(--accent-700)]">→</span>
            </a>
          </div>
        </section>
      )}

      {/* RELATED ACTIVITIES & SUB-PROGRAM */}
      {(p.relatedActivities && p.relatedActivities.length > 0) && (
        <section className="bg-[var(--surface-2)] py-16 md:py-24">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Related activities</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Activities contributing to this project</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {p.relatedActivities.map((a, i) => (
                <div
                  key={a.slug}
                  className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <PhotoSlot tone={(["forest", "water", "earth"] as const)[i % 3]} ratio="16/9" tag={a.title} caption={a.title} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </p>
                    <h3 className="mt-2 text-lg leading-snug">{a.title}</h3>
                    <Button
                      href={`/activities/${a.slug}`}
                      variant="secondary"
                      size="sm"
                      className="mt-4 self-start"
                    >
                      View activity
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BREADCRUMB */}
      <section className="py-12">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/projects" className="hover:text-[var(--ink)]">Projects</Link>
            <span aria-hidden>/</span>
            <Link href="/projects/archive" className="hover:text-[var(--ink)]">Archive</Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink)]" aria-current="page">{p.title}</span>
          </nav>
        </div>
      </section>

      <CTABand
        title={`Support ${p.title}`}
        body={p.funding || "Fund the work, partner on delivery, or join as an intern or volunteer."}
        actions={p.ctas}
      />
    </>
  );
}
