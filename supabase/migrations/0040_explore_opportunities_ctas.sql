-- ============================================================
-- FOSCOD CMS — 0040 explore-opportunities CTAs → directory
-- Every call-to-action that invites the visitor to explore
-- opportunities must land on the opportunities directory
-- (/opportunities), regardless of where the record pointed before.
--
-- The app also normalizes these at render time
-- (lib/opportunity-cta.ts), so this migration simply aligns the
-- stored content with that intent for consistency and for any
-- consumer that reads the raw values.
-- ============================================================

-- Hero slides: "Explore opportunities" / "Browse opportunities" CTAs.
update public.hero_slides
  set cta_href = '/opportunities'
  where cta_label ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
    and cta_href is distinct from '/opportunities';

update public.hero_slides
  set cta2_href = '/opportunities'
  where cta2_label ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
    and cta2_href is distinct from '/opportunities';

-- Homepage "how you can get involved" cards.
update public.home_involvement_cards
  set href = '/opportunities'
  where cta_label ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
    and href is distinct from '/opportunities';

-- Homepage audience-path cards.
update public.home_audience_paths
  set href = '/opportunities'
  where cta ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
    and href is distinct from '/opportunities';

-- GLE program cards (volunteer / internship) already point at
-- /opportunities?type=..., which is the directory — leave those.

-- CEDP areas of focus: get_involved_cards JSON array.
update public.cedp_areas
  set get_involved_cards = (
    select coalesce(jsonb_agg(
      case
        when elem->>'ctaLabel' ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
          then jsonb_set(elem, '{href}', '"/opportunities"')
        else elem
      end
    ), '[]'::jsonb)
    from jsonb_array_elements(get_involved_cards) as elem
  )
  where get_involved_cards @> '[{"ctaLabel":"Explore opportunities"}]'::jsonb
     or get_involved_cards @> '[{"ctaLabel":"Explore internships"}]'::jsonb;

-- General impact pages: get_involved_cards JSON array.
update public.general_impact_pages
  set get_involved_cards = (
    select coalesce(jsonb_agg(
      case
        when elem->>'ctaLabel' ~* '^(explore|browse|find|view|see|discover|search).*(opportunit|internship|volunteer|placement)'
          then jsonb_set(elem, '{href}', '"/opportunities"')
        else elem
      end
    ), '[]'::jsonb)
    from jsonb_array_elements(get_involved_cards) as elem
  )
  where get_involved_cards @> '[{"ctaLabel":"Explore opportunities"}]'::jsonb
     or get_involved_cards @> '[{"ctaLabel":"Explore internships"}]'::jsonb;