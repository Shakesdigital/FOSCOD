-- ============================================================
-- FOSCOD CMS — 0009 project enhancements & impact_stories
-- Extends projects with structured fields, adds impact_stories table.
-- Public-read where published/visible; staff write via RLS.
-- ============================================================

-- ---------- extend projects table ----------
alter table public.projects
  add column if not exists community text check (community in (
    'kalagala','kyambogo','naluvule','wabusanke','byabuku','nationwide'
  )),
  add column if not exists sub_program_ids uuid[] default '{}',
  add column if not exists timeline jsonb default '[]'::jsonb,           -- [{date, milestone, description}]
  add column if not exists budget text,                                  -- optional, display-friendly
  add column if not exists project_brief_url text,                       -- PDF in Supabase Storage
  add column if not exists outcomes_structured jsonb default '[]'::jsonb,-- [{metric, value, unit, note}]
  add column if not exists linked_activity_ids uuid[] default '{}',
  add column if not exists linked_story_ids uuid[] default '{}';

create index if not exists idx_projects_community on public.projects (community);
create index if not exists idx_projects_sub_programs on public.projects using gin (sub_program_ids);

-- ---------- impact_stories ----------
-- Separate from blog stories — community voice + verified outcome per story.
create table if not exists public.impact_stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  community_voice text,                          -- named individual (with consent)
  quote text,                                    -- their direct quote
  hero_image_url text,
  gallery jsonb default '[]'::jsonb,             -- [{url, alt, caption}]
  narrative text,                                -- before/after story body
  linked_program text,                           -- 'GLE' | 'CEDP' | 'ORG'
  linked_sub_program_id uuid references public.sub_programs(id) on delete set null,
  linked_project_id uuid references public.projects(id) on delete set null,
  verified_outcome text,                         -- one concrete data point tied to this story
  published_at timestamptz,
  status public.content_status not null default 'draft',
  meta_title text,
  meta_description text,
  meta_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_impact_stories_program on public.impact_stories (linked_program, status, published_at desc);
create index if not exists idx_impact_stories_sub_program on public.impact_stories (linked_sub_program_id, status);
create index if not exists idx_impact_stories_project on public.impact_stories (linked_project_id, status);

-- ---------- updated_at triggers ----------
drop trigger if exists trg_impact_stories_updated on public.impact_stories;
create trigger trg_impact_stories_updated before update on public.impact_stories
  for each row execute function public.set_updated_at();

-- projects already has trigger from 0002

-- ---------- RLS ----------
alter table public.impact_stories enable row level security;
drop policy if exists impact_stories_public_read on public.impact_stories;
create policy impact_stories_public_read on public.impact_stories
  for select using (status = 'published' or public.is_staff());
drop policy if exists impact_stories_staff_write on public.impact_stories;
create policy impact_stories_staff_write on public.impact_stories
  for all using (public.is_staff()) with check (public.is_staff());

-- projects RLS already exists from 0002 (status-based)