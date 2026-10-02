import { HeroSlider } from "@/components/site/HeroSlider";
import { ProgramDatesTable, Steps, FeatureGrid, TestimonialCarousel } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides, getProgramDates, getAlumniExperiences } from "@/lib/content";

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
  { title: "Volunteer Form", body: "For those giving time and skills to community-led projects.", href: "/apply/volunteer", tone: "forest" as const },
  { title: "Internship Form", body: "Supervised, credit-friendly field experience in your area.", href: "/apply/internship", tone: "water" as const },
  { title: "Global Service Trip Form", body: "Faculty-led group programs and service trips.", href: "/apply/group-service-trip", tone: "earth" as const },
];

const inquiryFields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const whyParticipateCards = [
  {
    title: "Hands-on Learning",
    excerpt:
      "Work directly with FOSCOD and local partners on real, field-based projects in clean energy, WASH, livelihoods, health, and the environment.",
  },
  {
    title: "Community Development Skills",
    excerpt:
      "Learn needs assessment, project design, implementation, and ethical leadership from staff and community mentors who live this work.",
  },
  {
    title: "Cross-cultural Immersion",
    excerpt:
      "A host-family experience and structured cultural preparation that builds genuine understanding and lasting global connections.",
  },
  {
    title: "Personal and Professional Growth",
    excerpt:
      "Build project management, communication, adaptability, and intercultural competency that transfer to any career path.",
  },
  {
    title: "Retreat and Excursions",
    excerpt:
      "Reflective debrief sessions, supervised site visits, and guided excursions to Uganda's landscapes and cultural sites.",
  },
  {
    title: "Certificate Awards",
    excerpt:
      "A completion certificate from FOSCOD and a documented handover record you can use for academic credit or professional portfolios.",
  },
];

const programStartDates = [
  {
    cohort: "Winter 2027",
    period: "January – March 2027",
    volunteer: "January 15, 2027",
    internship: "January 15, 2027",
    groupServiceTrip: "February 10, 2027",
  },
  {
    cohort: "Spring 2027",
    period: "April – June 2027",
    volunteer: "April 6, 2027",
    internship: "April 6, 2027",
    groupServiceTrip: "May 5, 2027",
  },
  {
    cohort: "Summer 2027",
    period: "July – August 2027",
    volunteer: "July 12, 2027",
    internship: "July 12, 2027",
    groupServiceTrip: "August 14, 2027",
  },
  {
    cohort: "Fall 2027",
    period: "September – November 2027",
    volunteer: "September 13, 2027",
    internship: "September 13, 2027",
    groupServiceTrip: "October 18, 2027",
  },
];

export default async function ApplyPage() {
  const [heroSlides, dates, alumni] = await Promise.all([
    getHeroSlides("apply"),
    getProgramDates(),
    getAlumniExperiences(),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro — mint (swapped) */}
      <section className="bg-[var(--surface-2)] py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>How to apply</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">Your journey starts here</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Choose the pathway that fits your goals, timeline, and field interests —
            then send us your application and our team will be in touch.
          </p>
        </div>
      </section>

      {/* program dates — white (swapped) */}
      <ProgramDatesTable
        eyebrow="Program dates"
        title="Upcoming intakes & partners"
        intro="Indicative intakes and partner organisations — confirm exact dates with our team when you apply."
        rows={dates}
      />

      {/* application procedure — mint (swapped) */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Application procedure</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">From application to arrival</h2>
          </div>
          <div className="mt-10"><Steps steps={steps} /></div>
        </div>
      </section>

      {/* program start dates — white */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>Program start dates</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">2027 intake schedule</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Indicative start dates for volunteering, internships, and global service
              trips throughout 2027. Exact dates are confirmed with the current intake
              brief — contact us to check availability and application deadlines.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--accent-600)] text-white">
                <tr>
                  <th className="px-5 py-3 font-medium">Cohort</th>
                  <th className="px-5 py-3 font-medium">Period</th>
                  <th className="px-5 py-3 font-medium">Volunteer</th>
                  <th className="px-5 py-3 font-medium">Internship</th>
                  <th className="px-5 py-3 font-medium">Group Service Trip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {programStartDates.map((row) => (
                  <tr key={row.cohort} className="bg-[var(--surface)]">
                    <td className="px-5 py-3 font-medium text-[var(--ink)]">{row.cohort}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">{row.period}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">{row.volunteer}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">{row.internship}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">{row.groupServiceTrip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* application form — white (swapped); Start application moved to top, centered; form removed */}
      <section id="application-forms" className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">Start your application</h2>
            <p className="mt-3 text-[var(--muted)]">
              One form for all pathways — we&rsquo;ll route your application to the
              right team. University groups can request a dedicated call.
            </p>
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
        </div>
      </section>

      {/* program fees — mint (swapped) */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
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

      {/* Why Participate in Internship and Volunteer Program — mint (swapped) */}
      <section className="bg-[var(--surface-2)] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why Participate in Internship and Volunteer Program</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)]">A program built around real impact</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Every placement is tied to a genuine community priority, supervised by
              FOSCOD staff and local mentors, supported by host families, and
              concluded with a responsible handover.
            </p>
          </div>

          <div className="mt-12">
            <FeatureGrid
              columns={3}
              items={whyParticipateCards.map((c) => ({
                title: c.title,
                body: c.excerpt,
              }))}
            />
          </div>
        </div>
      </section>

      {/* alumni experiences — mint (swapped); carousel with 3 cards per slide, loop */}
      <TestimonialCarousel
        eyebrow="Alumni experiences"
        title="What our alumni say"
        items={alumni}
        cta={{ href: "/testimonials", label: "Read more reviews" }}
        surface
      />

      {/* application inquiry — white (swapped) */}
      <section className="py-14 md:py-20">
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
