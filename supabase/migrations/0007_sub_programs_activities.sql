-- ============================================================
-- FOSCOD CMS — 0007 sub_programs & activities
-- CEDP sub-programs (6) and their repeatable activities.
-- Public-read where published/visible; staff write via RLS.
-- ============================================================

-- ---------- sub_programs ----------
create table if not exists public.sub_programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  strategic_goal int not null,                    -- 1-6 per Strategic Plan
  pillar text not null default 'CEDP',            -- only CEDP has sub-programs
  hero_image_url text,
  description text,
  icon text,                                      -- lucide icon name or custom SVG key
  key_stats jsonb default '[]'::jsonb,            -- [{label, value, note}]
  order_column int not null default 0,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  meta_title text,
  meta_description text,
  meta_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- activities ----------
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sub_program_id uuid references public.sub_programs(id) on delete set null,
  gle_stream_id uuid references public.programs(id) on delete set null,  -- for GLE activities
  summary text,
  description text,                               -- full rich-text description
  hero_image_url text,
  gallery jsonb default '[]'::jsonb,              -- min 4 slots: [{url, alt, caption}]
  status text not null default 'planned',         -- planned | ongoing | completed
  start_date date,
  end_date date,
  related_project_ids uuid[] default '{}',
  related_story_ids uuid[] default '{}',
  order_column int not null default 0,
  meta_title text,
  meta_description text,
  meta_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- ensure tagged to either a sub_program OR a GLE stream
  constraint activities_tagged_check check (
    sub_program_id is not null or gle_stream_id is not null
  )
);

create index if not exists idx_activities_sub_program on public.activities (sub_program_id, order_column);
create index if not exists idx_activities_gle_stream on public.activities (gle_stream_id, order_column);
create index if not exists idx_activities_status on public.activities (status);

-- ---------- updated_at triggers ----------
drop trigger if exists trg_sub_programs_updated on public.sub_programs;
create trigger trg_sub_programs_updated before update on public.sub_programs
  for each row execute function public.set_updated_at();

drop trigger if exists trg_activities_updated on public.activities;
create trigger trg_activities_updated before update on public.activities
  for each row execute function public.set_updated_at();

-- ---------- RLS ----------
alter table public.sub_programs enable row level security;
drop policy if exists sub_programs_public_read on public.sub_programs;
create policy sub_programs_public_read on public.sub_programs
  for select using (status = 'published' or public.is_staff());
drop policy if exists sub_programs_staff_write on public.sub_programs;
create policy sub_programs_staff_write on public.sub_programs
  for all using (public.is_staff()) with check (public.is_staff());

alter table public.activities enable row level security;
drop policy if exists activities_public_read on public.activities;
create policy activities_public_read on public.activities
  for select using (
    (sub_program_id is not null and exists (
      select 1 from public.sub_programs sp where sp.id = activities.sub_program_id and sp.status = 'published'
    )) or
    (gle_stream_id is not null and exists (
      select 1 from public.programs p where p.id = activities.gle_stream_id and p.status = 'published'
    )) or
    public.is_staff()
  );
drop policy if exists activities_staff_write on public.activities;
create policy activities_staff_write on public.activities
  for all using (public.is_staff()) with check (public.is_staff());

-- ---------- helpful indexes ----------
create index if not exists idx_sub_programs_published on public.sub_programs (status, order_column);
create index if not exists idx_activities_published on public.activities (status, order_column);