-- ============================================================
-- FOSCOD CMS — add icon fields to card tables
-- Adds an `icon` column to every card-like table that already has
-- an image_url column, so admins can choose image OR icon per card.
-- The ContentCard component checks image first, then falls back to icon.
-- ============================================================

-- home_audience_paths
alter table if exists public.home_audience_paths add column if not exists icon text;

-- home_responsible_engagement
alter table if exists public.home_responsible_engagement add column if not exists icon text;

-- cedp_areas_of_focus
alter table if exists public.cedp_areas_of_focus add column if not exists icon text;

-- cedp_process_steps
alter table if exists public.cedp_process_steps add column if not exists icon text;

-- cedp_impact_stories
alter table if exists public.cedp_impact_stories add column if not exists icon text;

-- cedp_impact_cards
alter table if exists public.cedp_impact_cards add column if not exists icon text;

-- cedp_area_impacts
alter table if exists public.cedp_area_impacts add column if not exists icon text;

-- gle_pathways
alter table if exists public.gle_pathways add column if not exists icon text;
