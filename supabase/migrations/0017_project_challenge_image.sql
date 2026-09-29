-- ============================================================
-- FOSCOD CMS — 0017 project challenge image
-- Adds challenge_image_url and challenge_image_alt columns to the
-- projects table so editors can set the challenge-section image
-- that displays on the individual project detail page.
-- ============================================================

alter table public.projects
  add if not exists challenge_image_url text,
  add if not exists challenge_image_alt text;
