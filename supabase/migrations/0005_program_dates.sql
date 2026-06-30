-- ============================================================
-- FOSCOD CMS — 0005 program dates
-- The intake/partner table shown on Apply + Global Learning pages.
-- Public-read where visible; staff write via RLS (mirrors team_members).
-- ============================================================

create table if not exists public.program_dates (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  companies text,
  confirmed boolean not null default false,   -- the wireframe's checkbox
  visible boolean not null default true,
  order_column int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_program_dates_visible on public.program_dates (visible, order_column);

drop trigger if exists trg_program_dates_updated on public.program_dates;
create trigger trg_program_dates_updated before update on public.program_dates
  for each row execute function public.set_updated_at();

alter table public.program_dates enable row level security;
drop policy if exists program_dates_public_read on public.program_dates;
create policy program_dates_public_read on public.program_dates
  for select using (visible or public.is_staff());
drop policy if exists program_dates_staff_write on public.program_dates;
create policy program_dates_staff_write on public.program_dates
  for all using (public.is_staff()) with check (public.is_staff());
