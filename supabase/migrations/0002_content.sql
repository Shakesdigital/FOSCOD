-- ============================================================
-- FOSCOD CMS — 0002 content entities
-- Programs, projects, impact metrics, testimonials, partners,
-- stories, team, FAQs, pages, and form submissions.
-- Public-read where published/visible; staff write via RLS.
-- ============================================================

-- Shared status enum for publishable content.
do $$ begin
  create type public.content_status as enum ('draft','published','archived');
exception when duplicate_object then null; end $$;

-- Helper macro pattern: each table gets updated_at trigger + RLS.

-- ---------- programs ----------
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  pillar text,                       -- CEDP | GLE
  title text not null,
  summary text,
  content text,
  audience text,
  duration text,
  location text,
  fees jsonb default '[]'::jsonb,
  inclusions jsonb default '[]'::jsonb,
  exclusions jsonb default '[]'::jsonb,
  learning_outcomes jsonb default '[]'::jsonb,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  order_column int not null default 0,
  featured_image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- projects ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  theme text,
  location text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  excerpt text,
  challenge text,
  solution text,
  activities jsonb default '[]'::jsonb,
  outcomes jsonb default '[]'::jsonb,
  partners jsonb default '[]'::jsonb,
  funding_needs text,
  gallery jsonb default '[]'::jsonb,
  order_column int not null default 0,
  featured_image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- impact_metrics ----------
create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text,                        -- text so we can show "—" while drafting
  unit text,
  note text,
  status text not null default 'draft',  -- verified | draft
  source text,
  date_verified date,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- testimonials / alumni reviews ----------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cohort text,
  program text,
  quote text not null,
  rating int,
  photo_url text,
  country text,
  school text,
  permission boolean not null default false,
  status public.content_status not null default 'draft',
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- partners ----------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  logo_url text,
  website text,
  description text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- stories / articles ----------
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  author text,
  excerpt text,
  body text,
  location text,
  theme text,
  featured_image_url text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- team_members ----------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  category text,                     -- board | staff | advisor | field | alumni
  photo_url text,
  short_bio text,
  long_bio text,
  expertise text,
  linkedin text,
  email text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- faqs ----------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  related text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- pages (CMS-managed static pages) ----------
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  hero jsonb default '{}'::jsonb,
  sections jsonb default '[]'::jsonb,
  status public.content_status not null default 'draft',
  meta_title text,
  meta_description text,
  meta_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- form_submissions ----------
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null,                -- internship | volunteer | group | partner | donor | contact
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new',-- new | reviewing | actioned | archived
  created_at timestamptz not null default now()
);

-- ---------- updated_at triggers ----------
do $$
declare t text;
begin
  foreach t in array array[
    'programs','projects','impact_metrics','testimonials','partners',
    'stories','team_members','pages'
  ] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s;', t);
    execute format(
      'create trigger trg_%1$s_updated before update on public.%1$s
         for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ---------- RLS: public read published/visible, staff write ----------
do $$
declare t text;
begin
  -- status-based tables
  foreach t in array array['programs','projects','stories','testimonials','pages'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %1$s_public_read on public.%1$s;', t);
    execute format(
      'create policy %1$s_public_read on public.%1$s
         for select using (status = ''published'' or public.is_staff());', t);
    execute format('drop policy if exists %1$s_staff_write on public.%1$s;', t);
    execute format(
      'create policy %1$s_staff_write on public.%1$s
         for all using (public.is_staff()) with check (public.is_staff());', t);
  end loop;

  -- visible-based tables
  foreach t in array array['partners','team_members','faqs'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %1$s_public_read on public.%1$s;', t);
    execute format(
      'create policy %1$s_public_read on public.%1$s
         for select using (visible or public.is_staff());', t);
    execute format('drop policy if exists %1$s_staff_write on public.%1$s;', t);
    execute format(
      'create policy %1$s_staff_write on public.%1$s
         for all using (public.is_staff()) with check (public.is_staff());', t);
  end loop;
end $$;

-- impact_metrics: visible-based
alter table public.impact_metrics enable row level security;
drop policy if exists impact_metrics_public_read on public.impact_metrics;
create policy impact_metrics_public_read on public.impact_metrics
  for select using (visible or public.is_staff());
drop policy if exists impact_metrics_staff_write on public.impact_metrics;
create policy impact_metrics_staff_write on public.impact_metrics
  for all using (public.is_staff()) with check (public.is_staff());

-- form_submissions: anyone may insert (public forms), staff may read/manage.
alter table public.form_submissions enable row level security;
drop policy if exists form_submissions_public_insert on public.form_submissions;
create policy form_submissions_public_insert on public.form_submissions
  for insert with check (true);
drop policy if exists form_submissions_staff_read on public.form_submissions;
create policy form_submissions_staff_read on public.form_submissions
  for select using (public.is_staff());
drop policy if exists form_submissions_staff_update on public.form_submissions;
create policy form_submissions_staff_update on public.form_submissions
  for update using (public.is_staff()) with check (public.is_staff());

-- ---------- helpful indexes ----------
create index if not exists idx_projects_featured on public.projects (featured, order_column);
create index if not exists idx_stories_published on public.stories (status, published_at desc);
create index if not exists idx_impact_visible on public.impact_metrics (visible, order_column);
