import { HeroSlider } from "@/components/site/HeroSlider";
import { Prose, CTABand } from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";

export const metadata = pageMeta("Payment, Refund & Cancellation Information", "How to obtain the current written payment, refund, and cancellation terms for a FOSCOD placement.");

export default async function RefundPolicyPage() {
  const heroSlides = await getHeroSlides("refund-policy");
  return <>
    <HeroSlider slides={heroSlides} />
    <section className="container-page py-12 md:py-16"><Prose><p>Program arrangements vary by pathway, dates, duration, accommodation, and third-party logistics. Ask the FOSCOD team for the current written fee breakdown and the refund and cancellation terms that apply to your proposed placement.</p><p>Do not make a payment until you have received and reviewed those terms through an official FOSCOD contact.</p><p>For a copy of the current terms, email <a href="mailto:info@foscod.org">info@foscod.org</a> or use the contact form.</p></Prose></section>
    <CTABand title="Request the current written terms" actions={[{ href: "/contact", label: "Contact FOSCOD" }, { href: "/programs/program-fees", label: "Program cost information", variant: "secondary" }]} tightBottom />
  </>;
}
