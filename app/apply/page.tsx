import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramDatesTable, Steps, CardGrid, QuoteGrid } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getProgramDates, getProgramHighlights, getAlumniExperiences } from "@/lib/content";

export const metadata = pageMeta(
  "Apply to Join FOSCOD",
  "Start your internship or volunteer journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests."
);

const steps = [
  { title: "Choose program type", body: "Internship, volunteer, group, or research." },
  { title: "Submit application", body: "Tell us your goals and field interests." },
  { title: "Review & matching", body: "FOSCOD reviews and matches your placement." },
  { title: "Confirmation & deposit", body: "Secure your place." },
  { title: "Pre-departure prep", body: "Logistics, health, and safety support." },
  { title: "Arrival & orientation", body: "Local orientation and your placement begins." },
];

const formChoices = [
  { title: "Volunteer Form", body: "For those giving time and skills to community-led projects.", href: "/volunteer", tone: "forest" as const },
  { title: "Internship Form", body: "Supervised, credit-friendly field experience in your area.", href: "/internships", tone: "water" as const },
  { title: "Global Service Trip Form", body: "Faculty-led group programs and service trips.", href: "/programs/finder", tone: "earth" as const },
];

const applicationFields: Field[] = [
  { name: "first_name", label: "First name", required: true },
  { name: "last_name", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "country", label: "Country" },
  { name: "program_type", label: "Program type", type: "select", required: true, options: ["Internship", "Volunteer", "Group / University", "Research / Academic"] },
  { name: "sector", label: "Field of interest", type: "select", options: ["WASH & public health", "Renewable energy", "Livelihoods", "Health", "Environment", "Social inclusion", "Research", "Communications", "Fundraising", "ICT / data"] },
  { name: "duration", label: "Preferred duration", type: "select", options: ["4 weeks", "8 weeks", "10 weeks", "12 weeks", "Custom"] },
  { name: "start_date", label: "Preferred start date" },
  { name: "message", label: "Anything else we should know?", type: "textarea" },
];

const inquiryFields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export default async function ApplyPage() {
  const [heroSlides, dates, highlights, alumni] = await Promise.all([
    getHeroSlides("apply"),
    getProgramDates(),
    getProgramHighlights(),
    getAlumniExperiences(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro — white */}
      <section className="py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>How to apply</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Your journey starts here</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Choose the pathway that fits your goals, timeline, and field interests —
            then send us your application and our team will be in touch.
          </p>
        </div>
      </section>

      {/* program dates — mint */}
      <ProgramDatesTable
        eyebrow="Program dates"
        title="Upcoming intakes & partners"
        intro="Indicative intakes and partner organisations — confirm exact dates with our team when you apply."
        rows={dates}
        surface
      />

      {/* application procedure — white */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>Application procedure</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">From application to arrival</h2>
          </div>
          <div className="mt-10"><Steps steps={steps} /></div>
        </div>
      </section>

      {/* application form — mint */}
      <section id="application-forms" className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Application form</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Pick a pathway, then apply</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {formChoices.map((c) => (
              <div key={c.title} className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
                <PhotoSlot tone={c.tone} ratio="16/9" caption={c.title} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted)]">{c.body}</p>
                  <div className="mt-5">
                    <Button href={c.href} variant="secondary" size="md">Learn more</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h3 className="text-[clamp(1.4rem,2.5vw,1.9rem)]">Start your application</h3>
              <p className="mt-3 text-[var(--muted)]">
                One form for all pathways — we&rsquo;ll route your application to the
                right team. University groups can request a dedicated call.
              </p>
            </div>
            <SubmitForm
              formType="internship"
              fields={applicationFields}
              submitLabel="Submit application"
              successTitle="Application received"
              successBody="The FOSCOD team will review your application and contact you with next steps."
            />
          </div>
        </div>
      </section>

      {/* program fees — white */}
      <section className="py-14 md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Program fees</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Transparent, all-inclusive fees</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Your program fee covers placement, supervision, accommodation or a host
            family, orientation, and 24/7 local support — with a clear breakdown and
            no hidden costs.
          </p>
          <div className="mt-7">
            <Button href="/programs/program-fees" variant="secondary" size="md">More details</Button>
          </div>
        </div>
      </section>

      {/* program highlights — mint */}
      <CardGrid
        eyebrow="Program highlights"
        title="What you can expect"
        items={highlights.map((h) => ({ title: h.title, excerpt: h.excerpt, media: false }))}
        surface
      />

      {/* alumni experiences — white */}
      <QuoteGrid
        eyebrow="Alumni experiences"
        title="What our alumni say"
        items={alumni}
        more={{ href: "/alumni", label: "Read more reviews" }}
      />

      {/* application inquiry — mint */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Contact us</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">Application inquiry form</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Not ready to apply yet? Send us a quick question and we&rsquo;ll help.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <SubmitForm formType="contact" fields={inquiryFields} submitLabel="Send inquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
