import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type OpportunityType = "internship" | "volunteer";

export type OpportunitySummary = {
  slug: string;
  title: string;
  type: OpportunityType;
  category: string;
  location: string;
  duration: string;
  excerpt: string;
};

export type Opportunity = OpportunitySummary & {
  about: string;
  highlights: string[];
  requirements: string[];
  whyChoose: string[];
  sdgs: string[];
  gallery: string[];
};

// Opportunities are never invented as local fallbacks. Editors publish only
// current, verified openings from the CMS.
export async function getOpportunities(type?: OpportunityType): Promise<OpportunitySummary[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  let query = supabase
    ?.from("opportunities")
    .select("slug,title,type,category,location,duration,excerpt")
    .eq("status", "published")
    .order("order_column", { ascending: true });
  if (type && query) query = query.eq("type", type);
  const { data } = (await query) ?? { data: null };
  return (data ?? []).map((item) => ({
    slug: item.slug,
    title: item.title,
    type: (item.type as OpportunityType) ?? "internship",
    category: item.category ?? "",
    location: item.location ?? "",
    duration: item.duration ?? "",
    excerpt: item.excerpt ?? "",
  }));
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
    slug: data.slug,
    title: data.title,
    type: (data.type as OpportunityType) ?? "internship",
    category: data.category ?? "",
    location: data.location ?? "",
    duration: data.duration ?? "",
    excerpt: data.excerpt ?? "",
    about: data.about ?? "",
    highlights: (data.highlights as string[]) ?? [],
    requirements: (data.requirements as string[]) ?? [],
    whyChoose: (data.why_choose as string[]) ?? [],
    sdgs: (data.sdgs as string[]) ?? [],
    gallery: (data.gallery as string[]) ?? [],
  };
}

export async function getOpportunityCategories(type?: OpportunityType): Promise<string[]> {
  const list = await getOpportunities(type);
  return ["All Projects", ...Array.from(new Set(list.map((item) => item.category).filter(Boolean)))];
}

export function allOpportunitySlugs(): string[] {
  return [];
}
