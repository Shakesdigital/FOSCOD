-- ============================================================
-- FOSCOD CMS — seed data
-- Safe to re-run (upserts). Run after 0001 + 0002 migrations.
-- ============================================================

-- ---------- settings ----------
insert into public.settings (key, value, "group") values
  ('site_name', '"FOSCOD"', 'general'),
  ('legal_name', '"Foundation for Sustainable Community Based Development"', 'general'),
  ('tagline', '"Bridge global learning with local innovation"', 'general'),
  ('contact_email', '"info@foscod.org"', 'contact'),
  ('contact_phone', '"+256 700 000 000"', 'contact'),
  ('contact_location', '"Jinja / Njeru, Uganda"', 'contact'),
  ('social_facebook', '"https://facebook.com/foscod"', 'contact'),
  ('social_instagram', '"https://instagram.com/foscod"', 'contact'),
  ('social_linkedin', '"https://linkedin.com/company/foscod"', 'contact'),
  ('brand_accent', '"#10474c"', 'branding'),
  ('brand_water', '"#10474c"', 'branding'),
  ('brand_gold', '"#d99a24"', 'branding'),
  ('brand_bg', '"#f6f2ea"', 'branding'),
  ('brand_ink', '"#221c15"', 'branding'),
  ('seo_default_title', '"FOSCOD — Bridge global learning with local innovation"', 'seo'),
  ('seo_default_description', '"FOSCOD empowers rural and underserved communities in Uganda through community-led development, clean energy, environmental sustainability, and hands-on global learning programs."', 'seo')
on conflict (key) do update set value = excluded.value, "group" = excluded."group";

-- ---------- redirects (old WordPress URLs → new structure) ----------
insert into public.redirects (source, destination, status_code) values
  ('/about-us', '/about', 301),
  ('/global-learning-and-exchange', '/programs/global-learning-exchange', 301),
  ('/apply-now', '/apply', 301),
  ('/new-apply', '/apply', 301),
  ('/program-fees', '/programs/program-fees', 301),
  ('/refund-policy', '/programs/refund-policy', 301),
  ('/ced-program', '/programs/community-empowerment-development', 301),
  ('/foscod-projects', '/projects', 301),
  ('/wash-project', '/projects/wash', 301),
  ('/renewable-energy', '/projects/renewable-energy', 301),
  ('/biochar-uganda', '/projects/biochar-uganda', 301),
  ('/sustainable-livelihood-green-enterprises', '/projects/sustainable-livelihood-green-enterprises', 301),
  ('/social-inclusion-and-empowerment', '/focus/social-inclusion-empowerment', 301),
  ('/health-and-well-being', '/focus/health-wellbeing', 301),
  ('/partner-with-foscod', '/partners', 301),
  ('/partner-with-us', '/partners', 301),
  ('/meet-the-team', '/team', 301),
  ('/board-of-directors', '/team', 301),
  ('/our-staff', '/team', 301),
  ('/alumni-network', '/alumni', 301),
  ('/alumni-forum', '/alumni', 301),
  ('/alumni-reviews', '/alumni', 301),
  ('/contact-us', '/contact', 301),
  ('/blog', '/stories', 301),
  ('/home', '/', 301),
  ('/home-one', '/', 301),
  ('/internship', '/internships', 301),
  ('/solar-project', '/projects/renewable-energy', 301),
  ('/sample-page', '/', 410)
on conflict (source) do update set destination = excluded.destination, status_code = excluded.status_code;

-- ---------- projects ----------
insert into public.projects (slug, title, theme, location, status, featured, excerpt, order_column) values
  ('biochar-uganda', 'Biochar Uganda', 'Climate & Soil', 'Kalagala Parish, Buikwe', 'published', true,
    'Turning invasive water hyacinth into biochar for healthier soil, clean cooking, and verifiable carbon removal.', 1),
  ('wash', 'WASH & Public Health', 'Water & Health', 'Busoga region', 'published', true,
    'Protected springs, rainwater harvesting, and hygiene education that restore dignity and resilience.', 2),
  ('renewable-energy', 'Renewable Energy', 'Clean Energy', 'Greater Mukono', 'published', true,
    'Solar enterprises, home systems, and efficient cookstoves that power livelihoods and protect forests.', 3),
  ('sustainable-livelihood-green-enterprises', 'Sustainable Livelihoods', 'Green Enterprise', 'Buikwe & Mukono', 'published', true,
    'Agroforestry, VSLA savings groups, and climate-smart enterprise that grow income while restoring land.', 4)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, location = excluded.location,
  status = excluded.status, featured = excluded.featured, excerpt = excluded.excerpt;

-- ---------- impact_metrics (drafts — never show zeros) ----------
insert into public.impact_metrics (label, value, note, status, visible, order_column) values
  ('Communities served', '—', 'Impact data being updated', 'draft', true, 1),
  ('Projects implemented', '—', 'Impact data being updated', 'draft', true, 2),
  ('Alumni worldwide', '—', 'Impact data being updated', 'draft', true, 3),
  ('Active partners', '—', 'Impact data being updated', 'draft', true, 4)
on conflict do nothing;

-- ---------- partners ----------
insert into public.partners (name, type, visible, order_column) values
  ('University Partner', 'Academic', true, 1),
  ('Community CBO', 'Community', true, 2),
  ('Local NGO', 'NGO', true, 3),
  ('Climate Funder', 'Funder', true, 4),
  ('Research Institute', 'Research', true, 5),
  ('District Government', 'Government', true, 6)
on conflict do nothing;

-- ---------- stories ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('celebrating-our-host-families', 'Celebrating Our Host Families', 'Host Family Stories',
    'The families who open their homes are the quiet backbone of every FOSCOD placement.', 'published', now()),
  ('solar-powered-salon-naluvule', 'Solar-Powered Salon in Naluvule', 'Project Updates',
    'How one clean-energy enterprise is changing what''s possible for a village business.', 'published', now()),
  ('internship-debrief-2025', 'FOSCOD Internship Debrief 2025', 'Impact Reports',
    'What this year''s cohort built, learned, and left behind across four districts.', 'published', now())
on conflict (slug) do nothing;
