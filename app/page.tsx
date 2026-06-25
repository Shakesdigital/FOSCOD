import { Hero } from "@/components/home/Hero";
import { Pathways } from "@/components/home/Pathways";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ImpactSnapshot } from "@/components/home/ImpactSnapshot";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { LatestStories } from "@/components/home/LatestStories";
import { FinalCta } from "@/components/home/FinalCta";
import {
  getPathways,
  getFeaturedProjects,
  getImpactMetrics,
  getTestimonials,
  getPartners,
  getLatestStories,
} from "@/lib/content";

export default async function HomePage() {
  const [pathways, projects, metrics, testimonials, partners, stories] =
    await Promise.all([
      getPathways(),
      getFeaturedProjects(),
      getImpactMetrics(),
      getTestimonials(),
      getPartners(),
      getLatestStories(),
    ]);

  return (
    <>
      <Hero />
      <Pathways pathways={pathways} />
      <FeaturedProjects projects={projects} />
      <ImpactSnapshot metrics={metrics} />
      <Testimonials items={testimonials} />
      <Partners partners={partners} />
      <LatestStories stories={stories} />
      <FinalCta />
    </>
  );
}
