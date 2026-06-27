import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  banner = true,
  bannerTone = "water",
  bannerCaption = "Field photo — replace via the CMS media library",
  bannerTag,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  banner?: boolean;
  bannerTone?: "earth" | "water" | "forest";
  bannerCaption?: string;
  bannerTag?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 90% at 90% -20%, var(--accent-50), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container-page py-14 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)]">{title}</h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            {intro}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        {banner && (
          <div className="mt-12">
            <PhotoSlot
              tone={bannerTone}
              ratio="3/1"
              tag={bannerTag}
              caption={bannerCaption}
              className="shadow-[var(--shadow-md)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
