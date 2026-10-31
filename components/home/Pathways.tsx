import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentCard } from "@/components/ui/ContentCard";
import type { Pathway } from "@/lib/content";

export function Pathways({ pathways }: { pathways: Pathway[] }) {
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-center gap-4">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Our programs</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">
            Two ways to work with FOSCOD
          </h2>
          <p className="mt-4 max-w-sm text-[0.95rem] text-[var(--muted)]">
            Whether you come to learn or to invest, the work stays community-led
            and locally owned.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pathways.map((p) => (
          <div key={p.key} className="group h-full">
            <ContentCard
              title={p.title}
              excerpt={p.body}
              href={p.href}
              ctaLabel={p.cta}
              kicker={p.kicker}
              imageRatio="16/9"
              tone={p.tone === "accent" ? undefined : p.tone}
              asLink={true}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
