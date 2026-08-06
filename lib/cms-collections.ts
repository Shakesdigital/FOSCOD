export type CmsField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "select" | "date" | "datetime" | "json" | "url";
  required?: boolean;
  help?: string;
  options?: { label: string; value: string }[];
};

export type CmsCollection = {
  key: string;
  table: string;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  fields: CmsField[];
};

const statusOptions = ["draft", "published", "archived"].map((value) => ({ label: value[0].toUpperCase() + value.slice(1), value }));
const yesNo = (name: string, label: string): CmsField => ({ name, label, type: "boolean" });
const seoFields: CmsField[] = [
  { name: "meta_title", label: "SEO title", help: "Write a unique, human-readable search title." },
  { name: "meta_description", label: "SEO description", type: "textarea", help: "Summarize this page accurately in about 150-160 characters." },
  { name: "meta_image_url", label: "Social sharing image URL", type: "url" },
];

export const cmsCollections: CmsCollection[] = [
  {
    key: "pages", table: "pages", label: "Pages", singular: "page", titleField: "title",
    description: "Static pages and their ordered CMS sections.",
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
    key: "modules", table: "modules", label: "Page modules", singular: "module", titleField: "name",
    description: "Reusable hero, text, gallery, cards, CTA, stats, testimonial, FAQ, feature-grid, and form sections.",
    fields: [
      { name: "name", label: "Internal module name", required: true },
      { name: "type", label: "Module type", type: "select", required: true, options: ["hero","rich_text","gallery","cards","cta","stats","testimonials","faq","feature_grid","form_embed"].map((value) => ({ label: value.replaceAll("_", " "), value })) },
      { name: "config", label: "Module content", type: "json", required: true, help: "Structured content for the selected module type." },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
    ],
  },
  {
    key: "page-modules", table: "page_modules", label: "Page module order", singular: "page module link", titleField: "region",
    description: "Attach reusable modules to pages and control their order within each page region.",
    fields: [
      { name: "page_id", label: "Page ID", required: true, help: "Copy the ID from the Pages collection." },
      { name: "module_id", label: "Module ID", required: true, help: "Copy the ID from the Page modules collection." },
      { name: "region", label: "Page region", required: true, help: "Usually main; use hero, sidebar, or footer only when the page layout supports it." },
      { name: "order_column", label: "Display order", type: "number", required: true },
    ],
  },
  {
    key: "programs", table: "programs", label: "Programs", singular: "program", titleField: "title",
    description: "The two public flagship programs: GLE and CEDP.",
    fields: [
      { name: "title", label: "Program name", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "pillar", label: "Program code", type: "select", options: [{ label: "GLE", value: "GLE" }, { label: "CEDP", value: "CEDP" }], required: true },
      { name: "tagline", label: "Tagline" },
      { name: "summary", label: "Short summary", type: "textarea" },
      { name: "content", label: "Full description", type: "textarea" },
      { name: "goals", label: "Goals", type: "json" },
      { name: "geography", label: "Geography", type: "textarea" },
      { name: "cta_links", label: "Calls to action", type: "json" },
      { name: "featured_image_url", label: "Hero image URL", type: "url" },
      { name: "featured_image_alt", label: "Hero image alt text", help: "Required whenever a hero image is supplied." },
      { name: "hero_video_url", label: "Hero video URL", type: "url" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      yesNo("featured", "Featured"),
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },
  {
    key: "sub-programs", table: "sub_programs", label: "CEDP sub-programs", singular: "sub-program", titleField: "name",
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
      { name: "hero_image_url", label: "Hero image URL", type: "url" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "icon", label: "Icon key" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true },
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },
  {
    key: "activities", table: "activities", label: "Activities", singular: "activity", titleField: "title",
    description: "Repeatable activities linked to a CEDP sub-program or GLE.",
    fields: [
      { name: "title", label: "Activity title", required: true },
      { name: "slug", label: "URL slug", required: true },
      { name: "sub_program_id", label: "CEDP sub-program ID", help: "Use the ID shown in the sub-program collection." },
      { name: "gle_stream_id", label: "GLE program ID" },
      { name: "summary", label: "Short summary", type: "textarea" },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "target_group", label: "Who it reaches", type: "textarea" },
      { name: "status", label: "Activity status", type: "select", options: ["planned","ongoing","completed"].map((value) => ({ label: value, value })), required: true },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date" },
      { name: "hero_image_url", label: "Hero image URL", type: "url" },
      { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "gallery", label: "Gallery", type: "json", help: "Each image requires url and alt fields." },
      { name: "order_column", label: "Display order", type: "number" },
      ...seoFields,
    ],
  },
  {
    key: "projects", table: "projects", label: "Projects", singular: "project", titleField: "title",
    description: "Named projects, locations, evidence, linked activities, and downloadable briefs.",
    fields: [
      { name: "title", label: "Project title", required: true }, { name: "slug", label: "URL slug", required: true },
      { name: "theme", label: "Theme" }, { name: "location", label: "Location" },
      { name: "community", label: "Community", type: "select", options: ["kalagala","kyambogo","naluvule","wabusanke","byabuku","nationwide"].map((value) => ({ label: value, value })) },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "challenge", label: "The challenge", type: "textarea" },
      { name: "solution", label: "Our approach", type: "textarea" },
      { name: "activities", label: "Activity list", type: "json" }, { name: "partners", label: "Partners involved", type: "json" },
      { name: "timeline", label: "Timeline", type: "json" }, { name: "outcomes_structured", label: "Verified outcomes", type: "json" },
      { name: "budget", label: "Budget (optional)" }, { name: "project_brief_url", label: "Project brief URL", type: "url" },
      { name: "gallery", label: "Gallery", type: "json", help: "Each image requires url and alt fields; use beforeAfter for paired images." },
      { name: "featured_image_url", label: "Hero image URL", type: "url" }, { name: "featured_image_alt", label: "Hero image alt text" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true }, yesNo("featured", "Featured"),
      { name: "order_column", label: "Display order", type: "number" }, ...seoFields,
    ],
  },
  {
    key: "impact-stories", table: "impact_stories", label: "Impact stories", singular: "impact story", titleField: "title",
    description: "Community voice stories with consent, evidence, and program or project links.",
    fields: [
      { name: "title", label: "Story title", required: true }, { name: "slug", label: "URL slug", required: true },
      { name: "community_voice", label: "Community voice name" }, { name: "quote", label: "Consented quotation", type: "textarea" },
      { name: "consent_status", label: "Consent status", type: "select", options: ["not_required","pending","confirmed","anonymized"].map((value) => ({ label: value, value })), required: true },
      { name: "consent_note", label: "Consent record note", type: "textarea" },
      { name: "narrative", label: "Story narrative", type: "textarea" }, { name: "verified_outcome", label: "Verified outcome" },
      { name: "linked_program", label: "Linked program", type: "select", options: ["GLE","CEDP","ORG"].map((value) => ({ label: value, value })) },
      { name: "linked_sub_program_id", label: "Linked sub-program ID" }, { name: "linked_project_id", label: "Linked project ID" },
      { name: "hero_image_url", label: "Hero image URL", type: "url" }, { name: "hero_image_alt", label: "Hero image alt text" },
      { name: "gallery", label: "Gallery", type: "json" }, { name: "published_at", label: "Publish date and time", type: "datetime" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true }, ...seoFields,
    ],
  },
  {
    key: "impact-stats", table: "impact_stats", label: "Impact stats", singular: "impact statistic", titleField: "metric_name",
    description: "The only approved source for counters and current-versus-target figures.",
    fields: [
      { name: "metric_name", label: "Metric name", required: true }, { name: "current_value", label: "Current verified value" },
      { name: "target_value", label: "2030 target value" }, { name: "unit", label: "Unit" }, { name: "as_of_date", label: "As-of date", type: "date" },
      { name: "source_note", label: "Source and definition", type: "textarea", required: true },
      { name: "program", label: "Program", type: "select", options: ["ORG","GLE","CEDP"].map((value) => ({ label: value, value })) },
      { name: "sub_program_id", label: "Sub-program ID" },
      { name: "status", label: "Evidence status", type: "select", options: [{ label: "Verified", value: "verified" }, { label: "Draft", value: "draft" }], required: true },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "team", table: "team_members", label: "Team & governance", singular: "team member", titleField: "name",
    description: "Board, staff, advisors, and their approved biographies.",
    fields: [
      { name: "name", label: "Name", required: true }, { name: "role", label: "Role" },
      { name: "category", label: "Category", type: "select", options: ["board","staff","advisor","field","alumni"].map((value) => ({ label: value, value })) },
      { name: "program_affiliation", label: "Program affiliation" }, { name: "short_bio", label: "Short biography", type: "textarea" },
      { name: "photo_url", label: "Photo URL", type: "url" }, { name: "photo_alt", label: "Photo alt text" },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "partners", table: "partners", label: "Partners", singular: "partner", titleField: "name",
    description: "Approved partner names, logos, types, links, and partnership descriptions.",
    fields: [
      { name: "name", label: "Partner name", required: true }, { name: "type", label: "Partner type" },
      { name: "description", label: "Partnership description", type: "textarea" }, { name: "website", label: "Website", type: "url" },
      { name: "logo_url", label: "Logo URL", type: "url" }, { name: "logo_alt", label: "Logo alt text" },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "testimonials", table: "testimonials", label: "Testimonials", singular: "testimonial", titleField: "name",
    description: "Permissioned testimonials only.",
    fields: [
      { name: "name", label: "Name", required: true }, { name: "quote", label: "Quotation", type: "textarea", required: true },
      { name: "cohort", label: "Cohort" }, { name: "program", label: "Program or affiliation" },
      yesNo("permission", "Permission confirmed"), { name: "photo_url", label: "Photo URL", type: "url" },
      { name: "photo_alt", label: "Photo alt text" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true }, { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "downloads", table: "downloads", label: "Downloads & resources", singular: "resource", titleField: "title",
    description: "Project briefs, annual reports, MEL summaries, and public resources.",
    fields: [
      { name: "title", label: "Title", required: true }, { name: "description", label: "Description", type: "textarea" },
      { name: "file_url", label: "File URL", type: "url", required: true }, { name: "file_type", label: "File type", required: true },
      { name: "program", label: "Program" }, { name: "sub_program_id", label: "Sub-program ID" },
      { name: "category", label: "Category", type: "select", options: ["project_brief","annual_report","mel_summary","resource"].map((value) => ({ label: value.replaceAll("_", " "), value })) },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "faqs", table: "faqs", label: "FAQs", singular: "FAQ", titleField: "question",
    description: "Questions grouped for interns, donors, partners, communities, and general visitors.",
    fields: [
      { name: "question", label: "Question", required: true }, { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "audience", label: "Audience", type: "select", options: ["interns","donors","partners","community","general"].map((value) => ({ label: value, value })) },
      { name: "program", label: "Program" }, { name: "sub_program_id", label: "Sub-program ID" },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "hero-slides", table: "hero_slides", label: "Page heroes", singular: "hero", titleField: "title",
    description: "CMS-managed page headlines, imagery, alt text, and calls to action.",
    fields: [
      { name: "page_slug", label: "Page key", required: true }, { name: "eyebrow", label: "Eyebrow" },
      { name: "title", label: "Headline", required: true }, { name: "intro", label: "Introduction", type: "textarea" },
      { name: "cta_label", label: "Primary CTA label" }, { name: "cta_href", label: "Primary CTA link" },
      { name: "cta2_label", label: "Second CTA label" }, { name: "cta2_href", label: "Second CTA link" },
      { name: "cta3_label", label: "Third CTA label" }, { name: "cta3_href", label: "Third CTA link" },
      { name: "tone", label: "Fallback color tone", type: "select", options: ["earth","water","forest"].map((value) => ({ label: value, value })) },
      { name: "image_url", label: "Image URL", type: "url" }, { name: "image_alt", label: "Image alt text" },
      yesNo("visible", "Visible"), { name: "order_column", label: "Display order", type: "number" },
    ],
  },
  {
    key: "opportunities", table: "opportunities", label: "Open opportunities", singular: "opportunity", titleField: "title",
    description: "Only verified and currently open internship or volunteer opportunities should be published.",
    fields: [
      { name: "title", label: "Opportunity title", required: true }, { name: "slug", label: "URL slug", required: true },
      { name: "type", label: "Type", type: "select", options: [{ label: "Internship", value: "internship" }, { label: "Volunteer", value: "volunteer" }], required: true },
      { name: "category", label: "Category" }, { name: "location", label: "Location" }, { name: "duration", label: "Duration" },
      { name: "excerpt", label: "Short summary", type: "textarea" }, { name: "about", label: "Full description", type: "textarea" },
      { name: "highlights", label: "Activities", type: "json" }, { name: "requirements", label: "Requirements", type: "json" },
      { name: "featured_image_url", label: "Image URL", type: "url" },
      { name: "status", label: "Publishing status", type: "select", options: statusOptions, required: true }, { name: "order_column", label: "Display order", type: "number" }, ...seoFields,
    ],
  },
  {
    key: "media-assets", table: "media_assets", label: "Media records", singular: "media record", titleField: "alt_text",
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
];

export const cmsCollectionMap = Object.fromEntries(cmsCollections.map((collection) => [collection.key, collection])) as Record<string, CmsCollection>;
