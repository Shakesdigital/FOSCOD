import { HeroSlider } from "@/components/site/HeroSlider";
import { FeatureGrid } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta(
  "FOSCOD Alumni Network",
  "Stay connected, mentor new participants, share your story, and keep contributing to community-led development."
);

const ways = [
  { title: "Join the network", body: "Stay connected to FOSCOD and fellow alumni." },
  { title: "Mentorship", body: "Guide new interns and volunteers." },
  { title: "Reviews & testimonials", body: "Share your experience to help others decide." },
  { title: "Events & reunions", body: "Reconnect at alumni gatherings." },
  { title: "Refer & support", body: "Refer students and support projects." },
];

const fields: Field[] = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "cohort", label: "Cohort / year" },
  { name: "program", label: "Program you joined" },
  { name: "contributionType", label: "What would you like to share?", type: "select", required: true, options: ["Join the alumni network", "Testimonial", "Project reflection", "Blog / Insights proposal"] },
  { name: "review", label: "Your testimonial, reflection or proposal", type: "textarea", required: true },
  { name: "publishPermission", label: "May we publish this on the website (with your name as given)?", type: "select", required: true, options: ["Yes, with my name", "Yes, anonymized", "No — internal use only"] },
];

export default async function AlumniPage() {
  const heroSlides = await getHeroSlides("alumni");
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="container-page py-12 md:py-16">
        <h2 className="mx-auto max-w-xl text-center text-[clamp(1.7rem,3vw,2.3rem)]">Ways to stay involved</h2>
        <div className="mt-10"><FeatureGrid items={ways} columns={3} /></div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="text-center">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Share your experience</h2>
            </div>
            <p className="mt-3 text-[var(--muted)]">
              Reviews appear on the site once approved in the CMS, with your
              permission.
            </p>
          </div>
          <SubmitForm
            formType="alumni"
            fields={fields}
            submitLabel="Share with the network"
            successTitle="Thank you"
            successBody="Thanks for staying connected. Submissions are reviewed by FOSCOD staff — nothing is published automatically, and we will confirm permissions with you first."
          />
        </div>
      </section>
    </>
  );
}
