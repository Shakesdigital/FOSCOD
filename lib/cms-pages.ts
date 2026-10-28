import type { CmsCollection } from "./cms-collections";
import { cmsCollectionMap } from "./cms-collections";

/**
 * CMS Pages — the page-centric editor registry.
 *
 * Each entry is one public landing page. Its editor shows every section of
 * that page top-to-bottom in front-end order, each section editable in place
 * (Shakes Travel-style "Content Workspace"). Sections reuse the collection
 * field schemas and form machinery from cms-collections.ts.
 */

export type PageSection =
  | {
      kind: "records";
      key: string;
      label: string;
      description?: string;
      /** CMS collection key (must exist in cmsCollectionMap). */
      collection: string;
      /** Fixed filter applied to every fetch and shown as locked context. */
      filter?: { column: string; value: string };
      /** Sort for the section list (defaults to created_at desc). */
      sort?: { column: string; ascending: boolean };
      /** Cap on rows fetched for the section list. */
      max?: number;
      /** Single-row section: edit the one record inline instead of a list. */
      single?: boolean;
      /** Values preset on "Add" (e.g. page_slug so new rows land on this page). */
      presets?: Record<string, string>;
    }
  | {
      kind: "link";
      key: string;
      label: string;
      description: string;
      href: string;
      linkLabel: string;
    };

export type CmsPageDef = {
  key: string;
  title: string;
  /** Public route, shown in the editor header. */
  path: string;
  description: string;
  sections: PageSection[];
};

const seoNote =
  "Managed in Articles — this page shows the latest published entries automatically.";

function section(
  key: string,
  label: string,
  collection: string,
  description?: string,
  extra?: Partial<Extract<PageSection, { kind: "records" }>>,
): PageSection {
  return { kind: "records", key, label, collection, description, ...extra };
}

export const cmsPages: CmsPageDef[] = [
  {
    key: "home",
    title: "Home",
    path: "/",
    description: "The full homepage — every section in the order visitors see it.",
    sections: [
      section("hero", "Hero slider", "hero-slides", "Rotating banners at the top of the homepage.", {
        filter: { column: "page_slug", value: "home" },
        sort: { column: "order_column", ascending: true },
        presets: { page_slug: "home" },
      }),
      section("talking-about-us", "Talking about us", "home-talking-about-us", "Editorial intro block directly under the hero.", { single: true }),
      section("programs", "Programs section", "programs", "The two flagship program cards (GLE and CEDP) shown mid-page."),
      section("audience-paths", "Audience paths", "home-audience-paths", "The “Find your way into the work” pathway cards.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("responsible-engagement", "Responsible collaboration", "home-responsible-engagement", "The numbered steps under “What responsible collaboration means here”.", {
        sort: { column: "order_column", ascending: true },
      }),
      {
        kind: "link",
        key: "featured-story",
        label: "Featured impact story",
        description: seoNote,
        href: "/admin/articles",
        linkLabel: "Manage in Articles",
      },
      section("involvement-cards", "Get involved cards", "home-involvement-cards", "Volunteer, Partner, and Donate pathway cards near the foot of the page.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("partners", "Partner logos", "partners", "Partner logos strip at the bottom of the homepage.", {
        sort: { column: "order_column", ascending: true },
      }),
    ],
  },
  {
    key: "about",
    title: "About",
    path: "/about",
    description: "About Us page — hero, mission/vision content, and the team.",
    sections: [
      section("hero", "Hero banner", "hero-slides", undefined, {
        filter: { column: "page_slug", value: "about" },
        sort: { column: "order_column", ascending: true },
        presets: { page_slug: "about" },
      }),
      section("about-content", "Mission, vision & values", "about-content", "Key content rows: mission, vision, values, leadership."),
      section("team", "Team members", "team", "Board, staff, advisors and field team shown on the About page."),
    ],
  },
  {
    key: "cedp",
    title: "CEDP program",
    path: "/programs/community-empowerment-development",
    description: "Community Empowerment & Development Programme landing page.",
    sections: [
      section("areas-of-focus", "Areas of focus", "cedp-areas-of-focus", "The three thematic area cards.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("process-steps", "Process steps", "cedp-process-steps", "The “From priority to ownership” sequence.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("sub-programs", "Sub-programs", "sub-programs", "The six sub-programs mapped to Strategic Goals 1–6.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("impact-stories-cards", "Impact stories carousel", "cedp-impact-stories", "Story cards in the CEDP impacts carousel.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("impact-cards", "Impact cards", "cedp-impact-cards", "Impact cards for the CEDP impact section.", {
        sort: { column: "order_column", ascending: true },
      }),
    ],
  },
  {
    key: "cedp-areas",
    title: "CEDP area pages",
    path: "/programs/cedp/areas",
    description: "The three CEDP area landing pages (clean energy, water, livelihoods).",
    sections: [
      section("areas", "Area landing pages", "cedp-area-pages", "Each row is a full landing page with its own hero, description and CTAs."),
      section("area-projects", "Area ↔ project links", "cedp-area-projects", "Which projects appear on each area page, in order."),
      section("area-impacts", "Area impact carousels", "cedp-area-impacts", "Impact carousel cards per area page.", {
        sort: { column: "order_column", ascending: true },
      }),
    ],
  },
  {
    key: "gle",
    title: "GLE program",
    path: "/programs/global-learning-exchange",
    description: "Global Learning & Exchange landing page.",
    sections: [
      section("introduction", "Introduction", "gle-introduction", "The introduction section under the hero.", { single: true }),
      section("pathways", "Pathway cards", "gle-pathways", "The four “Find your pathway” cards.", {
        sort: { column: "order_column", ascending: true },
      }),
      section("apply", "Apply section", "gle-apply-section", "The apply call-to-action near the foot of the page.", { single: true }),
      section("sectors", "Development sectors", "gle-development-sectors", "Thematic sectors used to filter impact stories.", {
        sort: { column: "order_column", ascending: true },
      }),
    ],
  },
  {
    key: "projects",
    title: "Projects",
    path: "/projects",
    description: "Projects index and the detail-page content for each project.",
    sections: [
      section("projects", "Projects", "projects", "Named projects, locations, evidence and downloadable briefs."),
      section("project-activities", "Project detail: activities", "project-activities", "Activity blocks shown on each project detail page."),
      section("project-impacts", "Project detail: impact carousel", "project-impacts", "Impact cards in the looping carousel on project pages.", {
        sort: { column: "order_column", ascending: true },
      }),
    ],
  },
  {
    key: "impact",
    title: "Impact pages",
    path: "/impact",
    description: "Impact landing and per-program general impact pages.",
    sections: [
      section("hero", "Impact hero banner", "hero-slides", undefined, {
        filter: { column: "page_slug", value: "impact" },
        sort: { column: "order_column", ascending: true },
        presets: { page_slug: "impact" },
      }),
      section("general-impact-pages", "Program impact pages", "general-impact-page", "Per-program (CEDP/GLE) impact landing page content."),
      section("impact-stats", "Impact statistics", "impact-stats", "The approved source for all counters and target figures."),
    ],
  },
  {
    key: "stories-landing",
    title: "Stories index",
    path: "/stories",
    description: "Stories archive landing page.",
    sections: [
      section("hero", "Stories hero banner", "hero-slides", undefined, {
        filter: { column: "page_slug", value: "stories" },
        sort: { column: "order_column", ascending: true },
        presets: { page_slug: "stories" },
      }),
      {
        kind: "link",
        key: "articles",
        label: "Story articles",
        description: seoNote,
        href: "/admin/articles",
        linkLabel: "Manage in Articles",
      },
    ],
  },
  {
    key: "team",
    title: "Team",
    path: "/team",
    description: "Team page — board and staff listings.",
    sections: [
      section("team", "Team members", "team", "Board, staff, advisors, field team and alumni."),
    ],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    path: "/testimonials",
    description: "Testimonials archive — permissioned quotes.",
    sections: [
      section("testimonials", "Testimonials", "testimonials", "Permission-confirmed quotes shown across the site."),
    ],
  },
  {
    key: "opportunities",
    title: "Volunteer & internships",
    path: "/volunteer",
    description: "Open internship and volunteer placements and their detail pages.",
    sections: [
      section("opportunities", "Open opportunities", "opportunities", "Listed placements for volunteers and interns."),
    ],
  },
  {
    key: "contact",
    title: "Contact",
    path: "/contact",
    description: "Contact page — hero plus the contact form.",
    sections: [
      section("hero", "Hero banner", "hero-slides", undefined, {
        filter: { column: "page_slug", value: "contact" },
        sort: { column: "order_column", ascending: true },
        presets: { page_slug: "contact" },
      }),
      {
        kind: "link",
        key: "form",
        label: "Contact form & submissions",
        description: "The contact form and everything sent through it are managed in Forms.",
        href: "/admin/forms/partnership",
        linkLabel: "Manage in Forms",
      },
    ],
  },
  {
    key: "apply",
    title: "Apply",
    path: "/apply",
    description: "Application page — program application form.",
    sections: [
      {
        kind: "link",
        key: "form",
        label: "Application form & submissions",
        description: "The application form fields and all applications received are managed in Forms.",
        href: "/admin/forms/application",
        linkLabel: "Manage in Forms",
      },
    ],
  },
  {
    key: "donate",
    title: "Donate",
    path: "/donate",
    description: "Donation page — donation form.",
    sections: [
      {
        kind: "link",
        key: "form",
        label: "Donation form & submissions",
        description: "Donation enquiries and their status are managed in Forms.",
        href: "/admin/forms/donation",
        linkLabel: "Manage in Forms",
      },
    ],
  },
];

export const cmsPageMap = Object.fromEntries(cmsPages.map((page) => [page.key, page])) as Record<string, CmsPageDef>;

/** Resolve the collection definition behind a section, or null if unknown. */
export function sectionCollection(section: PageSection): CmsCollection | null {
  if (section.kind !== "records") return null;
  return cmsCollectionMap[section.collection] ?? null;
}
