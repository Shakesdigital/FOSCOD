-- ============================================================
-- FOSCOD CMS — 0022 testimonials archive filters
-- Adds linked_program and linked_project_id to testimonials so the
-- /testimonials/archive page can filter by program (CEDP / GLE) and
-- by project, mirroring the impact_stories and projects archives.
-- ============================================================

alter table if exists public.testimonials
  add column if not exists linked_program text check (linked_program in ('CEDP','GLE','ORG')),
  add column if not exists linked_project_id text;

create index if not exists idx_testimonials_linked_program on public.testimonials (linked_program, status);
create index if not exists idx_testimonials_linked_project on public.testimonials (linked_project_id, status);
