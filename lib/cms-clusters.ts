/**
 * CMS Clusters — the top-level sections of the admin content hub.
 *
 * The CMS is organized into exactly five editorial sections:
 *
 * 1. **Pages** — Landing pages (home, about, CEDP/GLE program pages) each
 *    editing as a single unit that aggregates all its sections, related
 *    articles, and carousels.
 * 2. **Articles** — Categorised editorial content: Blog posts, Program
 *    stories, Insights, and Impact Stories (including program-area
 *    subcategories).
 * 3. **Components** — Reusable, Elementor-style building blocks (hero
 *    sections, carousels, feature grids, CTAs, stat blocks, etc.) that
 *    can be added, edited, and reordered on any page.
 * 4. **Website Settings** — Colors, fonts, brand assets, logos, SEO
 *    defaults, and all global style/site configuration.
 * 5. **Forms** — Application, Donation, Partnership & Collaboration,
 *    and Newsletter forms — with all submissions managed inside the
 *    Forms section.
 */

export interface CmsCluster {
  key: string;
  label: string;
  description: string;
  icon: string;
  sortOrder: number;
  collections: string[]; // collection keys that belong to this cluster
}

export const cmsClusters: Record<string, CmsCluster> = {
  pages: {
    key: "pages",
    label: "Pages",
    description:
      "Landing pages — each page is a single editable unit containing all its sections, carousels, and related content.",
    icon: "📄",
    sortOrder: 1,
    collections: ["pages", "cedp-areas", "general-impact-pages"],
  },
  articles: {
    key: "articles",
    label: "Articles",
    description:
      "Editorial content with category selection: Blog, Program, Insight, Impact Stories, and program-area subcategories.",
    icon: "📰",
    sortOrder: 2,
    collections: ["stories", "impact-stories", "impact-story-details", "article-categories"],
  },
  components: {
    key: "components",
    label: "Components",
    description:
      "Reusable Elementor-style building blocks: hero sliders, carousels, feature grids, CTAs, stat blocks — add, edit, and reorder anywhere.",
    icon: "🧩",
    sortOrder: 3,
    collections: [
      "hero-slides",
      "modules",
      "home-talking-about-us",
      "home-involvement-cards",
      "home-audience-paths",
      "home-responsible-engagement",
      "testimonials",
      "faqs",
    ],
  },
  settings: {
    key: "settings",
    label: "Website Settings",
    description:
      "Colors, fonts, brand assets, logos, image settings, SEO defaults, and everything concerning website configuration.",
    icon: "🎨",
    sortOrder: 4,
    collections: ["settings", "navigation", "redirects"],
  },
  forms: {
    key: "forms",
    label: "Forms",
    description:
      "Application forms, Donation forms, Partnership & Collaboration forms, and Newsletter forms. All submissions are managed here.",
    icon: "📋",
    sortOrder: 5,
    collections: ["form-categories", "form-submissions", "form-submission-notifications"],
  },
};

/**
 * Human-readable label for a cluster — used outside the admin UI.
 */
export function clusterLabel(key: string): string {
  return cmsClusters[key]?.label ?? key;
}
