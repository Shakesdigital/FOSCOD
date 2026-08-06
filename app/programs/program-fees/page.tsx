import { PageHero } from "@/components/site/PageHero";
import { CheckList, FAQ, CTABand } from "@/components/site/blocks";
import { FeeSelector } from "@/components/programs/FeeSelector";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Program Fees and Costs",
  "Transparent pricing for FOSCOD internship and volunteer programs, with clear inclusions and exclusions."
);

const included = [
  "Role or program design", "Named local supervision", "Required orientation",
  "Accommodation arrangement, when included", "Local transport or airport transfer, when included",
  "Emergency contact and support arrangements", "Debrief and completion record, when included",
];

const excluded = [
  "International airfare", "Visa", "Travel insurance",
  "Vaccinations", "Personal expenses", "Some meals outside program activities",
  "Optional trips",
];

const faqs = [
  { q: "When is a deposit due?", a: "If a deposit is required for your approved program, the current quote and acceptance documents will state the amount, due date, balance schedule, and applicable cancellation terms." },
  { q: "What is the refund policy?", a: "See our refund and cancellation policy for full terms and timelines." },
  { q: "How is group pricing prepared?", a: "University cohorts and faculty-led groups receive a tailored quote based on group size, duration, accommodation, supervision, transport, activities, and responsibilities. Request a group conversation." },
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
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Typical items to confirm in your quote</h2>
          <div className="mt-6"><CheckList items={included} /></div>
        </div>
        <div>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Usually arranged separately</h2>
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
