import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { Pathways } from "@/components/home/Pathways";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AlumniLegacy } from "@/components/home/AlumniLegacy";
import { SupportCause } from "@/components/home/SupportCause";
import {
  getPathways,
  getFeaturedProjects,
  getTestimonials,
} from "@/lib/content";

export default async function HomePage() {
  const [pathways, projects, testimonials] = await Promise.all([
    getPathways(),
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <Pathways pathways={pathways} />
      <FeaturedProjects projects={projects} />
      <AlumniLegacy testimonials={testimonials} />
      <SupportCause />
    </>
  );
}
