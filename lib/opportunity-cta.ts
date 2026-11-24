/**
 * Opportunity CTA normalization.
 *
 * The brief: every call-to-action that invites the visitor to *explore
 * opportunities* must land on the opportunities directory (`/opportunities`),
 * regardless of where the underlying content record currently points it.
 *
 * Content (hero slides, involvement cards, pathway cards, etc.) is largely
 * CMS/database-driven and historically pointed these CTAs at the GLE program
 * page or the legacy `/internships` URL. Rather than rewrite every record, the
 * shared CTA primitives (`Button`, `ContentCard`, `HeroSlider`) run each
 * label/href pair through `resolveOpportunityCtaHref` so the intent — "explore
 * opportunities" — always resolves to the directory.
 */

/** Verbs that signal an invitation to go and look at something. */
const CTA_VERB = /\b(explore|browse|find|view|see|discover|search)\b/i;

/** Topics that identify the "opportunities" family of CTAs. */
const CTA_TOPIC = /\b(opportunit\w*|internships?|volunteer\w*|placements?)\b/i;

/** Where explore-opportunities CTAs should always land. */
export const OPPORTUNITIES_HREF = "/opportunities";

/**
 * True when a CTA label reads as an invitation to explore opportunities
 * (e.g. "Explore opportunities", "Find a project opportunity fit",
 * "Browse internships", "View all volunteer opportunities").
 *
 * Deliberately narrow so unrelated CTAs ("Explore programs",
 * "Explore partnership options", "Partner with us", "Learn more") are
 * left untouched.
 */
export function isExploreOpportunitiesCta(label?: string | null): boolean {
  if (!label) return false;
  return CTA_VERB.test(label) && CTA_TOPIC.test(label);
}

/**
 * Resolve the destination for a CTA. If the label is an
 * explore-opportunities CTA, returns the opportunities directory; otherwise
 * returns the original href unchanged.
 */
export function resolveOpportunityCtaHref(
  href: string | undefined,
  label?: string | null
): string | undefined {
  if (!href) return href;
  return isExploreOpportunitiesCta(label) ? OPPORTUNITIES_HREF : href;
}