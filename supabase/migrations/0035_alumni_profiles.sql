-- ============================================================
-- FOSCOD CMS - 0035 alumni profiles
-- A manageable alumni content model, ready for later activation of
-- the Alumni Network page. Nothing is seeded: profiles are created
-- by staff only, from verified participation history.
--
-- Privacy: no personal information is publicly readable by default.
-- A profile appears publicly only when BOTH the staff visibility flag
-- and the alumni member's own opt-in are set.
-- ============================================================

create table if not exists public.alumni_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  program text,                       -- e.g. "GLE 2023 — renewable energy intern"
  participation_summary text,         -- participation history
  interests text,                     -- current interests / offering (mentorship, referrals…)
  contribution_links jsonb not null default '[]'::jsonb, -- [{type:'project'|'story'|'article', slug}]
  photo_url text,
  photo_alt text,
  consent_confirmed boolean not null default false, -- alumni member consent on record
  opt_in_contact boolean not null default false,    -- alumni member opted in to be contacted
  contact_email text,                               -- stored for staff use only; never public
  public_visible boolean not null default false,    -- staff publication flag (requires consent_confirmed)
  status text not null default 'draft',             -- draft | published | archived
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.alumni_profiles enable row level security;

drop trigger if exists trg_alumni_profiles_updated on public.alumni_profiles;
create trigger trg_alumni_profiles_updated before update on public.alumni_profiles
  for each row execute function public.set_updated_at();

-- Public read ONLY for consented, published profiles.
drop policy if exists alumni_profiles_public_read on public.alumni_profiles;
create policy alumni_profiles_public_read on public.alumni_profiles
  for select using (
    (status = 'published' and public_visible and consent_confirmed)
    or public.is_staff()
  );
drop policy if exists alumni_profiles_staff_write on public.alumni_profiles;
create policy alumni_profiles_staff_write on public.alumni_profiles
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_alumni_profiles_status on public.alumni_profiles (status);
