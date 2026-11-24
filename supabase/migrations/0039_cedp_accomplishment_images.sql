-- ============================================================
-- FOSCOD CMS — 0039 CEDP landing page: accomplishment images
-- Adds image_url / image_alt to cedp_accomplishments so the
-- Evidence section can render real project cards (title, image,
-- description, completion date) in a slider carousel.
-- Also points two impact cards at distinct images so they no
-- longer share files with the areas-of-focus cards.
-- ============================================================

alter table if exists public.cedp_accomplishments
  add column if not exists image_url text;
alter table if exists public.cedp_accomplishments
  add column if not exists image_alt text;

-- Accomplishments → featured images (delivered + continuing).
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/research.jpg', image_alt = 'Community research and mobilization meeting' where title = 'Community research and mobilization';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/tree-planting.jpg', image_alt = 'Community tree planting in Kalagala' where title = 'Greening Kalagala tree planting';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/cookstoves.jpg', image_alt = 'Improved charcoal cookstove in use' where title = 'Improved cookstove distribution';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/solar-hub.jpg', image_alt = 'Community solar battery-charging hub' where title = 'Solar battery-charging hub, Kyambogo';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/solar-salon.jpg', image_alt = 'Solar-powered community salon' where title = 'Community solar salon, Naluvule';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/spring.jpg', image_alt = 'Protected water spring in Naluvule' where title = 'Two protected water springs, Naluvule';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/menstrual-health.jpg', image_alt = 'Menstrual health and reusable sanitary-pad session' where title = 'Menstrual health and reusable sanitary pads';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/womens-groups.jpg', image_alt = 'Women''s group formed with CEDP support' where title = 'Ten women''s groups formed';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/small-business.jpg', image_alt = 'Woman-run small business' where title = 'Approximately 20 women-led small businesses';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/green-mobility.jpg', image_alt = 'Women''s group with electric cargo bikes' where title = 'Green mobility for women''s groups';
update public.cedp_accomplishments set image_url = '/images/cedp/accomplishments/kitchen-garden.jpg', image_alt = 'Household kitchen garden' where title = 'Kitchen-gardening training';

-- Impact cards → distinct images (no longer shared with areas of focus).
update public.cedp_impact_cards set image_url = '/images/cedp/spring.jpg', image_alt = 'Protected community water spring in Naluvule' where title = 'Protected springs and local water stewardship';
update public.cedp_impact_cards set image_url = '/images/cedp/green-mobility.jpg', image_alt = 'Women''s group with electric cargo bikes' where title = 'Green mobility and clean-powered enterprise';
