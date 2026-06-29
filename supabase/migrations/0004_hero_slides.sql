-- ============================================================
-- FOSCOD CMS — 0004 hero slides
-- Rotating hero/banner slides for the top of each landing page.
-- Grouped by `page_slug` (home | about | programs | impact | contact | …).
-- Public-read where visible; staff write via RLS (mirrors team_members).
-- ============================================================

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,            -- which page this slide belongs to
  eyebrow text,
  title text not null,
  intro text,
  cta_label text,
  cta_href text,
  cta2_label text,
  cta2_href text,
  tone text default 'forest',         -- earth | water | forest (placeholder duotone)
  image_url text,                     -- optional real photo; overrides the duotone
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_slug, order_column)
);

create index if not exists idx_hero_slides_page on public.hero_slides (page_slug, visible, order_column);

-- updated_at trigger (function defined in 0001)
drop trigger if exists trg_hero_slides_updated on public.hero_slides;
create trigger trg_hero_slides_updated before update on public.hero_slides
  for each row execute function public.set_updated_at();

-- RLS: public reads visible rows; staff manage all.
alter table public.hero_slides enable row level security;
drop policy if exists hero_slides_public_read on public.hero_slides;
create policy hero_slides_public_read on public.hero_slides
  for select using (visible or public.is_staff());
drop policy if exists hero_slides_staff_write on public.hero_slides;
create policy hero_slides_staff_write on public.hero_slides
  for all using (public.is_staff()) with check (public.is_staff());
