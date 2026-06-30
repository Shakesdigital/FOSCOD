import { HeroSlider } from "@/components/site/HeroSlider";
import { SplitSection, Prose, CardGrid, QuoteGrid, ProgramDatesTable, FeatureRow, CTABand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getGleStreams,
  getVolunteerOpportunities,
  getProgramDates,
  getAlumniExperiences,
} from "@/lib/content";

export const metadata = pageMeta(
  "Global Service Learning in Uganda",
  "FOSCOD's Global Learning and Exchange program connects students, professionals, researchers, and groups with structured field learning in Uganda."
);

export default async function GlePage() {
  const [heroSlides, streams, opportunities, dates, alumni] = await Promise.all([
    getHeroSlides("global-learning-exchange"),
    getGleStreams(),
    getVolunteerOpportunities(),
    getProgramDates(),
    getAlumniExperiences(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* about — white */}
      <SplitSection eyebrow="About Global Service Learning" title="Learn ethical development through real projects">
        <Prose>
          <p>
            Participants work alongside FOSCOD, community organizations, host
            families, and local leaders. You contribute to genuine community
            priorities under local supervision — not manufactured tasks.
          </p>
          <p>
            Whether you come for academic credit, career experience, service, or
            research, the structure is the same: prepare, place, deliver, reflect,
            and leave something that lasts.
          </p>
        </Prose>
      </SplitSection>

      {/* GLE programs — mint */}
      <CardGrid
        eyebrow="Global Service Learning programs"
        title="Three ways to take part"
        intro="Pick the format that fits you — each is supervised, supported, and rooted in real community work."
        items={streams.map((s) => ({ title: s.title, excerpt: s.excerpt, href: s.href }))}
        surface
      />

      {/* volunteer opportunities — white */}
      <CardGrid
        eyebrow="Volunteer opportunities"
        title="Where you can make a difference"
        intro="Contribute across the themes communities have prioritised."
        items={opportunities.map((o) => ({ title: o.title, excerpt: o.excerpt, href: o.href }))}
      />

      {/* impact of the program — mint */}
      <FeatureRow
        eyebrow="Impact of the program"
        title="Real contribution, measurable change"
        tone="water"
        surface
        imageCaption="Participants in the field — add photo via CMS"
        body="Every placement is tied to a genuine community project, so your work leaves something behind — a protected spring, a solar enterprise, a stronger savings group — long after you return home."
        cta={{ href: "/impact", label: "Read more" }}
      />

      {/* program fees — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Program fees</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Clear, all-inclusive fees</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Fees cover placement, supervision, accommodation or a host family,
            orientation, cultural activities, and 24/7 local support.
          </p>
          <div className="mt-7">
            <Button href="/programs/program-fees" variant="secondary" size="md">Program fees page</Button>
          </div>
        </div>
      </section>

      {/* program dates — mint */}
      <ProgramDatesTable
        eyebrow="Program dates"
        title="Upcoming intakes & partners"
        rows={dates}
        surface
      />

      {/* apply today — white */}
      <CTABand
        title="Ready to start your journey?"
        body="Compare programs in the finder, then apply. Our team replies within two working days."
        actions={[
          { href: "/apply", label: "Apply today" },
          { href: "/programs/finder", label: "Find your program", variant: "secondary" },
        ]}
      />

      {/* alumni testimonies — mint */}
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
