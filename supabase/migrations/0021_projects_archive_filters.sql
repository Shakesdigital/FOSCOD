-- ============================================================
-- FOSCOD CMS — 0021 projects archive filters
-- Adds linked_program to projects so the /projects/archive page
-- can filter by program (CEDP / GLE), mirroring impact_stories.
-- Also adds a featured_image_url select to getAllProjects.
-- ============================================================

alter table if exists public.projects
  add column if not exists linked_program text check (linked_program in ('CEDP','GLE','ORG'));

create index if not exists idx_projects_linked_program on public.projects (linked_program, status);
