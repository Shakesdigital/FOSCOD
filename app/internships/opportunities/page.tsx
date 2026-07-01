import { HeroSlider } from "@/components/site/HeroSlider";
import { OpportunityBrowser } from "@/components/site/OpportunityBrowser";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { getOpportunities, getOpportunityCategories } from "@/lib/opportunities";

export const metadata = pageMeta(
  "FOSCOD Internship Opportunities",
  "Browse live internship projects across WASH, health, nutrition, energy, agroforestry, research, ICT, communications, and more."
);

export default async function InternshipOpportunitiesPage() {
  const [heroSlides, opportunities, categories] = await Promise.all([
    getHeroSlides("internships-opportunities"),
    getOpportunities("internship"),
    getOpportunityCategories("internship"),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <section className="py-12 md:py-16">
        <OpportunityBrowser opportunities={opportunities} categories={categories} noun="internships" />
      </section>
    </>
  );
}
