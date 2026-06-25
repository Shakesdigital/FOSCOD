import { PageHero } from "@/components/site/PageHero";
import { CheckList, FAQ, CTABand } from "@/components/site/blocks";
import { FeeSelector } from "@/components/programs/FeeSelector";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Program Fees and Costs",
  "Transparent pricing for FOSCOD internship and volunteer programs, with clear inclusions and exclusions."
);

const included = [
  "Pre-departure support", "Airport pickup", "Accommodation",
  "Orientation", "Placement", "Local supervision",
  "24/7 in-country support", "Cultural activities", "Certificate",
];

const excluded = [
  "International airfare", "Visa", "Travel insurance",
  "Vaccinations", "Personal expenses", "Some meals outside program activities",
  "Optional trips",
];

const faqs = [
  { q: "When is the deposit due?", a: "A deposit secures your place after acceptance; the balance follows a clear payment schedule shared on acceptance." },
  { q: "What is the refund policy?", a: "See our refund and cancellation policy for full terms and timelines." },
  { q: "Are there group rates?", a: "Yes — university cohorts and faculty-led groups have tailored pricing. Request a group call." },
];

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Program fees"
        title="Transparent pricing, clear inclusions"
        intro="Transparent pricing for FOSCOD internship and volunteer programs, with clear inclusions and exclusions. Select a duration to see the fee structure."
      />

      <section className="container-page py-12 md:py-16">
        <FeeSelector />
      </section>

      <section className="container-page grid gap-12 pb-8 md:grid-cols-2">
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">What's included</h2>
          <div className="mt-6"><CheckList items={included} /></div>
        </div>
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">What's not included</h2>
          <div className="mt-6"><CheckList items={excluded} tone="muted" /></div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Financial planning FAQ</h2>
        <div className="mt-8 max-w-3xl"><FAQ items={faqs} /></div>
      </section>

      <CTABand
        title="Questions about fees?"
        actions={[
          { href: "/apply", label: "Apply now" },
          { href: "/contact", label: "Ask a fees question", variant: "secondary" },
          { href: "/programs/refund-policy", label: "Refund policy", variant: "ghost" },
        ]}
      />
    </>
  );
}
