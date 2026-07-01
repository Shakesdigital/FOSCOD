import { HeroSlider } from "@/components/site/HeroSlider";
import { CardGrid, FeatureGrid, FeatureRow, QuoteGrid, ProgramDatesTable, ApplyBand } from "@/components/site/blocks";
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
  { title: "Cross-cultural immersion", body: "Live with a host family and build a genuine global perspective." },
  { title: "Professional growth", body: "Project management, leadership, M&E, and communication skills that transfer." },
  { title: "A mid-term retreat", body: "Reflection, cultural exposure, and expert-led learning workshops." },
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
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Built for students, graduates, and early-career professionals</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            University students seeking academic credit or practical experience,
            recent graduates applying what they've learned, early-career
            professionals in sustainable development, and anyone passionate about
            global health, education, agriculture, or women's empowerment.
          </p>
          <div className="mt-7">
            <Button href="/apply" variant="secondary" size="md">Read more</Button>
          </div>
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
        body="Interns build real, practical skills that carry over — many move into full-time roles within months of returning, and FOSCOD alumni now work across leading organisations worldwide."
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
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Transparent, all-inclusive fees</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Your fee covers placement, supervision, accommodation or a host family,
            orientation, a mid-term retreat, and 24/7 local support.
          </p>
          <div className="mt-7">
            <Button href="/programs/program-fees" variant="secondary" size="md">Program fees page</Button>
          </div>
        </div>
      </section>

      {/* program dates — mint */}
      <ProgramDatesTable eyebrow="Program dates" title="Upcoming intakes & partners" rows={dates} surface />

      {/* apply today — green band */}
      <ApplyBand label="Apply Today" href="/apply" />

      {/* internship alumni testimonials — mint */}
      <QuoteGrid
        eyebrow="Internship alumni testimonials"
        title="From people who've been there"
        items={alumni}
        more={{ href: "/alumni", label: "Read more" }}
        surface
      />
    </>
  );
}
