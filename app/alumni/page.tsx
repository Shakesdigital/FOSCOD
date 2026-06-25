import { PageHero } from "@/components/site/PageHero";
import { FeatureGrid } from "@/components/site/blocks";
import { SubmitForm, type Field } from "@/components/forms/SubmitForm";
import { pageMeta } from "@/lib/seo";

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
  { name: "review", label: "Your review or message", type: "textarea", required: true },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        eyebrow="Alumni"
        title="FOSCOD alumni network"
        intro="Stay connected, mentor new participants, share your story, and keep contributing to community-led development."
      />

      <section className="container-page py-12 md:py-16">
        <h2 className="max-w-xl text-[clamp(1.7rem,3vw,2.3rem)]">Ways to stay involved</h2>
        <div className="mt-10"><FeatureGrid items={ways} columns={3} /></div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)]">Join or write a review</h2>
            <p className="mt-3 text-[var(--muted)]">
              Reviews appear on the site once approved in the CMS, with your
              permission.
            </p>
          </div>
          <SubmitForm
            formType="alumni"
            fields={fields}
            submitLabel="Join the network"
            successTitle="Welcome back"
            successBody="Thanks for staying connected — we'll be in touch."
          />
        </div>
      </section>
    </>
  );
}
