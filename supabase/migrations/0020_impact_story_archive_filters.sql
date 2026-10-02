-- ============================================================
-- FOSCOD CMS — 0020 impact story archive filters
-- Adds GLE development sectors for the /impact/stories archive
-- filter bar, and a linking column on impact_stories so GLE
-- stories can be filtered by development sector.
-- Public-read where visible; staff write via RLS.
-- ============================================================

-- ---------- gle_development_sectors ----------
-- The thematic development sectors GLE participants work in.
-- Mirrors the structure of cedp_areas_of_focus but scoped to
-- the Global Learning & Exchange program.
create table if not exists public.gle_development_sectors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_gle_development_sectors_updated on public.gle_development_sectors;
create trigger trg_gle_development_sectors_updated before update on public.gle_development_sectors
  for each row execute function public.set_updated_at();

alter table public.gle_development_sectors enable row level security;
drop policy if exists gle_development_sectors_public_read on public.gle_development_sectors;
create policy gle_development_sectors_public_read on public.gle_development_sectors
  for select using (visible or public.is_staff());
drop policy if exists gle_development_sectors_staff_write on public.gle_development_sectors;
create policy gle_development_sectors_staff_write on public.gle_development_sectors
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_gle_development_sectors_slug on public.gle_development_sectors (slug);
create index if not exists idx_gle_development_sectors_order on public.gle_development_sectors (order_column);

-- ---------- link impact_stories to GLE sector ----------
-- Nullable for backward compatibility — CEDP stories continue
-- to link through linked_sub_program_id.
alter table if exists public.impact_stories
  add column if not exists linked_gle_sector_id uuid references public.gle_development_sectors(id) on delete set null;

create index if not exists idx_impact_stories_gle_sector on public.impact_stories (linked_gle_sector_id, status);

-- ---------- add slug to cedp_areas_of_focus ----------
-- The areas-of-focus cards previously only carried a cta_href with the
-- area slug embedded in the URL. Adding a dedicated slug column makes
-- the archive filter able to read it directly.
alter table if exists public.cedp_areas_of_focus
  add column if not exists slug text;

create index if not exists idx_cedp_areas_of_focus_slug on public.cedp_areas_of_focus (slug, visible);

-- Backfill slug from cta_href for existing rows
update public.cedp_areas_of_focus
set slug = regexp_replace(cta_href, '^.*\/areas\/', '')
where slug is null and cta_href is not null and cta_href like '%/areas/%';
