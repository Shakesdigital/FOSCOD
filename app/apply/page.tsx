import { HeroSlider } from "@/components/site/HeroSlider";
import { Steps } from "@/components/site/blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getGlePathways, getGleDevelopmentSectors, getGleEngagementApproaches, getGleParticipationFormats, type GleDevelopmentSector } from "@/lib/content";
import { getOpportunities } from "@/lib/opportunities";
import UnifiedApplicationForm, { type WizardSector } from "@/components/forms/UnifiedApplicationForm";

export const metadata = pageMeta(
  "Plan your experience / Apply",
  "Plan your GLE experience with FOSCOD: apply for an internship, volunteering placement, group project, service-learning trip or study tour, request placement guidance, or enquire as a group or trip coordinator."
);

// Maps ?type= slugs (from GLE page CTAs) to wizard experience-type rows.
const TYPE_ALIASES: Record<string, string> = {
  "group-project": "Group Project Placement",
  "coordinated-group": "Coordinated Group Placement",
  "service-learning-trip": "Service-Learning Trip",
  "study-tour": "Study Tour Program",
};

const planningSteps = [
  { title: "Share your interest", body: "Choose an experience type, thematic interests and participation format — or ask for guidance if you're unsure." },
  { title: "Collaborative matching", body: "FOSCOD reviews your interest against community priorities, partner availability and supervision capacity." },
  { title: "Placement planning", body: "Together we agree activities, learning objectives, responsibilities, supervision, outputs and ethical requirements." },
  { title: "Prepare & arrive", body: "Orientation, cultural preparation and logistics are confirmed in writing before your placement begins." },
];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [heroSlides, experienceTypes, sectors, approaches, formats, opportunities, params] = await Promise.all([
    getHeroSlides("apply"),
    getGlePathways(),
    getGleDevelopmentSectors(),
    getGleEngagementApproaches(),
    getGleParticipationFormats(),
    getOpportunities(),
    searchParams,
  ]);

  const typeParam = typeof params.type === "string" ? params.type : undefined;
  const opportunityParam = typeof params.opportunity === "string" ? params.opportunity : undefined;

  const prefillExperienceType = typeParam
    ? (TYPE_ALIASES[typeParam] ?? experienceTypes.find((t) => t.title === typeParam)?.title)
    : undefined;

  const wizardSectors: WizardSector[] = sectors.map((s: GleDevelopmentSector) => ({
    slug: s.slug,
    label: s.title,
    category: s.category ?? "partner",
  }));

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* 1. Plan your experience */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Plan your experience</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">From interest to a confirmed placement</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              One short application flow for internships, volunteering, group placements, service-learning trips
              and study tours — with a placement-guidance option if you&apos;re not sure which program or
              approach suits your objectives.
            </p>
          </div>
          <div className="mt-10">
            <Steps steps={planningSteps} />
          </div>
          <p className="mx-auto mt-8 max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-center text-sm leading-relaxed text-[var(--ink-soft)]">
            <strong>Please note:</strong> submitting an application or enquiry starts a matching process. It
            does not guarantee acceptance or a particular host organization, project or research opportunity.
          </p>
        </div>
      </section>

      {/* 2. The application form */}
      <section id="apply-form" className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Eyebrow>Apply or enquire</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Start your application</h2>
            <p className="mt-3 text-[var(--muted)]">
              Your information is preserved between steps, and you can review everything before submitting.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <UnifiedApplicationForm
              experienceTypes={experienceTypes.map((t) => ({ slug: t.title, label: t.title }))}
              sectors={wizardSectors}
              approaches={approaches.map((a) => ({ slug: a.slug, label: a.title }))}
              formats={formats.map((f) => ({ slug: f.slug, label: f.title }))}
              opportunities={opportunities.map((o) => ({ slug: o.slug, label: o.title }))}
              prefill={{
                opportunity: opportunityParam,
                experienceType: prefillExperienceType,
                intent: typeParam === "guidance" ? "guidance" : (typeParam && typeParam.includes("group") ? "group" : null),
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Practical information */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Practical information</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Fees, dates and arrangements</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Fees, inclusions, accommodation and cancellation terms are confirmed per opportunity in the
              current intake brief — arrangements vary by host and placement type.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/programs/program-fees" variant="secondary">Fees & practical information</Button>
              <Button href="/programs/refund-policy" variant="ghost">Cancellation & refund policy</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Guidance */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Need guidance?</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Not sure which program suits you?</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Choose &ldquo;request placement guidance&rdquo; as your experience type in the form above, or
              contact FOSCOD directly — we will help you identify an appropriate program type, thematic area
              and engagement approach before you commit.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="secondary">Contact FOSCOD</Button>
              <Button href="/opportunities" variant="ghost">Browse the opportunities directory</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
