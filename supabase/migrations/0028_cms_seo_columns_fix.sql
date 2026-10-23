-- ============================================================
-- FOSCOD CMS — 0028: Add missing SEO columns to tables
-- whose CMS collection definitions spread ...seoFields but
-- whose original migration omitted meta_title, meta_description,
-- and/or meta_image_url.
-- Without these columns, saveContent() in the admin CMS tries
-- to insert/update columns that don't exist, causing PostgreSQL
-- "column does not exist" errors and the form submission silently
-- failing (no save, no error display, no frontend update).
-- ============================================================

-- stories: missing meta_image_url only
alter table public.stories
  add column if not exists meta_image_url text;

-- cedp_impact_stories: missing all three SEO columns
alter table public.cedp_impact_stories
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists meta_image_url text;

-- cedp_area_impacts: missing all three SEO columns
alter table public.cedp_area_impacts
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists meta_image_url text;

-- project_impacts: missing all three SEO columns
alter table public.project_impacts
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists meta_image_url text;

-- about_content: missing all three SEO columns
alter table public.about_content
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists meta_image_url text;
