-- ============================================================
-- FOSCOD CMS — 0018 impact story routing for CEDP cards
-- Adds story_slug column to CEDP impact card tables so that
-- CTA buttons can route to full detail impact story pages
-- (/impact/stories/[slug]/full) instead of project detail pages.
-- Also adds to cedp_impact_stories and cedp_area_impacts for
-- consistency across all CEDP impact card surfaces.
-- ============================================================

-- ---------- cedp_impact_cards ----------
alter table if exists public.cedp_impact_cards
  add column if not exists story_slug text;

create index if not exists idx_cedp_impact_cards_story on public.cedp_impact_cards (story_slug)
  where visible;

-- ---------- cedp_area_impacts ----------
alter table if exists public.cedp_area_impacts
  add column if not exists story_slug text;

create index if not exists idx_cedp_area_impacts_story on public.cedp_area_impacts (story_slug)
  where visible;

-- ---------- cedp_impact_stories ----------
alter table if exists public.cedp_impact_stories
  add column if not exists story_slug text;
