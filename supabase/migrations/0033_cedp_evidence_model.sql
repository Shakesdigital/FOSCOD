-- ============================================================
-- FOSCOD CMS - 0033 CEDP evidence model
-- Re-casts CEDP evidence on the three approved focus areas, grounded
-- in "FOSCOD contribution to Wakisi Division budget conference,
-- FY 2027/28" (submitted by the Executive Director, November 2026).
-- Outputs are reported separately from measured changes; partner
-- attribution (WRFA, Myriad Canada) is preserved.
-- ============================================================

-- ---------- accomplishments (editable evidence records) ----------
create table if not exists public.cedp_accomplishments (
  id uuid primary key default gen_random_uuid(),
  area_slug text,                       -- null = cross-cutting
  title text not null,
  description text not null,
  attribution text,                     -- partner / community credit
  period text,                          -- reporting period, e.g. "2022 – October 2026"
  kind text not null default 'output',  -- output | continuing | future
  order_column int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.cedp_accomplishments enable row level security;

drop trigger if exists trg_cedp_accomplishments_updated on public.cedp_accomplishments;
create trigger trg_cedp_accomplishments_updated before update on public.cedp_accomplishments
  for each row execute function public.set_updated_at();

drop policy if exists cedp_accomplishments_public_read on public.cedp_accomplishments;
create policy cedp_accomplishments_public_read on public.cedp_accomplishments
  for select using (visible or public.is_staff());
drop policy if exists cedp_accomplishments_staff_write on public.cedp_accomplishments;
create policy cedp_accomplishments_staff_write on public.cedp_accomplishments
  for all using (public.is_staff()) with check (public.is_staff());

create index if not exists idx_cedp_accomplishments_order on public.cedp_accomplishments (order_column);

delete from public.cedp_accomplishments;
insert into public.cedp_accomplishments (area_slug, title, description, attribution, period, kind, order_column, visible) values
  -- Clean Energy & Climate Resilience
  ('clean-energy-climate-resilience', 'Community research and mobilization',
   'Conducted the Kalagala Climate Situation Analysis (2022), an Integrated Socioeconomic and Infrastructure Assessment of Kyambogo Village and Kalagala Parish (2026), and a study on Community Perspectives on Climate Challenges and Justice in Kalagala (2026). Research has informed community dialogue and action.',
   'Lead investigator to share detailed findings from the latest study', '2022 – 2026', 'output', 1, true),
  ('clean-energy-climate-resilience', 'Greening Kalagala tree planting',
   'Mobilized the Greening Kalagala community tree-planting initiative since 2022, including household planting and planting at Kalagala UMEA Primary School, promoting environmental awareness and local stewardship.',
   'Community members, Kalagala UMEA Primary School', '2022 – ongoing', 'continuing', 2, true),
  ('clean-energy-climate-resilience', 'Improved cookstove distribution',
   'Launched a Myriad Canada-supported pilot to reach 200 vulnerable households (100 improved charcoal stoves and 100 Lorena stoves). By October 2026, 81 improved charcoal stoves had been distributed; further distribution, Lorena stove construction and community-led monitoring continue.',
   'Supported by Myriad Canada; community-led monitoring', 'Pilot launched 2026; 81 stoves by October 2026', 'continuing', 3, true),
  ('clean-energy-climate-resilience', 'Solar battery-charging hub, Kyambogo',
   'Supported installation of a community solar battery-charging hub in Kyambogo.',
   'Installed with community partners', 'By October 2026', 'output', 4, true),
  ('clean-energy-climate-resilience', 'Community solar salon, Naluvule',
   'Supported the establishment of a community solar salon in Naluvule, powering a local business with clean energy.',
   'Community-operated', 'By October 2026', 'output', 5, true),
  -- Water, Sanitation & Community Health
  ('water-sanitation-community-health', 'Two protected water springs, Naluvule',
   'Supported protection of two community water springs in Naluvule, with the formation and strengthening of spring-user committees for local oversight and sustainability.',
   'Spring-user committees lead oversight', 'By October 2026', 'output', 1, true),
  ('water-sanitation-community-health', 'Menstrual health and reusable sanitary pads',
   'Delivered menstrual health education and reusable sanitary-pad making at Kalagala UMEA Primary School and in Naluvule 1.',
   'Kalagala UMEA Primary School, Naluvule 1 community', '2025', 'output', 2, true),
  ('water-sanitation-community-health', 'Community health awareness and referrals',
   'Promoting community health awareness, prevention education and appropriate referrals with competent service providers.',
   null, 'FY 2027/28 priority', 'future', 3, true),
  -- Sustainable Livelihoods, Skills & Economic Empowerment
  ('sustainable-livelihoods-skills-economic-empowerment', 'Ten women''s groups formed',
   'Facilitated the formation of 10 women''s groups; provided sexual and reproductive health education to three groups, savings/SACCO management skills to two, helped initiate group saving, and provided micro-enterprise training.',
   'Women''s groups lead saving and enterprise activity', 'By October 2026', 'output', 1, true),
  ('sustainable-livelihoods-skills-economic-empowerment', 'Approximately 20 women-led small businesses',
   'Approximately 20 women established small self-managed businesses through group saving and micro-enterprise support.',
   'Women entrepreneurs', 'By October 2026', 'output', 2, true),
  ('sustainable-livelihoods-skills-economic-empowerment', 'Green mobility for women''s groups',
   'Through collaboration with Women Raising for Africa (WRFA), facilitated the engagement of women''s groups in environmentally friendly transport and income opportunities. WRFA provided six electric bicycles, later 10 cargo bikes to women''s groups, and three electric tuk-tuks across Naluvule, Kalagala and Wabusanke.',
   'Vehicles and support provided by WRFA; FOSCOD facilitated', 'By October 2026', 'output', 3, true),
  ('sustainable-livelihoods-skills-economic-empowerment', 'Kitchen-gardening training',
   'Supported kitchen-gardening training in Byabuku and Naluvule for household food security.',
   'Community members', 'By October 2026', 'output', 4, true),
  -- Cross-cutting future direction (indicative, subject to funding)
  (null, 'FY 2027/28 priorities are indicative',
   'Planned interventions are subject to funding, community participation, technical feasibility, partner commitments and applicable approvals. Priorities include expanded clean cooking and local technical skills, safe-water access and solar-powered water systems (subject to feasibility), and strengthened women''s and youth skills, savings groups and green micro-enterprises.',
   null, 'FY 2027/28', 'future', 1, true);

-- ---------- impact cards: grounded in the same evidence ----------
delete from public.cedp_impact_cards;
insert into public.cedp_impact_cards (title, excerpt, image_url, image_alt, href, project_slug, cta_label, verified_outcome, visible, order_column) values
  ('Clean cooking reaching vulnerable households',
   'An improved-cookstove pilot targeting 200 vulnerable households, with 81 improved charcoal stoves distributed by October 2026 and community-led monitoring underway.',
   '/images/cedp/cooking.jpg', 'Improved charcoal cookstove in a Kalagala Parish kitchen', '/projects/renewable-energy', 'renewable-energy', 'Read more',
   '81 improved charcoal stoves distributed by October 2026 (Myriad Canada-supported pilot)', true, 1),
  ('Protected springs and local water stewardship',
   'Two community water springs in Naluvule protected, with spring-user committees formed to lead local oversight and sustainability.',
   '/images/cedp/water.jpg', 'Protected community water spring in Naluvule', '/projects/wash', 'wash', 'Read more',
   '2 springs protected; spring-user committees active', true, 2),
  ('Greening Kalagala',
   'A community tree-planting initiative running since 2022 — household planting and Kalagala UMEA Primary School — promoting environmental awareness and local stewardship.',
   '/images/cedp/forest.jpg', 'Community tree planting along the Mabira Forest edge', '/projects/greening-kalagala', 'greening-kalagala', 'Read more',
   'Community initiative running since 2022', true, 3),
  ('Green mobility and clean-powered enterprise',
   'Electric bicycles, cargo bikes and tuk-tuks (provided by WRFA) powering women''s transport and income opportunities, plus a solar salon in Naluvule and a solar charging hub in Kyambogo.',
   '/images/cedp/livelihoods.jpg', 'Women''s group with electric cargo bikes', '/projects/sustainable-livelihood-green-enterprises', 'sustainable-livelihood-green-enterprises', 'Read more',
   '6 e-bikes, 10 cargo bikes, 3 tuk-tuks via WRFA; solar salon and charging hub installed', true, 4);
