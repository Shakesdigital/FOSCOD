-- ============================================================
-- FOSCOD CMS - 0034 donation campaigns + transaction records
-- Structure for the donation journey. Online payment activation is
-- pending provider credentials/account approval (see REMAINING-INPUTS);
-- until then the public site records giving ENQUIRIES, and these
-- tables stand ready for the provider integration:
--   donation_campaigns   - what donors can support (CMS-managed)
--   donation_transactions - provider-linked payment records. NO card
--     data is ever stored; confirmation happens through the provider's
--     server-side process (webhook), never a browser success screen.
--
-- RLS: campaigns public-read where visible; transactions are
-- STAFF-ONLY (personal donor data is never publicly readable).
-- ============================================================

-- ---------- campaigns ----------
create table if not exists public.donation_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  project_slug text,
  status text not null default 'active',  -- active | paused | closed
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.donation_campaigns enable row level security;

drop trigger if exists trg_donation_campaigns_updated on public.donation_campaigns;
create trigger trg_donation_campaigns_updated before update on public.donation_campaigns
  for each row execute function public.set_updated_at();

drop policy if exists donation_campaigns_public_read on public.donation_campaigns;
create policy donation_campaigns_public_read on public.donation_campaigns
  for select using ((visible and status = 'active') or public.is_staff());
drop policy if exists donation_campaigns_staff_write on public.donation_campaigns;
create policy donation_campaigns_staff_write on public.donation_campaigns
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_donation_campaigns_order on public.donation_campaigns (order_column);

delete from public.donation_campaigns;
insert into public.donation_campaigns (slug, title, description, project_slug, status, order_column, visible) values
  ('water-spring-protection-naluvule', 'Water Spring Protection — Naluvule',
   'Support a named WASH project while FOSCOD confirms the current scope, budget, maintenance plan, and evidence package.', 'water-spring-protection-naluvule', 'active', 1, true),
  ('solar-powered-water-system-naluvule', 'Solar-Powered Water System — Naluvule',
   'Discuss support for community water infrastructure, governance, maintenance, and monitoring as one connected service.', 'solar-powered-water-system-naluvule', 'active', 2, true),
  ('greening-kalagala', 'Greening Kalagala',
   'Support community environmental action with activities and results tied to approved project records.', 'greening-kalagala', 'active', 3, true),
  ('coffee-farming-mobilization', 'Coffee Farming Mobilization',
   'Explore livelihoods support that considers skills, production risk, organization, market access, and follow-through.', 'coffee-farming-mobilization', 'active', 4, true),
  ('carbon-credit-project', 'Planned Carbon Credit Project',
   'Support project development for clean cooking and restoration without treating estimated benefits as issued or verified carbon credits.', 'carbon-credit-project', 'paused', 5, true),
  ('where-most-needed', 'Where most needed',
   'Allow FOSCOD to propose the most useful current priority, with the purpose and reporting arrangement agreed before funds are transferred.', null, 'active', 6, true);

-- ---------- transactions (staff-only) ----------
create table if not exists public.donation_transactions (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.donation_campaigns(id),
  donor_name text,
  donor_email text,
  amount numeric(12,2),
  currency text not null default 'UGX',
  frequency text not null default 'one_time', -- one_time | recurring
  provider text,                               -- set once a provider is configured
  provider_ref text,                           -- provider transaction/reference id
  status text not null default 'pending',      -- pending | confirmed | failed | cancelled
  verified_at timestamptz,                     -- set only via server-side provider verification
  metadata jsonb not null default '{}'::jsonb, -- provider payload snapshot (no card data, ever)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.donation_transactions enable row level security;

drop trigger if exists trg_donation_transactions_updated on public.donation_transactions;
create trigger trg_donation_transactions_updated before update on public.donation_transactions
  for each row execute function public.set_updated_at();

drop policy if exists donation_transactions_staff_all on public.donation_transactions;
create policy donation_transactions_staff_all on public.donation_transactions
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_donation_transactions_status on public.donation_transactions (status);
