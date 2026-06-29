-- ============================================================
-- FOSCOD CMS — 0003 impact media
-- Adds an optional video embed URL to stories so the Impact page's
-- "Impact Videos" section can be managed from the CMS without a new table.
-- Stories are segmented on the Impact page by `category`:
--   'Impact Story' | 'Impact Video' | 'Community Experience'
-- ============================================================

alter table public.stories
  add column if not exists video_url text;
