import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, CardGrid, ProgramDatesTable, CTABand, QuoteGrid, FeatureGrid, Steps, FAQ } from "@/components/site/blocks";
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

const pathways = [
  { title: "Internships", body: "A role matched to your discipline, learning goals, demonstrated skills, and the supervision available.", href: "/internships", cta: "Explore internships", kicker: "Individuals" },
  { title: "Responsible volunteering", body: "A defined contribution to ongoing work, with role boundaries, preparation, local guidance, and handover.", href: "/volunteer", cta: "Explore volunteering", kicker: "Individuals & groups" },
  { title: "Faculty-led programs", body: "Co-designed group learning connected to course outcomes, field activities, reflection, and community value.", href: "/partners", cta: "Plan a faculty program", kicker: "Universities" },
  { title: "Community-based research", body: "Research shaped with local partners, including ethics, data, authorship, dissemination, and return-of-findings agreements.", href: "/partners", cta: "Discuss research", kicker: "Researchers" },
];

const ethicalSteps = [
  { title: "Listen & define", body: "FOSCOD and local partners identify a useful question, project, or role before recruitment." },
  { title: "Match & prepare", body: "We review fit, agree boundaries and outputs, and confirm the preparation and support required." },
  { title: "Work with guidance", body: "Participants contribute under FOSCOD and community-partner direction, with regular reflection." },
  { title: "Hand over", body: "Work, data, materials, and unfinished actions are documented for continuity after departure." },
  { title: "Review together", body: "Participant learning and community value should both inform the next cycle." },
];

const gleFaqs = [
  { q: "Who defines the work?", a: "FOSCOD develops roles from priorities identified with communities and local partners. An applicant's interests help with matching, but do not replace the community-defined purpose of the work." },
  { q: "Do I need previous experience?", a: "Requirements depend on the role. Observation and learning activities may be suitable for beginners; research, technical, health-related, or direct community work requires relevant preparation and closer review." },
  { q: "What support is included?", a: "The current program brief confirms the named supervisor, orientation, accommodation arrangement, local transport, emergency contact, and other support for that specific intake. Services are not assumed until confirmed in writing." },
  { q: "Can my institution award academic credit?", a: "FOSCOD can work with an institution to align activities and evidence of learning. The home institution remains responsible for approving academic credit." },
  { q: "How are safeguarding and respectful storytelling handled?", a: "Participants must follow role boundaries, consent requirements, the code of conduct, and rules for photography, stories, personal data, and research data. Current checks depend on the placement." },
  { q: "How is community benefit assessed?", a: "The intended community value is agreed during design, then reviewed through outputs, partner feedback, handover, and appropriate project indicators—not participant satisfaction alone." },
];

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
            Whether you come for academic learning, career experience, service, or community-based participatory research (CBPR), the structure is the same: prepare, contribute within a defined role, reflect, and complete a useful handover.
          </p>
        </Prose>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Find your pathway</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">One program, different levels of responsibility</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Choose the route that fits your role. Dates, fees, supervision, and deliverables are confirmed for each approved intake or partnership.
            </p>
          </div>
          <div className="mt-10"><FeatureGrid columns={4} items={pathways} /></div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>Our ethical commitment</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Learning and community value must travel together</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Good global learning balances participant development with community direction, local expertise, reciprocity, safeguarding, and continuity. FOSCOD uses that standard to shape each role and partnership.
            </p>
          </div>
          <div className="mt-10"><Steps steps={ethicalSteps} /></div>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
            Practice context: <a className="text-[var(--accent-700)] underline" href="https://compact.org/news/fair-trade-learning" target="_blank" rel="noreferrer">Fair Trade Learning standards</a> emphasize both community outcomes and student learning, with community voice and direction throughout program design.
          </p>
        </div>
      </section>

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
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Role-specific cultural, ethical, safety, and technical preparation</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Accommodation, transport, and support confirmed in the current intake brief</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Supervised field work with FOSCOD staff & community mentors</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Ethical development practice standards & reflection sessions</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Debrief, handover, and completion record agreed for the role</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8">
              <h3 className="text-xl font-semibold">For Universities & Partners</h3>
              <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Partnership scope, roles, costs, and review points documented in writing</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Co-designed programs aligned to academic calendars & learning outcomes</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Faculty-led group roles, risk ownership, accessibility, and support agreed in advance</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Community-Based Participatory Research (CBPR) collaboration</li>
                <li className="flex gap-3"><span className="shrink-0 text-[var(--accent-700)]">✓</span> Research ethics, data, authorship, dissemination, and local feedback agreed in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GLE Program Activities */}
      <CardGrid
        eyebrow="GLE program activities"
        title="Two activity streams, locally guided"
        intro="Every approved placement connects to an active learning or community priority and the supervision available at that time."
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

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>Before you apply</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Questions responsible participants ask</h2>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              Open roles should name their purpose, boundaries, expected outputs, supervisor, timing, requirements, and costs. If a detail is still being verified, FOSCOD will confirm it before placement.
            </p>
          </div>
          <FAQ items={gleFaqs} />
        </div>
      </section>

      {/* CTA Block */}
      <CTABand
        title="Ready to check your fit?"
        body="Compare pathways, review the current role details, then send an application for the FOSCOD team to assess. Institutions can request a co-design conversation."
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
