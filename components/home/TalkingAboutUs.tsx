import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { TalkingAboutUsData } from "@/lib/content";

/** TalkingAboutUs — brief editorial section after the hero on the homepage.
 *  Links to the About page for readers who want to know more about FOSCOD. */
export function TalkingAboutUs({ content }: { content: TalkingAboutUsData }) {
  return (
    <section className="bg-[var(--surface-2)] py-16 md:py-24">
      <div className="container-page mx-auto max-w-3xl text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">{content.title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">{content.intro}</p>
        <div className="mt-8">
          <Button href={content.ctaHref} variant="primary" size="lg">{content.ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
