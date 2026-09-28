-- ============================================================
-- FOSCOD CMS — 0014 CEDP landing page content tables
-- Adds tables for the four CMS-managed sections on the
-- Community Empowerment & Development (CEDP) landing page:
--   1. Areas of focus (3 cards: clean energy, water, livelihoods)
--   2. Process steps ("From priority to ownership")
--   3. CEDP impact story cards ("Impacts" section)
--   4. CEDP impact cards (replacing figures/stats)
-- Public-read where visible; staff write via RLS.
-- ============================================================

-- ---------- cedp_areas_of_focus ----------
create table if not exists public.cedp_areas_of_focus (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  image_alt text,
  cta_label text,
  cta_href text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_areas_of_focus_updated on public.cedp_areas_of_focus;
create trigger trg_cedp_areas_of_focus_updated before update on public.cedp_areas_of_focus
  for each row execute function public.set_updated_at();

alter table public.cedp_areas_of_focus enable row level security;
drop policy if exists cedp_areas_of_focus_public_read on public.cedp_areas_of_focus;
create policy cedp_areas_of_focus_public_read on public.cedp_areas_of_focus
  for select using (visible or public.is_staff());
drop policy if exists cedp_areas_of_focus_staff_write on public.cedp_areas_of_focus;
create policy cedp_areas_of_focus_staff_write on public.cedp_areas_of_focus
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_areas_of_focus_order on public.cedp_areas_of_focus (order_column);

-- ---------- cedp_process_steps ----------
create table if not exists public.cedp_process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,                       -- e.g. "Local ownership"
  description text,
  image_url text,
  image_alt text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_process_steps_updated on public.cedp_process_steps;
create trigger trg_cedp_process_steps_updated before update on public.cedp_process_steps
  for each row execute function public.set_updated_at();

alter table public.cedp_process_steps enable row level security;
drop policy if exists cedp_process_steps_public_read on public.cedp_process_steps;
create policy cedp_process_steps_public_read on public.cedp_process_steps
  for select using (visible or public.is_staff());
drop policy if exists cedp_process_steps_staff_write on public.cedp_process_steps;
create policy cedp_process_steps_staff_write on public.cedp_process_steps
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_process_steps_order on public.cedp_process_steps (order_column);

-- ---------- cedp_impact_stories ----------
create table if not exists public.cedp_impact_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  image_url text,
  image_alt text,
  href text,
  project_slug text,
  cta_label text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_impact_stories_updated on public.cedp_impact_stories;
create trigger trg_cedp_impact_stories_updated before update on public.cedp_impact_stories
  for each row execute function public.set_updated_at();

alter table public.cedp_impact_stories enable row level security;
drop policy if exists cedp_impact_stories_public_read on public.cedp_impact_stories;
create policy cedp_impact_stories_public_read on public.cedp_impact_stories
  for select using (visible or public.is_staff());
drop policy if exists cedp_impact_stories_staff_write on public.cedp_impact_stories;
create policy cedp_impact_stories_staff_write on public.cedp_impact_stories
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_impact_stories_order on public.cedp_impact_stories (order_column);

-- ---------- cedp_impact_cards ----------
create table if not exists public.cedp_impact_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  image_url text,
  image_alt text,
  href text,
  project_slug text,
  cta_label text,
  verified_outcome text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cedp_impact_cards_updated on public.cedp_impact_cards;
create trigger trg_cedp_impact_cards_updated before update on public.cedp_impact_cards
  for each row execute function public.set_updated_at();

alter table public.cedp_impact_cards enable row level security;
drop policy if exists cedp_impact_cards_public_read on public.cedp_impact_cards;
create policy cedp_impact_cards_public_read on public.cedp_impact_cards
  for select using (visible or public.is_staff());
drop policy if exists cedp_impact_cards_staff_write on public.cedp_impact_cards;
create policy cedp_impact_cards_staff_write on public.cedp_impact_cards
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_impact_cards_order on public.cedp_impact_cards (order_column);
