/**
 * Client-safe opportunity model: shared types + pure helpers.
 *
 * Kept separate from `lib/opportunities.ts` (which imports the server-only
 * Supabase client) so client components can import types and the category
 * helpers without dragging `next/headers` into the browser bundle.
 */

export type OpportunityType = "internship" | "volunteer";

/** The five GLE program types (slugs stored in `experience_type`). These are
 *  the "Global & Education-Led" opportunities; anything without one is treated
 *  as a Community Environment Development (CEDP) opportunity. */
export const GLE_EXPERIENCE_TYPES = [
  "individual",
  "group-project",
  "coordinated-group",
  "service-learning-trip",
  "study-tour",
] as const;

const GLE_EXPERIENCE_TYPE_SET = new Set<string>(GLE_EXPERIENCE_TYPES);

/** True when an opportunity belongs to the Global & Education-Led (GLE) family. */
export function isGleOpportunity(o: { experience_type: string | null }): boolean {
  return Boolean(o.experience_type) && GLE_EXPERIENCE_TYPE_SET.has(o.experience_type as string);
}

/** The two top-level opportunity categories shown in the filter tool. */
export type OpportunityCategory = "cedp" | "gle";

export function opportunityCategory(o: { experience_type: string | null }): OpportunityCategory {
  return isGleOpportunity(o) ? "gle" : "cedp";
}

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