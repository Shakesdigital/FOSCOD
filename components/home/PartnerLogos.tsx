import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { Partner } from "@/lib/content";

/** PartnerLogos — logo strip from CMS partners collection.
 *  Grayscale logos with hover color reveal. */
export function PartnerLogos({
  partners,
  eyebrow = "Our partners",
  title = "Working with institutions and public partners",
}: {
  partners: Partner[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{title}</h2>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((p, i) => (
            <div
              key={p.name + i}
              className="flex items-center grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
            >
              {p.logo_url ? (
                <img
                  src={p.logo_url}
                  alt={p.name}
                  className="h-10 max-w-[160px] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
        {partners.length === 0 && (
          <div className="mt-12 flex items-center justify-center gap-8 text-[var(--muted)]">
            {(["University Partner", "Community CBO", "Local NGO", "Climate Funder", "Research Institute", "District Government"]).map((name, i) => (
              <span key={name} className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em]">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
