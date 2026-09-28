import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/* ============================================================
   Home content layer.
   Each getter tries Supabase (once tables are seeded) and falls
   back to built-in defaults derived from the FOSCOD content pack,
   so the design renders fully before the database is wired.
   ============================================================ */

export type HeroSlide = {
  eyebrow?: string;
  title: string;
  intro?: string;
  cta?: { href: string; label: string };
  cta2?: { href: string; label: string };
  cta3?: { href: string; label: string };
  tone: "earth" | "water" | "forest";
  imageUrl?: string;
};

export type ProgramCard = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  tone: "earth" | "water" | "forest";
  pillar?: string;
};

export type Pathway = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  tone: "accent" | "water";
};

export type FeaturedProject = {
  slug: string;
  title: string;
  theme: string;
  location: string;
  summary: string;
  href: string;
};

export type ImpactMetric = {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  status: "verified" | "draft";
};

export type Testimonial = {
  quote: string;
  name: string;
  cohort: string;
  program: string;
};

export type Partner = { name: string; type: string; logo_url?: string; logo_alt?: string; website?: string };

export type AboutValue = {
  title: string;
  image_url?: string;
  image_alt?: string;
  body: string;
  benchmark: string;
};

export type AboutContent = {
  mission: { title: string; image_url?: string; image_alt?: string; description: string };
  vision: { title: string; image_url?: string; image_alt?: string; description: string };
  values: AboutValue[];
  leadership: {
    board: { description: string; href: string; cta: string };
    team: { description: string; href: string; cta: string };
  };
};

export type ImpactStat = {
  metric_name: string;
  current_value: string;
  target_value?: string;
  unit?: string;
  as_of_date?: string;
  source_note?: string;
  program?: string;
  sub_program_id?: string;
  status: "verified" | "draft";
};

export type DownloadResource = {
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  category: string;
};

export type ImpactStory = {
  slug: string;
  title: string;
  community_voice?: string;
  quote?: string;
  hero_image_url?: string;
  gallery?: { url: string; alt?: string; caption?: string }[];
  narrative?: string;
  linked_program?: string;
  linked_sub_program_id?: string;
  linked_project_id?: string;
  verified_outcome?: string;
  published_at?: string;
};

export type SubProgram = {
  id?: string;
  slug: string;
  name: string;
  strategic_goal: number;
  hero_image_url?: string;
  description?: string;
  icon?: string;
  key_stats?: { label: string; value: string; note?: string }[];
};

export type Activity = {
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  hero_image_url?: string;
  gallery?: { url: string; alt?: string; caption?: string }[];
  status: "planned" | "ongoing" | "completed";
  start_date?: string;
  end_date?: string;
};

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  href: string;
};

const pathways: Pathway[] = [
  {
    key: "gle",
    kicker: "For students, researchers & universities",
    title: "Join a Global Learning Program",
    body: "Work alongside communities, host families, and local leaders on real projects in clean energy, WASH, livelihoods, health, and research. Structured field learning with 24/7 in-country support.",
    href: "/programs/global-learning-exchange",
    cta: "Find your program",
    tone: "water",
  },
  {
    key: "cedp",
    kicker: "For donors, partners & communities",
    title: "Support Community-Led Development",
    body: "Fund and partner on locally owned solutions across renewable energy, environment, WASH, livelihoods, and inclusion — designed and delivered with the communities that lead them.",
    href: "/programs/community-empowerment-development",
    cta: "Partner with FOSCOD",
    tone: "accent",
  },
];

const featuredProjects: FeaturedProject[] = [
  {
    slug: "greening-kalagala",
    title: "Greening Kalagala",
    theme: "Ecosystem Restoration",
    location: "Kalagala Parish, Buikwe District",
    summary: "A community reforestation campaign in FOSCOD's core CEDP implementation area.",
    href: "/projects/greening-kalagala",
  },
  {
    slug: "water-spring-protection-naluvule",
    title: "Water Spring Protection in Naluvule Community",
    theme: "WASH",
    location: "Naluvule, Buikwe District",
    summary: "Community-led protection of a natural water spring in Naluvule.",
    href: "/projects/water-spring-protection-naluvule",
  },
  {
    slug: "solar-powered-water-system-naluvule",
    title: "Solar-Powered Water System, Naluvule Village",
    theme: "Clean Energy & WASH",
    location: "Naluvule, Buikwe District",
    summary: "A solar-powered water initiative linking renewable energy with community water access.",
    href: "/projects/solar-powered-water-system-naluvule",
  },
  {
    slug: "coffee-farming-mobilization",
    title: "Coffee Farming Mobilization",
    theme: "Green Livelihoods",
    location: "Kalagala Parish, Buikwe District",
    summary: "Community mobilization around coffee farming and resilient local livelihoods.",
    href: "/projects/coffee-farming-mobilization",
  },
  {
    slug: "carbon-credit-project",
    title: "Carbon Credit Project",
    theme: "Clean Cooking & Ecosystem Restoration",
    location: "Kalagala Parish, Buikwe District",
    summary: "A planned clean-cookstove and reforestation initiative aligned with Gold Standard and Verra REDD+ methodologies.",
    href: "/projects/carbon-credit-project",
  },
];

const impactMetrics: ImpactMetric[] = [
  { label: "Community projects implemented", value: "35", note: "Verified track record, 2022–2024", status: "verified" },
  { label: "Development practitioners trained", value: "42", note: "Verified track record, 2019–2024", status: "verified" },
  { label: "Virtual interns engaged", value: "93", note: "Verified track record, 2019–2024", status: "verified" },
  { label: "Projects sustaining benefits", value: "86%", note: "Verified completed-project sustainability rate", status: "verified" },
];

// Illustrative until real, permissioned alumni reviews are loaded via the CMS.
// Attributions are role-based, not invented names — honest placeholders.
const testimonials: Testimonial[] = [];

const partners: Partner[] = [
  { name: "University Partner", type: "Academic" },
  { name: "Community CBO", type: "Community" },
  { name: "Local NGO", type: "NGO" },
  { name: "Climate Funder", type: "Funder" },
  { name: "Research Institute", type: "Research" },
  { name: "District Government", type: "Government" },
];

const UNVERIFIED_STORIES: Story[] = [
  {
    slug: "celebrating-our-host-families",
    title: "Celebrating Our Host Families",
    category: "Host Family Stories",
    excerpt:
      "The families who open their homes are the quiet backbone of every FOSCOD placement.",
    date: "2025",
    href: "/stories/celebrating-our-host-families",
  },
  {
    slug: "solar-powered-salon-naluvule",
    title: "Solar-Powered Salon in Naluvule",
    category: "Project Updates",
    excerpt:
      "How one clean-energy enterprise is changing what's possible for a village business.",
    date: "2025",
    href: "/stories/solar-powered-salon-naluvule",
  },
  {
    slug: "internship-debrief-2025",
    title: "FOSCOD Internship Debrief 2025",
    category: "Impact Reports",
    excerpt:
      "What this year's cohort built, learned, and left behind across four districts.",
    date: "2025",
    href: "/stories/internship-debrief-2025",
  },
  {
    slug: "water-is-life-lubani",
    title: "Water is Life: a protected spring in Lubani",
    category: "Project Updates",
    excerpt:
      "How a single protected spring is changing daily life for an entire village.",
    date: "2025",
    href: "/stories/water-is-life-lubani",
  },
  {
    slug: "kalagala-greening-project",
    title: "Greening Kalagala, one tree at a time",
    category: "Project Updates",
    excerpt:
      "Agroforestry and tree-planting that restore soil while growing local income.",
    date: "2025",
    href: "/stories/kalagala-greening-project",
  },
  {
    slug: "rice-university-menstrual-health",
    title: "A university partnership on menstrual health",
    category: "Alumni Reflections",
    excerpt:
      "A draft university-partnership story that remains unpublished until its institution, consent, and outcomes are verified.",
    date: "2024",
    href: "/stories/rice-university-menstrual-health",
  },
];

// Categories used to power specific page sections — kept out of the blog feed.
const SYSTEM_STORY_CATEGORIES = [
  "Impact Video",
  "Volunteer Opportunity",
  "GLE Stream",
  "Program Highlight",
];

export async function getPathways(): Promise<Pathway[]> {
  return pathways;
}

/* ---------- programs (two pillars — home two-up + Programs page) ---------- */
const programsFallback: ProgramCard[] = [
  {
    slug: "global-learning-exchange",
    title: "Global Learning & Exchange",
    summary:
      "Internships, volunteering, group programs, and research placements give students, professionals, and universities structured, supervised field experience in clean energy, WASH, livelihoods, health, and the environment.",
    href: "/programs/global-learning-exchange",
    tone: "water",
    pillar: "GLE",
  },
  {
    slug: "community-empowerment-development",
    title: "Community Empowerment & Development",
    summary:
      "Locally owned solutions across renewable energy, environment, water, livelihoods, health, and inclusion — designed and delivered with the communities that lead them.",
    href: "/programs/community-empowerment-development",
    tone: "forest",
    pillar: "CEDP",
  },
];

export async function getPrograms(): Promise<ProgramCard[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("programs")
      .select("slug,pillar,title,summary,order_column")
      .eq("status", "published")
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((p, i) => ({
        slug: p.slug,
        title: p.title,
        summary: p.summary ?? "",
        href: `/programs/${p.slug}`,
        tone: p.pillar === "GLE" ? "water" : p.pillar === "CEDP" ? "forest" : (["water", "forest", "earth"] as const)[i % 3],
        pillar: p.pillar ?? undefined,
      }));
    }
  }
  return programsFallback;
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("projects")
      .select("slug,title,theme,location,excerpt")
      .eq("status", "published")
      .eq("featured", true)
      .order("order_column", { ascending: true })
      .limit(4)) ?? { data: null };
    if (data && data.length) {
      return data.map((p) => ({
        slug: p.slug,
        title: p.title,
        theme: p.theme ?? "",
        location: p.location ?? "",
        summary: p.excerpt ?? "",
        href: `/projects/${p.slug}`,
      }));
    }
  }
  return featuredProjects;
}

export async function getImpactMetrics(): Promise<ImpactMetric[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("impact_metrics")
      .select("label,value,unit,note,status")
      .eq("visible", true)
      .order("order_column", { ascending: true })
      .limit(4)) ?? { data: null };
    if (data && data.length) {
      return data.map((m) => ({
        label: m.label,
        value: m.value ?? "—",
        unit: m.unit ?? undefined,
        note: m.note ?? undefined,
        status: (m.status as ImpactMetric["status"]) ?? "draft",
      }));
    }
  }
  return impactMetrics;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

async function getLegacyPartners(): Promise<Partner[]> {
  return partners;
}

export async function getLatestStories(): Promise<Story[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("stories")
      .select("slug,title,category,excerpt,published_at")
      .eq("status", "published")
      .not("category", "in", `(${SYSTEM_STORY_CATEGORIES.map((c) => `"${c}"`).join(",")})`)
      .order("published_at", { ascending: false })
      .limit(12)) ?? { data: null };
    if (data && data.length) {
      return data.map((s) => ({
        slug: s.slug,
        title: s.title,
        category: s.category ?? "News",
        excerpt: s.excerpt ?? "",
        date: s.published_at ? new Date(s.published_at).getFullYear().toString() : "",
        href: `/stories/${s.slug}`,
      }));
    }
  }
  return stories;
}

export async function getStory(slug: string): Promise<(Story & { body?: string }) | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("stories")
      .select("slug,title,category,excerpt,body,published_at")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()) ?? { data: null };
    if (data) {
      return {
        slug: data.slug,
        title: data.title,
        category: data.category ?? "News",
        excerpt: data.excerpt ?? "",
        date: data.published_at ? new Date(data.published_at).getFullYear().toString() : "",
        href: `/stories/${data.slug}`,
        body: data.body ?? undefined,
      };
    }
  }
  return (await getLatestStories()).find((s) => s.slug === slug) ?? stories.find((s) => s.slug === slug) ?? null;
}

/* ---------- program dates (Apply + Global Learning) ---------- */
export type ProgramDate = { country: string; companies: string; confirmed: boolean };

const programDatesFallback: ProgramDate[] = [];

export async function getProgramDates(): Promise<ProgramDate[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("program_dates")
      .select("country,companies,confirmed")
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((d) => ({
        country: d.country,
        companies: d.companies ?? "",
        confirmed: Boolean(d.confirmed),
      }));
    }
  }
  return programDatesFallback;
}

/* ---------- GLE streams, volunteer opportunities, program highlights ---------- */
const gleStreamsFallback: ImpactCard[] = [
  { title: "Volunteer", excerpt: "Give your time and skills to community-led projects, with full local support.", href: "/volunteer" },
  { title: "Internship", excerpt: "Supervised, credit-friendly field experience in your area of study or career.", href: "/internships" },
  { title: "Global Service Trip", excerpt: "Faculty-led group programs and service trips with risk management built in.", href: "/programs/finder" },
];

const volunteerOpportunitiesFallback: ImpactCard[] = [
  { title: "WASH", excerpt: "Community-led work in safe water, sanitation, and hygiene.", href: "/programs/cedp/water-sanitation-hygiene" },
  { title: "Green skills & renewable energy", excerpt: "Learning linked to renewable energy education and practical green skills.", href: "/programs/cedp/green-skills-renewable-energy" },
  { title: "Green livelihoods", excerpt: "Community enterprise, agriculture, and resilient livelihoods.", href: "/programs/cedp/green-livelihoods-economic-empowerment" },
  { title: "Inclusive leadership", excerpt: "Women, youth, and climate leadership grounded in community priorities.", href: "/programs/cedp/inclusive-leadership" },
  { title: "Ecosystem restoration", excerpt: "Restoration and carbon-offset work designed with communities.", href: "/programs/cedp/ecosystem-restoration-carbon-offsets" },
  { title: "Research & data", excerpt: "Baseline surveys, monitoring, and ethical research partnerships.", href: "/programs/finder" },
];

const programHighlightsFallback: ImpactCard[] = [
  { title: "Hands-on field learning", excerpt: "Work directly with FOSCOD and local partners on real, field-based projects.", media: false },
  { title: "Community development skills", excerpt: "Learn assessment, project design, implementation, and ethical leadership.", media: false },
  { title: "Cross-cultural immersion", excerpt: "A host-family experience that builds a global perspective and lasting bonds.", media: false },
];

export async function getGleStreams(): Promise<ImpactCard[]> {
  return getStoryCards("GLE Stream", gleStreamsFallback);
}

export async function getVolunteerOpportunities(): Promise<ImpactCard[]> {
  return getStoryCards("Volunteer Opportunity", volunteerOpportunitiesFallback);
}

export async function getProgramHighlights(): Promise<ImpactCard[]> {
  return getStoryCards("Program Highlight", programHighlightsFallback);
}

/* ============================================================
   Team, and the four Impact card sections (wireframe-driven).
   Each getter is Supabase-first with a built-in fallback so the
   pages render fully before the database is connected.
   ============================================================ */

export type TeamMember = {
  name: string;
  role: string;
  category: string; // board | staff | advisor | field | alumni
  bio?: string;
};

export type ImpactCard = {
  title: string;
  excerpt: string;
  href?: string;
  video?: boolean;
  media?: boolean;
};

const team: TeamMember[] = [
  { name: "Mr. Kayemba Patrick", role: "Chairman", category: "board" },
  { name: "Mrs. Amanyire Margaret Nassozi", role: "Executive Director", category: "staff" },
];

const impactStories: ImpactCard[] = [
  {
    title: "Clean energy that powers a livelihood",
    excerpt: "In Naluvule, a solar-powered salon turned an unreliable income into a growing business.",
    href: "/stories/solar-powered-salon-naluvule",
  },
  {
    title: "Water, dignity, and resilience",
    excerpt: "Protected springs and hygiene education across Busoga are reducing illness and restoring dignity.",
    href: "/projects/wash",
  },
  {
    title: "Regenerating land with biochar",
    excerpt: "In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, income for women and youth.",
    href: "/projects/biochar-uganda",
  },
];

const impactVideos: ImpactCard[] = [
  { title: "Meet our host families", excerpt: "A short film on the families who open their homes to every cohort.", video: true, href: "/stories/celebrating-our-host-families" },
  { title: "A project handover", excerpt: "What it looks like when a community takes full ownership of its work.", video: true, href: "/stories" },
  { title: "Cohort debrief 2025", excerpt: "This year's interns on what they built and learned across four districts.", video: true, href: "/stories/internship-debrief-2025" },
];

const communityExperiences: ImpactCard[] = [
  { title: "Opening our home", excerpt: "A host family on what welcoming international learners has meant for them.", href: "/stories/celebrating-our-host-families" },
  { title: "What the savings group changed", excerpt: "Members of a VSLA on building income and resilience together.", href: "/stories" },
  { title: "Co-designing a project", excerpt: "A local leader on setting the priorities — and seeing them delivered.", href: "/stories" },
];

export async function getTeam(category?: string): Promise<TeamMember[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    let query = supabase
      ?.from("team_members")
      .select("name,role,category,short_bio")
      .eq("visible", true)
      .order("order_column", { ascending: true });
    if (category && query) query = query.eq("category", category);
    const { data } = (await query) ?? { data: null };
    if (data && data.length) {
      return data.map((m) => ({
        name: m.name,
        role: m.role ?? "",
        category: m.category ?? "staff",
        bio: m.short_bio ?? undefined,
      }));
    }
  }
  return category ? team.filter((t) => t.category === category) : team;
}

async function getStoryCards(category: string, fallback: ImpactCard[]): Promise<ImpactCard[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("stories")
      .select("slug,title,excerpt,video_url")
      .eq("status", "published")
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(3)) ?? { data: null };
    if (data && data.length) {
      return data.map((s) => ({
        title: s.title,
        excerpt: s.excerpt ?? "",
        href: `/stories/${s.slug}`,
        video: Boolean(s.video_url),
      }));
    }
  }
  return fallback;
}

export async function getImpactStoryCards(): Promise<ImpactCard[]> {
  return getStoryCards("Impact Story", []);
}

export async function getImpactVideos(): Promise<ImpactCard[]> {
  return getStoryCards("Impact Video", []);
}

export async function getCommunityExperiences(): Promise<ImpactCard[]> {
  return getStoryCards("Community Experience", []);
}

/* ---------- hero sliders (top section of each landing page) ---------- */
const heroSlides: Record<string, HeroSlide[]> = {
  home: [
    {
      eyebrow: "Registered Ugandan NGO · Buikwe District",
      title: "Communities leading environmental innovation and clean energy adoption",
      intro: "FOSCOD empowers underserved communities through ethical, sustainable development and global knowledge exchange.",
      cta: { href: "/partners", label: "Partner" },
      cta2: { href: "/apply", label: "Apply" },
      cta3: { href: "/donate", label: "Support" },
      tone: "earth",
    },
  ],
  about: [
    {
      eyebrow: "Who we are",
      title: "A Ugandan NGO with local roots and global partnerships",
      intro: "We work with rural and underserved communities to design sustainable, ethical, and locally owned development — combining community-led practice with global knowledge exchange.",
      cta: { href: "/team", label: "Meet the team" },
      tone: "forest",
    },
    {
      eyebrow: "Our story",
      title: "Lasting change, led by the communities living it",
      intro: "From our base in Njeru Municipality, FOSCOD connects locally led development with ethical global learning and exchange.",
      cta: { href: "/programs", label: "Our programs" },
      tone: "earth",
    },
  ],
  programs: [
    {
      eyebrow: "Our programs",
      title: "Two pillars, one mission",
      intro: "FOSCOD advances community-led development and connects global learners to real field work — so local innovation and global knowledge strengthen each other.",
      cta: { href: "/programs/finder", label: "Find your program" },
      tone: "water",
    },
    {
      eyebrow: "Global Service Learning",
      title: "Structured, supervised field experience in Uganda",
      intro: "Internships, volunteering, group programs, and research across clean energy, WASH, livelihoods, health, and the environment.",
      cta: { href: "/programs/global-learning-exchange", label: "Learn more" },
      tone: "forest",
    },
  ],
  impact: [
    {
      eyebrow: "Field report · impact",
      title: "Impact we can stand behind",
      intro: "We publish verified numbers only. Where figures are still being confirmed in the field, we show them as drafts — we never display zeros.",
      cta: { href: "/stories", label: "Read field stories" },
      tone: "earth",
    },
  ],
  contact: [
    {
      eyebrow: "Contact",
      title: "Get in touch with FOSCOD",
      intro: "Questions about programs, partnerships, donations, or community projects? Tell us how the FOSCOD team can help.",
      cta: { href: "/apply", label: "Apply now" },
      cta2: { href: "/partners", label: "Partner with us" },
      tone: "forest",
    },
    {
      eyebrow: "Visit or contact us",
      title: "Let's build something lasting, together",
      intro: "Reach the team by email or phone, or visit Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District.",
      cta: { href: "/partners", label: "Explore partnership" },
      tone: "water",
    },
  ],
  stories: [
    {
      eyebrow: "Blog · stories from the field",
      title: "Approved stories and updates",
      intro: "FOSCOD publishes project updates, reports, and permissioned reflections after facts and consent are checked.",
      cta: { href: "/apply", label: "Apply to a program" },
      tone: "earth",
    },
  ],
  apply: [
    {
      eyebrow: "Get involved",
      title: "Apply to join FOSCOD",
      intro: "Start your internship, volunteer, or global service journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests.",
      cta: { href: "#application-forms", label: "Start your application" },
      cta2: { href: "/programs/program-fees", label: "View fees" },
      tone: "water",
    },
    {
      eyebrow: "Structured & supported",
      title: "Field experience that means something",
      intro: "Supervised placements, host families, and a clear application path — for students, professionals, and university groups.",
      cta: { href: "/programs/finder", label: "Find your program" },
      tone: "earth",
    },
  ],
  "global-learning-exchange": [
    {
      eyebrow: "Global Learning & Exchange",
      title: "Global Service Learning in Uganda",
      intro: "Internships, volunteering, and global service trips that pair real community projects with structured, supervised field learning.",
      cta: { href: "/apply", label: "Apply now" },
      cta2: { href: "/programs/finder", label: "Find your program" },
      tone: "water",
    },
    {
      eyebrow: "Learn by doing",
      title: "Contribute to genuine community priorities",
      intro: "Work alongside FOSCOD, host families, and local leaders on clean energy, WASH, livelihoods, health, and research.",
      cta: { href: "/programs/program-fees", label: "View fees" },
      tone: "forest",
    },
  ],
  volunteer: [
    {
      eyebrow: "Volunteer",
      title: "Volunteer in Uganda with FOSCOD",
      intro: "Work with communities — not just in communities — through structured volunteer programs that support local priorities and lasting impact.",
      cta: { href: "/apply", label: "Apply to volunteer" },
      cta2: { href: "/programs/program-fees", label: "View fees" },
      tone: "forest",
    },
    {
      eyebrow: "Individual or group",
      title: "Give your time where it lasts",
      intro: "Join as an individual or bring a group — every placement is supervised, supported, and tied to a real community priority.",
      cta: { href: "/volunteer/group", label: "Group volunteering" },
      cta2: { href: "/volunteer/individual", label: "Individual volunteering" },
      tone: "water",
    },
  ],
  "volunteer-group": [
    {
      eyebrow: "Group volunteer program",
      title: "Bring your team to the field",
      intro: "University cohorts, faculty-led groups, and professional teams working a shared community project — with logistics and risk management handled.",
      cta: { href: "/apply", label: "Apply today" },
      tone: "water",
    },
  ],
  "volunteer-individual": [
    {
      eyebrow: "Individual volunteer program",
      title: "A placement matched to you",
      intro: "One-to-one placements matched to your skills and the community's needs, with local supervision and 24/7 support.",
      cta: { href: "/apply", label: "Apply today" },
      tone: "forest",
    },
  ],
  internships: [
    {
      eyebrow: "Internships",
      title: "Sustainable development internships in Uganda",
      intro: "Build real-world skills through supervised community projects across public health, clean energy, livelihoods, research, communications, and enterprise.",
      cta: { href: "/apply", label: "Apply for an internship" },
      cta2: { href: "/programs/program-fees", label: "View fees" },
      tone: "water",
    },
    {
      eyebrow: "Hands-on & supervised",
      title: "Turn theory into real contribution",
      intro: "Individual placements, group engage internships, and university cohorts — all matched to your goals and supervised on the ground.",
      cta: { href: "/internships/opportunities", label: "Browse opportunities" },
      tone: "earth",
    },
  ],
  "internship-group": [
    {
      eyebrow: "Group internship program",
      title: "Bring your cohort to the field",
      intro: "University cohorts and professional groups working a shared community project — with academic alignment, supervision, and safety handled.",
      cta: { href: "/apply", label: "Apply today" },
      tone: "water",
    },
  ],
  "internship-individual": [
    {
      eyebrow: "Individual internship program",
      title: "A placement matched to your goals",
      intro: "One-to-one internships matched to your field, timeline, and career goals, with local supervision and a host-family experience.",
      cta: { href: "/apply", label: "Apply today" },
      tone: "forest",
    },
  ],
  "internships-opportunities": [
    {
      eyebrow: "Internship opportunities",
      title: "FOSCOD internship opportunities",
      intro: "Browse live internship projects across WASH, health, nutrition, energy, agroforestry, research, ICT, communications, and more — and find the one that fits you.",
      cta: { href: "/apply", label: "Apply now" },
      tone: "water",
    },
  ],
  "volunteer-opportunities": [
    {
      eyebrow: "Volunteer opportunities",
      title: "FOSCOD volunteer opportunities",
      intro: "Find a volunteer project where your time and skills make a real difference — across health, empowerment, education, and the environment.",
      cta: { href: "/apply", label: "Apply now" },
      tone: "forest",
    },
  ],
  donate: [
    {
      eyebrow: "Get involved",
      title: "Back community-led action in Buikwe District",
      intro: "Start a giving conversation around a named project or priority. FOSCOD will confirm the current need, use of funds, transfer method, and reporting arrangement before you contribute.",
      cta: { href: "#giving-inquiry", label: "Start a giving inquiry" },
      cta2: { href: "/impact", label: "Review verified impact" },
      cta3: { href: "/about", label: "Check our identity" },
      tone: "earth",
    },
  ],
  team: [
    {
      eyebrow: "Governance & people",
      title: "Meet the people behind FOSCOD",
      intro: "Board, staff, advisors, and the field coordinators who make community-led work possible. Add real bios and photos in the CMS.",
      tone: "water",
    },
  ],
  partners: [
    {
      eyebrow: "Partner with FOSCOD",
      title: "Build locally led development with a Ugandan organization rooted in Buikwe",
      intro: "Work with FOSCOD and community partners to co-design practical action in clean energy, WASH, green livelihoods, inclusive leadership, restoration, or global learning — with roles and evidence agreed from the start.",
      cta: { href: "/partners#partnership-inquiry", label: "Start a partnership inquiry" },
      cta2: { href: "/impact", label: "Review verified impact" },
      cta3: { href: "/about", label: "See our identity" },
      tone: "forest",
    },
  ],
  projects: [
    {
      eyebrow: "Project library",
      title: "Community-led projects across Uganda",
      intro: "Explore work spanning WASH, renewable energy, livelihoods, health, education, environment, research, and social inclusion. Filter and detail views are wired to the CMS.",
      tone: "earth",
    },
  ],
  alumni: [
    {
      eyebrow: "Alumni",
      title: "FOSCOD alumni network",
      intro: "Stay connected, mentor new participants, share your story, and keep contributing to community-led development.",
      tone: "water",
    },
  ],
  "health-wellbeing": [
    {
      eyebrow: "Focus area",
      title: "Health and wellbeing",
      intro: "Strengthening community health through nutrition, safe water, sanitation, youth wellbeing, and preventive education.",
      tone: "water",
    },
  ],
  "social-inclusion-empowerment": [
    {
      eyebrow: "Focus area",
      title: "Social inclusion and empowerment",
      intro: "Supporting youth, women, people with disabilities, and vulnerable households to participate fully in community development.",
      tone: "forest",
    },
  ],
  "community-empowerment-development": [
    {
      eyebrow: "Community Empowerment & Development Program",
      title: "Community-led development at the center",
      intro: "CEDP supports underserved communities in Kalagala Parish, Njeru Municipality, Buikwe District — a peri-urban area bordering Mabira Forest, in a 'development limbo' between rural and urban service delivery.",
      tone: "earth",
    },
  ],
  "program-fees": [
    {
      eyebrow: "Program fees",
      title: "Transparent pricing, clear inclusions",
      intro: "Transparent pricing for FOSCOD internship and volunteer programs, with clear inclusions and exclusions. Select a duration to see the fee structure.",
      tone: "forest",
    },
  ],
  "refund-policy": [
    {
      eyebrow: "Participant information",
      title: "Payment, refund & cancellation terms",
      intro: "FOSCOD provides the terms that apply to your specific placement in writing before you make a payment.",
      tone: "water",
    },
  ],
  finder: [
    {
      eyebrow: "Program finder",
      title: "Find the right FOSCOD program",
      intro: "Filter by program type and duration to compare opportunities, then apply to the one that fits your goals and timeline.",
      tone: "forest",
    },
  ],
};

export async function getHeroSlides(pageSlug: string): Promise<HeroSlide[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("hero_slides")
      .select("eyebrow,title,intro,cta_label,cta_href,cta2_label,cta2_href,cta3_label,cta3_href,tone,image_url")
      .eq("page_slug", pageSlug)
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((s) => ({
        eyebrow: s.eyebrow ?? undefined,
        title: s.title,
        intro: s.intro ?? undefined,
        cta: s.cta_href && s.cta_label ? { href: s.cta_href, label: s.cta_label } : undefined,
        cta2: s.cta2_href && s.cta2_label ? { href: s.cta2_href, label: s.cta2_label } : undefined,
        cta3: s.cta3_href && s.cta3_label ? { href: s.cta3_href, label: s.cta3_label } : undefined,
        tone: (s.tone as HeroSlide["tone"]) ?? "forest",
        imageUrl: s.image_url ?? undefined,
      }));
    }
  }
  return heroSlides[pageSlug] ?? [];
}

export async function getAlumniExperiences(): Promise<Testimonial[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("testimonials")
      .select("name,cohort,program,quote")
      .eq("status", "published")
      .order("order_column", { ascending: true })
      .limit(3)) ?? { data: null };
    if (data && data.length) {
      return data.map((t) => ({
        quote: t.quote,
        name: t.name,
        cohort: t.cohort ?? "",
        program: t.program ?? "",
      }));
    }
  }
  return testimonials;
}

/* ---------- impact_stats (verified metrics from CMS) ---------- */
const impactStatsFallback: ImpactStat[] = [
  { metric_name: "Community projects implemented", current_value: "35", as_of_date: "2024-12-31", source_note: "FOSCOD verified track record, 2022–2024", program: "ORG", status: "verified" },
  { metric_name: "Development practitioners trained", current_value: "42", as_of_date: "2024-12-31", source_note: "27 in-person interns, 11 virtual interns, and 4 volunteers", program: "GLE", status: "verified" },
  { metric_name: "Virtual interns engaged", current_value: "93", as_of_date: "2024-12-31", source_note: "FOSCOD verified track record, 2019–2024", program: "GLE", status: "verified" },
  { metric_name: "Completed projects sustaining benefits", current_value: "86%", as_of_date: "2024-12-31", source_note: "Share of completed projects continuing to benefit communities independently", program: "ORG", status: "verified" },
  { metric_name: "Grassroots organizations trained", current_value: "20", as_of_date: "2024-12-31", source_note: "Training in ethical community development practices, 2019–2024", program: "ORG", status: "verified" },
];

const stories: Story[] = [];

export async function getImpactStats(program?: string, subProgramId?: string): Promise<ImpactStat[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (!supabase) return impactStatsFallback.filter((item) => !program || item.program === program);
    let query = supabase
      .from("impact_stats")
      .select("metric_name,current_value,target_value,unit,as_of_date,source_note,program,sub_program_id,status")
      .eq("visible", true)
      .order("order_column", { ascending: true })
      .limit(10);
    if (program) query = query.eq("program", program);
    if (subProgramId) query = query.eq("sub_program_id", subProgramId);
    const { data } = (await query) ?? { data: null };
    if (data && data.length) {
      return data.map((m) => ({
        metric_name: m.metric_name,
        current_value: m.current_value ?? "—",
        target_value: m.target_value ?? undefined,
        unit: m.unit ?? undefined,
        as_of_date: m.as_of_date ?? undefined,
        source_note: m.source_note ?? undefined,
        program: m.program ?? undefined,
        sub_program_id: m.sub_program_id ?? undefined,
        status: (m.status as ImpactStat["status"]) ?? "draft",
      }));
    }
  }
  return impactStatsFallback.filter((item) => !program || item.program === program);
}

export async function getDownloads(): Promise<DownloadResource[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = (await supabase
    ?.from("downloads")
    .select("title,description,file_url,file_type,category")
    .eq("visible", true)
    .order("order_column", { ascending: true })) ?? { data: null };
  return (data ?? []).map((item) => ({
    title: item.title,
    description: item.description ?? undefined,
    file_url: item.file_url,
    file_type: item.file_type,
    category: item.category,
  }));
}

/* ---------- impact_stories (community voice stories) ---------- */
const impactStoriesFallback: ImpactStory[] = [];

export async function getImpactStories(limit = 3): Promise<ImpactStory[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("impact_stories")
      .select("slug,title,community_voice,quote,hero_image_url,gallery,narrative,linked_program,linked_sub_program_id,linked_project_id,verified_outcome,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit)) ?? { data: null };
    if (data && data.length) {
      return data.map((s) => ({
        slug: s.slug,
        title: s.title,
        community_voice: s.community_voice ?? undefined,
        quote: s.quote ?? undefined,
        hero_image_url: s.hero_image_url ?? undefined,
        gallery: s.gallery ?? undefined,
        narrative: s.narrative ?? undefined,
        linked_program: s.linked_program ?? undefined,
        linked_sub_program_id: s.linked_sub_program_id ?? undefined,
        linked_project_id: s.linked_project_id ?? undefined,
        verified_outcome: s.verified_outcome ?? undefined,
        published_at: s.published_at ?? undefined,
      }));
    }
  }
  return impactStoriesFallback.slice(0, limit);
}

/* ---------- partners (from CMS) ---------- */
const partnersFallback: Partner[] = [
  { name: "Northwestern University via KAYA Responsible Travel", type: "Academic" },
  { name: "Fort Lewis College", type: "Academic" },
  { name: "AIESEC", type: "Partner" },
  { name: "Together for a New Africa Organizations", type: "Partner" },
  { name: "Women Raising for Africa", type: "Partner" },
  { name: "Buikwe Local Government", type: "Government" },
];

export async function getPartners(): Promise<Partner[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("partners")
      .select("name,type,logo_url,website")
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((p) => ({
        name: p.name,
        type: p.type ?? "Partner",
        logo_url: p.logo_url ?? undefined,
        website: p.website ?? undefined,
      }));
    }
  }
  return partnersFallback;
}

/* ---------- about page content (mission, vision, values, leadership) ---------- */

const aboutContentFallback: AboutContent = {
  mission: {
    title: "Mission",
    image_url: undefined,
    image_alt: undefined,
    description:
      "To empower underserved communities to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange.",
  },
  vision: {
    title: "Vision",
    image_url: undefined,
    image_alt: undefined,
    description:
      "A world where local communities champion environmental stewardship and clean energy adoption, strengthened by global partnerships.",
  },
  values: [
    {
      title: "Integrated & Holistic Development",
      body: "Health, livelihoods, environment, and learning advance together — not in silos.",
      benchmark: "Programs connect education, health, economic empowerment, and environmental sustainability.",
    },
    {
      title: "Equity & Inclusion",
      body: "Equal access for youth, women, people with disabilities, and marginalized households.",
      benchmark: "50% women's participation target across all initiatives.",
    },
    {
      title: "Community Ownership & Leadership",
      body: "Locally led, culturally relevant; communities set the priorities.",
      benchmark: "Communities define priorities and lead culturally appropriate, environmentally sound solutions.",
    },
    {
      title: "Sustainability & Innovation",
      body: "Long-term impact, with renewable energy and stewardship at the centre.",
      benchmark: "Programs invest in long-term, adaptive solutions rooted in local realities.",
    },
    {
      title: "Collaboration & Shared Learning",
      body: "Cross-sector knowledge shared between communities, universities, and partners.",
      benchmark: "Knowledge and solutions are co-created with communities, government, academia, and partners.",
    },
    {
      title: "Transparency & Accountability",
      body: "Honest reporting and ethical management of every resource.",
      benchmark: "Resources, performance, and impact are managed and communicated responsibly.",
    },
    {
      title: "Empowerment Through Learning",
      body: "Knowledge as the catalyst for lasting change.",
      benchmark: "2,500+ people trained in renewable energy technologies by 2030.",
    },
  ],
  leadership: {
    board: {
      description:
        "A six-member Board of Directors provides strategic oversight, approves organizational strategy, and ensures accountability to the communities we serve.",
      href: "/team#board",
      cta: "View the board",
    },
    team: {
      description:
        "Our core staff team in Jinja designs, implements, and monitors programs across clean energy, WASH, livelihoods, health, and the environment.",
      href: "/team#staff",
      cta: "Meet the team",
    },
  },
};

export async function getAboutContent(): Promise<AboutContent> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("about_content")
      .select("key,config")
      .eq("visible", true)) ?? { data: null };
    if (data && data.length) {
      const byKey = Object.fromEntries(data.map((row: { key: string; config: Record<string, unknown> }) => [row.key, row.config]));
      const result: AboutContent = {
        mission: byKey.mission
          ? {
              title: (byKey.mission as { title?: string }).title ?? "Mission",
              image_url: (byKey.mission as { image_url?: string }).image_url,
              image_alt: (byKey.mission as { image_alt?: string }).image_alt,
              description: (byKey.mission as { description?: string }).description ?? aboutContentFallback.mission.description,
            }
          : aboutContentFallback.mission,
        vision: byKey.vision
          ? {
              title: (byKey.vision as { title?: string }).title ?? "Vision",
              image_url: (byKey.vision as { image_url?: string }).image_url,
              image_alt: (byKey.vision as { image_alt?: string }).image_alt,
              description: (byKey.vision as { description?: string }).description ?? aboutContentFallback.vision.description,
            }
          : aboutContentFallback.vision,
        values: byKey.values
          ? (byKey.values as unknown as AboutContent["values"]).map((v) => ({
              title: v.title,
              image_url: v.image_url,
              image_alt: v.image_alt,
              body: v.body,
              benchmark: v.benchmark,
            }))
          : aboutContentFallback.values,
        leadership: byKey.leadership
          ? {
              board: {
                description: (byKey.leadership as { board?: { description?: string; href?: string; cta?: string } }).board?.description ?? aboutContentFallback.leadership.board.description,
                href: (byKey.leadership as { board?: { description?: string; href?: string; cta?: string } }).board?.href ?? aboutContentFallback.leadership.board.href,
                cta: (byKey.leadership as { board?: { description?: string; href?: string; cta?: string } }).board?.cta ?? aboutContentFallback.leadership.board.cta,
              },
              team: {
                description: (byKey.leadership as { team?: { description?: string; href?: string; cta?: string } }).team?.description ?? aboutContentFallback.leadership.team.description,
                href: (byKey.leadership as { team?: { description?: string; href?: string; cta?: string } }).team?.href ?? aboutContentFallback.leadership.team.href,
                cta: (byKey.leadership as { team?: { description?: string; href?: string; cta?: string } }).team?.cta ?? aboutContentFallback.leadership.team.cta,
              },
            }
          : aboutContentFallback.leadership,
      };
      return result;
    }
  }
  return aboutContentFallback;
}

/* ---------- sub_programs (CEDP) ---------- */
const subProgramsFallback: SubProgram[] = [
  { slug: "green-skills-renewable-energy", name: "Green Skills & Renewable Energy Education", strategic_goal: 1 },
  { slug: "clean-cooking-health", name: "Clean Cooking & Health", strategic_goal: 2 },
  { slug: "water-sanitation-hygiene", name: "Water, Sanitation & Hygiene (WASH)", strategic_goal: 3 },
  { slug: "green-livelihoods-economic-empowerment", name: "Green Livelihoods & Economic Empowerment", strategic_goal: 4 },
  { slug: "inclusive-leadership", name: "Inclusive Leadership — Women, Youth & Climate Leadership", strategic_goal: 5 },
  { slug: "ecosystem-restoration-carbon-offsets", name: "Ecosystem Restoration & Carbon Offsets", strategic_goal: 6 },
];

export async function getSubPrograms(): Promise<SubProgram[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("sub_programs")
      .select("id,slug,name,strategic_goal,hero_image_url,description,icon,key_stats")
      .eq("status", "published")
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        strategic_goal: s.strategic_goal,
        hero_image_url: s.hero_image_url ?? undefined,
        description: s.description ?? undefined,
        icon: s.icon ?? undefined,
        key_stats: s.key_stats ?? undefined,
      }));
    }
  }
  return subProgramsFallback;
}

/* ---------- featured impact story (single for home page) ---------- */
export async function getFeaturedImpactStory(): Promise<ImpactStory | null> {
  const stories = await getImpactStories(1);
  return stories[0] ?? null;
}

/* ---------- activities (by sub_program or GLE stream) ---------- */
const activitiesFallback: Activity[] = [
  // Green Skills & Renewable Energy Education
  { slug: "community-needs-assessment", title: "Community needs assessment", summary: "Participatory mapping of energy and skills gaps across Kalagala Parish.", status: "completed", start_date: "2024-01-15", end_date: "2024-03-30" },
  { slug: "training-centers-establishment", title: "Establishment of 5 community training centers", summary: "Building and equipping centers for solar PV, thermal, wind, and biogas training.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "technical-training-delivery", title: "Technical training delivery (solar PV, solar thermal, wind, biogas)", summary: "Certified courses delivered with partner institutions for youth and women.", status: "ongoing", start_date: "2024-06-01" },
  { slug: "business-financial-literacy", title: "Business & financial literacy training", summary: "Entrepreneurship modules for green enterprise incubation cohorts.", status: "ongoing", start_date: "2024-07-01" },
  { slug: "green-enterprise-incubation", title: "Green enterprise incubation", summary: "Mentorship, seed funding, and market linkages for graduate-led energy enterprises.", status: "planned", start_date: "2025-01-15" },
  { slug: "institution-partnerships-certification", title: "Technical institution partnerships & certification pathways", summary: "MOUs with TVETs and universities for accredited green skills credentials.", status: "ongoing", start_date: "2024-03-01" },

  // Clean Cooking & Health
  { slug: "cooking-baseline-assessment", title: "Household cooking-practice baseline assessment", summary: "Survey of fuel use, stove types, and indoor air quality in target households.", status: "completed", start_date: "2023-10-01", end_date: "2023-12-31" },
  { slug: "improved-cookstove-distribution", title: "Improved cookstove distribution", summary: "Locally produced efficient stoves distributed with user training and follow-up.", status: "ongoing", start_date: "2024-02-01" },
  { slug: "stove-use-maintenance-training", title: "Stove use & maintenance training", summary: "Hands-on sessions for households on operation, cleaning, and minor repairs.", status: "ongoing", start_date: "2024-02-15" },
  { slug: "sbcc-campaigns", title: "Social & Behavior Change Communication (SBCC) campaigns", summary: "Community theatre, radio spots, and peer educators promoting clean cooking adoption.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "cookstove-user-groups", title: "Cookstove user groups", summary: "Peer support networks for sustained adoption and troubleshooting.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "indoor-air-pollution-monitoring", title: "Indoor air pollution monitoring & ventilation training", summary: "Low-cost sensors deployed; households trained on ventilation improvements.", status: "planned", start_date: "2025-06-01" },
  { slug: "women-youth-stove-enterprises", title: "Women/youth-led stove production enterprises", summary: "Incubation of local manufacturing units creating jobs and supply chains.", status: "planned", start_date: "2025-07-01" },
  { slug: "carbon-credit-registration-cookstoves", title: "Carbon credit registration & community reinvestment", summary: "Gold Standard registration for cookstove emissions reductions; revenue to community fund.", status: "planned", start_date: "2025-09-01" },

  // WASH
  { slug: "solar-borehole-rehab", title: "Solar-powered borehole rehabilitation/drilling", summary: "New and rehabilitated boreholes with solar pumping for reliable supply.", status: "ongoing", start_date: "2024-01-15" },
  { slug: "spring-protection-naluvule", title: "Natural spring protection (Naluvule)", summary: "Community water spring protection in Naluvule.", status: "completed", start_date: "2023-08-01", end_date: "2023-11-30" },
  { slug: "rainwater-harvesting", title: "Rainwater harvesting systems", summary: "Rooftop catchment and storage for schools, health centers, and households.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "community-water-centers", title: "Community water centers", summary: "Kiosk-style distribution points managed by water user committees.", status: "planned", start_date: "2025-02-01" },
  { slug: "water-om-training", title: "Water system operation & maintenance training", summary: "Technical training for committee members on pump repair, chlorination, and finances.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "clts-triggering", title: "Community-Led Total Sanitation (CLTS) triggering", summary: "Participatory sanitation demand creation across all 5 Kalagala communities.", status: "ongoing", start_date: "2024-02-01" },
  { slug: "household-latrine-support", title: "Household latrine construction support", summary: "Subsidies and technical guidance for improved latrines meeting standards.", status: "ongoing", start_date: "2024-05-01" },
  { slug: "institutional-sanitation", title: "Institutional sanitation facilities", summary: "Gender-separated, disability-inclusive latrines for schools and health posts.", status: "planned", start_date: "2025-03-01" },
  { slug: "handwashing-stations", title: "Public handwashing stations", summary: "Foot-operated stations at markets, schools, and transport hubs.", status: "ongoing", start_date: "2024-06-01" },
  { slug: "hygiene-promotion", title: "Hygiene promotion campaigns", summary: "School health clubs, community dramas, and menstrual hygiene management sessions.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "wash-committee-governance", title: "WASH committee formation & governance training", summary: "Legal registration, financial management, and transparency training for committees.", status: "ongoing", start_date: "2024-01-15" },
  { slug: "water-quality-monitoring", title: "Water quality & health monitoring", summary: "Quarterly testing for E. coli, turbidity, and residual chlorine; clinic data linkage.", status: "ongoing", start_date: "2024-07-01" },

  // Green Livelihoods & Economic Empowerment
  { slug: "green-market-assessment", title: "Green market assessment", summary: "Value chain analysis for agroforestry, honey, crafts, and renewable energy products.", status: "completed", start_date: "2023-11-01", end_date: "2024-02-28" },
  { slug: "business-entrepreneurship-training", title: "Business/entrepreneurship training", summary: "Lean startup curriculum adapted for rural green enterprises.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "microenterprise-registration", title: "Micro-enterprise registration support", summary: "Legal formalization, tax registration, and bank account opening assistance.", status: "ongoing", start_date: "2024-05-01" },
  { slug: "seed-grants-startup-kits", title: "Seed grants & startup kits", summary: "Competitive grants and equipment packages for graduating trainees.", status: "ongoing", start_date: "2024-06-01" },
  { slug: "mentorship-linkages", title: "Mentorship linkages", summary: "Pairing entrepreneurs with experienced business advisors and alumni.", status: "ongoing", start_date: "2024-07-01" },
  { slug: "cooperative-formation", title: "Cooperative formation & governance training", summary: "Registration, bylaws, and member education for producer and savings cooperatives.", status: "planned", start_date: "2025-01-15" },
  { slug: "shared-processing-infrastructure", title: "Shared processing infrastructure", summary: "Community-owned drying, milling, and packaging facilities for value addition.", status: "planned", start_date: "2025-04-01" },
  { slug: "climate-smart-ag-demo", title: "Climate-smart agriculture demo plots & farmer field schools", summary: "Demonstration of drought-tolerant crops, conservation agriculture, and agroforestry.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "resilient-seed-distribution", title: "Resilient seed/input distribution", summary: "Improved varieties and organic inputs through voucher systems.", status: "ongoing", start_date: "2024-05-01" },
  { slug: "irrigation-water-harvesting-ag", title: "Irrigation & water-harvesting for agriculture", summary: "Drip kits, sand dams, and retention ponds for dry-season production.", status: "planned", start_date: "2025-03-01" },
  { slug: "agroforestry-planting", title: "Agroforestry planting", summary: "Multi-strata systems integrating trees, crops, and livestock on farmland.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "revolving-green-finance", title: "Revolving green-finance loan funds", summary: "Community-managed loan pools for green enterprise working capital.", status: "planned", start_date: "2025-06-01" },
  { slug: "trade-fairs-linkages", title: "Trade fairs & producer-buyer linkages", summary: "Annual green product expos connecting producers to urban and export markets.", status: "planned", start_date: "2025-08-01" },
  { slug: "green-product-branding", title: "Local green product branding", summary: "Collective branding, certification, and marketing for Kalagala-origin products.", status: "planned", start_date: "2025-09-01" },

  // Inclusive Leadership
  { slug: "gender-analysis-quotas", title: "Gender analysis & participation quotas", summary: "Baseline gender audits; 50% women quota enforced in all project committees.", status: "ongoing", start_date: "2024-01-15" },
  { slug: "women-energy-enterprises", title: "Women-led renewable energy enterprise support", summary: "Targeted incubation, finance, and market access for women energy entrepreneurs.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "women-leadership-training", title: "Women's entrepreneurship & leadership training", summary: "Confidence building, negotiation, and governance skills for women leaders.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "women-networking-forums", title: "Women's networking forums", summary: "Quarterly peer learning exchanges across sub-counties and districts.", status: "ongoing", start_date: "2024-05-01" },
  { slug: "childcare-flexible-scheduling", title: "Childcare/flexible scheduling for inclusive participation", summary: "Mobile creches and session timing to enable women's full engagement.", status: "planned", start_date: "2025-02-01" },
  { slug: "youth-climate-ambassadors", title: "Youth Climate Ambassadors Program", summary: "Annual cohort of 20 youth trained in advocacy, project design, and monitoring.", status: "ongoing", start_date: "2024-02-01" },
  { slug: "youth-leadership-bootcamps", title: "Youth leadership bootcamps & advocacy workshops", summary: "Residential intensives on climate policy, media, and community organizing.", status: "ongoing", start_date: "2024-06-01" },
  { slug: "youth-innovation-labs", title: "Youth innovation labs & hackathons", summary: "Design sprints for local climate solutions with seed funding for winners.", status: "planned", start_date: "2025-03-01" },
  { slug: "climate-education-schools", title: "Climate/energy education integration in schools & TVET", summary: "Curriculum co-development with MoES and district education officers.", status: "planned", start_date: "2025-07-01" },
  { slug: "youth-mentorship-pairings", title: "Youth mentorship pairings", summary: "Alumni and professional mentors matched to youth ambassadors.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "youth-microgrants", title: "Microgrants for youth-led climate projects", summary: "Competitive small grants for youth-designed community climate actions.", status: "planned", start_date: "2025-05-01" },

  // Ecosystem Restoration & Carbon Offsets
  { slug: "ecological-assessment", title: "Ecological assessment of priority ecosystems", summary: "Biodiversity baseline and degradation mapping for Mabira buffer and wetlands.", status: "completed", start_date: "2023-09-01", end_date: "2024-01-31" },
  { slug: "ccg-mobilization", title: "Community Conservation Group (CCG) mobilization & training", summary: "Formation and capacity building of 5 CCGs (one per community).", status: "ongoing", start_date: "2024-02-01" },
  { slug: "degraded-land-rehab", title: "Degraded-land rehabilitation & native planting", summary: "Enrichment planting of indigenous species on 50+ hectares.", status: "ongoing", start_date: "2024-04-01" },
  { slug: "conservation-education", title: "Conservation education in schools & communities", summary: "Eco-clubs, forest walks, and citizen science for biodiversity monitoring.", status: "ongoing", start_date: "2024-03-01" },
  { slug: "conservation-bylaws", title: "Community conservation by-laws", summary: "Locally enacted rules for forest use, wetland protection, and fire management.", status: "planned", start_date: "2025-01-15" },
  { slug: "biodiversity-monitoring", title: "Participatory biodiversity monitoring", summary: "Community rangers using SMART tools; data fed to district and national systems.", status: "ongoing", start_date: "2024-06-01" },
  { slug: "community-forest-carbon", title: "Community forest & agroforestry carbon projects", summary: "Designing Gold Standard/Verra projects for reforestation and agroforestry.", status: "planned", start_date: "2025-04-01" },
  { slug: "mrv-training", title: "MRV (carbon accounting) training", summary: "Training CCGs and staff in measurement, reporting, and verification protocols.", status: "planned", start_date: "2025-05-01" },
  { slug: "carbon-certification", title: "Carbon project certification (Gold Standard/Verra)", summary: "Third-party validation and verification for carbon credit issuance.", status: "planned", start_date: "2026-01-15" },
  { slug: "benefit-sharing", title: "Transparent benefit-sharing mechanisms", summary: "Community carbon committees governing revenue distribution and reinvestment.", status: "planned", start_date: "2025-09-01" },
  { slug: "community-carbon-committees", title: "Community carbon committees", summary: "Elected bodies managing carbon project governance and benefit sharing.", status: "planned", start_date: "2025-07-01" },
];

const activitySlugsBySubProgram: Record<string, string[]> = {
  "green-skills-renewable-energy": [
    "community-needs-assessment", "training-centers-establishment", "technical-training-delivery",
    "business-financial-literacy", "green-enterprise-incubation", "institution-partnerships-certification",
  ],
  "clean-cooking-health": [
    "cooking-baseline-assessment", "improved-cookstove-distribution", "stove-use-maintenance-training",
    "sbcc-campaigns", "cookstove-user-groups", "indoor-air-pollution-monitoring",
    "women-youth-stove-enterprises", "carbon-credit-registration-cookstoves",
  ],
  "water-sanitation-hygiene": [
    "solar-borehole-rehab", "spring-protection-naluvule", "rainwater-harvesting", "community-water-centers",
    "water-om-training", "clts-triggering", "household-latrine-support", "institutional-sanitation",
    "handwashing-stations", "hygiene-promotion", "wash-committee-governance", "water-quality-monitoring",
  ],
  "green-livelihoods-economic-empowerment": [
    "green-market-assessment", "business-entrepreneurship-training", "microenterprise-registration",
    "seed-grants-startup-kits", "mentorship-linkages", "cooperative-formation",
    "shared-processing-infrastructure", "climate-smart-ag-demo", "resilient-seed-distribution",
    "irrigation-water-harvesting-ag", "agroforestry-planting", "revolving-green-finance",
    "trade-fairs-linkages", "green-product-branding",
  ],
  "inclusive-leadership": [
    "gender-analysis-quotas", "women-energy-enterprises", "women-leadership-training",
    "women-networking-forums", "childcare-flexible-scheduling", "youth-climate-ambassadors",
    "youth-leadership-bootcamps", "youth-innovation-labs", "climate-education-schools",
    "youth-mentorship-pairings", "youth-microgrants",
  ],
  "ecosystem-restoration-carbon-offsets": [
    "ecological-assessment", "ccg-mobilization", "degraded-land-rehab", "conservation-education",
    "conservation-bylaws", "biodiversity-monitoring", "community-forest-carbon", "mrv-training",
    "carbon-certification", "benefit-sharing", "community-carbon-committees",
  ],
};

export async function getActivitiesBySubProgram(subProgramSlug: string): Promise<Activity[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    // First get the sub_program ID
    if (!supabase) return [];
    const { data: sp } = await supabase
      .from("sub_programs")
      .select("id")
      .eq("slug", subProgramSlug)
      .maybeSingle();
    if (sp?.id) {
      const { data } = (await supabase
        ?.from("activities")
        .select("slug,title,summary,description,hero_image_url,gallery,status,start_date,end_date")
        .eq("sub_program_id", sp.id)
        .order("order_column", { ascending: true })) ?? { data: null };
      if (data && data.length) {
        return data.map((a) => ({
          slug: a.slug,
          title: a.title,
          summary: a.summary ?? undefined,
          description: a.description ?? undefined,
          hero_image_url: a.hero_image_url ?? undefined,
          gallery: a.gallery ?? undefined,
          status: (a.status as Activity["status"]) ?? "planned",
          start_date: a.start_date ?? undefined,
          end_date: a.end_date ?? undefined,
        }));
      }
    }
  }
  const allowed = new Set(activitySlugsBySubProgram[subProgramSlug] ?? []);
  return activitiesFallback
    .filter((activity) => allowed.has(activity.slug))
    .map((activity) => ({
      ...activity,
      status: "planned" as const,
      start_date: undefined,
      end_date: undefined,
    }));
}

/* ---------- homepage: talking-about-us (CMS-backed) ---------- */
export type TalkingAboutUsData = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
};

const talkingAboutUsFallback: TalkingAboutUsData = {
  eyebrow: "Who we are",
  title: "FOSCOD in context",
  intro: "FOSCOD is a registered Ugandan NGO working alongside communities in Buikwe District and beyond. We bridge locally led development with ethical global learning and exchange — on clean energy, water, livelihoods, health, and the environment.",
  ctaLabel: "Read our story",
  ctaHref: "/about",
};

export async function getTalkingAboutUs(): Promise<TalkingAboutUsData> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (!supabase) return talkingAboutUsFallback;
    const { data } = (await supabase
      ?.from("home_talking_about_us")
      .select("eyebrow,title,intro,cta_label,cta_href")
      .eq("visible", true)
      .maybeSingle()) ?? { data: null };
    if (data) {
      return {
        eyebrow: data.eyebrow ?? "Who we are",
        title: data.title ?? talkingAboutUsFallback.title,
        intro: data.intro ?? talkingAboutUsFallback.intro,
        ctaLabel: data.cta_label ?? "Read our story",
        ctaHref: data.cta_href ?? "/about",
      };
    }
  }
  return talkingAboutUsFallback;
}

/* ---------- homepage: how-you-can-get-involved cards (CMS-backed) ---------- */
export type InvolvementCard = {
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const involvementCardsFallback: InvolvementCard[] = [
  {
    title: "Volunteer intern",
    body: "Join a supervised placement matched to your skills and a community-defined priority — with local support, host families, and structured learning outcomes.",
    href: "/apply",
    ctaLabel: "Explore internships",
    icon: "🌱",
  },
  {
    title: "Partner with us",
    body: "Co-design research, funding, or delivery partnerships around real community priorities — with roles, safeguards, and evidence agreed from the start.",
    href: "/partners",
    ctaLabel: "Partner with FOSCOD",
    icon: "🤝",
  },
  {
    title: "Donate to our project",
    body: "Support a named project or priority with verified need, approved transfer routes, and transparent reporting — starting with a giving inquiry.",
    href: "/donate",
    ctaLabel: "Start a giving inquiry",
    icon: "💚",
  },
];

export async function getInvolvementCards(): Promise<InvolvementCard[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (!supabase) return involvementCardsFallback;
    const { data } = (await supabase
      ?.from("home_involvement_cards")
      .select("title,body,href,cta_label,icon,image_url,image_alt")
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((c) => ({
        title: c.title,
        body: c.body,
        href: c.href,
        ctaLabel: c.cta_label ?? "Learn more",
        icon: c.icon ?? undefined,
        imageUrl: c.image_url ?? undefined,
        imageAlt: c.image_alt ?? undefined,
      }));
    }
  }
  return involvementCardsFallback;
}

/* ---------- homepage: audience-paths cards (CMS-backed) ---------- */
export type AudiencePathData = {
  title: string;
  body: string;
  href: string;
  cta: string;
  kicker?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const audiencePathsFallback: AudiencePathData[] = [
  {
    title: "Students & early-career professionals",
    body: "Build practical experience through a supervised internship or volunteer placement connected to a community-defined priority.",
    href: "/internships",
    cta: "Explore internships",
    imageUrl: "/images/audience/students.jpg",
    imageAlt: "Interns in the field",
  },
  {
    title: "Universities & research teams",
    body: "Co-design field learning, faculty-led programs, or community-based research around academic outcomes and local value.",
    href: "/partners",
    cta: "Discuss an academic partnership",
    imageUrl: "/images/audience/universities.jpg",
    imageAlt: "University partnership in action",
  },
  {
    title: "Funders & technical partners",
    body: "Support a defined program or project with agreed outcomes, evidence requirements, roles, and reporting milestones.",
    href: "/partners",
    cta: "Explore partnership options",
    imageUrl: "/images/audience/funders.jpg",
    imageAlt: "Partnership planning session",
  },
  {
    title: "Community & public-sector partners",
    body: "Bring local priorities, implementation knowledge, coordination, and accountability into a shared program design.",
    href: "/contact",
    cta: "Start a local conversation",
    imageUrl: "/images/audience/community.jpg",
    imageAlt: "Community co-design meeting",
  },
];

export async function getAudiencePaths(): Promise<AudiencePathData[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (!supabase) return audiencePathsFallback;
    const { data } = (await supabase
      ?.from("home_audience_paths")
      .select("title,body,href,cta,kicker,image_url,image_alt")
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((c) => ({
        title: c.title,
        body: c.body,
        href: c.href,
        cta: c.cta ?? "Learn more",
        kicker: c.kicker ?? undefined,
        imageUrl: c.image_url ?? undefined,
        imageAlt: c.image_alt ?? undefined,
      }));
    }
  }
  return audiencePathsFallback;
}

/* ---------- homepage: responsible-engagement steps (CMS-backed) ---------- */
export type ResponsibleEngagementData = {
  title: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
};

const responsibleEngagementFallback: ResponsibleEngagementData[] = [
  {
    title: "Community direction",
    body: "Priorities are identified with communities and local partners before participant or funder activity is designed.",
    imageUrl: "/images/responsible/community-direction.jpg",
    imageAlt: "Community priority-setting workshop",
  },
  {
    title: "Right role, right support",
    body: "People are matched to work that fits their skills, preparation, safeguarding requirements, and the supervision available.",
    imageUrl: "/images/responsible/roles.jpg",
    imageAlt: "Matching volunteers with local roles",
  },
  {
    title: "Useful work and shared learning",
    body: "Each engagement should produce value for the community as well as learning for the participant or institution.",
    imageUrl: "/images/responsible/shared-learning.jpg",
    imageAlt: "Community and participant sharing insights",
  },
  {
    title: "Evidence with consent",
    body: "FOSCOD separates verified results from future targets and publishes personal stories only when consent is recorded.",
    imageUrl: "/images/responsible/evidence.jpg",
    imageAlt: "Reviewing impact data with consent forms",
  },
];

export async function getResponsibleEngagement(): Promise<ResponsibleEngagementData[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (!supabase) return responsibleEngagementFallback;
    const { data } = (await supabase
      ?.from("home_responsible_engagement")
      .select("title,body,image_url,image_alt")
      .eq("visible", true)
      .order("order_column", { ascending: true })) ?? { data: null };
    if (data && data.length) {
      return data.map((c) => ({
        title: c.title,
        body: c.body ?? "",
        imageUrl: c.image_url ?? undefined,
        imageAlt: c.image_alt ?? undefined,
      }));
    }
  }
  return responsibleEngagementFallback;
}