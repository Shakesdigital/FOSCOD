import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid, FAQ, FeatureGrid, FeatureRow, QuoteGrid, ProgramDatesTable, ApplyBand, Steps } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getVolunteerOpportunities, getProgramDates, getAlumniExperiences } from "@/lib/content";

export const metadata = pageMeta(
  "Sustainable Development Internships in Uganda",
  "Build real-world skills through supervised community projects, research, monitoring, communications, public health, clean energy, and enterprise development."
);

const types = [
  { title: "Individual Internship", excerpt: "A one-to-one placement matched to your goals, field, and timeline.", href: "/internships/individual", tone: "water" as const },
  { title: "Group Engage Internship", excerpt: "University cohorts and professional groups on a shared community project.", href: "/internships/group", tone: "forest" as const },
  { title: "University Cohort Program", excerpt: "Faculty-led cohorts with academic alignment and risk management.", href: "/apply", tone: "earth" as const },
];

const reasons = [
  { title: "Real-world impact", body: "Contribute to genuine, community-driven projects under local supervision." },
  { title: "Personalised guidance", body: "Supervision and support from FOSCOD staff and community partners throughout." },
  { title: "Community assessment & design", body: "Learn needs assessment, project design, and implementation on the ground." },
  { title: "Cross-cultural learning", body: "Prepare, listen, reflect, and learn with local partners; accommodation is confirmed for each intake." },
  { title: "Professional growth", body: "Project management, leadership, M&E, and communication skills that transfer." },
  { title: "Structured reflection", body: "Connect experience to learning goals, supervisor feedback, community value, and a responsible handover." },
];

const journey = [
  { title: "Check your fit", body: "Share your discipline, skills, learning goals, timing, support needs, and the type of work you are prepared to do." },
  { title: "Review a real role", body: "FOSCOD confirms the community purpose, boundaries, supervisor, expected outputs, requirements, dates, and current costs." },
  { title: "Prepare", body: "Complete the required cultural, ethical, technical, safeguarding, health, and practical preparation for the placement." },
  { title: "Work & reflect", body: "Contribute under local guidance, keep appropriate records, and connect field experience to your learning goals." },
  { title: "Hand over & debrief", body: "Return work and findings in a useful form, review community and supervisor feedback, and identify responsible next steps." },
];

const faqs = [
  { q: "Does FOSCOD accept every applicant?", a: "No. A placement depends on fit between a verified community need, your preparation, the role boundaries, supervision capacity, timing, and safeguarding requirements." },
  { q: "Will an internship guarantee a job or academic credit?", a: "No. FOSCOD can define learning outputs and provide completion evidence for an approved placement. Your institution decides academic credit, and no employment outcome is guaranteed." },
  { q: "What will I actually do?", a: "Each open role should name its purpose, tasks, prohibited activities, deliverables, weekly expectations, supervisor, and the continuity plan after you leave. Do not rely on a broad theme alone." },
  { q: "What does the program fee include?", a: "Request the current, version-dated brief. It should separate what FOSCOD provides, what a university or partner provides, what the participant arranges, and what costs are excluded." },
  { q: "How are health, safety, safeguarding, and accessibility handled?", a: "Requirements vary by role and intake. FOSCOD should confirm screening, conduct rules, emergency contacts, insurance responsibilities, accommodation, transport, accessibility limitations, and safe reporting routes before acceptance." },
];

export default async function InternshipsPage() {
  const [heroSlides, opportunities, dates, alumni] = await Promise.all([
    getHeroSlides("internships"),
    getVolunteerOpportunities(),
    getProgramDates(),
    getAlumniExperiences(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* about — white */}
      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>About our internship program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Hands-on, immersive experience in sustainable development</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Using an asset-based approach, interns collaborate with local
            communities and partner organisations to address real development
            needs — gaining professional skills and cultural understanding across
            public health, education, agriculture, clean energy, and women's
            empowerment.
          </p>
        </div>
      </section>

      {/* types — mint */}
      <CardGrid
        eyebrow="Types of internship"
        title="Three ways to intern"
        intro="Every internship is matched to your goals and supervised by FOSCOD staff and community partners."
        items={types.map((t) => ({ title: t.title, excerpt: t.excerpt, href: t.href, tone: t.tone }))}
        surface
      />

      {/* who can intern — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Who can intern</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Built for learners ready for a defined, supervised role</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            University students, recent graduates, and early-career professionals may be a fit when their preparation matches a current community-defined role. Technical, research, health-related, and direct community work carry different requirements and boundaries.
          </p>
          <div className="mt-7">
            <Button href="/apply" variant="secondary" size="md">Check your fit</Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>How an internship moves</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Preparation and handover are part of the work</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">A useful placement begins before arrival and continues through a documented handover—not just time spent in the field.</p>
          </div>
          <div className="mt-10"><Steps steps={journey} /></div>
          <p className="mt-6 text-sm text-[var(--muted)]">Practice context: <a className="text-[var(--accent-700)] underline" href="https://www.forumea.org/community-engaged-learning-abroad.html" target="_blank" rel="noreferrer">The Forum on Education Abroad</a> recommends community-identified, community-driven learning with preparation, reciprocity, and reflection.</p>
        </div>
      </section>

      {/* why intern — mint */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why intern with FOSCOD</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">A program built around real impact</h2>
          </div>
          <div className="mt-10"><FeatureGrid items={reasons} columns={3} /></div>
        </div>
      </section>

      {/* internship alumni impact — white */}
      <FeatureRow
        eyebrow="Internship alumni impact"
        title="Skills that translate into careers"
        tone="water"
        imageCaption="Internship alumni — add photo via CMS"
        body="From 2019–2024, FOSCOD trained 42 development practitioners: 27 in-person interns, 11 virtual interns, and 4 volunteers. Placements combine supervised practice with community-defined priorities."
        cta={{ href: "/impact", label: "Read more" }}
      />

      {/* internship opportunities — mint */}
      <CardGrid
        eyebrow="Internship opportunities"
        title="Where you can make a difference"
        intro="Contribute across the themes communities have prioritised."
        items={opportunities.map((o) => ({ title: o.title, excerpt: o.excerpt, href: o.href }))}
        more={{ href: "/internships/opportunities", label: "Browse all opportunities" }}
        surface
      />

      {/* program fees — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Program fees</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Review the current program brief before committing</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Dates, total cost, inclusions, exclusions, accommodation, supervision, local transport, insurance responsibilities, and support must be confirmed for the specific intake. If a fee is not currently verified, request an updated brief.
          </p>
          <div className="mt-7">
            <Button href="/programs/program-fees" variant="secondary" size="md">Program fees page</Button>
          </div>
        </div>
      </section>

      {/* program dates — mint */}
      <ProgramDatesTable eyebrow="Program dates" title="Upcoming intakes & partners" rows={dates} surface />

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div><Eyebrow>Internship FAQ</Eyebrow><h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Know the role before you travel</h2></div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* apply today — green band */}
      <ApplyBand label="Check your fit and apply" href="/apply" />

      {/* internship alumni testimonials — mint */}
      {alumni.length > 0 ? (
        <QuoteGrid
          eyebrow="Internship alumni testimonials"
          title="From people who've been there"
          items={alumni}
          more={{ href: "/alumni", label: "Read more" }}
          surface
        />
      ) : null}
    </>
  );
}
