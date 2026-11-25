import { FAQ, ProgramDatesTable } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { GleHero, GleNav, GleProcessSteps } from "@/components/site/gle-page";
import GleApplicationForm from "@/components/forms/GleApplicationForm";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getGlePathways, getProgramDates } from "@/lib/content";
import { gleLandingContent } from "@/lib/gle-landing";
import { parseGleApplicationSelections } from "@/lib/gle-selections";
import {
  gleApply,
  gleDevelopmentProcess,
  gleIntro,
  gleParticipation,
  gleUi,
  gleThematic,
  glePhotoFallbacks,
  resolveGlePhoto,
} from "@/lib/gle-pages";

export const metadata = pageMeta(
  "Apply — Global Learning Exchange (GLE)",
  "Start your GLE application: choose your participation format, learn how FOSCOD develops your experience, and apply for a GLE program in Uganda."
);

export default async function GleApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [params, photos, dates] = await Promise.all([
    searchParams,
    getGlePathways(),
    getProgramDates(),
  ]);
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((item) => search.append(key, item));
    else if (typeof value === "string") search.set(key, value);
  }
  const allowedThemes = [
    ...gleThematic.cedp.areas.map((area) => area.title),
    ...gleThematic.partners.sectors,
  ];
  const initialSelections = parseGleApplicationSelections(search, allowedThemes);
  const faqSource = initialSelections.pathway
    ? gleLandingContent[initialSelections.pathway].faqs
    : [
        ...gleLandingContent.volunteer.faqs,
        ...gleLandingContent.internship.faqs,
      ];
  const faqs = Array.from(new Map(faqSource.map((item) => [item.q, item])).values());
  const faqTitle =
    initialSelections.pathway === "volunteer"
      ? "Questions volunteers ask"
      : initialSelections.pathway === "internship"
        ? "Questions interns ask"
        : "Questions applicants ask";

  // Featured image for each participation-format card (falls back to a GLE photo).
  const formatPhotos = gleParticipation.formats.map((_, index) => {
    const photo = photos[index] ?? photos[0];
    return {
      imageUrl: resolveGlePhoto(
        photo?.imageUrl,
        index === 0 ? glePhotoFallbacks.preparation : glePhotoFallbacks.community
      ),
      imageAlt: photo?.imageAlt,
    };
  });

  return (
    <>
      <GleHero slug="global-learning-exchange" eyebrow={gleUi.applyLabel} title={gleIntro.title} />

      <GleNav />

      {/* 1. Introduction to the application */}
      <section className="py-10 md:py-14" aria-labelledby="intro-heading">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <div id="intro-heading">
              <SectionHeader
                eyebrow={gleUi.applyLabel}
                title="Applying to Global Learning Exchange"
                intro="One guided application for internships, volunteering, group placements, service-learning trips and study tours. It helps us match your goals, skills and availability with community-defined priorities and partner organizations — starting a conversation, not a commitment."
                align="center"
              />
            </div>
            <p className="mt-4 italic leading-relaxed text-[var(--muted)]">{gleApply.note}</p>
          </div>
        </div>
      </section>

      {/* 2. Participation format */}
      <section className="bg-[var(--surface-2)] py-10 md:py-14" aria-labelledby="format-heading">
        <div className="container-page">
          <div id="format-heading">
            <SectionHeader eyebrow="Step 4" title="Choose Your Participation Format" align="center" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center italic leading-relaxed text-[var(--muted)]">
            {gleParticipation.stepIntro}
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
            {gleParticipation.formats.map((f, index) => (
              <div
                key={f.title}
                className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={formatPhotos[index].imageUrl}
                    alt={formatPhotos[index].imageAlt ?? f.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">{f.title}</h3>
                  {f.paragraphs.map((para, i) => (
                    <p key={i} className="mt-3 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[var(--muted)]">
            Available choices in the application form depend on your selected program type.
          </p>
        </div>
      </section>

      {/* 3. Start dates */}
      <div id="dates" className="scroll-mt-36">
        {dates.length > 0 ? (
          <ProgramDatesTable
            eyebrow="Program dates"
            title="Start dates"
            intro="Placements are scheduled individually. Confirmed intake windows appear below; timing, support and costs are always confirmed in writing before placement."
            rows={dates}
            firstLabel="Intake"
            secondLabel="Details"
          />
        ) : (
          <section className="py-10 md:py-14" aria-label="Start dates">
            <div className="container-page">
              <div className="mx-auto max-w-2xl text-center">
                <SectionHeader
                  eyebrow="Program dates"
                  title="Start dates"
                  intro="Placements are scheduled individually — matched to community priorities, partner availability and your availability. Confirmed intake windows will appear here once scheduled; timing, support and costs are always confirmed in writing before placement."
                  align="center"
                />
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href="#application">Start your application</Button>
                  <Button href="/contact" variant="secondary">Contact us</Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 4. Program fees */}
      <section id="fees" className="scroll-mt-36 bg-[var(--surface-2)] py-10 md:py-14" aria-labelledby="fees-heading">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div id="fees-heading">
              <SectionHeader
                eyebrow="Program fees"
                title="Fees &amp; what is included"
                align="center"
              />
            </div>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Program fees vary by placement type, duration and host. Each opportunity&rsquo;s intake brief sets
              out inclusions, accommodation and cancellation terms. Review the full fee schedule and refund
              policy before you apply.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/programs/program-fees" variant="secondary">View program fees</Button>
              <Button href="/programs/refund-policy" variant="ghost">Cancellation &amp; refund policy</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How we develop your experience */}
      <section className="py-10 md:py-14" aria-labelledby="process-heading">
        <div className="container-page">
          <div id="process-heading">
            <SectionHeader
              eyebrow="Our process"
              title={gleDevelopmentProcess.title}
              intro={gleDevelopmentProcess.intro}
              align="center"
            />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-[var(--ink-soft)]">
            {gleDevelopmentProcess.lead}
          </p>
          <div className="mt-10">
            <GleProcessSteps />
          </div>
        </div>
      </section>

      {/* 6. Start your application */}
      <section id="application" className="scroll-mt-36 bg-[var(--surface-2)] py-10 md:py-14" aria-labelledby="application-heading">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <div id="application-heading">
              <SectionHeader eyebrow={gleUi.applyLabel} title={gleApply.title} align="center" />
            </div>
            <p className="mt-4 italic leading-relaxed text-[var(--muted)]">{gleApply.note}</p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <GleApplicationForm initialSelections={initialSelections} />
          </div>
        </div>
      </section>

      {/* 7. Frequently asked questions */}
      <section id="faqs" className="scroll-mt-36 py-10 md:py-14" aria-label="Frequently asked questions">
        <div className="container-page">
          <SectionHeader eyebrow="Frequently asked questions" title={faqTitle} align="center" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}