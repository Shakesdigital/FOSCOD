-- ============================================================
-- FOSCOD CMS - 0032 opportunities experience model
-- Extends the opportunities table for the GLE experience model:
--   - experience_type  -> one of the five GLE program types (slug)
--   - sector_slugs     -> thematic interests (CEDP areas + partner sectors)
--   - engagement_approach / participation_format / learning_focus
--   - host, purpose, learning goals, tasks, eligibility, supervision,
--     timing, practical arrangements, capacity, costs, application reqs
--   - availability_status (open | planned | paused | closed)
--     + last_confirmed_at ("date last confirmed")
--
-- `type` (internship | volunteer) remains the internship/volunteering
-- classification and is NOT required for trips or tours.
-- ============================================================

alter table public.opportunities
  add column if not exists experience_type text,
  add column if not exists sector_slugs text[] not null default '{}',
  add column if not exists engagement_approach text,
  add column if not exists participation_format text,
  add column if not exists learning_focus text,
  add column if not exists host_organization text,
  add column if not exists purpose text,
  add column if not exists learning_goals jsonb not null default '[]'::jsonb,
  add column if not exists tasks jsonb not null default '[]'::jsonb,
  add column if not exists eligibility text,
  add column if not exists supervision text,
  add column if not exists timing text,
  add column if not exists practical_arrangements text,
  add column if not exists capacity text,
  add column if not exists costs text,
  add column if not exists application_requirements text,
  add column if not exists availability_status text not null default 'open',
  add column if not exists last_confirmed_at timestamptz;

create index if not exists idx_opportunities_experience_type on public.opportunities (experience_type);
create index if not exists idx_opportunities_availability on public.opportunities (availability_status);
