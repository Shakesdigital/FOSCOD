import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

/** FeatureRow — alternating text + image block with an optional CTA.
 *  Mirrors the wireframe's "text + illustration + Learn more" sections. */
export function FeatureRow({
  eyebrow,
  title,
  body,
  cta,
  reverse = false,
  tone = "water",
  imageCaption = "Field photo — add via CMS",
  surface = false,
}: {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  cta?: { href: string; label: string };
  reverse?: boolean;
  tone?: "earth" | "water" | "forest";
  imageCaption?: string;
  surface?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page grid items-center gap-10 md:grid-cols-2">
        <div className={reverse ? "md:order-2" : ""}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)]">{title}</h2>
          <div className="mt-4 max-w-[var(--measure)] space-y-3 leading-relaxed text-[var(--ink-soft)]">
            {typeof body === "string" ? <p>{body}</p> : body}
          </div>
          {cta && (
            <div className="mt-7">
              <Button href={cta.href} variant="secondary" size="md">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
        <div className={reverse ? "md:order-1" : ""}>
          <PhotoSlot tone={tone} ratio="4/3" caption={imageCaption} className="shadow-[var(--shadow-sm)]" />
        </div>
      </div>
    </section>
  );
}

/** HowWeWork — an ordered, arrowed flow (the wireframe's process diagram). */
export function HowWeWork({
  eyebrow = "How we work",
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: string[];
}) {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)]">{title}</h2>
        </div>
        <ol className="mt-10 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 md:flex-1 md:min-w-[200px]">
              <div className="flex h-full flex-1 items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-700)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.92rem] leading-snug text-[var(--ink-soft)]">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden shrink-0 text-[var(--accent-600)] md:block" aria-hidden>→</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** SupportOurCause — the wireframe's recurring 3-way "ways to help" block. */
export function SupportOurCause() {
  const cards = [
    { title: "Volunteer", body: "Give your time and skills to community-led projects.", href: "/volunteer", label: "Learn more" },
    { title: "Partner with us", body: "Collaborate as a university, NGO, or funder.", href: "/partners", label: "Learn more" },
    { title: "Donate to a cause", body: "Fund WASH, clean energy, livelihoods, and more.", href: "/donate", label: "Learn more" },
  ];
  return (
    <section className="bg-[var(--surface-2)] py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Support our cause</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Three ways to help</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">{c.body}</p>
              <div className="mt-5">
                <Button href={c.href} variant="secondary" size="md">{c.label}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Prose — readable long-form text capped to a comfortable measure. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[var(--measure)] space-y-4 text-[1.05rem] leading-relaxed text-[var(--ink-soft)] [&_strong]:text-[var(--ink)]">
      {children}
    </div>
  );
}

/** A simple two-column block: heading/intro on the left, content on the right. */
export function SplitSection({
  eyebrow,
  title,
  children,
  surface = false,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  surface?: boolean;
}) {
  return (
    <section className={`py-16 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** FeatureGrid — cards of {title, body, optional kicker}. */
export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string; kicker?: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return (
    <ul className={`grid gap-5 ${cols}`}>
      {items.map((it) => (
        <li
          key={it.title}
          className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          {it.kicker && (
            <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
              {it.kicker}
            </p>
          )}
          <h3 className="mt-2 text-lg leading-snug">{it.title}</h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">
            {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** CheckList — "what's included" style list with a tick. */
export function CheckList({
  items,
  tone = "accent",
}: {
  items: string[];
  tone?: "accent" | "water" | "muted";
}) {
  const color =
    tone === "water"
      ? "var(--water)"
      : tone === "muted"
        ? "var(--muted)"
        : "var(--accent-600)";
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-[0.95rem] text-[var(--ink-soft)]">
          <span className="mt-1 shrink-0" style={{ color }} aria-hidden>
            ✓
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps — only used where order genuinely matters (a process). */
export function Steps({ steps }: { steps: { title: string; body?: string }[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--accent-700)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-lg leading-snug">{s.title}</h3>
          {s.body && (
            <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--muted)]">
              {s.body}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** FAQ — native disclosure, accessible by default. */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[var(--border)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
      {items.map((it) => (
        <details key={it.q} className="group px-6 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-medium text-[var(--ink)] marker:hidden">
            {it.q}
            <span className="text-[var(--accent-600)] transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--muted)]">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/** CTABand — closing call to action used at the foot of inner pages. */
export function CTABand({
  title,
  body,
  actions,
}: {
  title: string;
  body?: string;
  actions: { href: string; label: string; variant?: "primary" | "secondary" | "ghost" }[];
}) {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-8 py-14 text-center md:px-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 120% at 50% -20%, var(--accent-50), transparent 60%)",
          }}
          aria-hidden
        />
        <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)]">{title}</h2>
        {body && (
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
            {body}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((a) => (
            <Button key={a.href} href={a.href} variant={a.variant ?? "primary"} size="lg">
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
