import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramsSection, FeatureGrid, FeatureRow, CardGrid, QuoteGrid, ProgramDatesTable, ApplyBand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getVolunteerOpportunities, getProgramDates, getAlumniExperiences } from "@/lib/content";

export const metadata = pageMeta(
  "Volunteer in Uganda with FOSCOD",
  "Work with communities, not just in communities, through structured volunteer programs that support local priorities and lasting impact."
);

const types = [
  { slug: "group", title: "Group volunteer", summary: "University cohorts, faculty-led groups, and professional teams working a shared community project — with logistics and risk management handled.", href: "/volunteer/group", tone: "water" as const },
  { slug: "individual", title: "Individual volunteer", summary: "A placement matched to your skills and the community's needs, with local supervision and 24/7 in-country support.", href: "/volunteer/individual", tone: "forest" as const },
];

const reasons = [
  { title: "Hands-on learning", body: "Work directly with FOSCOD and local partners on real, field-based projects." },
  { title: "Lasting community impact", body: "Every placement is tied to a genuine community priority — not manufactured tasks." },
  { title: "Local supervision", body: "You're supported by FOSCOD staff and community leaders throughout." },
  { title: "Cross-cultural immersion", body: "A host-family experience that builds a global perspective and lasting bonds." },
  { title: "Professional growth", body: "Build assessment, project design, leadership, and communication skills." },
  { title: "A retreat & excursion", body: "Time to reflect and experience Uganda's culture and natural beauty." },
];

export default async function VolunteerPage() {
  const [heroSlides, opportunities, dates, alumni] = await Promise.all([
    getHeroSlides("volunteer"),
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
          <Eyebrow>About our volunteer program</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Work with communities, not just in them</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            FOSCOD volunteers support community-led priorities — training, WASH
            promotion, school and community projects, livelihoods, documentation,
            and environmental action — always under local supervision.
          </p>
        </div>
      </section>

      {/* types — mint */}
      <ProgramsSection
        eyebrow="Types of volunteer program"
        title="Volunteer individually or as a group"
        intro="Choose the format that fits you — both are supervised, supported, and rooted in real community work."
        items={types}
        ctaLabel="More Details"
        surface
      />

      {/* who can volunteer — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Who can volunteer</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">If you're ready to contribute, there's a place for you</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Students, recent graduates, young professionals, faculty-led groups,
            and anyone passionate about sustainable development are welcome — no
            single background required, just commitment and respect for the
            communities you'll work with.
          </p>
          <div className="mt-7">
            <Button href="/apply" variant="secondary" size="md">Read more</Button>
          </div>
        </div>
      </section>

      {/* why volunteer — mint */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why volunteer with FOSCOD</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">A program built around real impact</h2>
          </div>
          <div className="mt-10"><FeatureGrid items={reasons} columns={3} /></div>
        </div>
      </section>

      {/* volunteer alumni impact — white */}
      <FeatureRow
        eyebrow="Volunteer alumni impact"
        title="Volunteers leave more than a report behind"
        tone="forest"
        imageCaption="Volunteer alumni in the field — add photo via CMS"
        body="FOSCOD's 2019–2024 track record includes 16 completed community development projects, with 86% continuing to benefit communities independently. Volunteer roles are designed around that standard of local ownership."
        cta={{ href: "/impact", label: "Read more" }}
      />

      {/* volunteer opportunities — mint */}
      <CardGrid
        eyebrow="Volunteer opportunities"
        title="Where you can make a difference"
        intro="Contribute across the themes communities have prioritised."
        items={opportunities.map((o) => ({ title: o.title, excerpt: o.excerpt, href: o.href }))}
        more={{ href: "/volunteer/opportunities", label: "Browse all opportunities" }}
        surface
      />

      {/* program fees — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Program fees</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Clear, all-inclusive fees</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Your fee covers placement, supervision, accommodation or a host family,
            orientation, a retreat, and 24/7 local support — with a clear breakdown.
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

      {/* volunteer alumni testimonials — mint */}
      {alumni.length > 0 ? (
        <QuoteGrid
          eyebrow="Volunteer alumni testimonials"
          title="From people who've been there"
          items={alumni}
          more={{ href: "/alumni", label: "Read more" }}
          surface
        />
      ) : null}
    </>
  );
}
