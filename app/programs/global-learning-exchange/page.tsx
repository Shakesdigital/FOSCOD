import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, CardGrid, FeatureRow, ProgramDatesTable, CTABand, QuoteGrid } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getGleStreams,
  getVolunteerOpportunities,
  getProgramDates,
  getAlumniExperiences,
  getImpactStats,
  getFeaturedProjects,
} from "@/lib/content";

export const metadata = pageMeta(
  "Global Learning & Exchange (GLE)",
  "FOSCOD's Global Learning and Exchange program connects students, professionals, researchers, and groups with structured field learning in Uganda."
);

export default async function GlePage() {
  const [heroSlides, streams, opportunities, dates, alumni, gleImpactStats, gleProjects] = await Promise.all([
    getHeroSlides("global-learning-exchange"),
    getGleStreams(),
    getVolunteerOpportunities(),
    getProgramDates(),
    getAlumniExperiences(),
    getImpactStats("GLE"),
    getFeaturedProjects(),
  ]);

  // Filter projects for GLE only (in real CMS, would filter by program tag)
  const gleProjectsFiltered = gleProjects.filter((p) =>
    ["biochar-uganda", "wash", "renewable-energy", "sustainable-livelihood-green-enterprises"].includes(p.slug)
  );

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* About GLE */}
      <SplitSection eyebrow="About Global Learning & Exchange" title="Learn ethical development through real projects">
        <Prose>
          <p>
            FOSCOD's Global Learning & Exchange (GLE) program connects students, professionals, researchers, and university groups with structured, supervised field learning in Uganda.
          </p>
          <p>
            Participants work alongside FOSCOD, community organizations, host families, and local leaders across clean energy, WASH, livelihoods, health, and environmental sustainability. You contribute to genuine community priorities under local supervision — not manufactured tasks.
          </p>
          <p>
            Whether you come for academic credit, career experience, service, or community-based participatory research (CBPR), the structure is the same: prepare, place, deliver, reflect, and leave something that lasts.
          </p>
        </Prose>
      </SplitSection>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Two pathways, one standard of support</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-xl font-semibold">For Interns & Volunteers</h3>
              <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Application review & matching to community priorities</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Pre-departure orientation (cultural, safety, technical)</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Host-family placement with 24/7 in-country support</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Supervised field work with FOSCOD staff & community mentors</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Ethical development practice standards & reflection sessions</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Certificate, debrief, and alumni network on completion</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-xl font-semibold">For Universities & Partners</h3>
              <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> MOU-based partnerships with fee-for-service model</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Co-designed programs aligned to academic calendars & learning outcomes</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Faculty-led group programs with risk management built in</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Community-Based Participatory Research (CBPR) collaboration</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Shared data, publications, and capacity building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GLE Program Activities */}
      <CardGrid
        eyebrow="GLE program activities"
        title="Two activity streams, nationwide reach"
        intro="Every placement ties to one of these core activity areas — all community-driven, all supervised."
        items={streams.map((s) => ({ title: s.title, excerpt: s.excerpt, href: s.href }))}
        surface
      />

      {/* Featured GLE Projects */}
      <CardGrid
        eyebrow="Featured GLE projects"
        title="Where global learners make a difference"
        intro="Projects below host GLE interns, volunteers, and researchers. Explore the work."
        items={gleProjectsFiltered.map((p, i) => ({
          title: p.title,
          excerpt: p.summary,
          href: p.href,
          tone: (["water", "forest", "earth"] as const)[i % 3],
        }))}
        more={{ href: "/projects", label: "View all projects" }}
      />

      {/* Partner Institutions */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Partner institutions</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Universities & organizations that trust FOSCOD</h2>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-100)] flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">NU</span>
              </div>
              <div>
                <p className="font-medium">Northwestern University</p>
                <p className="text-sm text-[var(--muted)]">via KAYA Responsible Travel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-100)] flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">FLC</span>
              </div>
              <div>
                <p className="font-medium">Fort Lewis College</p>
                <p className="text-sm text-[var(--muted)]">Global Learning Partnerships</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-100)] flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">BLG</span>
              </div>
              <div>
                <p className="font-medium">Buikwe Local Government</p>
                <p className="text-sm text-[var(--muted)]">Memorandum of Understanding</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-100)] flex items-center justify-center">
                <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--accent-700)]">AIESEC</span>
              </div>
              <div>
                <p className="font-medium">AIESEC</p>
                <p className="text-sm text-[var(--muted)]">In-kind support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLE Impact Stats */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>GLE impact (2019–2024)</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Verified outcomes from global learning</h2>
          </div>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {gleImpactStats.length > 0 ? (
              gleImpactStats.map((m) => (
                <div key={m.metric_name} className="bg-[var(--surface)] p-6">
                  <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                    {m.current_value}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.metric_name}</dt>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em]">
                    {m.as_of_date ? (
                      <span className="text-[var(--muted)]">As of {new Date(m.as_of_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                    ) : m.status === "verified" ? (
                      <span className="text-[var(--forest-700)]">✓ Verified</span>
                    ) : (
                      <span className="text-[var(--gold-700)]">◷ Being updated</span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              // Fallback GLE-specific stats from Fact Sheet
              [
                { label: "Virtual interns engaged", value: "93", note: "2019–2024" },
                { label: "In-person interns & volunteers", value: "27", note: "2019–2024" },
                { label: "Development practitioners trained", value: "42", note: "27 in-person + 11 virtual + 4 volunteers" },
                { label: "E-community projects implemented", value: "50", note: "Busoga & Mukono regions" },
              ].map((m) => (
                <div key={m.label} className="bg-[var(--surface)] p-6">
                  <dd className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] leading-none text-[var(--ink)]">
                    {m.value}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{m.label}</dt>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {m.note}
                  </p>
                </div>
              ))
            )}
          </dl>
        </div>
      </section>

      {/* Program Dates Table */}
      <ProgramDatesTable
        eyebrow="Program dates"
        title="Upcoming intakes & partners"
        rows={dates}
        surface
      />

      {/* CTA Block */}
      <CTABand
        title="Ready to start your journey?"
        body="Compare pathways in the finder, then send an application for the FOSCOD team to review."
        actions={[
          { href: "/apply", label: "Apply today" },
          { href: "/programs/finder", label: "Find your program", variant: "secondary" },
          { href: "/partners", label: "Partner your institution", variant: "ghost" },
        ]}
      />

      {/* Alumni Testimonies */}
      <QuoteGrid
        eyebrow="Alumni testimonies"
        title="From people who've been there"
        items={alumni}
        more={{ href: "/alumni", label: "Read more" }}
        surface
      />
    </>
  );
}
