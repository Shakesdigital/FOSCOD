-- ============================================================
-- FOSCOD CMS - complete editorial fields and reusable page modules
-- ============================================================

alter table public.programs
  add column if not exists tagline text,
  add column if not exists hero_video_url text,
  add column if not exists goals jsonb not null default '[]'::jsonb,
  add column if not exists geography text,
  add column if not exists cta_links jsonb not null default '[]'::jsonb,
  add column if not exists meta_image_url text;

alter table public.sub_programs
  add column if not exists purpose_statement text,
  add column if not exists strategic_goal_statement text,
  add column if not exists target_2030 jsonb not null default '[]'::jsonb,
  add column if not exists cta_links jsonb not null default '[]'::jsonb;

alter table public.activities
  add column if not exists target_group text;

alter table public.projects
  add column if not exists program_ids uuid[] not null default '{}',
  add column if not exists meta_image_url text;

alter table public.opportunities
  add column if not exists meta_image_url text;

alter table public.impact_stories
  add column if not exists consent_status text not null default 'not_required'
    check (consent_status in ('not_required','pending','confirmed','anonymized')),
  add column if not exists consent_note text;

alter table public.team_members
  add column if not exists program_affiliation text;

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in (
    'hero','rich_text','gallery','cards','cta','stats','testimonials','faq','feature_grid','form_embed'
  )),
  name text not null,
  status public.content_status not null default 'draft',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_modules (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  region text not null default 'main',
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, module_id, region)
);

alter table public.page_modules
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

drop trigger if exists trg_modules_updated on public.modules;
create trigger trg_modules_updated before update on public.modules
  for each row execute function public.set_updated_at();

drop trigger if exists trg_page_modules_updated on public.page_modules;
create trigger trg_page_modules_updated before update on public.page_modules
  for each row execute function public.set_updated_at();

alter table public.modules enable row level security;
drop policy if exists modules_public_read on public.modules;
create policy modules_public_read on public.modules
  for select using (status = 'published' or public.is_staff());
drop policy if exists modules_staff_write on public.modules;
create policy modules_staff_write on public.modules
  for all using (public.is_staff()) with check (public.is_staff());

alter table public.page_modules enable row level security;
drop policy if exists page_modules_public_read on public.page_modules;
create policy page_modules_public_read on public.page_modules
  for select using (
    public.is_staff() or (
      exists (select 1 from public.pages p where p.id = page_modules.page_id and p.status = 'published')
      and exists (select 1 from public.modules m where m.id = page_modules.module_id and m.status = 'published')
    )
  );
drop policy if exists page_modules_staff_write on public.page_modules;
create policy page_modules_staff_write on public.page_modules
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_page_modules_page_order
  on public.page_modules (page_id, region, order_column);
