import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SplitSection, Prose, CheckList, CTABand } from "@/components/site/blocks";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { projectDetails, getProjectDetail } from "@/lib/projects";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.subhead,
    openGraph: { title: `${p.title} — FOSCOD`, description: p.subhead },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero eyebrow={p.theme} title={p.title} intro={p.subhead}>
        {p.ctas.map((c) => (
          <Button key={c.href} href={c.href} variant={c.variant ?? "primary"} size="lg">
            {c.label}
          </Button>
        ))}
      </PageHero>

      <section className="container-page py-12 md:py-16">
        <PhotoSlot
          tone={p.tone}
          ratio="21/9"
          tag={p.location}
          caption={`${p.title} — lead field image`}
          className="shadow-[var(--shadow-md)]"
        />
      </section>

      <SplitSection eyebrow="The challenge" title="What we're responding to">
        <Prose>
          <p>{p.challenge}</p>
        </Prose>
      </SplitSection>

      <section className="bg-[var(--surface-2)] py-16 md:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Our approach</h2>
            <ol className="mt-6 space-y-3">
              {p.approach.map((a, i) => (
                <li key={a} className="flex gap-3 text-[0.98rem] text-[var(--ink-soft)]">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-700)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Highlights</h2>
            <div className="mt-6"><CheckList items={p.highlights} tone="water" /></div>
            <p className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 text-[0.95rem] text-[var(--ink-soft)]">
              <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                Funding need
              </span>
              <br />
              {p.funding}
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title={`Support ${p.title}`}
        body="Fund the work, partner on delivery, or join as an intern or volunteer."
        actions={p.ctas}
      />
    </>
  );
}
