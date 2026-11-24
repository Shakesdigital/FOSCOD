import { CTABand } from "@/components/site/blocks";
import { SectionHeader } from "@/components/site/Section";
import { GleHero, GleNav, GleStepOverview, GleProgramTypes } from "@/components/site/gle-page";
import { pageMeta } from "@/lib/seo";
import { getGlePathways } from "@/lib/content";
import {
  gleBegin,
  gleExplore,
  gleSteps,
  gleLinks,
  glePhotoFallbacks,
  gleUi,
  resolveGlePhoto,
} from "@/lib/gle-pages";

const stepOne = gleSteps[0];

export const metadata = pageMeta(
  "Opportunities — Global Learning Exchange (GLE)",
  "Explore GLE opportunities in four simple steps: choose your program type, thematic area, engagement approach and participation format."
);

export default async function GleOpportunitiesPage() {
  const sourcePhotos = await getGlePathways();
  const fallbackPhotos = Object.values(glePhotoFallbacks);
  const photos = sourcePhotos.map((photo, index) => ({
    ...photo,
    imageUrl: resolveGlePhoto(photo.imageUrl, fallbackPhotos[index % fallbackPhotos.length]),
  }));

  return (
    <>
      <GleHero
        slug="global-learning-exchange"
        eyebrow={gleUi.opportunitiesLabel}
        title={gleExplore.title}
        intro={`${gleExplore.paragraphs[0]} ${gleExplore.paragraphs[1]}`}
        cta={{ href: gleLinks.apply, label: gleUi.applyCta }}
      />

      <GleNav />

      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow={gleUi.opportunitiesLabel}
            title="Explore your opportunities in four simple steps."
            align="center"
          />
          <div className="mt-12">
            <GleStepOverview />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="program-types-heading">
        <div className="container-page">
          <div id="program-types-heading">
            <SectionHeader
              eyebrow={`Step ${stepOne.number.replace(".", "")}`}
              title={stepOne.title}
              align="center"
            />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center italic leading-relaxed text-[var(--muted)]">
            {stepOne.line}
          </p>
          <div className="mt-12">
            <GleProgramTypes photos={photos} />
          </div>
        </div>
      </section>

      <CTABand
        eyebrow={gleUi.nextStepEyebrow}
        title={gleBegin.title}
        body={gleBegin.body}
        actions={[
          { href: gleLinks.apply, label: gleUi.applyCta },
          { href: gleLinks.volunteer, label: gleUi.volunteerLabel, variant: "secondary" },
          { href: gleLinks.internship, label: gleUi.internshipLabel, variant: "ghost" },
        ]}
      />
    </>
  );
}
