-- ============================================================
-- FOSCOD CMS — 0019 GLE landing page refactor
-- New tables for the restructured Global Learning & Exchange
-- landing page:
--   1. gle_pathways        — Find your pathway cards (4, now with images)
--   2. gle_introduction    — Introduction section (title-top, image-left, text-right)
--   3. gle_apply_section   — Apply section (title, image-left, statement, CTA)
--
-- Also re-points the existing testimonials table so that alumni
-- testimonials render in a carousel on the GLE page (no schema
-- change needed — the table already has photo_url / cohort / program).
--
-- Public-read where visible; staff write via RLS (mirrors pattern
-- from 0014_cedp_landing_page).
-- ============================================================

-- ---------- gle_pathways ----------
-- The four "Find your pathway" cards. Each card now carries an
-- optional featured image so the redesigned grid can show visuals.
create table if not exists public.gle_pathways (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  href text,
  cta text,
  kicker text,
  image_url text,
  image_alt text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_gle_pathways_updated on public.gle_pathways;
create trigger trg_gle_pathways_updated before update on public.gle_pathways
  for each row execute function public.set_updated_at();

alter table public.gle_pathways enable row level security;
drop policy if exists gle_pathways_public_read on public.gle_pathways;
create policy gle_pathways_public_read on public.gle_pathways
  for select using (visible or public.is_staff());
drop policy if exists gle_pathways_staff_write on public.gle_pathways;
create policy gle_pathways_staff_write on public.gle_pathways
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_pathways_order on public.gle_pathways (order_column);

-- ---------- gle_introduction ----------
-- The introduction section, restructured per design:
--   - Title displayed on top (above the two-column split)
--   - Image on the left, text content on the right
create table if not exists public.gle_introduction (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  eyebrow text,
  body text,
  image_url text,
  image_alt text,
  cta_label text,
  cta_href text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_gle_introduction_updated on public.gle_introduction;
create trigger trg_gle_introduction_updated before update on public.gle_introduction
  for each row execute function public.set_updated_at();

alter table public.gle_introduction enable row level security;
drop policy if exists gle_introduction_public_read on public.gle_introduction;
create policy gle_introduction_public_read on public.gle_introduction
  for select using (visible or public.is_staff());
drop policy if exists gle_introduction_staff_write on public.gle_introduction;
create policy gle_introduction_staff_write on public.gle_introduction
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_introduction_order on public.gle_introduction (order_column);

-- ---------- gle_apply_section ----------
-- The new "Apply" section: title, image-left, brief statement on the
-- right, with a CTA apply button.
create table if not exists public.gle_apply_section (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  eyebrow text,
  body text,
  image_url text,
  image_alt text,
  cta_label text,
  cta_href text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_gle_apply_section_updated on public.gle_apply_section;
create trigger trg_gle_apply_section_updated before update on public.gle_apply_section
  for each row execute function public.set_updated_at();

alter table public.gle_apply_section enable row level security;
drop policy if exists gle_apply_section_public_read on public.gle_apply_section;
create policy gle_apply_section_public_read on public.gle_apply_section
  for select using (visible or public.is_staff());
drop policy if exists gle_apply_section_staff_write on public.gle_apply_section;
create policy gle_apply_section_staff_write on public.gle_apply_section
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_apply_section_order on public.gle_apply_section (order_column);
