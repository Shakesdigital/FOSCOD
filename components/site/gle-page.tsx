/**
 * Global Learning Exchange (GLE) page pieces shared by the five-page structure.
 * Built from the existing design-system blocks (hero, section headers, cards,
 * buttons) so the programme keeps the site's theme and component styles.
 */
import { HeroSlider } from "@/components/site/HeroSlider";
import { SubNav } from "@/components/site/gle-landing";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getHeroSlides } from "@/lib/content";
import {
  gleLinks,
  gleNav,
  gleSteps,
  gleDevelopmentProcess,
  gleProgramTypes,
  gleUi,
  type GleProgramType,
} from "@/lib/gle-pages";

/** Page hero — reuses the programme's existing hero photo with the
 *  document's heading and copy. */
export async function GleHero({
  slug,
  eyebrow,
  title,
  intro,
  cta,
  cta2,
}: {
  slug: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  cta?: { href: string; label: string };
  cta2?: { href: string; label: string };
}) {
  const base = (await getHeroSlides(slug))[0];
  return (
    <HeroSlider
      slides={[
        {
          eyebrow,
          title,
          intro,
          cta,
          cta2,
          tone: base?.tone ?? "forest",
          imageUrl: base?.imageUrl,
        },
      ]}
    />
  );
}

/** Cross-page GLE navigation (same strip style as the existing sub-nav). */
export function GleNav() {
  return <SubNav items={gleNav} label="Global Learning Exchange pages" />;
}

export function GleBreadcrumb({ current }: { current: "Volunteer" | "Internship" }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page py-2 text-sm text-[var(--muted)]">
      <ol className="flex items-center gap-2">
        <li>
          <Link href={gleLinks.overview} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]">
            GLE
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="text-[var(--ink)]">{current}</li>
      </ol>
    </nav>
  );
}

/** Photo + text block used for the GLE overview and ethical-engagement copy. */
export function GlePhotoText({
  id,
  title,
  paragraphs,
  imageUrl,
  imageAlt,
  reverse = false,
  cta,
  surface = false,
}: {
  id?: string;
  title?: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  reverse?: boolean;
  cta?: { href: string; label: string };
  /** tint the section background (mint) so adjacent sections alternate */
  surface?: boolean;
}) {
  return (
    <section id={id} className={`py-10 md:py-14 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page grid items-center gap-10 md:grid-cols-2">
        <div className={reverse ? "md:order-2" : ""}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? ""}
              className="h-full w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover"
              loading="lazy"
            />
          ) : (
            <PhotoSlot
              caption={title ?? "Global Learning Exchange"}
              tone="forest"
              ratio="4/3"
              alt={imageAlt}
            />
          )}
        </div>
        <div className={reverse ? "md:order-1" : ""}>
          {title && (
            <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-[var(--ink)]">
              {title}
            </h2>
          )}
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`${title || index > 0 ? "mt-4" : ""} leading-relaxed text-[var(--ink-soft)]`}
            >
              {paragraph}
            </p>
          ))}
          {cta && (
            <div className="mt-6">
              <Button href={cta.href} variant="primary" size="md">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** The four-step visual overview on the opportunities page. */
export function GleStepOverview() {
  const links: Record<string, { href: string; label: string }[]> = {
    "1": [
      { href: gleLinks.volunteer, label: gleUi.volunteerLabel },
      { href: gleLinks.internship, label: gleUi.internshipLabel },
    ],
    "2": [
      { href: gleLinks.volunteer, label: gleUi.volunteerLabel },
      { href: gleLinks.internship, label: gleUi.internshipLabel },
    ],
    "3": [
      { href: gleLinks.volunteer, label: gleUi.volunteerLabel },
      { href: gleLinks.internship, label: gleUi.internshipLabel },
    ],
    "4": [{ href: gleLinks.apply, label: gleUi.applyLabel }],
  };

  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {gleSteps.map((s) => (
        <li
          key={s.number}
          className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <span className="font-[family-name:var(--font-text)] text-sm text-[var(--accent-700)]">
            {s.number.padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-lg leading-snug font-medium text-[var(--ink)]">{s.title}</h3>
          <p className="mt-2 flex-1 text-[0.92rem] italic leading-relaxed text-[var(--muted)]">{s.line}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {links[s.number].map((l) => (
              <Button key={l.href} href={l.href} variant="ghost" size="sm">
                {l.label}
              </Button>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Step 1 detail — the five program types with their full descriptions and current GLE photos. */
export function GleProgramTypes({
  photos,
}: {
  photos: { title: string; imageUrl?: string; imageAlt?: string }[];
}) {
  const imageByTitle = new Map(photos.map((photo) => [photo.title, photo]));
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {gleProgramTypes.map((p) => (
        <li
          key={p.slug}
          className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
        >
          {imageByTitle.get(p.title)?.imageUrl ? (
            <img
              src={imageByTitle.get(p.title)?.imageUrl}
              alt={imageByTitle.get(p.title)?.imageAlt ?? p.title}
              className="aspect-[16/9] w-full border-b border-[var(--border)] object-cover"
              loading="lazy"
            />
          ) : (
            <PhotoSlot
              caption={p.title}
              tone={p.slug === "study-tour" ? "water" : "forest"}
              ratio="16/9"
              className="rounded-none border-0 border-b"
            />
          )}
          <div className="flex flex-1 flex-col items-center p-6 text-center">
            <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">
              {p.number} {p.title}
            </h3>
            {p.paragraphs.map((para, i) => (
              <p key={i} className={`${i === 0 ? "mt-3" : "mt-2"} text-[0.92rem] leading-relaxed text-[var(--muted)]`}>
                {para}
              </p>
            ))}
            <ProgramTypeLinks program={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ProgramTypeLinks({ program }: { program: GleProgramType }) {
  if (program.slug === "individual") {
    return (
      <div className="mt-5 flex flex-wrap gap-2">
        <Button href={gleLinks.volunteer} variant="primary" size="sm" resolveCta={false}>
          {gleUi.volunteerCta}
        </Button>
        <Button href={gleLinks.internship} variant="primary" size="sm" resolveCta={false}>
          {gleUi.internshipCta}
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <Button href={`${gleLinks.apply}?program=${program.slug}`} variant="primary" size="sm">
        {gleUi.applyCta}
      </Button>
    </div>
  );
}

export function GleTimeline({
  steps,
  firstStepHref,
}: {
  steps: { title: string; body?: string }[];
  firstStepHref?: string;
}) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Mobile: single left rail. Desktop: a centered rail with the steps
          alternating left/right so the sequence reads as a connected flow. */}
      <div className="pointer-events-none absolute bottom-6 left-4 top-6 w-px bg-[var(--accent-200)] md:hidden" aria-hidden />
      <div className="pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-[var(--accent-200)] md:block" aria-hidden />
      <ol className="space-y-6">
        {steps.map((step, index) => {
          const isRight = index % 2 === 0;
          return (
            <li
              key={step.title}
              className="relative md:grid md:grid-cols-2 md:items-center md:gap-12"
            >
              <span className="absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--accent-600)] font-[family-name:var(--font-text)] text-xs font-semibold text-white md:left-1/2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={`ml-12 min-w-0 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-left md:ml-0 md:p-6 ${
                  isRight ? "md:col-start-2" : "md:col-start-1"
                }`}
              >
                <h3 className="text-lg leading-snug font-medium text-[var(--ink)]">
                  {index === 0 && firstStepHref ? (
                    <Link href={firstStepHref} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]">
                      {step.title}
                    </Link>
                  ) : step.title}
                </h3>
                {step.body && (
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">{step.body}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** The five development-process steps in the existing GLE timeline style. */
export function GleProcessSteps() {
  return <GleTimeline steps={gleDevelopmentProcess.steps} />;
}
