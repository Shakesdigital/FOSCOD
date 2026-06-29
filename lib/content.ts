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

export type Partner = { name: string; type: string };

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
    slug: "biochar-uganda",
    title: "Biochar Uganda",
    theme: "Climate & Soil",
    location: "Kalagala Parish, Buikwe",
    summary:
      "Turning invasive water hyacinth into biochar for healthier soil, clean cooking, and verifiable carbon removal.",
    href: "/projects/biochar-uganda",
  },
  {
    slug: "wash",
    title: "WASH & Public Health",
    theme: "Water & Health",
    location: "Busoga region",
    summary:
      "Protected springs, rainwater harvesting, and hygiene education that restore dignity and resilience.",
    href: "/projects/wash",
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy",
    theme: "Clean Energy",
    location: "Greater Mukono",
    summary:
      "Solar enterprises, home systems, and efficient cookstoves that power livelihoods and protect forests.",
    href: "/projects/renewable-energy",
  },
  {
    slug: "sustainable-livelihood-green-enterprises",
    title: "Sustainable Livelihoods",
    theme: "Green Enterprise",
    location: "Buikwe & Mukono",
    summary:
      "Agroforestry, VSLA savings groups, and climate-smart enterprise that grow income while restoring land.",
    href: "/projects/sustainable-livelihood-green-enterprises",
  },
];

// Per the content pack: never show zeros — use draft placeholders until verified.
const impactMetrics: ImpactMetric[] = [
  { label: "Communities served", value: "—", note: "Impact data being updated", status: "draft" },
  { label: "Projects implemented", value: "—", note: "Impact data being updated", status: "draft" },
  { label: "Alumni worldwide", value: "—", note: "Impact data being updated", status: "draft" },
  { label: "Active partners", value: "—", note: "Impact data being updated", status: "draft" },
];

// Illustrative until real, permissioned alumni reviews are loaded via the CMS.
// Attributions are role-based, not invented names — honest placeholders.
const testimonials: Testimonial[] = [
  {
    quote:
      "I learned more about ethical development in eight weeks with FOSCOD than in a year of coursework. The community led, and we followed.",
    name: "WASH intern",
    cohort: "Cohort 2025",
    program: "WASH Internship",
  },
  {
    quote:
      "The placement was structured, safe, and genuinely useful to the community. I left with skills and friendships I still carry.",
    name: "Renewable energy volunteer",
    cohort: "Cohort 2024",
    program: "Renewable Energy Volunteer",
  },
  {
    quote:
      "Our university group worked on a real menstrual-health project with full local supervision — exactly the academic value we needed.",
    name: "University group lead",
    cohort: "Group Program 2025",
    program: "University Cohort",
  },
];

const partners: Partner[] = [
  { name: "University Partner", type: "Academic" },
  { name: "Community CBO", type: "Community" },
  { name: "Local NGO", type: "NGO" },
  { name: "Climate Funder", type: "Funder" },
  { name: "Research Institute", type: "Research" },
  { name: "District Government", type: "Government" },
];

const stories: Story[] = [
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

export async function getPartners(): Promise<Partner[]> {
  return partners;
}

export async function getLatestStories(): Promise<Story[]> {
  return stories;
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
};

const team: TeamMember[] = [
  { name: "FOSCOD field team", role: "Programs & operations", category: "staff", bio: "Ugandan practitioners based in Jinja who run our programs day to day." },
  { name: "Board of Directors", role: "Governance & strategy", category: "board", bio: "Experienced leaders guiding our ethics, governance, and direction." },
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

export async function getImpactStories(): Promise<ImpactCard[]> {
  return getStoryCards("Impact Story", impactStories);
}

export async function getImpactVideos(): Promise<ImpactCard[]> {
  return getStoryCards("Impact Video", impactVideos);
}

export async function getCommunityExperiences(): Promise<ImpactCard[]> {
  return getStoryCards("Community Experience", communityExperiences);
}

/* ---------- hero sliders (top section of each landing page) ---------- */
const heroSlides: Record<string, HeroSlide[]> = {
  home: [
    {
      eyebrow: "Registered Ugandan NGO · Jinja",
      title: "Bridging global learning with local innovation",
      intro: "Community-led development across rural Uganda — clean energy, water, the environment, and livelihoods — paired with hands-on learning for students, researchers, and partners.",
      cta: { href: "/apply", label: "Apply for a program" },
      cta2: { href: "/partners", label: "Partner with FOSCOD" },
      tone: "earth",
    },
    {
      eyebrow: "Global Learning & Exchange",
      title: "Learn in the field, alongside the community",
      intro: "Internships, volunteering, group programs, and research placements with real local supervision — and a host-family experience that turns a placement into a relationship.",
      cta: { href: "/programs/global-learning-exchange", label: "Explore programs" },
      tone: "water",
    },
    {
      eyebrow: "Community Empowerment & Development",
      title: "Invest in change that communities sustain",
      intro: "Fund and partner on locally owned solutions in renewable energy, environment, water, livelihoods, and inclusion — designed and delivered by the communities that lead them.",
      cta: { href: "/donate", label: "Support our work" },
      cta2: { href: "/projects", label: "Explore projects" },
      tone: "forest",
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
      intro: "From our home in Jinja, we've grown into a registered indigenous NGO working across districts — and a bridge between local innovation and learners worldwide.",
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
    {
      eyebrow: "On the ground",
      title: "Real change, measured honestly",
      intro: "Clean energy that powers a livelihood, water that restores dignity, land regenerated with biochar — and the people behind every number.",
      cta: { href: "/donate", label: "Grow verified impact" },
      tone: "water",
    },
  ],
  contact: [
    {
      eyebrow: "Contact",
      title: "Get in touch with FOSCOD",
      intro: "Questions about programs, partnerships, donations, or community projects? Tell us a little about you and we'll reply soon.",
      cta: { href: "/apply", label: "Apply now" },
      cta2: { href: "/partners", label: "Partner with us" },
      tone: "forest",
    },
  ],
};

export async function getHeroSlides(pageSlug: string): Promise<HeroSlide[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("hero_slides")
      .select("eyebrow,title,intro,cta_label,cta_href,cta2_label,cta2_href,tone,image_url")
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
