-- ============================================================
-- FOSCOD CMS — 0016 project activities & impacts
-- Adds CMS tables for the individual project detail page sections:
--   1. project_activities  — activities in a project (with images, descriptions)
--   2. project_impacts     — impact cards with CTA buttons routing to story pages
-- Public-read where visible; staff write via RLS.
-- ============================================================

-- ---------- project_activities ----------
create table if not exists public.project_activities (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.projects(slug) on delete cascade,
  title text not null,
  description text,
  image_url text,
  image_alt text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_project_activities_updated on public.project_activities;
create trigger trg_project_activities_updated before update on public.project_activities
  for each row execute function public.set_updated_at();

alter table public.project_activities enable row level security;
drop policy if exists project_activities_public_read on public.project_activities;
create policy project_activities_public_read on public.project_activities
  for select using (visible or public.is_staff());
drop policy if exists project_activities_staff_write on public.project_activities;
create policy project_activities_staff_write on public.project_activities
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_project_activities_slug_order on public.project_activities (project_slug, order_column);

-- ---------- project_impacts ----------
-- Impact cards shown on the project detail page as a looping carousel.
-- Each card can link to a full impact story page via story_slug.
create table if not exists public.project_impacts (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.projects(slug) on delete cascade,
  title text not null,
  excerpt text,
  image_url text,
  image_alt text,
  verified_outcome text,
  story_slug text,                                         -- links to impact_stories.slug for the detail page
  cta_label text default 'Read the impact story',
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_project_impacts_updated on public.project_impacts;
create trigger trg_project_impacts_updated before update on public.project_impacts
  for each row execute function public.set_updated_at();

alter table public.project_impacts enable row level security;
drop policy if exists project_impacts_public_read on public.project_impacts;
create policy project_impacts_public_read on public.project_impacts
  for select using (visible or public.is_staff());
drop policy if exists project_impacts_staff_write on public.project_impacts;
create policy project_impacts_staff_write on public.project_impacts
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_project_impacts_slug_order on public.project_impacts (project_slug, order_column);
