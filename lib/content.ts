import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/* ============================================================
   Home content layer.
   Each getter tries Supabase (once tables are seeded) and falls
   back to built-in defaults derived from the FOSCOD content pack,
   so the design renders fully before the database is wired.
   ============================================================ */

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

const testimonials: Testimonial[] = [
  {
    quote:
      "I learned more about ethical development in eight weeks with FOSCOD than in a year of coursework. The community led, and we followed.",
    name: "Placeholder — add real alumni review",
    cohort: "Cohort 2025",
    program: "WASH Internship",
  },
  {
    quote:
      "The placement was structured, safe, and genuinely useful to the community. I left with skills and friendships I still carry.",
    name: "Placeholder — add real alumni review",
    cohort: "Cohort 2024",
    program: "Renewable Energy Volunteer",
  },
  {
    quote:
      "Our university group worked on a real menstrual-health project with full local supervision. Exactly the academic value we needed.",
    name: "Placeholder — add real alumni review",
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
