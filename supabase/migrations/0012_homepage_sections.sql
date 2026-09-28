-- ============================================================
-- FOSCOD CMS - homepage section tables
-- Adds tables for the "Talking about us" and "How you can get involved"
-- sections so they can be managed from the CMS admin panel.
-- ============================================================

-- Talking-about-us section content (single editable row for the homepage)
create table if not exists public.home_talking_about_us (
  id uuid primary key default gen_random_uuid(),
  eyebrow text not null default 'Who we are',
  title text not null default 'FOSCOD in context',
  intro text not null default '',
  cta_label text not null default 'Read our story',
  cta_href text not null default '/about',
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- How you can get involved cards
create table if not exists public.home_involvement_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  href text not null,
  cta_label text not null default 'Learn more',
  icon text,
  image_url text,
  image_alt text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Triggers for updated_at
drop trigger if exists trg_home_talking_about_us_updated on public.home_talking_about_us;
create trigger trg_home_talking_about_us_updated before update on public.home_talking_about_us
  for each row execute function public.set_updated_at();

drop trigger if exists trg_home_involvement_cards_updated on public.home_involvement_cards;
create trigger trg_home_involvement_cards_updated before update on public.home_involvement_cards
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.home_talking_about_us enable row level security;
drop policy if exists home_talking_about_us_read on public.home_talking_about_us;
create policy home_talking_about_us_read on public.home_talking_about_us
  for select using (visible or public.is_staff());
drop policy if exists home_talking_about_us_write on public.home_talking_about_us;
create policy home_talking_about_us_write on public.home_talking_about_us
  for all using (public.is_staff()) with check (public.is_staff());

alter table public.home_involvement_cards enable row level security;
drop policy if exists home_involvement_cards_read on public.home_involvement_cards;
create policy home_involvement_cards_read on public.home_involvement_cards
  for select using (visible or public.is_staff());
drop policy if exists home_involvement_cards_write on public.home_involvement_cards;
create policy home_involvement_cards_write on public.home_involvement_cards
  for all using (public.is_staff()) with check (public.is_staff());

-- Indexes
create index if not exists idx_home_involvement_order on public.home_involvement_cards (order_column);
