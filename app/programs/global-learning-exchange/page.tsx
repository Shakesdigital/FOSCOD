import { GleHero, GleNav, GlePhotoText } from "@/components/site/gle-page";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/site/Section";
import { pageMeta } from "@/lib/seo";
import {
  getGleApplySection,
  getGleBenefits,
  getGleIntroduction,
  getGlePathways,
  getGleProgramCards,
} from "@/lib/content";
import {
  gleExplore,
  gleIntro,
  gleLinks,
  gleMatching,
  glePhotoFallbacks,
  gleUi,
  resolveGlePhoto,
} from "@/lib/gle-pages";
import {
  ContentBlock,
  SectionDivider,
  CardGrid,
  PhotoBand,
} from "@/components/site/gle-landing";
import { GleTimeline } from "@/components/site/gle-page";

export const metadata = pageMeta(
  "Global Learning Exchange (GLE)",
  "Global Learning Exchange (GLE) is FOSCOD's community-engaged learning program that designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations."
);

const existingAboutParagraphs = [
  "Our internship and volunteer program are highly structured connecting global knowledge with local innovation. It offers a unique opportunity to immerse yourself in impactful projects, develop critical skills, and contribute to meaningful, lasting change in underserved communities.",
  "As a student, professional and philanthropist, you'll work alongside local organizations and communities, gaining expertise in community assessment, program design, monitoring & evaluation, leadership and ethical development practices. Uganda's rich culture and resilience provide the perfect setting for cross-cultural learning and professional growth.",
];

const programCopy = {
  Internship:
    "The internship program is structured to provide you with professional and academic experience in your specific field. You take on more specialized roles, working closely with organizations on research, project management, policy analysis, or technical tasks related to your studies or career interests.",
  Volunteer:
    "This volunteer program is typically designed for you who is passionate about making a difference, to give your time and skills to support a cause. You will contribute to community-driven initiatives focusing on service and community impact, and engage in activities to gain practical experience, teamwork and cross-cultural experience.",
};

export default async function GleLandingPage() {
  const [introduction, programCards, benefits, pathways, applySection] = await Promise.all([
    getGleIntroduction(),
    getGleProgramCards(),
    getGleBenefits(),
    getGlePathways(),
    getGleApplySection(),
  ]);

  const findProgram = (name: "Internship Program" | "Volunteer Program") =>
    programCards.find((card) => card.title === name);
  const internship = findProgram("Internship Program");
  const volunteer = findProgram("Volunteer Program");
  const availablePhotos = [
    ...programCards.map((card) => ({ imageUrl: card.imageUrl, imageAlt: card.imageAlt })),
    ...pathways.map((card) => ({ imageUrl: card.imageUrl, imageAlt: card.imageAlt })),
    { imageUrl: introduction.imageUrl, imageAlt: introduction.imageAlt },
    { imageUrl: applySection.imageUrl, imageAlt: applySection.imageAlt },
  ]
    .map((photo) => ({ ...photo, imageUrl: resolveGlePhoto(photo.imageUrl, "") }))
    .filter((photo): photo is { imageUrl: string; imageAlt: string | undefined } => Boolean(photo.imageUrl));
  const benefitPhotos = availablePhotos.length
    ? availablePhotos
    : Object.values(glePhotoFallbacks).map((imageUrl) => ({ imageUrl, imageAlt: undefined }));
  const introductionPhoto = pathways.find(
    (photo) => resolveGlePhoto(photo.imageUrl, "") && photo.imageUrl !== introduction.imageUrl
  );

  const programCardsData = [
    {
      title: "Internship",
      description: programCopy.Internship,
      href: gleLinks.internship,
      cta: "Explore Internships",
      imageUrl: resolveGlePhoto(internship?.imageUrl, glePhotoFallbacks.preparation),
      imageAlt: internship?.imageAlt ?? "A FOSCOD intern collaborating with community members",
      tone: "water" as const,
      tag: "GLE Pathway",
    },
    {
      title: "Volunteer",
      description: programCopy.Volunteer,
      href: gleLinks.volunteer,
      cta: "Explore Volunteering",
      imageUrl: resolveGlePhoto(volunteer?.imageUrl, glePhotoFallbacks.community),
      imageAlt: volunteer?.imageAlt ?? "A FOSCOD volunteer working with community members",
      tone: "forest" as const,
      tag: "GLE Pathway",
    },
  ];

  const benefitCards = benefits.map((benefit, index) => ({
    title: benefit.title,
    description: benefit.body,
    kicker: benefit.title,
    tone: (["water", "forest", "earth"] as const)[index % 3],
    imageUrl: benefitPhotos[index % benefitPhotos.length].imageUrl,
    imageAlt: benefitPhotos[index % benefitPhotos.length].imageAlt ?? benefit.title,
  }));

  return (
    <>
      <GleHero
        slug="global-learning-exchange"
        title={gleIntro.title}
        intro={gleIntro.tagline}
      />
      <GleNav />

      {/* INTRODUCTION */}
      <GlePhotoText
        paragraphs={gleIntro.paragraphs}
        imageUrl={resolveGlePhoto(introductionPhoto?.imageUrl, glePhotoFallbacks.learning)}
        imageAlt={introductionPhoto?.imageAlt ?? "FOSCOD participants learning with local communities"}
      />

      <SectionDivider />

      {/* EXPLORE OPPORTUNITIES */}
      <section className="py-16 md:py-24" aria-label={gleExplore.title}>
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow={gleUi.exploreEyebrow}
              title={gleExplore.title}
              intro={gleExplore.paragraphs[0]}
              align="center"
            />
            <p className="leading-relaxed text-[var(--ink-soft)]">{gleExplore.paragraphs[1]}</p>
            <div className="mt-8 text-center">
              <Button href={gleLinks.opportunities} size="lg">
                {gleUi.exploreCta}
              </Button>
            </div>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* MATCHING PROCESS */}
      <section
        className="bg-[var(--surface-2)] py-16 md:py-24"
        aria-label={gleMatching.title}
      >
        <div className="container-page">
          <ContentBlock maxWidth="3xl" spacing="normal">
            <SectionHeader
              eyebrow={gleUi.matchingEyebrow}
              title={gleMatching.title}
              align="center"
            />
            <div className="prose-space">
              {gleMatching.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={`${index ? "mt-4" : ""} leading-relaxed text-[var(--ink-soft)]`}>
                  {paragraph}
                </p>
              ))}
              <p className="mt-5 italic leading-relaxed text-[var(--muted)]">{gleMatching.note}</p>
            </div>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* ABOUT PROGRAMS */}
      <GlePhotoText
        title="About Our Internship & Volunteer Programs"
        paragraphs={existingAboutParagraphs}
        imageUrl={resolveGlePhoto(introduction.imageUrl, glePhotoFallbacks.community)}
        imageAlt={introduction.imageAlt ?? "A FOSCOD volunteer working with community members"}
        reverse
      />

      <SectionDivider />

      {/* PROGRAM PATHWAYS - Two column cards */}
      <section className="py-16 md:py-24" aria-label="Internship and volunteer programs">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow="Our pathways"
              title="Two ways to engage with FOSCOD"
              intro="Choose the pathway that matches your goals — both are supervised, community-linked, and designed for meaningful contribution."
              align="center"
            />
          </ContentBlock>

          <CardGrid columns={2} className="mt-10" items={
            programCardsData.map((program) => (
              <article
                key={program.title}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:shadow-[var(--shadow-xl)] hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={program.imageUrl}
                    alt={program.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
                  {program.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="font-[family-name:var(--font-text)] text-[0.6rem] uppercase tracking-[0.14em] text-white bg-black/50 px-2 py-1 rounded-[var(--radius-full)]">
                        {program.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="text-[1.5rem] leading-snug font-medium text-[var(--ink)]">{program.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-[var(--ink-soft)]">{program.description}</p>
                  <div className="mt-6">
                    <Button href={program.href} variant="primary" size="md" className="w-full sm:w-auto">
                      {program.cta}
                    </Button>
                  </div>
                </div>
              </article>
            ))
          } />
        </div>
      </section>

      <SectionDivider />

      {/* WHY PARTICIPATE - Benefits grid */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24" aria-label="Why participate in GLE">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow="Why FOSCOD"
              title="Why participate in Global Learning Exchange"
              intro="Our approach combines ethical practice, community leadership, and structured learning — so every placement creates value for both you and the communities you serve."
              align="center"
            />
          </ContentBlock>

          <CardGrid columns={3} className="mt-10" items={
            benefitCards.map((benefit) => (
              <article
                key={benefit.title}
                className="group h-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={benefit.imageUrl}
                    alt={benefit.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">{benefit.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{benefit.description}</p>
                </div>
              </article>
            ))
          } />
        </div>
      </section>

      <SectionDivider />

      {/* APPLICATION PROCESS OVERVIEW */}
      <section className="py-16 md:py-24" aria-label="How to apply overview">
        <div className="container-page">
          <ContentBlock maxWidth="2xl" spacing="normal">
            <SectionHeader
              eyebrow="Getting started"
              title="Your journey from application to placement"
              intro="FOSCOD works collaboratively with you, your institution, communities and partner organizations to develop a meaningful and mutually beneficial experience."
              align="center"
            />
          </ContentBlock>

          <ContentBlock className="mt-12" maxWidth="3xl" spacing="normal">
            <GleTimeline
              steps={[
                { title: "Apply & share your interests", body: "Submit the application form with your background, skills, thematic interests and preferred program type. Applying starts a conversation — it is not a commitment." },
                { title: "Application review", body: "The FOSCOD team reviews your application against community priorities, partner availability and supervision capacity, and responds with feedback on program fit." },
                { title: "Interview & placement planning", body: "We schedule an interview to clarify goals and aspirations, then agree activities, responsibilities, supervision, expected outputs and ethical requirements with the host community or organization." },
                { title: "Confirmation & pre-arrival", body: "Your placement, timing, support and costs are confirmed in writing before you pay — with pre-arrival preparation and orientation materials to get you ready." },
                { title: "Supported engagement & learning", body: "On the ground: orientation, mentorship, practical guidance, monitoring and guided reflection. At the end, outcomes are reviewed with community partners and your work is handed over so it continues after you leave." },
              ]}
            />
          </ContentBlock>

          <ContentBlock className="mt-10" maxWidth="2xl" spacing="tight">
            <div className="text-center">
              <p className="text-[0.92rem] leading-relaxed text-[var(--muted)]">
                Submitting an application starts a matching process — it does not guarantee acceptance or a particular host organization.
              </p>
            </div>
          </ContentBlock>
        </div>
      </section>

      <SectionDivider />

      {/* FINAL CTA */}
      <GlePhotoText
        title="Your Internship or Volunteer journey starts here"
        paragraphs={[
          "Whether you're looking to gain practical experience, fulfill academic internship requirements, or simply make a difference, this program provides an unparalleled opportunity to learn, grow, and contribute to ethical, sustainable development.",
        ]}
        imageUrl={resolveGlePhoto(applySection.imageUrl, glePhotoFallbacks.learning)}
        imageAlt={applySection.imageAlt ?? "FOSCOD participants on a community learning visit"}
        cta={{ href: gleLinks.apply, label: "Apply Today" }}
      />
    </>
  );
}