export type CmsField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "wysiwyg" | "number" | "boolean" | "select" | "date" | "datetime" | "json" | "url" | "image";
  required?: boolean;
  help?: string;
  options?: { label: string; value: string }[];
};

/**
 * Cluster key — exactly five editorial sections in the CMS.
 *
 *  pages     — Landing pages as single editable units
 *  articles  — Blog, program, insight, impact stories
 *  components — Reusable Elementor-style page sections
 *  settings  — Colors, fonts, logos, SEO defaults, brand
 *  forms     — Application, donation, partnership, newsletter forms + submissions
 */
export type CmsClusterKey = "pages" | "articles" | "components" | "settings" | "forms";

export type CmsCollection = {
  key: string;
  table: string;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  fields: CmsField[];
  /** Cluster grouping for the admin content hub — keeps related collections together. */
  cluster: CmsClusterKey;
};

// Re-export cluster definitions from cms-clusters so the ContentHub and
// any other consumer get a single source of truth.
export { cmsClusters, clusterLabel } from "./cms-clusters";

const statusOptions = ["draft", "published", "archived"].map((value) => ({ label: value[0].toUpperCase() + value.slice(1), value }));
const yesNo = (name: string, label: string): CmsField => ({ name, label, type: "boolean" });
const seoFields: CmsField[] = [
  { name: "meta_title", label: "SEO title", help: "Write a unique, human-readable search title." },
  { name: "meta_description", label: "SEO description", type: "textarea", help: "Summarize this page accurately in about 150-160 characters." },
  { name: "meta_image_url", label: "Social sharing image URL", type: "image" },
];

export const cmsCollections: CmsCollection[] = [
  // =========================================================
  //  PAGES CLUSTER
  //  Landing pages — each is a single editable unit containing
  //  all sections, hero content, and related carousels.
  // =========================================================

  {
    key: "pages", table: "pages", label: "Pages", singular: "page", titleField: "title",
    cluster: "pages",
    description: "Static landing pages — each page aggregates all its sections, hero content, and module attachments into one editable place.",
    fields: [
      { name: "title", label: "Page title", required: true },
      { name: "slug", label: "URL slug", required: true, help: "Use lowercase words separated by hyphens." },
      { name: "hero", label: "Hero content", type: "json", help: "Structured hero fields: title, intro, image URL, alt text, and calls to action." },
      { name: "sections", label: "Legacy ordered sections", type: "json" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      ...seoFields,
    ],
  },

  {
    key: "general-impact-page",
    table: "general_impact_pages",
    label: "General impact page",
    singular: "general impact page",
    titleField: "title",
    cluster: "pages",
    description: "The general impact landing page for a program (e.g. CEDP, GLE) — hero, description, featured story sections, explore-more testimonials & videos, and get-involved cards.",
    fields: [
      { name: "slug", label: "URL slug", required: true, help: "e.g. cedp or gle." },
      { name: "program", label: "Program", type: "select", options: [{ label: "CEDP", value: "CEDP" }, { label: "GLE", value: "GLE" }], required: true },
      { name: "title", label: "Page title (hero headline)", required: true },
      { name: "eyebrow", label: "Hero eyebrow" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "tone", label: "Fallback color tone", type: "select", options: ["earth", "water", "forest"].map((v) => ({ label: v, value: v })) },
      { name: "hero_cta_label", label: "Hero CTA label" },
      { name: "hero_cta_href", label: "Hero CTA link", type: "url" },
      { name: "hero_cta2_label", label: "Second CTA label" },
      { name: "hero_cta2_href", label: "Second CTA link", type: "url" },
      { name: "hero_cta3_label", label: "Third CTA label" },
      { name: "hero_cta3_href", label: "Third CTA link", type: "url" },
      { name: "description_title", label: "Description section title" },
      { name: "description_body", label: "Description section body", type: "textarea" },
      { name: "cd_stories_eyebrow", label: "CEDP stories section eyebrow" },
      { name: "cd_stories_title", label: "CEDP stories section title" },
      { name: "cd_stories_intro", label: "CEDP stories section intro", type: "textarea" },
      { name: "cd_story_cards", label: "CEDP story cards", type: "json", help: "Array of {title, excerpt, imageUrl, imageAlt, href, ctaLabel, verifiedOutcome} objects." },
      { name: "gle_stories_eyebrow", label: "GLE stories section eyebrow" },
      { name: "gle_stories_title", label: "GLE stories section title" },
      { name: "gle_stories_intro", label: "GLE stories section intro", type: "textarea" },
      { name: "gle_story_cards", label: "GLE story cards", type: "json", help: "Array of {title, excerpt, imageUrl, imageAlt, href, ctaLabel, verifiedOutcome} objects." },
      { name: "explore_eyebrow", label: "Explore section eyebrow", help: "Centered heading only — not repeated in left column." },
      { name: "explore_title", label: "Explore section title" },
      { name: "explore_intro", label: "Explore section intro", type: "textarea" },
      { name: "explore_testimonials", label: "Explore section testimonials", type: "json", help: "Array of {quote, name, role, photoUrl, photoAlt} objects." },
      { name: "explore_testimonials_cta_label", label: "Testimonials CTA label" },
      { name: "explore_testimonials_cta_href", label: "Testimonials CTA link", type: "url" },
      { name: "explore_videos", label: "Explore section videos", type: "json", help: "Array of {videoUrl, thumbnailUrl, thumbnailAlt, description, title} objects." },
      { name: "explore_videos_cta_label", label: "Videos CTA label" },
      { name: "explore_videos_cta_href", label: "Videos CTA link", type: "url" },
      { name: "get_involved_eyebrow", label: "Get involved section eyebrow" },
      { name: "get_involved_title", label: "Get involved section title" },
      { name: "get_involved_intro", label: "Get involved section intro", type: "textarea" },
      { name: "get_involved_cards", label: "Get involved cards", type: "json" },
      yesNo("visible", "Visible"),
      ...seoFields,
    ],
  },

  {
    key: "cedp-area-pages",
    table: "cedp_areas",
    label: "CEDP area landing page",
    singular: "CEDP area page",
    titleField: "title",
    cluster: "pages",
    description: "The three sub-program area landing pages (clean energy, water, livelihoods) with hero, description, projects, impact, and get-involved content.",
    fields: [
      { name: "slug", label: "URL slug", required: true, help: "e.g. clean-energy-climate-resilience" },
      { name: "title", label: "Page title (hero headline)", required: true },
      { name: "subtitle", label: "Subtitle (strategic goal reference)" },
      { name: "eyebrow", label: "Hero eyebrow" },
      { name: "description", label: "Description body", type: "textarea" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "tone", label: "Fallback color tone", type: "select", options: ["earth", "water", "forest"].map((v) => ({ label: v, value: v })) },
      { name: "hero_cta_1_label", label: "Primary CTA label" },
      { name: "hero_cta_1_href", label: "Primary CTA link", type: "url" },
      { name: "hero_cta_2_label", label: "Secondary CTA label" },
      { name: "hero_cta_2_href", label: "Secondary CTA link", type: "url" },
      { name: "hero_cta_3_label", label: "Tertiary CTA label" },
      { name: "hero_cta_3_href", label: "Tertiary CTA link", type: "url" },
      { name: "get_involved_cards", label: "Get-involved cards", type: "json", help: "Array of {title, body, href, cta_label, icon, image_url, image_alt} objects." },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  // =========================================================
  //  COMPONENTS CLUSTER
  //  Reusable Elementor-style building blocks — hero sliders,
  //  carousels, feature grids, CTAs, stat blocks, etc.
  //  Add, edit, reorder anywhere on the site.
  // =========================================================

  {
    key: "hero-slides", table: "hero_slides", label: "Hero slides", singular: "hero slide", titleField: "title",
    cluster: "components",
    description: "Reusable hero banners controlled per landing page key — headline, imagery, calls to action, and color tone.",
    fields: [
      { name: "page_slug", label: "Page key", required: true, help: "Which page this hero belongs to (e.g. home, about, stories)." },
      { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Headline", required: true },
      { name: "intro", label: "Introduction", type: "textarea" },
      { name: "cta_label", label: "Primary CTA label" },
      { name: "cta_href", label: "Primary CTA link", type: "url" },
      { name: "cta2_label", label: "Second CTA label" },
      { name: "cta2_href", label: "Second CTA link", type: "url" },
      { name: "cta3_label", label: "Third CTA label" },
      { name: "cta3_href", label: "Third CTA link", type: "url" },
      { name: "tone", label: "Fallback color tone", type: "select", options: ["earth", "water", "forest"].map((v) => ({ label: v, value: v })) },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "modules", table: "modules", label: "Page modules", singular: "module", titleField: "name",
    cluster: "components",
    description: "Reusable hero, rich-text, gallery, cards, CTA, stats, testimonials, FAQ, feature-grid, and form-embed sections. Attach to pages via 'Page module links'.",
    fields: [
      { name: "name", label: "Internal module name", required: true },
      { name: "type", label: "Module type", type: "select", required: true, options: ["hero", "rich_text", "gallery", "cards", "cta", "stats", "testimonials", "faq", "feature_grid", "form_embed"].map((value) => ({ label: value.replaceAll("_", " "), value })) },
      { name: "config", label: "Module content", type: "json", required: true, help: "Structured content for the selected module type." },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
    ],
  },

  {
    key: "page-modules", table: "page_modules", label: "Page module links", singular: "page module link", titleField: "region",
    cluster: "components",
    description: "Attach reusable modules to pages and control their order within each page region. This is the Elementor-style reordering surface.",
    fields: [
      { name: "page_id", label: "Page ID", required: true, help: "Copy the ID from the Pages collection." },
      { name: "module_id", label: "Module ID", required: true, help: "Copy the ID from the Page modules collection." },
      { name: "region", label: "Page region", required: true, help: "Usually 'main'; use 'hero', 'sidebar', or 'footer' when the page layout supports it." },
      { name: "order_column", label: "Display order", type: "number", required: true },
    ],
  },

  {
    key: "home-talking-about-us",
    table: "home_talking_about_us",
    label: "Homepage: Talking About Us",
    singular: "talking-about-us block",
    titleField: "title",
    cluster: "components",
    description: "The editorial section that appears after the hero on the homepage.",
    fields: [
      { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Headline", required: true },
      { name: "intro", label: "Introduction", type: "textarea", required: true },
      { name: "cta_label", label: "CTA label", required: true },
      { name: "cta_href", label: "CTA link", type: "url", required: true },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "home-involvement-cards",
    table: "home_involvement_cards",
    label: "Homepage: Getting Involved cards",
    singular: "getting-involved card",
    titleField: "title",
    cluster: "components",
    description: "The three pathway cards (Volunteer intern, Partner with us, Donate to our project) on the homepage.",
    fields: [
      { name: "title", label: "Card title", required: true },
      { name: "body", label: "Description", type: "textarea", required: true },
      { name: "href", label: "Link URL", type: "url", required: true },
      { name: "cta_label", label: "CTA label", required: true },
      { name: "icon", label: "Icon (emoji)" },
      { name: "image_url", label: "Featured image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "home-audience-paths",
    table: "home_audience_paths",
    label: "Homepage: Audience paths",
    singular: "audience path",
    titleField: "title",
    cluster: "components",
    description: "The four pathway cards under 'Find your way into the work' with optional feature images.",
    fields: [
      { name: "title", label: "Card title", required: true },
      { name: "body", label: "Description", type: "textarea", required: true },
      { name: "href", label: "Link URL", type: "url", required: true },
      { name: "cta", label: "CTA label", required: true },
      { name: "kicker", label: "Kicker label" },
      { name: "image_url", label: "Feature image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "home-responsible-engagement",
    table: "home_responsible_engagement",
    label: "Homepage: Responsible collaboration steps",
    singular: "engagement principle",
    titleField: "title",
    cluster: "components",
    description: "The four numbered steps under 'What responsible collaboration means here' with optional feature images.",
    fields: [
      { name: "title", label: "Step title", required: true },
      { name: "body", label: "Description", type: "textarea" },
      { name: "image_url", label: "Feature image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "testimonials", table: "testimonials", label: "Testimonials", singular: "testimonial", titleField: "name",
    cluster: "components",
    description: "Permissioned testimonials — can be reused as components on any page or impact story.",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "quote", label: "Quotation", type: "textarea", required: true },
      { name: "cohort", label: "Cohort" },
      { name: "program", label: "Program or affiliation" },
      { name: "linked_program", label: "Linked program", type: "select", options: ["GLE", "CEDP", "ORG"].map((value) => ({ label: value, value })) },
      { name: "linked_project_id", label: "Linked project ID (slug)" },
      yesNo("permission", "Permission confirmed"),
      { name: "photo_url", label: "Photo URL", type: "image" },
      { name: "photo_alt", label: "Photo alt text" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "faqs", table: "faqs", label: "FAQs", singular: "FAQ", titleField: "question",
    cluster: "components",
    description: "Questions grouped for interns, donors, partners, communities, and general visitors — reusable as a component on any page.",
    fields: [
      { name: "question", label: "Question", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "audience", label: "Audience", type: "select", options: ["interns", "donors", "partners", "community", "general"].map((value) => ({ label: value, value })) },
      { name: "program", label: "Program" },
      { name: "sub_program_id", label: "Sub-program ID" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  // =========================================================
  //  ARTICLES CLUSTER
  //  Blog posts, program stories, insights, and impact
  //  stories (with selectable categories).
  // =========================================================

  {
    key: "article-categories",
    table: "article_categories",
    label: "Article categories",
    singular: "article category",
    titleField: "name",
    cluster: "articles",
    description: "Defined article categories for consistent classification across stories: Blog, Program, Insight, Impact Stories, and program-area subcategories.",
    fields: [
      { name: "name", label: "Category name", required: true },
      { name: "slug", label: "URL slug", required: true, help: "Lowercase words separated by hyphens." },
      { name: "parent_id", label: "Parent category ID", help: "For subcategories (e.g. Impact Stories under Articles)." },
      { name: "description", label: "Description", type: "textarea" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "stories", table: "stories", label: "Stories (blog)", singular: "story", titleField: "title",
    cluster: "articles",
    description: "Field posts, impact reports, alumni reflections, and news articles with selectable categories: Blog, Program, Insight, Impact Stories.",
    fields: [
      { name: "title", label: "Story title", required: true },
      { name: "slug", label: "URL slug", required: true, help: "Lowercase words separated by hyphens." },
      { name: "category", label: "Category", type: "select", required: true, options: [
        { label: "Blog", value: "blog" },
        { label: "Program", value: "program" },
        { label: "Insight", value: "insight" },
        { label: "Impact Stories", value: "impact_stories" },
        { label: "Impact Stories → Clean Energy", value: "impact_stories_clean_energy" },
        { label: "Impact Stories → Water", value: "impact_stories_water" },
        { label: "Impact Stories → Livelihoods", value: "impact_stories_livelihoods" },
      ] },
      { name: "author", label: "Author" },
      { name: "excerpt", label: "Short summary", type: "textarea", help: "One or two lines shown in the story grid and SEO preview." },
      { name: "body", label: "Full story body", type: "wysiwyg", help: "Rich-formatted article text rendered directly on the story page." },
      { name: "location", label: "Location" },
      { name: "theme", label: "Theme" },
      { name: "featured_image_url", label: "Featured image URL", type: "image" },
      { name: "featured_image_alt", label: "Featured image alt text" },
      { name: "published_at", label: "Publish date and time", type: "datetime" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      ...seoFields,
    ],
  },

  {
    key: "impact-stories", table: "impact_stories", label: "Impact stories", singular: "impact story", titleField: "title",
    cluster: "articles",
    description: "Community voice stories with consent, evidence, and program or project links. Assignable to article categories.",
    fields: [
      { name: "title", label: "Story title", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "category", label: "Article category", type: "select", options: [
        { label: "Blog", value: "blog" },
        { label: "Program", value: "program" },
        { label: "Insight", value: "insight" },
        { label: "Impact Stories", value: "impact_stories" },
        { label: "Impact Stories → Clean Energy", value: "impact_stories_clean_energy" },
        { label: "Impact Stories → Water", value: "impact_stories_water" },
        { label: "Impact Stories → Livelihoods", value: "impact_stories_livelihoods" },
      ] },
      { name: "community_voice", label: "Community voice name" },
      { name: "quote", label: "Consented quotation", type: "textarea" },
      { name: "consent_status", label: "Consent status", type: "select", options: ["not_required", "pending", "confirmed", "anonymized"].map((value) => ({ label: value, value })), required: true },
      { name: "consent_note", label: "Consent record note", type: "textarea" },
      { name: "narrative", label: "Story narrative", type: "wysiwyg", help: "Full story body rendered as HTML." },
      { name: "verified_outcome", label: "Verified outcome" },
      { name: "linked_program", label: "Linked program", type: "select", options: ["GLE", "CEDP", "ORG"].map((value) => ({ label: value, value })) },
      { name: "linked_sub_program_id", label: "Linked sub-program ID" },
      { name: "linked_project_id", label: "Linked project ID" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "gallery", label: "Gallery", type: "json" },
      { name: "published_at", label: "Publish date and time", type: "datetime" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      ...seoFields,
    ],
  },

  {
    key: "impact-story-details",
    table: "impact_story_details",
    label: "Impact story detail pages",
    singular: "impact story detail",
    titleField: "title",
    cluster: "articles",
    description: "Full-detail impact story pages with hero, story body, statistics, video, and community testimonials.",
    fields: [
      { name: "slug", label: "URL slug", required: true, help: "e.g. solar-powered-salon-naluvule — must match an impact_stories slug." },
      { name: "title", label: "Story title", required: true },
      { name: "eyebrow", label: "Hero eyebrow" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text", help: "Required whenever a hero image is supplied." },
      { name: "hero_intro", label: "Hero introduction", type: "textarea", help: "Short intro text shown below the hero title." },
      { name: "tone", label: "Fallback color tone", type: "select", options: ["earth", "water", "forest"].map((v) => ({ label: v, value: v })) },
      { name: "hero_cta_label", label: "Hero CTA label" },
      { name: "hero_cta_href", label: "Hero CTA link", type: "url" },
      { name: "story_body", label: "Full story body", type: "wysiwyg", help: "Rich-formatted story text rendered directly on the detail page." },
      { name: "stats_eyebrow", label: "Statistics section eyebrow" },
      { name: "stats_title", label: "Statistics section title" },
      { name: "stats_intro", label: "Statistics section intro", type: "textarea" },
      { name: "stats_items", label: "Statistics items", type: "json", help: "Array of {label, value, unit, note} objects." },
      { name: "video_eyebrow", label: "Video section eyebrow" },
      { name: "video_title", label: "Video section title" },
      { name: "video_description", label: "Video description (right column)", type: "textarea" },
      { name: "video_url", label: "Video URL", type: "url" },
      { name: "video_thumbnail_url", label: "Video thumbnail URL", type: "image" },
      { name: "video_thumbnail_alt", label: "Video thumbnail alt text" },
      { name: "testimonials_eyebrow", label: "Testimonials section eyebrow" },
      { name: "testimonials_title", label: "Testimonials section title" },
      { name: "testimonials_intro", label: "Testimonials section intro", type: "textarea" },
      { name: "testimonials", label: "Testimonial items", type: "json", help: "Array of {quote, name, role, program, photoUrl, photoAlt, tone} objects." },
      { name: "testimonials_cta_label", label: "Testimonials CTA button label" },
      { name: "testimonials_cta_href", label: "Testimonials CTA link", type: "url" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      ...seoFields,
    ],
  },

  {
    key: "impact-stats", table: "impact_stats", label: "Impact stats", singular: "impact statistic", titleField: "metric_name",
    cluster: "articles",
    description: "The only approved source for counters and current-versus-target figures. Verified stats require a date and source note.",
    fields: [
      { name: "metric_name", label: "Metric name", required: true },
      { name: "current_value", label: "Current verified value" },
      { name: "target_value", label: "2030 target value" },
      { name: "unit", label: "Unit" },
      { name: "as_of_date", label: "As-of date", type: "date" },
      { name: "source_note", label: "Source and definition", type: "textarea", required: true },
      { name: "program", label: "Program", type: "select", options: ["ORG", "GLE", "CEDP"].map((value) => ({ label: value, value })) },
      { name: "sub_program_id", label: "Sub-program ID" },
      { name: "status", label: "Evidence status", type: "select", options: [{ label: "Verified", value: "verified" }, { label: "Draft", value: "draft" }], required: true },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  // =========================================================
  //  SETTINGS CLUSTER
  //  Colors, fonts, logos, image settings, SEO defaults,
  //  and all global website configuration.
  // =========================================================

  {
    key: "settings", table: "settings", label: "Website settings", singular: "setting", titleField: "key",
    cluster: "settings",
    description: "Site-wide configuration — colors, fonts, brand, SEO defaults, contact info, and integration keys. Key-value rows grouped by function.",
    fields: [
      { name: "key", label: "Setting key", required: true, help: "Unique identifier (e.g. site_name, brand_accent, seo_default_title)." },
      { name: "value", label: "Setting value", type: "json", required: true, help: "JSON-encoded value. For text, wrap in quotes: \"your value\"." },
      { name: "group", label: "Setting group", type: "select", required: true, options: [
        { label: "general", value: "general" },
        { label: "contact", value: "contact" },
        { label: "branding", value: "branding" },
        { label: "seo", value: "seo" },
        { label: "site", value: "site" },
      ] },
    ],
  },

  {
    key: "navigation", table: "navigation", label: "Navigation", singular: "nav item", titleField: "label",
    cluster: "settings",
    description: "Header, footer, and mobile navigation items with optional parent dropdowns.",
    fields: [
      { name: "location", label: "Location", type: "select", required: true, options: [{ label: "header", value: "header" }, { label: "footer", value: "footer" }, { label: "mobile", value: "mobile" }] },
      { name: "label", label: "Link label", required: true },
      { name: "href", label: "Link URL", required: true, type: "url" },
      { name: "parent_id", label: "Parent item ID" },
      { name: "order_column", label: "Display order", type: "number" },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "redirects", table: "redirects", label: "Redirects", singular: "redirect", titleField: "source",
    cluster: "settings",
    description: "Permanent redirects from old URLs (legacy WordPress) to new site paths.",
    fields: [
      { name: "source", label: "Source path", required: true, help: "Old URL path (e.g. /about-us)." },
      { name: "destination", label: "Destination path", required: true, type: "url", help: "New URL path (e.g. /about)." },
      { name: "status_code", label: "Status code", type: "number", required: true, help: "301 = permanent, 302 = temporary." },
    ],
  },

  {
    key: "footer-columns",
    table: "footer_columns",
    label: "Footer columns",
    singular: "footer column",
    titleField: "title",
    cluster: "settings",
    description: "The three footer column headings: About Us, Quick Links, and Contacts.",
    fields: [
      { name: "key", label: "Column key", required: true, help: "e.g. 'about', 'quick-links', 'contact'." },
      { name: "title", label: "Column heading", required: true },
      { name: "position", label: "Display order", type: "number", required: true },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "footer-nav",
    table: "footer_nav",
    label: "Footer quick links",
    singular: "footer link",
    titleField: "label",
    cluster: "settings",
    description: "Individual links shown under the Quick Links column.",
    fields: [
      { name: "column_key", label: "Column key", required: true, help: "Currently always 'quick-links'." },
      { name: "label", label: "Link label", required: true },
      { name: "href", label: "Link URL", required: true },
      { name: "order_column", label: "Display order", type: "number", required: true },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "about-content", table: "about_content", label: "About page content", singular: "about content", titleField: "key",
    cluster: "settings",
    description: "Mission, vision, values, and leadership descriptions for the About Us page. Each row is one section.",
    fields: [
      { name: "key", label: "Content key", required: true, help: "E.g. mission, vision, values, leadership." },
      { name: "config", label: "Content config (JSON)", type: "json", required: true, help: "Structured JSON for this section." },
      yesNo("visible", "Visible"),
      ...seoFields,
    ],
  },

  // =========================================================
  //  FORMS CLUSTER
  //  Application, donation, partnership, and newsletter
  //  forms — with all submissions managed here.
  // =========================================================

  {
    key: "form-categories",
    table: "form_categories",
    label: "Form categories",
    singular: "form category",
    titleField: "name",
    cluster: "forms",
    description: "Defined form categories: Application, Donation, Partnership & Collaboration, and Newsletter. Used to classify form submissions.",
    fields: [
      { name: "name", label: "Category name", required: true },
      { name: "slug", label: "URL slug", required: true, help: "Lowercase words separated by hyphens (e.g. application, donation)." },
      { name: "description", label: "Description", type: "textarea" },
      { name: "form_type", label: "Form type", type: "select", required: true, options: [
        { label: "Application", value: "application" },
        { label: "Donation", value: "donation" },
        { label: "Partnership & Collaboration", value: "partnership" },
        { label: "Newsletter", value: "newsletter" },
      ] },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "form-submissions", table: "form_submissions", label: "Form submissions", singular: "submission", titleField: "type",
    cluster: "forms",
    description: "All form submissions (Application, Donation, Partnership, Newsletter) with review status and notification audit trail. Categorised by form type.",
    fields: [
      { name: "type", label: "Form type", type: "select", required: true, options: [
        { label: "Application", value: "application" },
        { label: "Donation", value: "donation" },
        { label: "Partnership & Collaboration", value: "partnership" },
        { label: "Newsletter", value: "newsletter" },
        { label: "Internship", value: "internship" },
        { label: "Volunteer", value: "volunteer" },
        { label: "Group", value: "group" },
        { label: "Contact", value: "contact" },
      ] },
      { name: "form_category", label: "Form category", type: "select", help: "Links to the article/form_categories table for grouping.", options: [
        { label: "Application", value: "application" },
        { label: "Donation", value: "donation" },
        { label: "Partnership & Collaboration", value: "partnership" },
        { label: "Newsletter", value: "newsletter" },
      ] },
      { name: "payload", label: "Submission data", type: "json", required: true, help: "Full JSON payload of the form submission." },
      { name: "status", label: "Review status", type: "select", options: ["new", "reviewing", "actioned", "archived"].map((value) => ({ label: value, value })), required: true },
      { name: "created_at", label: "Submitted at", type: "datetime" },
    ],
  },

  {
    key: "form-submission-notifications",
    table: "form_submission_notifications",
    label: "Submission notifications", singular: "notification", titleField: "form_type",
    cluster: "forms",
    description: "Audit trail of emails sent when form submissions are received — linked to each submission.",
    fields: [
      { name: "form_submission_id", label: "Submission ID", required: true, help: "Copy the ID from the Form submissions collection." },
      { name: "form_type", label: "Form type", required: true },
      { name: "subject", label: "Email subject" },
      { name: "recipient_email", label: "Recipient email", type: "url" },
      { name: "status", label: "Delivery status", type: "select", options: ["pending", "sent", "failed"].map((v) => ({ label: v, value: v })) },
      { name: "error_message", label: "Error message", type: "textarea" },
      { name: "created_at", label: "Created at", type: "datetime" },
      { name: "sent_at", label: "Sent at", type: "datetime" },
    ],
  },

  // =========================================================
  //  PROGRAMS CLUSTER (re-exported from 'articles' for
  //  backward compatibility — these are not part of the
  //  5 top-level sections but are still needed for the
  //  existing program landing pages)
  // =========================================================

  {
    key: "programs", table: "programs", label: "Programs", singular: "program", titleField: "title",
    cluster: "settings",
    description: "The two public flagship programs: GLE and CEDP.",
    fields: [
      { name: "title", label: "Program name", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "pillar", label: "Program code", type: "select", options: [{ label: "GLE", value: "GLE" }, { label: "CEDP", value: "CEDP" }], required: true },
      { name: "tagline", label: "Tagline" },
      { name: "summary", label: "Short summary", type: "textarea" },
      { name: "content", label: "Full description", type: "wysiwyg", help: "Formatted HTML content rendered directly on the page." },
      { name: "goals", label: "Goals", type: "json" },
      { name: "geography", label: "Geography", type: "textarea" },
      { name: "cta_links", label: "Calls to action", type: "json" },
      { name: "featured_image_url", label: "Hero image URL", type: "image" },
      { name: "featured_image_alt", label: "Hero image alt text" },
      { name: "hero_video_url", label: "Hero video URL", type: "url" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      yesNo("featured", "Featured"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "sub-programs", table: "sub_programs", label: "CEDP sub-programs", singular: "sub-program", titleField: "name",
    cluster: "settings",
    description: "The six CEDP sub-programs mapped to Strategic Goals 1-6.",
    fields: [
      { name: "name", label: "Sub-program name", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "strategic_goal", label: "Strategic Goal number", type: "number", required: true },
      { name: "purpose_statement", label: "Purpose statement", type: "textarea" },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "strategic_goal_statement", label: "Strategic Goal statement", type: "textarea" },
      { name: "target_2030", label: "2030 targets", type: "json" },
      { name: "key_stats", label: "Key statistics", type: "json" },
      { name: "cta_links", label: "Calls to action", type: "json" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "icon", label: "Icon key" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "activities", table: "activities", label: "Activities", singular: "activity", titleField: "title",
    cluster: "settings",
    description: "Repeatable activities linked to a CEDP sub-program or GLE.",
    fields: [
      { name: "title", label: "Activity title", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "sub_program_id", label: "CEDP sub-program ID", help: "Copy the ID from the sub-program collection." },
      { name: "gle_stream_id", label: "GLE program ID" },
      { name: "summary", label: "Short summary", type: "textarea" },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "target_group", label: "Who it reaches", type: "textarea" },
      { name: "status", label: "Activity status", type: "select", options: ["planned", "ongoing", "completed"].map((value) => ({ label: value, value })), required: true },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date" },
      { name: "hero_image_url", label: "Hero image URL", type: "image" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "gallery", label: "Gallery", type: "json", help: "Each image requires url and alt fields." },
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "projects", table: "projects", label: "Projects", singular: "project", titleField: "title",
    cluster: "settings",
    description: "Named projects, locations, evidence, linked activities, and downloadable briefs.",
    fields: [
      { name: "title", label: "Project title", required: true }, { name: "slug", label: "URL slug", required: true },
      { name: "theme", label: "Theme" }, { name: "location", label: "Location" },
      { name: "community", label: "Community", type: "select", options: ["kalagala", "kyambogo", "naluvule", "wabusanke", "byabuku", "nationwide"].map((value) => ({ label: value, value })) },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "challenge", label: "The challenge", type: "wysiwyg" },
      { name: "challenge_image_url", label: "Challenge image URL", type: "image" },
      { name: "challenge_image_alt", label: "Challenge image alt text" },
      { name: "solution", label: "Our approach", type: "wysiwyg" },
      { name: "activities", label: "Activity list", type: "json" },
      { name: "partners", label: "Partners involved", type: "json" },
      { name: "outcomes_structured", label: "Verified outcomes", type: "json" },
      { name: "budget", label: "Budget (optional)" },
      { name: "project_brief_url", label: "Project brief URL", type: "url" },
      { name: "gallery", label: "Gallery", type: "json", help: "Each image requires url and alt fields; use beforeAfter for paired images." },
      { name: "featured_image_url", label: "Hero image URL", type: "image" },
      { name: "featured_image_alt", label: "Hero image alt text" },
      { name: "linked_program", label: "Linked program", type: "select", options: [{ label: "GLE", value: "GLE" }, { label: "CEDP", value: "CEDP" }, { label: "ORG", value: "ORG" }] },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      yesNo("featured", "Featured"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "project-activities",
    table: "project_activities",
    label: "Project activities",
    singular: "project activity",
    titleField: "title",
    cluster: "settings",
    description: "Activities on a project detail page — title, full description, optional image, with a CMS-controlled display order.",
    fields: [
      { name: "project_slug", label: "Project slug", required: true, help: "The slug from the Projects collection this activity belongs to." },
      { name: "title", label: "Activity title", required: true },
      { name: "description", label: "Full description", type: "textarea", required: true, help: "Shown in full detail on the project page." },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text", help: "Required for accessibility whenever an image is supplied." },
      { name: "order_column", label: "Display order", type: "number", help: "Lower numbers appear first." },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "project-impacts",
    table: "project_impacts",
    label: "Project impact cards",
    singular: "project impact card",
    titleField: "title",
    cluster: "settings",
    description: "Impact cards shown in the looping carousel on the project detail page — each with a CTA button routing to a full impact story.",
    fields: [
      { name: "project_slug", label: "Project slug", required: true, help: "The slug from the Projects collection this impact belongs to." },
      { name: "title", label: "Card title", required: true },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "verified_outcome", label: "Verified outcome", type: "textarea", help: "One concrete data point tied to this impact." },
      { name: "story_slug", label: "Impact story slug", help: "Links to /impact/stories/[slug] for the full detail page." },
      { name: "cta_label", label: "CTA button label", help: "Defaults to 'Read the impact story'." },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text", help: "Required for accessibility whenever an image is supplied." },
      { name: "order_column", label: "Display order", type: "number", help: "Lower numbers appear first." },
      yesNo("visible", "Visible"),
      ...seoFields,
    ],
  },

  {
    key: "cedp-areas-of-focus",
    table: "cedp_areas_of_focus",
    label: "CEDP: Areas of focus",
    singular: "area of focus",
    titleField: "title",
    cluster: "settings",
    description: "The three thematic areas (clean energy & climate resilience, water & healthy communities, sustainable livelihoods) shown on the CEDP landing page.",
    fields: [
      { name: "title", label: "Card title", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "cta_label", label: "CTA button label" },
      { name: "cta_href", label: "CTA link", type: "url" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "cedp-process-steps",
    table: "cedp_process_steps",
    label: "CEDP: Process steps",
    singular: "process step",
    titleField: "title",
    cluster: "settings",
    description: "The 'From priority to ownership' sequence cards on the CEDP landing page.",
    fields: [
      { name: "title", label: "Step title", required: true },
      { name: "subtitle", label: "Subtitle (e.g. Local ownership)" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "cedp-impact-stories",
    table: "cedp_impact_stories",
    label: "CEDP: Impact stories cards",
    singular: "impact story card",
    titleField: "title",
    cluster: "articles",
    description: "Impact story cards for the 'Impacts' section on the CEDP landing page.",
    fields: [
      { name: "title", label: "Story title", required: true },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "href", label: "Link URL", type: "url" },
      { name: "project_slug", label: "Related project slug (for reference)" },
      { name: "cta_label", label: "CTA button label" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "cedp-impact-cards",
    table: "cedp_impact_cards",
    label: "CEDP: Impact cards",
    singular: "impact card",
    titleField: "title",
    cluster: "articles",
    description: "Impact cards for the 'CEDP impact' section.",
    fields: [
      { name: "title", label: "Card title", required: true },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "href", label: "Link URL", type: "url" },
      { name: "project_slug", label: "Related project slug (for reference)" },
      { name: "cta_label", label: "CTA button label" },
      { name: "verified_outcome", label: "Verified outcome", type: "textarea" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "cedp-area-projects",
    table: "cedp_area_projects",
    label: "CEDP: Area projects",
    singular: "area project link",
    titleField: "order_column",
    cluster: "settings",
    description: "Links projects to an area landing page with display order and optional custom CTA label.",
    fields: [
      { name: "area_id", label: "Area page ID", required: true, help: "Copy the ID from the CEDP area landing pages collection." },
      { name: "project_id", label: "Project ID", required: true, help: "Copy the ID from the Projects collection." },
      { name: "custom_cta_label", label: "Custom CTA label" },
      { name: "order_column", label: "Display order", type: "number", required: true },
    ],
  },

  {
    key: "cedp-area-impacts",
    table: "cedp_area_impacts",
    label: "CEDP: Area impact cards",
    singular: "area impact card",
    titleField: "title",
    cluster: "articles",
    description: "Impact carousel cards shown on each area landing page.",
    fields: [
      { name: "area_id", label: "Area page ID", required: true, help: "Copy the ID from the CEDP area landing pages collection." },
      { name: "title", label: "Card title", required: true },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "story", label: "Impact story", type: "textarea", help: "Brief narrative text shown in the carousel." },
      { name: "href", label: "Link URL", type: "url" },
      { name: "cta_label", label: "CTA button label" },
      { name: "verified_outcome", label: "Verified outcome", type: "textarea" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "gle-pathways",
    table: "gle_pathways",
    label: "GLE: Pathway cards",
    singular: "pathway card",
    titleField: "title",
    cluster: "settings",
    description: "The four 'Find your pathway' cards on the Global Learning & Exchange landing page.",
    fields: [
      { name: "title", label: "Card title", required: true },
      { name: "body", label: "Description", type: "textarea", required: true },
      { name: "href", label: "Link URL", type: "url", required: true },
      { name: "cta", label: "CTA button label" },
      { name: "kicker", label: "Audience label", help: "Short tag, e.g. 'Individuals', 'Universities'" },
      { name: "image_url", label: "Featured image URL", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "gle-introduction",
    table: "gle_introduction",
    label: "GLE: Introduction section",
    singular: "introduction section",
    titleField: "title",
    cluster: "settings",
    description: "The introduction section on the GLE landing page.",
    fields: [
      { name: "title", label: "Section title", required: true },
      { name: "eyebrow", label: "Eyebrow label" },
      { name: "body", label: "Introduction body", type: "textarea", required: true, help: "Full paragraph text describing the GLE program." },
      { name: "image_url", label: "Image URL (left side)", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "cta_label", label: "CTA button label" },
      { name: "cta_href", label: "CTA link", type: "url" },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "gle-apply-section",
    table: "gle_apply_section",
    label: "GLE: Apply section",
    singular: "apply section",
    titleField: "title",
    cluster: "settings",
    description: "The Apply section on the GLE landing page.",
    fields: [
      { name: "title", label: "Section title", required: true },
      { name: "eyebrow", label: "Eyebrow label" },
      { name: "body", label: "Apply statement", type: "textarea", required: true, help: "Brief text describing the application process." },
      { name: "image_url", label: "Image URL (left side)", type: "image" },
      { name: "image_alt", label: "Image alt text" },
      { name: "cta_label", label: "CTA button label", required: true },
      { name: "cta_href", label: "CTA link", type: "url", required: true },
      yesNo("visible", "Visible"),
    ],
  },

  {
    key: "gle-development-sectors",
    table: "gle_development_sectors",
    label: "GLE: Development sectors",
    singular: "development sector",
    titleField: "title",
    cluster: "settings",
    description: "Thematic development sectors GLE participants work in — used to filter impact stories on the archive page.",
    fields: [
      { name: "slug", label: "URL slug", required: true, help: "Lowercase words separated by hyphens." },
      { name: "title", label: "Sector name", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon (emoji or key)" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "media-assets", table: "media_assets", label: "Media records", singular: "media record", titleField: "alt_text",
    cluster: "settings",
    description: "Accessible image records uploaded through the media library. Upload new files from the Media screen.",
    fields: [
      { name: "bucket", label: "Storage bucket", required: true },
      { name: "object_path", label: "Object path", required: true },
      { name: "public_url", label: "Public URL", type: "url", required: true },
      { name: "alt_text", label: "Alt text", required: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "mime_type", label: "MIME type" },
      { name: "file_size_bytes", label: "File size in bytes", type: "number" },
      { name: "width", label: "Width", type: "number" },
      { name: "height", label: "Height", type: "number" },
    ],
  },

  {
    key: "team", table: "team_members", label: "Team members", singular: "team member", titleField: "name",
    cluster: "settings",
    description: "Board, staff, advisors, and their approved biographies.",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "role", label: "Role" },
      { name: "category", label: "Category", type: "select", options: ["board", "staff", "advisor", "field", "alumni"].map((value) => ({ label: value, value })) },
      { name: "program_affiliation", label: "Program affiliation" },
      { name: "short_bio", label: "Short biography", type: "wysiwyg" },
      { name: "photo_url", label: "Photo URL", type: "image" },
      { name: "photo_alt", label: "Photo alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "partners", table: "partners", label: "Partners", singular: "partner", titleField: "name",
    cluster: "settings",
    description: "Approved partner names, logos, types, links, and partnership descriptions.",
    fields: [
      { name: "name", label: "Partner name", required: true },
      { name: "type", label: "Partner type" },
      { name: "description", label: "Partnership description", type: "textarea" },
      { name: "website", label: "Website", type: "url" },
      { name: "logo_url", label: "Logo URL", type: "image" },
      { name: "logo_alt", label: "Logo alt text" },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },

  {
    key: "newsletters", table: "newsletter_subscribers", label: "Newsletter subscribers", singular: "newsletter subscriber", titleField: "email",
    cluster: "forms",
    description: "Email subscribers who have opted in to FOSCOD newsletters.",
    fields: [
      { name: "email", label: "Email address", required: true, type: "text", help: "Subscriber email address." },
      { name: "name", label: "Full name" },
      { name: "source", label: "Signup source", help: "E.g. home-page, footer, impact-stories." },
      { name: "status", label: "Subscription status", type: "select", options: ["subscribed", "unsubscribed", "bounced"].map((value) => ({ label: value, value })), required: true },
      yesNo("consent_given", "Consent confirmed?"),
      { name: "created_at", label: "Signed up at", type: "datetime" },
    ],
  },

  {
    key: "opportunities", table: "opportunities", label: "Open opportunities", singular: "opportunity", titleField: "title",
    cluster: "forms",
    description: "Internship and volunteer opportunities — only verified and currently open placements should be published.",
    fields: [
      { name: "title", label: "Opportunity title", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "type", label: "Type", type: "select", options: [{ label: "Internship", value: "internship" }, { label: "Volunteer", value: "volunteer" }], required: true },
      { name: "category", label: "Category" },
      { name: "location", label: "Location" },
      { name: "duration", label: "Duration" },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "about", label: "Full description", type: "textarea" },
      { name: "highlights", label: "Activities", type: "json" },
      { name: "requirements", label: "Requirements", type: "json" },
      { name: "featured_image_url", label: "Image URL", type: "image" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },

  {
    key: "downloads", table: "downloads", label: "Downloads & resources", singular: "resource", titleField: "title",
    cluster: "forms",
    description: "Project briefs, annual reports, MEL summaries, and public resources.",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file_url", label: "File URL", type: "url", required: true },
      { name: "file_type", label: "File type", required: true },
      { name: "program", label: "Program" },
      { name: "sub_program_id", label: "Sub-program ID" },
      { name: "category", label: "Category", type: "select", options: ["project_brief", "annual_report", "mel_summary", "resource"].map((value) => ({ label: value.replaceAll("_", " "), value })) },
      yesNo("visible", "Visible"),
      { name: "order_column", label: "Display order", type: "number" },
    ],
  },
];

export const cmsCollectionMap = Object.fromEntries(cmsCollections.map((collection) => [collection.key, collection])) as Record<string, CmsCollection>;
