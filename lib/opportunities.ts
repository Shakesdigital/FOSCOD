import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type OpportunityType = "internship" | "volunteer";

export type OpportunitySummary = {
  slug: string;
  title: string;
  type: OpportunityType | null;
  category: string;
  location: string;
  duration: string;
  excerpt: string;
  experience_type: string | null;
  sector_slugs: string[];
  engagement_approach: string | null;
  participation_format: string | null;
  availability_status: string;
  last_confirmed_at: string | null;
  featured_image_url: string | null;
};

export type Opportunity = OpportunitySummary & {
  about: string;
  highlights: string[];
  requirements: string[];
  whyChoose: string[];
  sdgs: string[];
  gallery: string[];
  learning_focus: string | null;
  host_organization: string | null;
  purpose: string | null;
  learning_goals: string[];
  tasks: string[];
  eligibility: string | null;
  supervision: string | null;
  timing: string | null;
  practical_arrangements: string | null;
  capacity: string | null;
  costs: string | null;
  application_requirements: string | null;
};

// Opportunities are never invented as local fallbacks. Editors publish only
// current, verified openings from the CMS.
const SUMMARY_COLUMNS =
  "slug,title,type,category,location,duration,excerpt,experience_type,sector_slugs,engagement_approach,participation_format,availability_status,last_confirmed_at,featured_image_url";

export async function getOpportunities(type?: OpportunityType): Promise<OpportunitySummary[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  let query = supabase
    ?.from("opportunities")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("order_column", { ascending: true });
  if (type && query) query = query.eq("type", type);
  const { data } = (await query) ?? { data: null };
  return (data ?? []).map(mapSummary);
}

function mapSummary(item: Record<string, unknown>): OpportunitySummary {
  return {
    slug: item.slug as string,
    title: item.title as string,
    type: (item.type as OpportunityType) ?? null,
    category: (item.category as string) ?? "",
    location: (item.location as string) ?? "",
    duration: (item.duration as string) ?? "",
    excerpt: (item.excerpt as string) ?? "",
    experience_type: (item.experience_type as string) ?? null,
    sector_slugs: (item.sector_slugs as string[]) ?? [],
    engagement_approach: (item.engagement_approach as string) ?? null,
    participation_format: (item.participation_format as string) ?? null,
    availability_status: (item.availability_status as string) ?? "open",
    last_confirmed_at: (item.last_confirmed_at as string) ?? null,
    featured_image_url: (item.featured_image_url as string) ?? null,
  };
}

export async function getOpportunity(slug: string): Promise<Opportunity | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = (await supabase
    ?.from("opportunities")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()) ?? { data: null };
  if (!data) return null;
  return {
    ...mapSummary(data),
    about: data.about ?? "",
    highlights: (data.highlights as string[]) ?? [],
    requirements: (data.requirements as string[]) ?? [],
    whyChoose: (data.why_choose as string[]) ?? [],
    sdgs: (data.sdgs as string[]) ?? [],
    gallery: (data.gallery as string[]) ?? [],
    learning_focus: data.learning_focus ?? null,
    host_organization: data.host_organization ?? null,
    purpose: data.purpose ?? null,
    learning_goals: (data.learning_goals as string[]) ?? [],
    tasks: (data.tasks as string[]) ?? [],
    eligibility: data.eligibility ?? null,
    supervision: data.supervision ?? null,
    timing: data.timing ?? null,
    practical_arrangements: data.practical_arrangements ?? null,
    capacity: data.capacity ?? null,
    costs: data.costs ?? null,
    application_requirements: data.application_requirements ?? null,
  };
}

export async function getOpportunityCategories(type?: OpportunityType): Promise<string[]> {
  const list = await getOpportunities(type);
  return ["All Projects", ...Array.from(new Set(list.map((item) => item.category).filter(Boolean)))];
}

export function allOpportunitySlugs(): string[] {
  return [];
}
