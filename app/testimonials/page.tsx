import { HeroSlider } from "@/components/site/HeroSlider";
import { CTABand, IntroSection } from "@/components/site/blocks";
import { TestimonialArchiveGrid } from "@/components/site/TestimonialArchiveGrid";
import { pageMeta } from "@/lib/seo";
import {
  getHeroSlides,
  getAllTestimonials,
  getAllProjects,
} from "@/lib/content";

export const revalidate = 60;

export const metadata = pageMeta(
  "Testimonials archive",
  "Permissioned testimonials from interns, volunteers, alumni, and community members across FOSCOD's CEDP and GLE programs."
);

export default async function TestimonialsPage() {
  const [slides, testimonials, projects] = await Promise.all([
    getHeroSlides("testimonials"),
    getAllTestimonials(),
    getAllProjects(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <HeroSlider slides={slides} />

      {/* 2. Intro — centered heading, balanced text */}
      <IntroSection
        eyebrow="In their own words"
        title="Permissioned testimonials from participants and communities"
        body="Reflections from interns, volunteers, alumni, and community members across CEDP and GLE — published with consent. Use the filter sidebar to explore by program and project."
        align="center"
        noImage
        surface
      />

      {/* 3. Filterable testimonial grid */}
      <TestimonialArchiveGrid
        allTestimonials={testimonials}
        projects={projects}
      />

      {/* 4. Closing CTA */}
      <section className="bg-[var(--surface-2)] py-14 md:py-20">
        <div className="container-page">
          <CTABand
            title="Share your experience"
            body="Have you been part of a FOSCOD project or program? We'd love to hear from you — your consented story could appear in our testimonial archive."
            actions={[
              { href: "/alumni", label: "Submit a testimonial" },
              { href: "/programs/global-learning-exchange", label: "Join a project", variant: "secondary" },
            ]}
            tightBottom
          />
        </div>
      </section>
    </>
  );
}
