-- ============================================================
-- FOSCOD CMS — 0006 opportunities
-- Internship & volunteer project opportunities: a browsable listing
-- plus a full project-description detail page. Public-read where
-- published; staff write via RLS (mirrors projects).
-- ============================================================

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type text not null default 'internship',     -- internship | volunteer
  category text,                                -- WASH & Health | Nutrition | ...
  location text,
  duration text,
  excerpt text,
  about text,                                   -- paragraphs separated by blank lines
  highlights jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  why_choose jsonb not null default '[]'::jsonb,
  sdgs jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  featured_image_url text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  order_column int not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_opportunities_type on public.opportunities (type, status, order_column);
create index if not exists idx_opportunities_category on public.opportunities (category);

drop trigger if exists trg_opportunities_updated on public.opportunities;
create trigger trg_opportunities_updated before update on public.opportunities
  for each row execute function public.set_updated_at();

alter table public.opportunities enable row level security;
drop policy if exists opportunities_public_read on public.opportunities;
create policy opportunities_public_read on public.opportunities
  for select using (status = 'published' or public.is_staff());
drop policy if exists opportunities_staff_write on public.opportunities;
create policy opportunities_staff_write on public.opportunities
  for all using (public.is_staff()) with check (public.is_staff());
