-- ============================================================
-- FOSCOD CMS — 0029 article categories + form categories
--
-- Adds:
--   1. article_categories table — defined categories for stories & articles
--      (Blog, Program, Insight, Impact Stories, and program-area subcategories)
--   2. form_categories table — defined categories for form submissions
--      (Application, Donation, Partnership & Collaboration, Newsletter)
--   3. category column on impact_stories — consistent article categorization
--   4. form_category column on form_submissions — links to form_categories
-- ============================================================

-- ---------- article_categories ----------
create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,                                    -- e.g. "Blog", "Impact Stories"
  slug text not null unique,                             -- e.g. "blog", "impact_stories"
  parent_id uuid references public.article_categories(id) on delete set null,
  description text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_article_categories_updated on public.article_categories;
create trigger trg_article_categories_updated before update on public.article_categories
  for each row execute function public.set_updated_at();

alter table public.article_categories enable row level security;
drop policy if exists article_categories_public_read on public.article_categories;
create policy article_categories_public_read on public.article_categories
  for select using (visible or public.is_staff());
drop policy if exists article_categories_staff_write on public.article_categories;
create policy article_categories_staff_write on public.article_categories
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_article_categories_slug on public.article_categories (slug);
create index if not exists idx_article_categories_parent on public.article_categories (parent_id);

-- ---------- form_categories ----------
create table if not exists public.form_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,                                    -- e.g. "Application", "Donation"
  slug text not null unique,                             -- e.g. "application", "donation"
  description text,
  form_type text not null check (form_type in ('application','donation','partnership','newsletter')),
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_form_categories_updated on public.form_categories;
create trigger trg_form_categories_updated before update on public.form_categories
  for each row execute function public.set_updated_at();

alter table public.form_categories enable row level security;
drop policy if exists form_categories_public_read on public.form_categories;
create policy form_categories_public_read on public.form_categories
  for select using (visible or public.is_staff());
drop policy if exists form_categories_staff_write on public.form_categories;
create policy form_categories_staff_write on public.form_categories
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_form_categories_slug on public.form_categories (slug);
create index if not exists idx_form_categories_type on public.form_categories (form_type);

-- ---------- add category to impact_stories ----------
alter table public.impact_stories
  add column if not exists category text;

-- ---------- add form_category to form_submissions ----------
alter table public.form_submissions
  add column if not exists form_category text;

create index if not exists idx_form_submissions_category on public.form_submissions (form_category);
