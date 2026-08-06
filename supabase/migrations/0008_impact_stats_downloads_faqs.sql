-- ============================================================
-- FOSCOD CMS — 0008 impact_stats, downloads, faqs
-- Structured impact metrics, downloadable resources, and FAQs.
-- Public-read where visible/published; staff write via RLS.
-- ============================================================

-- ---------- impact_stats ----------
-- Powers every counter on the site. Never hardcode numbers in templates.
create table if not exists public.impact_stats (
  id uuid primary key default gen_random_uuid(),
  metric_name text not null,
  current_value text,                              -- text to allow "—" while drafting
  target_value text,                               -- 2030 target (clearly labeled)
  unit text,                                       -- e.g. "households", "people", "%"
  as_of_date date,                                 -- when current_value was verified
  source_note text,                                -- definition/source for transparency
  program text,                                    -- 'GLE' | 'CEDP' | 'ORG' (org-wide)
  sub_program_id uuid references public.sub_programs(id) on delete set null,
  status text not null default 'draft',            -- verified | draft
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_impact_stats_program on public.impact_stats (program, visible, order_column);
create index if not exists idx_impact_stats_sub_program on public.impact_stats (sub_program_id, visible, order_column);

-- ---------- downloads ----------
-- PDF library: project briefs, annual reports, MEL summaries. Filterable by program.
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,                          -- Supabase Storage path or external URL
  file_type text not null default 'pdf',           -- pdf | doc | xlsx | zip
  file_size_bytes bigint,
  program text,                                    -- 'GLE' | 'CEDP' | null (org-wide)
  sub_program_id uuid references public.sub_programs(id) on delete set null,
  category text not null default 'resource',       -- project_brief | annual_report | mel_summary | resource
  description text,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_downloads_program on public.downloads (program, visible, order_column);
create index if not exists idx_downloads_category on public.downloads (category, visible);

-- ---------- faqs ----------
-- Grouped by audience: prospective interns, donors, partners, community members.
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,                            -- rich text allowed
  audience text not null default 'general',        -- interns | donors | partners | community | general
  program text,                                    -- 'GLE' | 'CEDP' | null (org-wide)
  sub_program_id uuid references public.sub_programs(id) on delete set null,
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now()
  -- no updated_at needed for FAQs typically, but add for consistency
);

alter table public.faqs
  add column if not exists audience text not null default 'general',
  add column if not exists program text,
  add column if not exists sub_program_id uuid references public.sub_programs(id) on delete set null,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_faqs_audience on public.faqs (audience, visible, order_column);
create index if not exists idx_faqs_program on public.faqs (program, visible, order_column);

-- ---------- updated_at triggers ----------
drop trigger if exists trg_impact_stats_updated on public.impact_stats;
create trigger trg_impact_stats_updated before update on public.impact_stats
  for each row execute function public.set_updated_at();

drop trigger if exists trg_downloads_updated on public.downloads;
create trigger trg_downloads_updated before update on public.downloads
  for each row execute function public.set_updated_at();

drop trigger if exists trg_faqs_updated on public.faqs;
create trigger trg_faqs_updated before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------- RLS ----------
alter table public.impact_stats enable row level security;
drop policy if exists impact_stats_public_read on public.impact_stats;
create policy impact_stats_public_read on public.impact_stats
  for select using (visible or public.is_staff());
drop policy if exists impact_stats_staff_write on public.impact_stats;
create policy impact_stats_staff_write on public.impact_stats
  for all using (public.is_staff()) with check (public.is_staff());

alter table public.downloads enable row level security;
drop policy if exists downloads_public_read on public.downloads;
create policy downloads_public_read on public.downloads
  for select using (visible or public.is_staff());
drop policy if exists downloads_staff_write on public.downloads;
create policy downloads_staff_write on public.downloads
  for all using (public.is_staff()) with check (public.is_staff());

alter table public.faqs enable row level security;
drop policy if exists faqs_public_read on public.faqs;
create policy faqs_public_read on public.faqs
  for select using (visible or public.is_staff());
drop policy if exists faqs_staff_write on public.faqs;
create policy faqs_staff_write on public.faqs
  for all using (public.is_staff()) with check (public.is_staff());
