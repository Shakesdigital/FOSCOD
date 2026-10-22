-- ============================================================
-- FOSCOD CMS — 0027: add testimonial CTA columns to impact_story_details
--
-- Allows editors to control the "Read more from the community" button
-- that appears below the testimonial carousel on full impact story pages.
-- ============================================================

alter table public.impact_story_details
  add column if not exists testimonials_cta_label text default 'Read more from the community',
  add column if not exists testimonials_cta_href text default '/testimonials';
