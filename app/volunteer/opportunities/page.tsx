import { HeroSlider } from "@/components/site/HeroSlider";
import { OpportunityBrowser } from "@/components/site/OpportunityBrowser";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { getOpportunities, getOpportunityCategories } from "@/lib/opportunities";

export const metadata = pageMeta(
  "FOSCOD Volunteer Opportunities",
  "Find a volunteer project where your time and skills make a real difference — across health, empowerment, education, and the environment."
);

export default async function VolunteerOpportunitiesPage() {
  const [heroSlides, opportunities, categories] = await Promise.all([
    getHeroSlides("volunteer-opportunities"),
    getOpportunities("volunteer"),
    getOpportunityCategories("volunteer"),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <section className="py-12 md:py-16">
        <OpportunityBrowser opportunities={opportunities} categories={categories} noun="opportunities" />
      </section>
    </>
  );
}
