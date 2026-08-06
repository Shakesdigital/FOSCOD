import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, CTABand, FeatureGrid } from "@/components/site/blocks";
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

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow={p.theme}
        title={p.title}
        intro={p.subhead}
        imageUrl={p.heroImage}
        ctas={p.ctas.map((c) => (
          <Button key={c.href} href={c.href} variant={c.variant ?? "primary"} size="lg">
            {c.label}
          </Button>
        ))}
      />

      {/* THE CHALLENGE */}
      <SplitSection eyebrow="The challenge" title="What we're responding to">
        <Prose>
          <p>{p.challenge}</p>
        </Prose>
      </SplitSection>

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

      {/* OUR APPROACH */}
      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Our approach</h2>
            <ol className="mt-6 space-y-3">
              {p.approach.map((a, i) => (
                <li key={a} className="flex gap-3 text-[0.98rem] text-[var(--ink-soft)]">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-700)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Highlights</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2.5 text-[0.95rem] text-[var(--ink-soft)]">
                  <span className="mt-1 shrink-0 text-[var(--accent-600)]" aria-hidden>✓</span>
                  {h}
                </div>
              ))}
            </div>
            {p.budget && (
              <p className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-[0.95rem] text-[var(--ink-soft)]">
                <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                  Budget
                </span>
                <br />
                {p.budget}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* VERIFIED OUTCOMES */}
      {(p.outcomes && p.outcomes.length > 0) && (
        <section className="bg-[var(--surface-2)] py-16 md:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Verified outcomes</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Structured results we can stand behind</h2>
            </div>
            <div className="mt-10">
              <FeatureGrid
                items={p.outcomes.map((o) => ({
                  title: o.metric,
                  body: `${o.value} ${o.unit || ""}${o.note ? ` — ${o.note}` : ""}`,
                  kicker: o.status === "verified" ? "✓ Verified" : "◷ Being updated",
                }))}
                columns={3}
              />
            </div>
          </div>
        </section>
      )}

      {/* COMMUNITY VOICE */}
      {p.communityVoice && (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="rounded-[var(--radius-xl)] border border-[var(--accent-200)] bg-[var(--accent-50)] p-8 md:p-12">
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
        <section className="bg-[var(--surface-2)] py-12 md:py-16">
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
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Related activities</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Activities contributing to this project</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {p.relatedActivities.map((a, i) => (
                <a
                  key={a.slug}
                  href={`/activities/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <PhotoSlot tone={["forest", "water", "earth"][i % 3] as "forest" | "water" | "earth"} ratio="16/9" tag={a.title} caption={a.title} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </p>
                    <h3 className="mt-2 text-lg leading-snug">{a.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                      View activity →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BREADCRUMB */}
      <section className="py-12">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[var(--ink)]">Home</a>
            <span aria-hidden>/</span>
            <a href="/projects" className="hover:text-[var(--ink)]">Projects</a>
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