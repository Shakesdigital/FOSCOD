-- ============================================================
-- FOSCOD CMS — 0015 CEDP sub-program area landing pages
-- Adds tables for the three area landing pages:
--   1. cedp_areas   — one row per area (hero, description, CTAs, get-involved cards)
--   2. cedp_area_projects  — join table: area → projects (with custom CTA label)
--   3. cedp_area_impacts   — impact carousel cards per area
-- Public-read where visible; staff write via RLS.
-- ============================================================

-- ---------- cedp_areas ----------
-- One row per sub-program area landing page.
create table if not exists public.cedp_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  eyebrow text,
  hero_image_url text,
  hero_image_alt text,
  tone text not null default 'forest',                      -- earth | water | forest
  hero_cta_1_label text,
  hero_cta_1_href text,
  hero_cta_2_label text,
  hero_cta_2_href text,
  hero_cta_3_label text,
  hero_cta_3_href text,
  get_involved_cards jsonb default '[]'::jsonb,              -- 3 pathway cards: title, body, href, cta_label, icon, image_url, image_alt
  order_column int not null default 0,
  visible boolean not null default true,
  meta_title text,
  meta_description text,
  meta_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_areas_updated on public.cedp_areas;
create trigger trg_cedp_areas_updated before update on public.cedp_areas
  for each row execute function public.set_updated_at();

alter table public.cedp_areas enable row level security;
drop policy if exists cedp_areas_public_read on public.cedp_areas;
create policy cedp_areas_public_read on public.cedp_areas
  for select using (visible or public.is_staff());
drop policy if exists cedp_areas_staff_write on public.cedp_areas;
create policy cedp_areas_staff_write on public.cedp_areas
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_areas_slug on public.cedp_areas (slug);
create index if not exists idx_cedp_areas_order on public.cedp_areas (order_column);

-- ---------- cedp_area_projects ----------
-- Join table linking areas to projects, with a custom CTA label per card.
create table if not exists public.cedp_area_projects (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references public.cedp_areas(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  custom_cta_label text,
  order_column int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_cedp_area_projects_area on public.cedp_area_projects (area_id, order_column);
create index if not exists idx_cedp_area_projects_project on public.cedp_area_projects (project_id);

-- ---------- cedp_area_impacts ----------
-- Impact carousel cards specific to each area.
create table if not exists public.cedp_area_impacts (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references public.cedp_areas(id) on delete cascade,
  title text not null,
  excerpt text,
  image_url text,
  image_alt text,
  story text,                                               -- brief impact story text
  href text,                                                -- link to project detail
  cta_label text,
  verified_outcome text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_area_impacts_updated on public.cedp_area_impacts;
create trigger trg_cedp_area_impacts_updated before update on public.cedp_area_impacts
  for each row execute function public.set_updated_at();

alter table public.cedp_area_impacts enable row level security;
drop policy if exists cedp_area_impacts_public_read on public.cedp_area_impacts;
create policy cedp_area_impacts_public_read on public.cedp_area_impacts
  for select using (visible or public.is_staff());
drop policy if exists cedp_area_impacts_staff_write on public.cedp_area_impacts;
create policy cedp_area_impacts_staff_write on public.cedp_area_impacts
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_area_impacts_area on public.cedp_area_impacts (area_id, order_column);
