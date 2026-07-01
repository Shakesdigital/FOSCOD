import type { ReactNode } from "react";
import Link from "next/link";
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
  surface = false,
}: {
  eyebrow?: string;
  title: string;
  steps: string[];
  surface?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
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

/** ProgramsSection — intro + two program cards in one row (CMS-driven).
 *  Used on the home page ("Our programs") and the Programs page. */
export function ProgramsSection({
  eyebrow,
  title,
  intro,
  items,
  surface = false,
  ctaLabel = "Learn more",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { slug: string; title: string; summary: string; href: string; tone: "earth" | "water" | "forest"; pillar?: string }[];
  surface?: boolean;
  ctaLabel?: string;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">{title}</h2>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>
          )}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((p) => (
            <div
              key={p.slug}
              className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <PhotoSlot tone={p.tone} ratio="16/9" caption={`${p.title} — add photo via CMS`} />
              <div className="flex flex-1 flex-col p-7 md:p-8">
                {p.pillar && (
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                    {p.pillar}
                  </p>
                )}
                <h3 className="mt-2 text-[clamp(1.3rem,2.2vw,1.7rem)]">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-soft)]">{p.summary}</p>
                <div className="mt-6">
                  <Button href={p.href} variant="secondary" size="md">{ctaLabel}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ApplyBand — the wireframe's full-width green "Apply Today" call to action. */
export function ApplyBand({
  label = "Apply Today",
  href = "/apply",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <Link
          href={href}
          className="flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--green-cta)] px-8 py-5 text-center text-lg font-semibold text-white transition-colors hover:bg-[var(--green-cta-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green-cta)]"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}

/** ProgramDatesTable — the Apply/Global-Learning intake table
 *  (country · partner companies · confirmed checkbox). CMS-driven. */
export function ProgramDatesTable({
  eyebrow = "Program dates",
  title = "Upcoming intakes",
  intro,
  rows,
  surface = false,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  rows: { country: string; companies: string; confirmed: boolean }[];
  surface?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>}
        </div>
        <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--accent-600)] text-white">
              <tr>
                <th className="w-12 px-5 py-3 font-medium" aria-label="Confirmed"></th>
                <th className="px-5 py-3 font-medium">Country</th>
                <th className="px-5 py-3 font-medium">Companies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((r) => (
                <tr key={r.country} className="bg-[var(--surface)]">
                  <td className="px-5 py-3 text-center">
                    <span
                      role="img"
                      aria-label={r.confirmed ? "Confirmed" : "Not yet confirmed"}
                      className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                        r.confirmed
                          ? "border-[var(--accent-600)] bg-[var(--accent-600)] text-white"
                          : "border-[var(--border-strong)] bg-[var(--bg)]"
                      }`}
                    >
                      {r.confirmed ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                          <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" fill="none" />
                        </svg>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-[var(--ink)]">{r.country}</td>
                  <td className="px-5 py-3 text-[var(--muted)]">{r.companies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** CardGrid — a 3-up grid of media/story cards with an optional trailing
 *  "Read more" button. Powers the wireframe's repeated card sections
 *  (Impact Stories, Impact Videos, Community Experiences, alumni legacy). */
export type GridCard = {
  title: string;
  excerpt?: string;
  kicker?: string;
  href?: string;
  tone?: "earth" | "water" | "forest";
  tag?: string;
  /** show a PhotoSlot thumbnail (default true) */
  media?: boolean;
  /** mark as a video card → adds a play affordance over the thumbnail */
  video?: boolean;
};

export function CardGrid({
  eyebrow,
  title,
  intro,
  items,
  more,
  surface = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: GridCard[];
  more?: { href: string; label: string };
  surface?: boolean;
  align?: "left" | "center";
}) {
  const tones = ["forest", "water", "earth"] as const;
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>
          )}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((c, i) => {
            const Card = (
              <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--border-strong)] group-hover:shadow-[var(--shadow-md)]">
                {c.media !== false && (
                  <div className="relative">
                    <PhotoSlot
                      tone={c.tone ?? tones[i % 3]}
                      ratio="4/3"
                      tag={c.tag}
                      caption={c.title}
                    />
                    {c.video && (
                      <span
                        className="absolute inset-0 z-20 flex items-center justify-center"
                        aria-hidden
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--accent-700)] shadow-[var(--shadow-md)] transition-transform group-hover:scale-105">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 4l10 6-10 6V4z" />
                          </svg>
                        </span>
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {c.kicker && (
                    <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                      {c.kicker}
                    </p>
                  )}
                  <h3 className="mt-2 text-lg leading-snug">{c.title}</h3>
                  {c.excerpt && (
                    <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                      {c.excerpt}
                    </p>
                  )}
                  {c.href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[var(--accent-700)]">
                      Read more
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </span>
                  )}
                </div>
              </div>
            );
            return (
              <li key={c.title + i} className="group h-full">
                {c.href ? (
                  <a href={c.href} className="block h-full focus-visible:outline-none">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </li>
            );
          })}
        </ul>

        {more && (
          <div className={`mt-10 ${align === "center" ? "text-center" : ""}`}>
            <Button href={more.href} variant="secondary" size="md">
              {more.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/** QuoteGrid — 3-up testimonial/quote cards (the wireframe's "Alumni Experiences"). */
export function QuoteGrid({
  eyebrow,
  title,
  intro,
  items,
  more,
  surface = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { quote: string; name: string; program?: string; cohort?: string }[];
  more?: { href: string; label: string };
  surface?: boolean;
}) {
  return (
    <section className={`py-14 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>
          )}
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <li
              key={t.name + i}
              className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[var(--accent-300)]" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-[var(--border)] pt-4">
                <span className="block font-medium text-[var(--ink)]">{t.name}</span>
                {(t.program || t.cohort) && (
                  <span className="block font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {[t.program, t.cohort].filter(Boolean).join(" · ")}
                  </span>
                )}
              </figcaption>
            </li>
          ))}
        </ul>
        {more && (
          <div className="mt-10">
            <Button href={more.href} variant="secondary" size="md">
              {more.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/** TeamPreview — the About wireframe's "Our team": two cards (Staff + Board). */
export function TeamPreview({
  eyebrow = "Our team",
  title,
  intro,
  cards,
  surface = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  cards: { label: string; body: string; href: string; cta: string; tone?: "earth" | "water" | "forest" }[];
  surface?: boolean;
}) {
  return (
    <section className={`py-16 md:py-20 ${surface ? "bg-[var(--surface-2)]" : ""}`}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>
          )}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.label}
              className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
            >
              <PhotoSlot tone={c.tone ?? "forest"} ratio="16/9" caption={c.label} />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl">{c.label}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-[var(--muted)]">{c.body}</p>
                <div className="mt-5">
                  <Button href={c.href} variant="secondary" size="md">{c.cta}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** LocationBlock — the Contact wireframe's "Our Location": map + details card. */
export function LocationBlock({
  embedSrc,
  address,
  email,
  phone,
  hours,
}: {
  embedSrc: string;
  address: string;
  email: string;
  phone: string;
  hours?: string;
}) {
  return (
    <section className="bg-[var(--surface-2)] py-16 md:py-20">
      <div className="container-page">
        <Eyebrow>Our location</Eyebrow>
        <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Find us in Jinja</h2>
        <div className="mt-8 grid gap-6 overflow-hidden md:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <iframe
              src={embedSrc}
              title="Map of FOSCOD offices in Jinja, Uganda"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full border-0"
              allowFullScreen
            />
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7">
            <h3 className="text-xl">Location details</h3>
            <dl className="mt-5 space-y-4 text-[0.95rem]">
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">Address</dt>
                <dd className="mt-1 text-[var(--ink-soft)]">{address}</dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">Email</dt>
                <dd className="mt-1"><a href={`mailto:${email}`} className="text-[var(--accent-700)] hover:underline">{email}</a></dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">Phone</dt>
                <dd className="mt-1"><a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[var(--accent-700)] hover:underline">{phone}</a></dd>
              </div>
              {hours && (
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">Hours</dt>
                  <dd className="mt-1 text-[var(--ink-soft)]">{hours}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
