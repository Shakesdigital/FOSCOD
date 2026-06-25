import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Section({
  children,
  className = "",
  surface = false,
}: {
  children: ReactNode;
  className?: string;
  surface?: boolean;
}) {
  return (
    <section
      className={`py-16 md:py-24 ${surface ? "bg-[var(--surface-2)]" : ""} ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,2.6rem)]">{title}</h2>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{intro}</p>
      )}
    </div>
  );
}
