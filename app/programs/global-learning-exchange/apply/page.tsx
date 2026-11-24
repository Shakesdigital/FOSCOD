import { CTABand } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { GleHero, GleNav, GleProcessSteps, GlePhotoText } from "@/components/site/gle-page";
import GleApplicationForm from "@/components/forms/GleApplicationForm";
import { pageMeta } from "@/lib/seo";
import { getGlePathways } from "@/lib/content";
import { parseGleApplicationSelections } from "@/lib/gle-selections";
import {
  gleApply,
  gleBegin,
  gleDevelopmentProcess,
  gleEthics,
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
  const [params, photos] = await Promise.all([searchParams, getGlePathways()]);
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
  const ethicsPhoto = photos.find((photo) => photo.imageUrl);

  return (
    <>
      <GleHero slug="global-learning-exchange" eyebrow={gleUi.applyLabel} title={gleIntro.title} />

      <GleNav />

      {/* 1. Participation format */}
      <section className="py-16 md:py-24" aria-labelledby="format-heading">
        <div className="container-page">
          <div id="format-heading">
            <SectionHeader eyebrow="Step 4" title="Choose Your Participation Format" align="center" />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center italic leading-relaxed text-[var(--muted)]">
            {gleParticipation.stepIntro}
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {gleParticipation.formats.map((f) => (
              <div
                key={f.title}
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7"
              >
                <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">{f.title}</h3>
                {f.paragraphs.map((para, i) => (
                  <p key={i} className="mt-3 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                    {para}
                  </p>
                ))}
                {f.note && (
                  <p className="mt-4 border-t border-[var(--border)] pt-4 text-[0.9rem] italic leading-relaxed text-[var(--muted)]">
                    {f.note}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[var(--muted)]">
            Available choices in the application form depend on your selected program type.
          </p>
        </div>
      </section>

      {/* 2. How we develop your experience */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24" aria-labelledby="process-heading">
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
          <div className="mt-12">
            <GleProcessSteps />
          </div>
        </div>
      </section>

      {/* 3. Ethical engagement */}
      <GlePhotoText
        title={gleEthics.title}
        paragraphs={gleEthics.paragraphs}
        imageUrl={resolveGlePhoto(ethicsPhoto?.imageUrl, glePhotoFallbacks.community)}
        imageAlt={ethicsPhoto?.imageAlt ?? "FOSCOD participants learning with local communities"}
      />

      {/* 4. Begin your journey */}
      <section className="bg-[var(--forest-50)] py-16 md:py-24" aria-labelledby="begin-heading">
        <div className="container-page mx-auto max-w-3xl text-center">
          <div id="begin-heading">
            <SectionHeader eyebrow={gleUi.nextStepEyebrow} title={gleBegin.title} align="center" />
          </div>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{gleBegin.body}</p>
        </div>
      </section>

      {/* 5. Start your application */}
      <section id="application" className="scroll-mt-36 py-16 md:py-24" aria-labelledby="application-heading">
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

      <CTABand
        eyebrow={gleUi.nextStepEyebrow}
        title={gleBegin.title}
        body={gleBegin.body}
        actions={[{ href: "#application", label: "Continue to application" }]}
      />
    </>
  );
}
