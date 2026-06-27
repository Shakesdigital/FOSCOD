import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectDetails } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const routes = [
    "",
    "/about",
    "/team",
    "/programs",
    "/programs/global-learning-exchange",
    "/programs/community-empowerment-development",
    "/internships",
    "/volunteer",
    "/programs/finder",
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
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
