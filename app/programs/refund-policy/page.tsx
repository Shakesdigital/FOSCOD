import { PageHero } from "@/components/site/PageHero";
import { Prose, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Refund & Cancellation Policy",
  "FOSCOD's refund and cancellation policy for internship and volunteer programs."
);

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        title="Refund & cancellation policy"
        intro="This page is a placeholder structure. FOSCOD's confirmed policy text is managed in the CMS before launch."
      />
      <section className="container-page py-12 md:py-16">
        <Prose>
          <p>
            <strong>Deposits.</strong> A deposit secures your place after
            acceptance and is applied to your total program fee.
          </p>
          <p>
            <strong>Cancellation by participant.</strong> Refund amounts depend on
            how far before your start date you cancel. Exact tiers and timelines
            are confirmed in the published policy.
          </p>
          <p>
            <strong>Cancellation by FOSCOD.</strong> In the rare event FOSCOD must
            cancel a placement, eligible fees are refunded or your placement is
            rescheduled.
          </p>
          <p>
            <strong>Non-refundable items.</strong> Third-party costs already
            incurred on your behalf may be non-refundable.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[0.8rem] text-[var(--muted)]">
            ◷ Final policy text pending FOSCOD confirmation — editable in the CMS.
          </p>
        </Prose>
      </section>
      <CTABand
        title="Have a question first?"
        actions={[
          { href: "/contact", label: "Contact the team" },
          { href: "/programs/program-fees", label: "View program fees", variant: "secondary" },
        ]}
      />
    </>
  );
}
