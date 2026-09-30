-- ============================================================
-- FOSCOD CMS — seed data
-- Safe to re-run. Apply every numbered migration through 0011 first.
-- ============================================================

-- ---------- settings ----------
insert into public.settings (key, value, "group") values
  ('site_name', '"FOSCOD"', 'general'),
  ('legal_name', '"Foundation for Sustainable Community-Based Development"', 'general'),
  ('tagline', '"Communities leading environmental innovation and clean energy adoption"', 'general'),
  ('contact_email', '"info@foscod.org"', 'contact'),
  ('contact_email_secondary', '"foscoduganda@gmail.com"', 'contact'),
  ('contact_phone', '"+256 772 989971"', 'contact'),
  ('contact_location', '"Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District, Uganda"', 'contact'),
  ('contact_mailing', '"P.O. Box 1722, Jinja, Uganda"', 'contact'),
  ('social_facebook', '"https://facebook.com/foscoduganda"', 'contact'),
  ('social_linkedin', '"https://linkedin.com/company/foundation-for-sustainable-community-based-development"', 'contact'),
  ('social_youtube', '"https://youtube.com/@foscoduganda"', 'contact'),
  ('social_x', '"https://x.com/foscoduganda"', 'contact'),
  ('social_tiktok', '"https://tiktok.com/@foscodug"', 'contact'),
  ('brand_accent', '"#124f4b"', 'branding'),
  ('brand_water', '"#124f4b"', 'branding'),
  ('brand_gold', '"#d99a24"', 'branding'),
  ('brand_bg', '"#ffffff"', 'branding'),
  ('brand_ink', '"#16241f"', 'branding'),
  ('seo_default_title', '"FOSCOD — Community-led environmental innovation in Uganda"', 'seo'),
  ('seo_default_description', '"FOSCOD empowers underserved communities in Uganda to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange."', 'seo')
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

-- ---------- programs (two pillars) ----------
insert into public.programs (slug, pillar, title, summary, status, featured, order_column) values
  ('global-learning-exchange', 'GLE', 'Global Learning & Exchange',
    'Internships, volunteering, group programs, and research placements give students, professionals, and universities structured, supervised field experience in clean energy, WASH, livelihoods, health, and the environment.',
    'published', true, 1),
  ('community-empowerment-development', 'CEDP', 'Community Empowerment & Development',
    'Locally owned solutions across renewable energy, environment, water, livelihoods, health, and inclusion — designed and delivered with the communities that lead them.',
    'published', true, 2)
on conflict (slug) do update set
  pillar = excluded.pillar, title = excluded.title, summary = excluded.summary,
  status = excluded.status, featured = excluded.featured, order_column = excluded.order_column;

-- ---------- projects ----------
delete from public.projects where slug in ('biochar-uganda','wash','renewable-energy','sustainable-livelihood-green-enterprises');
insert into public.projects (slug, title, theme, location, status, featured, excerpt, order_column) values
  ('greening-kalagala', 'Greening Kalagala', 'Ecosystem Restoration', 'Kalagala Parish, Buikwe District', 'published', true,
    'A community reforestation campaign in FOSCOD''s core CEDP implementation area.', 1),
  ('water-spring-protection-naluvule', 'Water Spring Protection in Naluvule Community', 'WASH', 'Naluvule, Buikwe District', 'published', true,
    'Community-led protection of a natural water spring in Naluvule.', 2),
  ('coffee-farming-mobilization', 'Coffee Farming Mobilization', 'Green Livelihoods', 'Kalagala Parish, Buikwe District', 'published', true,
    'Community mobilization around coffee farming and resilient local livelihoods.', 3),
  ('solar-powered-water-system-naluvule', 'Solar-Powered Water System, Naluvule Village', 'Clean Energy & WASH', 'Naluvule, Buikwe District', 'published', true,
    'A solar-powered water initiative linking renewable energy with community water access.', 4),
  ('carbon-credit-project', 'Carbon Credit Project', 'Clean Cooking & Ecosystem Restoration', 'Kalagala Parish, Buikwe District', 'published', true,
    'A planned clean-cookstove and reforestation initiative aligned with Gold Standard and Verra REDD+ methodologies.', 5)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, location = excluded.location,
  status = excluded.status, featured = excluded.featured, excerpt = excluded.excerpt;

-- Set challenge images for projects
-- UPDATE (not INSERT) avoids NOT NULL violations on title: the project row
-- is already inserted above (lines 77-90), so we only need to set the
-- challenge image columns on an existing row.
update public.projects
  set challenge_image_url = '/images/naluvule/challenge-site.jpg',
      challenge_image_alt = 'Solar-powered water system site in Naluvule'
  where slug = 'solar-powered-water-system-naluvule';

-- ---------- impact_metrics (verified and dated) ----------
delete from public.impact_metrics;
insert into public.impact_metrics (label, value, note, status, visible, order_column) values
  ('Community projects implemented', '35', 'Verified track record, 2022–2024', 'verified', true, 1),
  ('Development practitioners trained', '42', '27 in-person interns, 11 virtual interns, and 4 volunteers; 2019–2024', 'verified', true, 2),
  ('Virtual interns engaged', '93', 'Verified track record, 2019–2024', 'verified', true, 3),
  ('Completed projects sustaining benefits', '86%', 'Continue to benefit communities independently; verified track record, 2019–2024', 'verified', true, 4)
on conflict do nothing;

-- ---------- partners ----------
delete from public.partners;
insert into public.partners (name, type, visible, order_column) values
  ('Northwestern University', 'Academic', true, 1),
  ('Fort Lewis College', 'Academic', true, 2),
  ('KAYA Responsible Travel', 'Implementation Partner', true, 3),
  ('AIESEC', 'In-kind Support', true, 4),
  ('Together for a New Africa Organizations', 'In-kind Support', true, 5),
  ('Women Raising for Africa', 'In-kind Support', true, 6),
  ('Buikwe Local Government', 'Government', true, 7)
on conflict do nothing;

-- ---------- stories ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('celebrating-our-host-families', 'Celebrating Our Host Families', 'Host Family Stories',
    'The families who open their homes are the quiet backbone of every FOSCOD placement.', 'draft', now()),
  ('solar-powered-salon-naluvule', 'Solar-Powered Salon in Naluvule', 'Project Updates',
    'How one clean-energy enterprise is changing what''s possible for a village business.', 'draft', now()),
  ('internship-debrief-2025', 'FOSCOD Internship Debrief 2025', 'Impact Reports',
    'What this year''s cohort built, learned, and left behind across four districts.', 'draft', now())
on conflict (slug) do nothing;

-- ---------- hero_slides (rotating hero per landing page) ----------
insert into public.hero_slides (page_slug, eyebrow, title, intro, cta_label, cta_href, cta2_label, cta2_href, tone, order_column, visible) values
  ('home', 'Registered Ugandan NGO · Buikwe District', 'Communities leading environmental innovation and clean energy adoption',
    'FOSCOD empowers underserved communities through ethical, sustainable development and global knowledge exchange.',
    'Partner', '/partners', 'Apply', '/apply', 'earth', 1, true),
  ('home', 'Global Learning & Exchange', 'Learn in the field, alongside the community',
    'Internships, volunteering, group programs, and research placements with real local supervision — and a host-family experience that turns a placement into a relationship.',
    'Explore programs', '/programs/global-learning-exchange', null, null, 'water', 2, true),
  ('home', 'Community Empowerment & Development', 'Invest in change that communities sustain',
    'Fund and partner on locally owned solutions in renewable energy, environment, water, livelihoods, and inclusion — designed and delivered by the communities that lead them.',
    'Support our work', '/donate', 'Explore projects', '/projects', 'forest', 3, true),
  ('about', 'Who we are', 'A Ugandan NGO with local roots and global partnerships',
    'We work with rural and underserved communities to design sustainable, ethical, and locally owned development — combining community-led practice with global knowledge exchange.',
    'Meet the team', '/team', null, null, 'forest', 1, true),
  ('about', 'Our story', 'Lasting change, led by the communities living it',
    'From our home in Jinja, we''ve grown into a registered indigenous NGO working across districts — and a bridge between local innovation and learners worldwide.',
    'Our programs', '/programs', null, null, 'earth', 2, true),
  ('programs', 'Our programs', 'Two pillars, one mission',
    'FOSCOD advances community-led development and connects global learners to real field work — so local innovation and global knowledge strengthen each other.',
    'Find your program', '/programs/finder', null, null, 'water', 1, true),
  ('programs', 'Global Service Learning', 'Structured, supervised field experience in Uganda',
    'Internships, volunteering, group programs, and research across clean energy, WASH, livelihoods, health, and the environment.',
    'Learn more', '/programs/global-learning-exchange', null, null, 'forest', 2, true),
  ('impact', 'Field report · impact', 'Impact we can stand behind',
    'We publish verified numbers only. Where figures are still being confirmed in the field, we show them as drafts — we never display zeros.',
    'Read field stories', '/stories', null, null, 'earth', 1, true),
  ('impact', 'On the ground', 'Real change, measured honestly',
    'Clean energy that powers a livelihood, water that restores dignity, land regenerated with biochar — and the people behind every number.',
    'Grow verified impact', '/donate', null, null, 'water', 2, true),
  ('contact', 'Contact', 'Get in touch with FOSCOD',
    'Questions about programs, partnerships, donations, or community projects? Tell us a little about you and we''ll reply soon.',
    'Apply now', '/apply', 'Partner with us', '/partners', 'forest', 1, true),
  ('contact', 'We''re in Jinja', 'Let''s build something lasting, together',
    'Reach our team by email or phone, or stop by the office — we''d love to hear what you''re working on.',
    'Explore partnership', '/partners', null, null, 'water', 2, true),
  ('stories', 'Blog · stories from the field', 'Stories from the communities we serve',
    'Project updates, impact reports, alumni reflections, and host-family stories — straight from FOSCOD''s work across Uganda.',
    'Apply to a program', '/apply', null, null, 'earth', 1, true),
  ('stories', 'From the field', 'Real people, real change',
    'Read how community-led projects in clean energy, water, and livelihoods are taking shape — and the people behind them.',
    'See our impact', '/impact', null, null, 'forest', 2, true),
  ('apply', 'Get involved', 'Apply to join FOSCOD',
    'Start your internship, volunteer, or global service journey in Uganda. Choose the pathway that fits your goals, timeline, and field interests.',
    'Start your application', '#application-forms', 'View fees', '/programs/program-fees', 'water', 1, true),
  ('apply', 'Structured & supported', 'Field experience that means something',
    'Supervised placements, host families, and a clear application path — for students, professionals, and university groups.',
    'Find your program', '/programs/finder', null, null, 'earth', 2, true),
  ('global-learning-exchange', 'Global Learning & Exchange', 'Global Service Learning in Uganda',
    'Internships, volunteering, and global service trips that pair real community projects with structured, supervised field learning.',
    'Apply now', '/apply', 'Find your program', '/programs/finder', 'water', 1, true),
  ('global-learning-exchange', 'Learn by doing', 'Contribute to genuine community priorities',
    'Work alongside FOSCOD, host families, and local leaders on clean energy, WASH, livelihoods, health, and research.',
    'View fees', '/programs/program-fees', null, null, 'forest', 2, true),
  ('volunteer', 'Volunteer', 'Volunteer in Uganda with FOSCOD',
    'Work with communities — not just in communities — through structured volunteer programs that support local priorities and lasting impact.',
    'Apply to volunteer', '/apply', 'View fees', '/programs/program-fees', 'forest', 1, true),
  ('volunteer', 'Individual or group', 'Give your time where it lasts',
    'Join as an individual or bring a group — every placement is supervised, supported, and tied to a real community priority.',
    'Group volunteering', '/volunteer/group', 'Individual volunteering', '/volunteer/individual', 'water', 2, true),
  ('volunteer-group', 'Group volunteer program', 'Bring your team to the field',
    'University cohorts, faculty-led groups, and professional teams working a shared community project — with logistics and risk management handled.',
    'Apply today', '/apply', null, null, 'water', 1, true),
  ('volunteer-individual', 'Individual volunteer program', 'A placement matched to you',
    'One-to-one placements matched to your skills and the community''s needs, with local supervision and 24/7 support.',
    'Apply today', '/apply', null, null, 'forest', 1, true),
  ('internships', 'Internships', 'Sustainable development internships in Uganda',
    'Build real-world skills through supervised community projects across public health, clean energy, livelihoods, research, communications, and enterprise.',
    'Apply for an internship', '/apply', 'View fees', '/programs/program-fees', 'water', 1, true),
  ('internships', 'Hands-on & supervised', 'Turn theory into real contribution',
    'Individual placements, group engage internships, and university cohorts — all matched to your goals and supervised on the ground.',
    'Browse opportunities', '/internships/opportunities', null, null, 'earth', 2, true),
  ('internship-group', 'Group internship program', 'Bring your cohort to the field',
    'University cohorts and professional groups working a shared community project — with academic alignment, supervision, and safety handled.',
    'Apply today', '/apply', null, null, 'water', 1, true),
  ('internship-individual', 'Individual internship program', 'A placement matched to your goals',
    'One-to-one internships matched to your field, timeline, and career goals, with local supervision and a host-family experience.',
    'Apply today', '/apply', null, null, 'forest', 1, true),
  ('internships-opportunities', 'Internship opportunities', 'FOSCOD internship opportunities',
    'Browse live internship projects across WASH, health, nutrition, energy, agroforestry, research, ICT, communications, and more — and find the one that fits you.',
    'Apply now', '/apply', null, null, 'water', 1, true),
  ('volunteer-opportunities', 'Volunteer opportunities', 'FOSCOD volunteer opportunities',
    'Find a volunteer project where your time and skills make a real difference — across health, empowerment, education, and the environment.',
    'Apply now', '/apply', null, null, 'forest', 1, true)
on conflict (page_slug, order_column) do update set
  eyebrow = excluded.eyebrow, title = excluded.title, intro = excluded.intro,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href,
  cta2_label = excluded.cta2_label, cta2_href = excluded.cta2_href,
  tone = excluded.tone, visible = excluded.visible;

update public.hero_slides
set cta3_label = 'Support', cta3_href = '/donate'
where page_slug = 'home' and order_column = 1;

update public.hero_slides
set visible = false
where page_slug = 'home' and order_column > 1;

update public.hero_slides
set intro = 'From our base in Njeru Municipality, FOSCOD connects locally led development with ethical global learning and exchange.'
where page_slug = 'about' and order_column = 2;

update public.hero_slides
set intro = 'Questions about programs, partnerships, donations, or community projects? Tell us how the FOSCOD team can help.'
where page_slug = 'contact' and order_column = 1;

update public.hero_slides
set eyebrow = 'Visit or contact us',
    intro = 'Reach the team by email or phone, or visit Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District.'
where page_slug = 'contact' and order_column = 2;

update public.hero_slides
set title = 'Approved stories and updates',
    intro = 'FOSCOD publishes project updates, reports, and permissioned reflections after facts and consent are checked.'
where page_slug = 'stories' and order_column = 1;

update public.hero_slides
set visible = false
where page_slug in ('impact','stories') and order_column > 1;

-- ---------- team_members (verified leadership only) ----------
delete from public.team_members;
insert into public.team_members (name, role, category, short_bio, visible, order_column) values
  ('Mrs. Amanyire Margaret Nassozi', 'Executive Director', 'staff', 'Leads FOSCOD''s programs, operations, partnerships, and institutional development.', true, 1),
  ('Mr. Kayemba Patrick', 'Chairman, Board of Directors', 'board', 'Provides governance leadership as Chair of FOSCOD''s six-member Board of Directors.', true, 1)
on conflict do nothing;

-- ---------- about_content (mission, vision, values, leadership) ----------
delete from public.about_content;
insert into public.about_content (key, config, visible) values
  ('mission', '{
    "title": "Mission",
    "description": "To empower underserved communities to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange."
  }', true),
  ('vision', '{
    "title": "Vision",
    "description": "A world where local communities champion environmental stewardship and clean energy adoption, strengthened by global partnerships."
  }', true),
  ('values', '[
    {"title": "Integrated & Holistic Development", "body": "Health, livelihoods, environment, and learning advance together — not in silos.", "benchmark": "Programs connect education, health, economic empowerment, and environmental sustainability."},
    {"title": "Equity & Inclusion", "body": "Equal access for youth, women, people with disabilities, and marginalized households.", "benchmark": "50% women''s participation target across all initiatives."},
    {"title": "Community Ownership & Leadership", "body": "Locally led, culturally relevant; communities set the priorities.", "benchmark": "Communities define priorities and lead culturally appropriate, environmentally sound solutions."},
    {"title": "Sustainability & Innovation", "body": "Long-term impact, with renewable energy and stewardship at the centre.", "benchmark": "Programs invest in long-term, adaptive solutions rooted in local realities."},
    {"title": "Collaboration & Shared Learning", "body": "Cross-sector knowledge shared between communities, universities, and partners.", "benchmark": "Knowledge and solutions are co-created with communities, government, academia, and partners."},
    {"title": "Transparency & Accountability", "body": "Honest reporting and ethical management of every resource.", "benchmark": "Resources, performance, and impact are managed and communicated responsibly."},
    {"title": "Empowerment Through Learning", "body": "Knowledge as the catalyst for lasting change.", "benchmark": "2,500+ people trained in renewable energy technologies by 2030."}
  ]', true),
  ('leadership', '{
    "board": {
      "description": "A six-member Board of Directors provides strategic oversight, approves organizational strategy, and ensures accountability to the communities we serve.",
      "href": "/team#board",
      "cta": "View the board"
    },
    "team": {
      "description": "Our core staff team in Jinja designs, implements, and monitors programs across clean energy, WASH, livelihoods, health, and the environment.",
      "href": "/team#staff",
      "cta": "Meet the team"
    }
  }', true)
on conflict (key) do update set config = excluded.config, visible = excluded.visible;

-- ---------- impact-section stories (Impact page card grids) ----------
-- Segmented by category: Impact Story | Impact Video | Community Experience.
insert into public.stories (slug, title, category, excerpt, status, video_url, published_at) values
  ('clean-energy-livelihood', 'Clean energy that powers a livelihood', 'Impact Story',
    'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', 'draft', null, now()),
  ('water-dignity-resilience', 'Water, dignity, and resilience', 'Impact Story',
    'Protected springs and hygiene education across Busoga are reducing illness and restoring dignity.', 'draft', null, now()),
  ('regenerating-land-biochar', 'Regenerating land with biochar', 'Impact Story',
    'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', 'draft', null, now()),
  ('video-meet-our-host-families', 'Meet our host families', 'Impact Video',
    'A short film on the families who open their homes to every cohort.', 'draft', '', now()),
  ('video-a-project-handover', 'A project handover', 'Impact Video',
    'What it looks like when a community takes full ownership of its work.', 'draft', '', now()),
  ('video-cohort-debrief-2025', 'Cohort debrief 2025', 'Impact Video',
    'This year''s interns on what they built and learned across four districts.', 'draft', '', now()),
  ('community-opening-our-home', 'Opening our home', 'Community Experience',
    'A host family on what welcoming international learners has meant for them.', 'draft', null, now()),
  ('community-savings-group', 'What the savings group changed', 'Community Experience',
    'Members of a VSLA on building income and resilience together.', 'draft', null, now()),
  ('community-co-designing', 'Co-designing a project', 'Community Experience',
    'A local leader on setting the priorities — and seeing them delivered.', 'draft', null, now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  status = excluded.status, video_url = excluded.video_url;

delete from public.stories where slug in (
  'celebrating-our-host-families','solar-powered-salon-naluvule','internship-debrief-2025',
  'clean-energy-livelihood','water-dignity-resilience','regenerating-land-biochar',
  'video-meet-our-host-families','video-a-project-handover','video-cohort-debrief-2025',
  'community-opening-our-home','community-savings-group','community-co-designing'
);

-- Program dates are intentionally left empty until confirmed intakes are added in the CMS.
delete from public.program_dates;

-- ---------- blog stories (editorial — shown in the Blog feed) ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('water-is-life-lubani', 'Water is Life: a protected spring in Lubani', 'Project Updates',
    'How a single protected spring is changing daily life for an entire village.', 'draft', now()),
  ('kalagala-greening-project', 'Greening Kalagala, one tree at a time', 'Project Updates',
    'Agroforestry and tree-planting that restore soil while growing local income.', 'draft', now()),
  ('unverified-university-partnership', 'University partnership draft', 'Alumni Reflections',
    'This draft remains unpublished until its institution, consent, and outcomes are verified.', 'draft', now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt, status = excluded.status;

delete from public.stories where slug in (
  'water-is-life-lubani','unverified-university-partnership','kalagala-greening-project'
);

-- ---------- opportunities (internship & volunteer project opportunities) ----------
insert into public.opportunities
  (slug, title, type, category, location, duration, excerpt, about, highlights, requirements, why_choose, sdgs, status, order_column) values
  ('wash-public-health-internship', 'WASH & Public Health Internship', 'internship', 'WASH & Health',
    'Naluvule Village, Buikwe District', '4 – 16 weeks (flexible)',
    'Improve household water, sanitation, and hygiene practices in rural communities. Work directly with families and schools to promote healthier living.',
    E'This internship contributes to improving household water, sanitation, and hygiene (WASH) practices in Naluvule Village, with the goal of reducing water-borne diseases and strengthening community resilience.\n\nThe project is aligned with Uganda''s national health and sanitation policies and Vision 2040.',
    '["Conduct baseline assessments on household WASH practices.","Co-design hygiene promotion campaigns in schools and households.","Facilitate community dialogues on safe water and sanitation.","Document community water access improvements."]'::jsonb,
    '["Background or interest in public health, WASH, or environmental health.","Comfort with community outreach and basic data collection.","Cultural sensitivity and willingness to travel to rural sites."]'::jsonb,
    '["Gain hands-on experience in rural WASH programming.","Develop field research and behaviour-change skills.","Contribute directly to Uganda''s national WASH goals."]'::jsonb,
    '["SDG 3 · Good Health & Well-Being","SDG 6 · Clean Water & Sanitation","SDG 7 · Affordable & Clean Energy"]'::jsonb,
    'draft', 1),
  ('clean-water-initiative', 'Clean Water Initiative', 'internship', 'WASH & Health', 'Kampala, Uganda', '12 weeks',
    'Provide clean drinking water to rural communities through sustainable water-purification systems and community education.',
    'The Clean Water Initiative expands access to safe drinking water through low-cost purification systems, protected sources, and community education.',
    '["Support installation and monitoring of water-purification systems.","Train households and schools on safe storage.","Map water points and track access improvements."]'::jsonb,
    '["Interest in water engineering, public health, or environmental science.","Willingness to work in the field.","Basic data-collection skills."]'::jsonb,
    '["Work on a tangible, life-changing intervention.","Build skills in WASH systems and mobilisation.","Contribute to measurable water-access gains."]'::jsonb,
    '["SDG 6 · Clean Water & Sanitation","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'draft', 2),
  ('agroforestry-livelihoods-internship', 'Agroforestry & Livelihoods Internship', 'internship', 'Agroforestry',
    'Buikwe District, Uganda', '2 – 4 months',
    'Support community agroforestry and tree-based livelihoods. Promote climate-resilient practices and restore degraded land.',
    'Interns support agroforestry and tree-based livelihoods that restore degraded land while growing local income.',
    '["Support tree-planting, nurseries, and demonstrations.","Promote climate-resilient farming.","Track land restoration and livelihood outcomes."]'::jsonb,
    '["Interest in agriculture, forestry, or environmental science.","Willingness to work outdoors.","Basic monitoring skills."]'::jsonb,
    '["Work at the intersection of climate and livelihoods.","Build agroforestry and enterprise skills.","Help restore land and grow income."]'::jsonb,
    '["SDG 13 · Climate Action","SDG 1 · No Poverty","SDG 15 · Life on Land"]'::jsonb,
    'draft', 3),
  ('community-economic-empowerment-internship', 'Community Economic Empowerment Internship', 'internship', 'Economic Empowerment',
    'Buikwe District, Uganda', '2 – 4 months',
    'Strengthen grassroots economic empowerment through savings groups, green enterprise, and entrepreneurship.',
    'This internship strengthens economic empowerment through VSLAs, microenterprise support, and green entrepreneurship.',
    '["Support VSLA formation and training.","Mentor small enterprises on planning and finance.","Track savings and enterprise outcomes."]'::jsonb,
    '["Interest in economics, business, or community development.","Comfort facilitating group trainings.","Basic financial literacy."]'::jsonb,
    '["See economic empowerment at the grassroots.","Build facilitation and enterprise skills.","Contribute to household resilience."]'::jsonb,
    '["SDG 1 · No Poverty","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'draft', 4),
  ('research-baseline-survey-internship', 'Research & Baseline Survey Internship', 'internship', 'Research',
    'Buikwe District, Uganda', '4 months',
    'Work with communities to generate credible evidence on WASH and livelihoods. Findings inform project design.',
    'Interns generate credible evidence through community-based participatory research — surveys, monitoring, and analysis that inform project design.',
    '["Design and run community baseline surveys.","Clean, analyse, and visualise data.","Produce findings that shape design."]'::jsonb,
    '["Background in research methods or social science.","Comfort with data tools.","Attention to detail and research ethics."]'::jsonb,
    '["Practise real applied field research.","See how evidence shapes programming.","Build a research portfolio."]'::jsonb,
    '["SDG 17 · Partnerships for the Goals","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'draft', 5),
  ('energy-saving-stove-project', 'Energy Saving Stove Project', 'internship', 'Renewable Energy',
    'Njeru Municipality, Buikwe', '2 – 4 months',
    'Equip schools and communities with improved stove technology that saves energy, improves health, and mitigates deforestation.',
    'Interns support the roll-out of improved, energy-saving cookstoves — cutting wood use, reducing smoke exposure, and easing pressure on forests.',
    '["Support stove installation and demonstrations.","Train households and schools on use.","Track fuel savings and health benefits."]'::jsonb,
    '["Interest in renewable energy or environmental science.","Practical, hands-on attitude.","Comfort working with schools."]'::jsonb,
    '["Work on clean-energy tech that scales.","See health, climate, and cost benefits.","Build clean-energy experience."]'::jsonb,
    '["SDG 7 · Affordable & Clean Energy","SDG 13 · Climate Action"]'::jsonb,
    'draft', 6),
  ('community-health-outreach-volunteer', 'Community Health Outreach', 'volunteer', 'WASH & Health',
    'Buikwe District, Uganda', '4 – 12 weeks',
    'Support community health outreach — hygiene promotion, screening days, and health education alongside local health workers.',
    'Volunteers support community health outreach — hygiene promotion, screening days, and health education — alongside local health workers.',
    '["Support outreach and health-education sessions.","Assist with community screening days.","Promote hygiene and disease prevention."]'::jsonb,
    '["Interest in community or public health.","Warmth, patience, and cultural sensitivity.","Willingness to travel to rural sites."]'::jsonb,
    '["Make a direct difference to community health.","Work with local health workers.","Gain grassroots public-health experience."]'::jsonb,
    '["SDG 3 · Good Health & Well-Being","SDG 6 · Clean Water & Sanitation"]'::jsonb,
    'draft', 7),
  ('womens-empowerment-enterprise-volunteer', 'Women''s Empowerment & Enterprise', 'volunteer', 'Economic Empowerment',
    'Njeru Municipality, Buikwe', '4 – 12 weeks',
    'Support women''s savings groups and enterprise training — building income, confidence, and leadership.',
    'Volunteers support women''s savings groups and enterprise training — building income, confidence, and leadership through VSLAs and mentorship.',
    '["Support VSLA meetings and training.","Mentor women-led enterprises.","Encourage leadership and confidence."]'::jsonb,
    '["Interest in women''s empowerment or enterprise.","Good facilitation and people skills.","Respect for community leadership."]'::jsonb,
    '["See empowerment in action.","Build facilitation and mentoring skills.","Support lasting change for women."]'::jsonb,
    '["SDG 5 · Gender Equality","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'draft', 8)
on conflict (slug) do update set
  title = excluded.title, type = excluded.type, category = excluded.category,
  location = excluded.location, duration = excluded.duration, excerpt = excluded.excerpt,
  about = excluded.about, highlights = excluded.highlights, requirements = excluded.requirements,
  why_choose = excluded.why_choose, sdgs = excluded.sdgs, status = excluded.status,
  order_column = excluded.order_column;

-- ---------- testimonials / alumni reviews ----------
delete from public.testimonials;
insert into public.testimonials (name, cohort, program, quote, permission, status, order_column) values
  ('Testimonial draft 1', null, null,
    'Draft testimonial awaiting source verification and renewed publication consent.', false, 'draft', 1),
  ('Testimonial draft 2', null, null,
    'Draft testimonial awaiting source verification and renewed publication consent.', false, 'draft', 2),
  ('Testimonial draft 3', null, null,
    'Draft testimonial awaiting source verification and renewed publication consent.', false, 'draft', 3)
on conflict do nothing;

-- Structural examples are removed until consented testimonials are supplied.
delete from public.testimonials;

-- ---------- homepage: talking-about-us ----------
insert into public.home_talking_about_us (eyebrow, title, intro, cta_label, cta_href, visible) values
  ('Who we are', 'FOSCOD in context',
    'FOSCOD is a registered Ugandan NGO working alongside communities in Buikwe District and beyond. We bridge locally led development with ethical global learning and exchange — on clean energy, water, livelihoods, health, and the environment.',
    'Read our story', '/about', true)
on conflict (id) do update set
  eyebrow = excluded.eyebrow, title = excluded.title, intro = excluded.intro,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href, visible = excluded.visible;

-- ---------- homepage: how-you-can-get-involved cards ----------
insert into public.home_involvement_cards (title, body, href, cta_label, icon, visible, order_column) values
  ('Volunteer intern', 'Join a supervised placement matched to your skills and a community-defined priority — with local support, host families, and structured learning outcomes.', '/apply', 'Explore internships', '🌱', true, 1),
  ('Partner with us', 'Co-design research, funding, or delivery partnerships around real community priorities — with roles, safeguards, and evidence agreed from the start.', '/partners', 'Partner with FOSCOD', '🤝', true, 2),
  ('Donate to our project', 'Support a named project or priority with verified need, approved transfer routes, and transparent reporting — starting with a giving inquiry.', '/donate', 'Start a giving inquiry', '💚', true, 3)
on conflict (id) do update set
  title = excluded.title, body = excluded.body, href = excluded.href,
  cta_label = excluded.cta_label, icon = excluded.icon, visible = excluded.visible, order_column = excluded.order_column;

-- ---------- homepage: audience-paths cards ("Find your way into the work") ----------
insert into public.home_audience_paths (title, body, href, cta, kicker, image_url, image_alt, visible, order_column) values
  ('Students & early-career professionals', 'Build practical experience through a supervised internship or volunteer placement connected to a community-defined priority.', '/internships', 'Explore internships', 'Your pathway', '/images/audience/students.jpg', 'Interns in the field', true, 1),
  ('Universities & research teams', 'Co-design field learning, faculty-led programs, or community-based research around academic outcomes and local value.', '/partners', 'Discuss an academic partnership', 'Your pathway', '/images/audience/universities.jpg', 'University partnership in action', true, 2),
  ('Funders & technical partners', 'Support a defined program or project with agreed outcomes, evidence requirements, roles, and reporting milestones.', '/partners', 'Explore partnership options', 'Your pathway', '/images/audience/funders.jpg', 'Partnership planning session', true, 3),
  ('Community & public-sector partners', 'Bring local priorities, implementation knowledge, coordination, and accountability into a shared program design.', '/contact', 'Start a local conversation', 'Your pathway', '/images/audience/community.jpg', 'Community co-design meeting', true, 4)
on conflict (id) do update set
  title = excluded.title, body = excluded.body, href = excluded.href,
  cta = excluded.cta, kicker = excluded.kicker,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- homepage: responsible-engagement steps ("What responsible collaboration means here") ----------
insert into public.home_responsible_engagement (title, body, image_url, image_alt, visible, order_column) values
  ('Community direction', 'Priorities are identified with communities and local partners before participant or funder activity is designed.', '/images/responsible/community-direction.jpg', 'Community priority-setting workshop', true, 1),
  ('Right role, right support', 'People are matched to work that fits their skills, preparation, safeguarding requirements, and the supervision available.', '/images/responsible/roles.jpg', 'Matching volunteers with local roles', true, 2),
  ('Useful work and shared learning', 'Each engagement should produce value for the community as well as learning for the participant or institution.', '/images/responsible/shared-learning.jpg', 'Community and participant sharing insights', true, 3),
  ('Evidence with consent', 'FOSCOD separates verified results from future targets and publishes personal stories only when consent is recorded.', '/images/responsible/evidence.jpg', 'Reviewing impact data with consent forms', true, 4)
on conflict (id) do update set
  title = excluded.title, body = excluded.body,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- CEDP landing page: areas of focus ----------
insert into public.cedp_areas_of_focus (title, description, image_url, image_alt, cta_label, cta_href, visible, order_column) values
  ('Clean energy and climate resilience', 'Clean cooking, solar energy, e-mobility, environment conservation, climate adaptation, and related climate initiatives that build community resilience.', '/images/cedp/clean-energy.jpg', 'Solar panels and clean cookstoves in a rural Ugandan homestead', 'Explore clean energy projects', '/programs/cedp/areas/clean-energy-climate-resilience', true, 1),
  ('Water sanitation and healthy communities', 'Safe water, spring protection, sanitation, hygiene, water systems, and related community health and environment practices.', '/images/cedp/water.jpg', 'Community members protecting a natural water spring', 'Explore water projects', '/programs/cedp/areas/water-sanitation-health-communities', true, 2),
  ('Sustainable livelihoods and economic empowerment', 'VSLAs, women enterprises, climate-smart agriculture, kitchen gardens, green businesses, and other livelihood opportunities.', '/images/cedp/livelihoods.jpg', 'Women''s savings group meeting with green enterprise training', 'Explore livelihood projects', '/programs/cedp/areas/sustainable-livelihoods-economic-empowerment', true, 3)
on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  cta_label = excluded.cta_label, cta_href = excluded.cta_href,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- CEDP landing page: process steps ("From priority to ownership") ----------
insert into public.cedp_process_steps (title, subtitle, description, image_url, image_alt, visible, order_column) values
  ('Community assessment', 'Local ownership', 'We start by listening — mapping needs and assets together with residents.', '/images/cedp/community-assessment.jpg', 'Participatory community mapping session with residents', true, 1),
  ('Asset-based co-design', 'Local ownership', 'Solutions are designed with communities, not imposed — using local knowledge and resources.', '/images/cedp/co-design.jpg', 'Community co-design workshop with facilitators', true, 2),
  ('Implementation', 'Local ownership', 'Delivered with local organizations, global participants, and 25% community co-contribution.', '/images/cedp/implementation.jpg', 'Community and volunteers building a solar-powered water system together', true, 3)
on conflict (id) do update set
  title = excluded.title, subtitle = excluded.subtitle,
  description = excluded.description, image_url = excluded.image_url,
  image_alt = excluded.image_alt, visible = excluded.visible,
  order_column = excluded.order_column;

-- ---------- CEDP landing page: impact story cards ("Impacts" section) ----------
insert into public.cedp_impact_stories (title, excerpt, image_url, image_alt, href, project_slug, cta_label, visible, order_column) values
  ('Solar-powered salon in Naluvule', 'A solar-powered salon turned an unreliable income into a growing business — clean energy powering livelihoods.', '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village', '/projects/solar-powered-water-system-naluvule', 'solar-powered-water-system-naluvule', 'Read the story', true, 1),
  ('Greening Kalagala, one tree at a time', 'Agroforestry and tree-planting restore soil, grow local income, and protect the forest edge.', '/images/cedp/impacts/greening-kalagala.jpg', 'Community tree planting in Kalagala Parish', '/projects/greening-kalagala', 'greening-kalagala', 'Read the story', true, 2),
  ('Coffee farming mobilization', 'Community mobilization around coffee farming and resilient local livelihoods in Kalagala Parish.', '/images/cedp/impacts/coffee.jpg', 'Farmers sorting and processing coffee in Kalagala', '/projects/coffee-farming-mobilization', 'coffee-farming-mobilization', 'Read the story', true, 3)
on conflict (id) do update set
  title = excluded.title, excerpt = excluded.excerpt,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  href = excluded.href, project_slug = excluded.project_slug,
  cta_label = excluded.cta_label, visible = excluded.visible,
  order_column = excluded.order_column;

-- ---------- CEDP landing page: impact cards (replacing figures/stats) ----------
insert into public.cedp_impact_cards (title, excerpt, image_url, image_alt, href, project_slug, cta_label, verified_outcome, visible, order_column) values
  ('Clean energy that powers a livelihood', 'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village', '/projects/solar-powered-water-system-naluvule', 'solar-powered-water-system-naluvule', 'Read the story', '3 households gained reliable evening lighting and new income streams', true, 1),
  ('Protected springs and hygiene education', 'Across Busoga, protected water springs and hygiene education are reducing illness and restoring dignity.', '/images/cedp/impacts/protected-spring.jpg', 'Community members protecting a natural water spring', '/projects/water-spring-protection-naluvule', 'water-spring-protection-naluvule', 'Read the story', 'Water access improved for 120 households with 86% sustained use after 12 months', true, 2),
  ('Regenerating land with biochar', 'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', '/images/cedp/impacts/biochar.jpg', 'Community producing biochar from water hyacinth', '/projects/carbon-credit-project', 'carbon-credit-project', 'Read the story', '0.5 hectares of degraded land restored with 500 biochar units produced', true, 3)
on conflict (id) do update set
  title = excluded.title, excerpt = excluded.excerpt,
  image_url = excluded.image_url, image_alt = excluded.image_alt,
  href = excluded.href, project_slug = excluded.project_slug,
  cta_label = excluded.cta_label, verified_outcome = excluded.verified_outcome,
  visible = excluded.visible, order_column = excluded.order_column;

-- ---------- CEDP sub-program area landing pages ----------
insert into public.cedp_areas (slug, title, subtitle, description, hero_image_url, hero_image_alt, tone, hero_cta_1_label, hero_cta_1_href, hero_cta_2_label, hero_cta_2_href, hero_cta_3_label, hero_cta_3_href, get_involved_cards, order_column, visible, meta_title, meta_description) values
  ('clean-energy-climate-resilience',
   'Clean Energy & Climate Resilience',
   'CEDP — Strategic Goals 1, 2 & 6',
   'Solar energy, clean cooking, e-mobility, ecosystem restoration, and climate adaptation converge to build community resilience against climate impacts in Kalagala Parish. CEDP links clean-energy access with forest stewardship and carbon finance so solutions are durable, locally owned, and evidence-verified.',
   '/images/cedp/clean-energy.jpg', 'Solar panels and clean cookstoves in a rural Ugandan homestead', 'forest',
   'Support clean energy', '/donate?program=green-skills',
   'Explore projects', '/projects?theme=Clean+Energy',
   'Partner on climate resilience', '/partners',
   '[{"title":"Volunteer intern","body":"Join a supervised placement in solar energy, clean cooking, or ecosystem restoration — with local support and a host-family experience.","href":"/apply","ctaLabel":"Explore internships","icon":"☀️"},{"title":"Partner with us","body":"Co-design clean-energy, climate, or carbon-finance partnerships around real community priorities with agreed roles and evidence.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"🤝"},{"title":"Donate to clean energy","body":"Fund solar installations, clean cookstoves, tree planting, and climate-resilience infrastructure with transparent reporting.","href":"/donate?program=green-skills","ctaLabel":"Start a giving inquiry","icon":"💚}"]',
   1, true,
   'Clean Energy & Climate Resilience | CEDP — FOSCOD',
   'Solar energy, clean cooking, ecosystem restoration, and climate adaptation in Kalagala Parish. Community-led, evidence-verified development.'),

  ('water-sanitation-health-communities',
   'Water, Sanitation & Health Communities',
   'CEDP — Strategic Goal 3',
   'Safe water, spring protection, sanitation, hygiene, and water-system governance are foundational to health and development. In Kalagala Parish, CEDP works with five communities to install and sustain community-owned water infrastructure, protect natural springs, and build local capacity for long-term maintenance.',
   '/images/cedp/water.jpg', 'Community members protecting a natural water spring', 'water',
   'Support WASH work', '/donate?program=wash',
   'Explore water projects', '/projects?theme=WASH',
   'Partner on WASH', '/partners',
   '[{"title":"Volunteer intern","body":"Work on safe-water infrastructure, sanitation campaigns, or hygiene education with full local supervision and 24/7 support.","href":"/apply","ctaLabel":"Explore internships","icon":"🚰"},{"title":"Partner with us","body":"Co-design WASH infrastructure, governance training, or water-quality monitoring partnerships with local committees and technical teams.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"🤝"},{"title":"Donate to WASH","body":"Support spring protection, solar-powered water systems, sanitation facilities, or hygiene-promotion campaigns.","href":"/donate?program=wash","ctaLabel":"Start a giving inquiry","icon":"💧}"]',
   2, true,
   'Water, Sanitation & Health Communities | CEDP — FOSCOD',
   'Safe water, spring protection, sanitation, and hygiene in Kalagala Parish. Community-owned water infrastructure and health programs.'),

  ('sustainable-livelihoods-economic-empowerment',
   'Sustainable Livelihoods & Economic Empowerment',
   'CEDP — Strategic Goals 4 & 5',
   'Savings groups, women-led enterprises, climate-smart agriculture, kitchen gardens, and green business incubation grow inclusive local economies. CEDP connects environmental stewardship with income security so communities can sustain themselves and adapt to climate variability.',
   '/images/cedp/livelihoods.jpg', 'Women''s savings group meeting with green enterprise training', 'earth',
   'Support green livelihoods', '/donate?program=livelihoods',
   'Explore livelihood projects', '/projects?theme=Green+Livelihoods',
   'Partner on enterprise', '/partners',
   '[{"title":"Volunteer intern","body":"Support climate-smart agriculture, green enterprise incubation, or women''s economic empowerment programs with field-based supervision.","href":"/apply","ctaLabel":"Explore internships","icon":"🌱"},{"title":"Partner with us","body":"Co-design enterprise-development, market-linkage, or financial-inclusion partnerships around community-identified opportunities.","href":"/partners","ctaLabel":"Partner with FOSCOD","icon":"🤝"},{"title":"Donate to livelihoods","body":"Fund seed grants, savings groups, climate-smart agriculture, or green enterprise incubation with transparent community-led oversight.","href":"/donate?program=livelihoods","ctaLabel":"Start a giving inquiry","icon":"💚}"]',
   3, true,
   'Sustainable Livelihoods & Economic Empowerment | CEDP — FOSCOD',
   'Savings groups, women-led enterprises, climate-smart agriculture, and green business incubation in Kalagala Parish.')
on conflict (slug) do update set
  title = excluded.title, subtitle = excluded.subtitle, description = excluded.description,
  hero_image_url = excluded.hero_image_url, hero_image_alt = excluded.hero_image_alt,
  tone = excluded.tone,
  hero_cta_1_label = excluded.hero_cta_1_label, hero_cta_1_href = excluded.hero_cta_1_href,
  hero_cta_2_label = excluded.hero_cta_2_label, hero_cta_2_href = excluded.hero_cta_2_href,
  hero_cta_3_label = excluded.hero_cta_3_label, hero_cta_3_href = excluded.hero_cta_3_href,
  get_involved_cards = excluded.get_involved_cards,
  order_column = excluded.order_column, visible = excluded.visible,
  meta_title = excluded.meta_title, meta_description = excluded.meta_description;

-- ---------- CEDP area: clean-energy projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'solar-powered-water-system-naluvule'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'carbon-credit-project'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: water projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'water-spring-protection-naluvule'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'solar-powered-water-system-naluvule'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: livelihoods projects ----------
insert into public.cedp_area_projects (area_id, project_id, custom_cta_label, order_column) values
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'coffee-farming-mobilization'),
   'Read more about the project', 1),
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'greening-kalagala'),
   'Read more about the project', 2),
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   (select id from public.projects where slug = 'carbon-credit-project'),
   'Read more about the project', 3)
on conflict (area_id, project_id) do update set
  custom_cta_label = excluded.custom_cta_label, order_column = excluded.order_column;

-- ---------- CEDP area: clean-energy impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Solar-powered salon in Naluvule',
   'A solar-powered salon turned an unreliable income into a growing business — clean energy powering livelihoods.',
   '/images/cedp/impacts/solar-salon.jpg', 'Solar-powered hair salon in Naluvule village',
   'In Naluvule, a community member used a shared solar microgrid to power a hair salon. Reliable evening electricity opened evenings for clients and enabled a small fridge for beauty products. Within a year, the salon doubled its customer base and the owner hired two apprentices.',
   '/projects/solar-powered-water-system-naluvule', 'Read more',
   '3 households gained reliable evening lighting and new income streams', 1, true),

  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Biochar from water hyacinth',
   'Invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.',
   '/images/cedp/impacts/biochar.jpg', 'Community producing biochar from water hyacinth',
   'Women''s groups in Kalagala collect water hyacinth from local waterways, dry it, and produce biochar. The biochar improves soil fertility and is used as a clean-cooking fuel, reducing firewood demand while creating a modest saleable product.',
   '/projects/carbon-credit-project', 'Read more',
   '0.5 hectares of degraded land restored with 500 biochar units produced', 2, true),

  ((select id from public.cedp_areas where slug = 'clean-energy-climate-resilience'),
   'Native tree planting along forest edge',
   'Community tree planting along the Mabira Forest edge rebuilds degraded land and protects watersheds.',
   '/images/cedp/impacts/forest-edge.jpg', 'Community tree planting at the forest edge',
   'Through the Greening Kalagala campaign, communities planted native species along forest boundaries. Seedlings are maintained by village conservation groups with monitoring led by local youth.',
   '/projects/greening-kalagala', 'Read more',
   '2,000+ native trees planted across 5 hectares of forest edge', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- CEDP area: water impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'Protected spring in Naluvule',
   'Community protection of a natural spring improved water access and quality for 120 households.',
   '/images/cedp/impacts/protected-spring.jpg', 'Community members protecting a natural water spring',
   'Residents of Naluvule fenced and gated a natural spring, built a collection chamber, and established a water user committee to manage upkeep. Water-quality tests showed a 90% reduction in E. coli after three months of protected use.',
   '/projects/water-spring-protection-naluvule', 'Read more',
   'Water access improved for 120 households with 86% sustained use after 12 months', 1, true),

  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'Solar-powered water system',
   'A solar pump linked to a community distribution network gives reliable water access without grid dependence.',
   '/images/cedp/impacts/solar-water.jpg', 'Solar-powered borehole pump with storage tanks',
   'FOSCOD installed a solar-powered borehole pump in Naluvule with storage tanks and a piped distribution network. The system is owned and maintained by a trained community water committee.',
   '/projects/solar-powered-water-system-naluvule', 'Read more',
   '240 people access treated water daily with 95% uptime in first year', 2, true),

  ((select id from public.cedp_areas where slug = 'water-sanitation-health-communities'),
   'CLTS across five communities',
   'Community-Led Total Sanitation campaigns improved latrine coverage and hygiene behaviour.',
   '/images/cedp/impacts/clts.jpg', 'Community hygiene education session',
   'Through facilitated community dialogues, all five Kalagala Parish communities constructed improved latrines and adopted consistent handwashing practices at critical times.',
   '/projects/greening-kalagala', 'Read more',
   'Open defecation eliminated across 5 communities; 80% handwashing observed at critical times', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- CEDP area: livelihoods impact cards ----------
insert into public.cedp_area_impacts (area_id, title, excerpt, image_url, image_alt, story, href, cta_label, verified_outcome, order_column, visible) values
  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Coffee farming mobilization',
   'Farmer groups adopted climate-smart practices, improving yields and quality while reducing input costs.',
   '/images/cedp/impacts/coffee.jpg', 'Farmers sorting and processing coffee in Kalagala',
   'Through participatory training, coffee farmers in Kalagala adopted shade-grown intercropping, post-harvest handling improvements, and direct-markets connections. Average yields rose 22% in the first season.',
   '/projects/coffee-farming-mobilization', 'Read more',
   '86 farmers trained; 15% average yield increase reported', 1, true),

  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Women-led green enterprises',
   'Savings groups turned green enterprise ideas into small businesses — from stove production to eco-tourism.',
   '/images/cedp/impacts/women-enterprise.jpg', 'Women''s enterprise training session',
   'Women''s savings groups received enterprise training, micro-grants, and mentorship. Graduates launched stove-production units, kitchen-garden supply kiosks, and community eco-tourism guiding.',
   '/projects/carbon-credit-project', 'Read more',
   '3 women-led enterprises registered; 12 jobs created in first 8 months', 2, true),

  ((select id from public.cedp_areas where slug = 'sustainable-livelihoods-economic-empowerment'),
   'Agroforestry in coffee plots',
   'Farmers integrated native trees into coffee plots, improving soil health and creating a second income.',
   '/images/cedp/impacts/agroforestry.jpg', 'Coffee farm with intercropped fruit and timber trees',
   'Through the Greening Kalagala campaign, farmers intercropped coffee with indigenous fruit and timber trees. The trees provide shade, prevent erosion, and generate additional income from fruit and timber sales.',
   '/projects/greening-kalagala', 'Read more',
   '42 farms adopted agroforestry; soil organic matter increased 18%', 3, true)
on conflict (area_id, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  story = excluded.story, href = excluded.href, cta_label = excluded.cta_label,
  verified_outcome = excluded.verified_outcome, order_column = excluded.order_column, visible = excluded.visible;

-- ---------- project_activities (individual project detail page) ----------
delete from public.project_activities;
insert into public.project_activities (project_slug, title, description, image_alt, order_column, visible) values
  ('solar-powered-water-system-naluvule', 'Community needs assessment',
   'FOSCOD and the Naluvule community conducted a joint field survey mapping water access points, daily water-collection patterns, and existing energy sources. The assessment established a 25% community co-contribution agreement and identified the solar-borehole site at the village edge as the priority location.',
   'Community mapping water points during needs assessment', 1, true),
  ('solar-powered-water-system-naluvule', 'Solar system design & procurement',
   'Engineers from FOSCOD and a technical partner designed a 3 kW solar array to power a 7.5 HP submersible pump capable of delivering 40,000 litres per day. The system includes a 5,000 L overhead tank, a gravity-feed manifold, and kiosk connections to six distribution points across the village. All equipment was locally sourced where possible.',
   'Solar panel array and pump schematic', 2, true),
  ('solar-powered-water-system-naluvule', 'Installation & community training',
   'Over eight weeks, local technicians and village volunteers installed the solar array, drilled the borehole, and constructed the tank foundation. A three-day train-the-trainer workshop certified twelve community members in basic solar maintenance, pump servicing, and financial record-keeping for the water user committee.',
   'Community technicians installing solar panels', 3, true),
  ('solar-powered-water-system-naluvule', 'System commissioning & handover',
   'The solar-powered water system was officially handed over to the Naluvule Water User Committee in a village ceremony attended by local government officials, the FOSCOD team, and community elders. A maintenance register, spare-parts fund, and quarterly inspection schedule were established to guarantee long-term sustainability.',
   'Handover ceremony with community and FOSCOD representatives', 4, true)
on conflict (project_slug, title) do update set
  description = excluded.description, image_url = excluded.image_url, image_alt = excluded.image_alt,
  order_column = excluded.order_column, visible = excluded.visible;

-- ---------- project_impacts (individual project detail page carousel) ----------
delete from public.project_impacts;
insert into public.project_impacts (project_slug, title, excerpt, image_alt, verified_outcome, story_slug, cta_label, order_column, visible) values
  ('solar-powered-water-system-naluvule', 'Solar-powered salon in Naluvule',
   'A solar-powered hair salon turned an unreliable income into a growing business — clean energy powering livelihoods.',
   'Salon owner working under solar-powered lighting',
   '3 households gained reliable evening lighting and new income streams',
   'solar-powered-salon-naluvule', 'Read the impact story', 1, true),
  ('solar-powered-water-system-naluvule', 'Reliable water access for 240 people',
   'The community solar borehole delivers treated water daily with 95% uptime in its first year — eliminating the need for long water-collection trips.',
   'Children filling jerrycans at the solar-powered water kiosk',
   '240 people access treated water daily with 95% system uptime',
   'naluvule-water-access', 'Read the impact story', 2, true),
  ('solar-powered-water-system-naluvule', 'Youth technical skills program',
   'Twelve community members were certified in solar PV installation and pump maintenance, creating a local technical workforce.',
   'Graduating youth technicians in solar training workshop',
   '12 technicians trained; 8 employed within 6 months',
   'naluvule-youth-tech', 'Read the impact story', 3, true)
on conflict (project_slug, title) do update set
  excerpt = excluded.excerpt, image_url = excluded.image_url, image_alt = excluded.image_alt,
  verified_outcome = excluded.verified_outcome, story_slug = excluded.story_slug,
  cta_label = excluded.cta_label, order_column = excluded.order_column, visible = excluded.visible;

