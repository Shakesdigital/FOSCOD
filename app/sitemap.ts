import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectDetails } from "@/lib/projects";
import { allOpportunitySlugs } from "@/lib/opportunities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const routes = [
    "",
    "/about",
    "/team",
    "/programs",
    "/programs/global-learning-exchange",
    "/programs/community-empowerment-development",
    "/programs/cedp/areas/clean-energy-climate-resilience",
    "/programs/cedp/areas/water-sanitation-health-communities",
    "/programs/cedp/areas/sustainable-livelihoods-economic-empowerment",
    "/opportunities",
    "/programs/program-fees",
    "/programs/refund-policy",
    "/projects",
    "/focus/social-inclusion-empowerment",
    "/focus/health-wellbeing",
    "/impact",
    "/stories",
    "/apply",
    "/partners",
    "/donate",
    "/alumni",
    "/contact",
    ...projectDetails.map((p) => `/projects/${p.slug}`),
    ...allOpportunitySlugs().map((slug) => `/opportunities/${slug}`),
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
