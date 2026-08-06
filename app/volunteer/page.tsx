import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramsSection, FAQ, FeatureGrid, FeatureRow, CardGrid, QuoteGrid, ProgramDatesTable, ApplyBand, Steps } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getVolunteerOpportunities, getProgramDates, getAlumniExperiences } from "@/lib/content";

export const metadata = pageMeta(
  "Volunteer in Uganda with FOSCOD",
  "Work with communities, not just in communities, through structured volunteer programs that support local priorities and lasting impact."
);

const types = [
  { slug: "group", title: "Group volunteer", summary: "University cohorts, faculty-led groups, and professional teams co-designing a shared project, with responsibilities and support confirmed in the group brief.", href: "/volunteer/group", tone: "water" as const },
  { slug: "individual", title: "Individual volunteer", summary: "A role matched to your skills, a current community priority, and the local supervision available.", href: "/volunteer/individual", tone: "forest" as const },
];

const reasons = [
  { title: "Hands-on learning", body: "Work directly with FOSCOD and local partners on real, field-based projects." },
  { title: "Lasting community impact", body: "Every placement is tied to a genuine community priority — not manufactured tasks." },
  { title: "Local supervision", body: "You're supported by FOSCOD staff and community leaders throughout." },
  { title: "Cross-cultural learning", body: "Structured preparation and reflection, with accommodation arrangements confirmed for the intake." },
  { title: "Professional growth", body: "Build assessment, project design, leadership, and communication skills." },
  { title: "Reflection & debrief", body: "Time to examine what you learned, receive feedback, and hand work over responsibly." },
];

const journey = [
  { title: "Start with the need", body: "FOSCOD and local partners identify work that is useful, appropriate for outside participation, and possible to supervise." },
  { title: "Match the role", body: "Your skills, experience, conduct requirements, availability, and support needs are reviewed against a defined role." },
  { title: "Prepare responsibly", body: "Complete the cultural, safeguarding, technical, health, and practical preparation required for the placement." },
  { title: "Contribute with guidance", body: "Work within agreed boundaries under local supervision, with feedback and reflection throughout." },
  { title: "Hand over & review", body: "Document outputs and unfinished work, then review community value as well as your own learning." },
];

const faqs = [
  { q: "Can anyone volunteer?", a: "Interest matters, but it is not enough on its own. Acceptance depends on the role, relevant preparation, supervision capacity, timing, safeguarding checks, and whether the contribution is useful to an active community priority." },
  { q: "What activities are volunteers not allowed to do?", a: "Boundaries depend on the placement. Volunteers must not work beyond their competence, bypass local professionals, collect or publish personal information without permission, or conduct unsupervised activities with children or other at-risk groups." },
  { q: "How do I know the role is genuinely needed?", a: "An open role should explain who identified the need, how it connects to ongoing work, what output is expected, who supervises it, and how work continues after the volunteer leaves." },
  { q: "What does the fee include?", a: "Request the current, version-dated program brief. It should list confirmed inclusions and exclusions, accommodation, transport, supervision, emergency contacts, insurance responsibilities, and any community-partner costs." },
  { q: "How are photos, stories, and data handled?", a: "Consent, privacy, safeguarding, and respectful representation apply. A volunteer's wish to document an experience never overrides another person's right to decline." },
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
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">A good match is more important than an open invitation</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Students, graduates, professionals, faculty-led groups, and other applicants may be a fit when their skills and preparation match a current role. Direct community, technical, health-related, research, and child-facing activities require different boundaries and checks.
          </p>
          <div className="mt-7">
            <Button href="/apply" variant="secondary" size="md">Check your fit</Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>Responsible volunteering</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Community purpose before volunteer activity</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">Selection, preparation, duty of care, role management, debriefing, and evaluation all shape whether a placement is helpful.</p>
          </div>
          <div className="mt-10"><Steps steps={journey} /></div>
          <p className="mt-6 text-sm text-[var(--muted)]">Practice context: the <a className="text-[var(--accent-700)] underline" href="https://forum-ids.org/global-volunteering-standard/" target="_blank" rel="noreferrer">Global Volunteering Standard</a> organizes responsible practice around program design, duty of care, placement management, debriefing, and evaluation.</p>
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
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Request a current, itemized program brief</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            The brief should confirm total cost, inclusions, exclusions, accommodation, local transport, supervision, emergency support, insurance responsibilities, and what the participant arranges.
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
          <div><Eyebrow>Volunteer FAQ</Eyebrow><h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Know the purpose and boundaries before you travel</h2></div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* apply today — green band */}
      <ApplyBand label="Check your fit and apply" href="/apply" />

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
