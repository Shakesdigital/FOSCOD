import { SectionHeader } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Button } from "@/components/ui/Button";
import { PartnerSectorsCarousel } from "@/components/site/PartnerSectorsCarousel";
import { ExpandableCard, SectionDivider } from "@/components/site/gle-landing";
import { gleEngagement, gleThematic } from "@/lib/gle-pages";
import { glePartnerSectors } from "@/lib/gle-landing";

type GlePathway = "volunteer" | "internship";

const engagementTones = ["water", "forest", "earth"] as const;
const areaTones = ["forest", "water", "earth"] as const;

const engagementImages: Record<string, { imageUrl: string; imageAlt: string }> = {
  A: {
    imageUrl: "/images/gle/thematic/community-development.jpg",
    imageAlt: "Community members and partners planning a development project together",
  },
  B: {
    imageUrl: "/images/gle/thematic/research.jpg",
    imageAlt: "A community-based participatory research session in a Ugandan community",
  },
  C: {
    imageUrl: "/images/gle/volunteer/duration.jpg",
    imageAlt: "A FOSCOD participant learning alongside community members in Uganda",
  },
};

/** The thematic-area and engagement-approach sections shared by the GLE
 *  volunteer and internship landing pages. Presentational only — the
 *  application form keeps its own selection controls. */
export function GleSelectionSections({ pathway }: { pathway: GlePathway }) {
  const opportunitiesHref = `/opportunities?type=${pathway}`;

  return (
    <>
      <section
        id="thematic-areas"
        className="scroll-mt-36 bg-[var(--surface)] py-10 md:py-14"
        aria-label="Thematic areas"
      >
        <div className="container-page">
          <SectionHeader
            eyebrow="Thematic areas"
            title="Choose your thematic area"
            intro={gleThematic.stepIntro}
            align="center"
          />

          <div className="mt-8 space-y-12">
            {/* Focus area A — text aligned right, image space on the left */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="lg:order-1">
                <PhotoSlot
                  caption="CEDP community-led development in Kalagala Parish, Buikwe District"
                  tone="forest"
                  ratio="4/3"
                  imageUrl="/images/gle/volunteer/who-can-volunteer.jpg"
                  alt="FOSCOD community members working on a CEDP priority in Uganda"
                />
              </div>

              <div className="lg:order-2">
                <Eyebrow>Focus area A</Eyebrow>
                <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
                  {gleThematic.cedp.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {gleThematic.cedp.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-[var(--ink-soft)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {gleThematic.cedp.areas.map((area, index) => (
                <div
                  key={area.title}
                  className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
                >
                  <PhotoSlot
                    caption={area.imageAlt ?? area.title}
                    tone={areaTones[index % areaTones.length]}
                    ratio="16/9"
                    imageUrl={area.imageUrl}
                    alt={area.imageAlt ?? area.title}
                    bare
                  />
                  <div className="flex h-full flex-col p-5">
                    <h4 className="text-[1.02rem] leading-snug font-medium text-[var(--ink)]">
                      {area.title}
                    </h4>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                      {area.body}
                    </p>
                    <div className="mt-auto pt-5">
                      <Button href={area.href} variant="ghost" size="sm">
                        Explore this focus area
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Focus area B — text aligned right, looping image carousel below */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="lg:order-1">
                <PhotoSlot
                  caption="Learning alongside FOSCOD's network of local partner organizations"
                  tone="water"
                  ratio="4/3"
                  imageUrl="/images/gle/volunteer/fees.jpg"
                  alt="FOSCOD participants collaborating with a local partner organization"
                />
              </div>

              <div className="lg:order-2">
                <Eyebrow>Focus area B</Eyebrow>
                <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
                  {gleThematic.partners.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                  {gleThematic.partners.lead}
                </p>
              </div>
            </div>

            <PartnerSectorsCarousel
              items={glePartnerSectors}
              href={opportunitiesHref}
              tone={pathway === "volunteer" ? "forest" : "water"}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      <section
        id="engagement-approach"
        className="scroll-mt-36 bg-[var(--surface-2)] py-10 md:py-14"
        aria-label="Engagement approach"
      >
        <div className="container-page">
          <SectionHeader
            eyebrow="Engagement approach"
            title="Choose your engagement approach"
            intro={gleEngagement.stepIntro}
            align="center"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gleEngagement.options.map((option, index) => {
              const image = engagementImages[option.letter];
              return (
                <ExpandableCard
                  key={option.letter}
                  title={option.title}
                  intro={option.paragraphs[0]}
                  body={option.paragraphs.slice(1).join("\n\n")}
                  tag={`Approach ${option.letter}`}
                  imageUrl={image.imageUrl}
                  imageAlt={image.imageAlt}
                  tone={engagementTones[index % engagementTones.length]}
                  size="feature"
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
