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
  ('contact_phone', '"+256 753 449 450"', 'contact'),
  ('contact_location', '"Jinja, Uganda"', 'contact'),
  ('social_facebook', '"https://facebook.com/foscod"', 'contact'),
  ('social_instagram', '"https://instagram.com/foscod"', 'contact'),
  ('social_linkedin', '"https://linkedin.com/company/foscod"', 'contact'),
  ('brand_accent', '"#10474c"', 'branding'),
  ('brand_water', '"#10474c"', 'branding'),
  ('brand_gold', '"#d99a24"', 'branding'),
  ('brand_bg', '"#ffffff"', 'branding'),
  ('brand_ink', '"#16241f"', 'branding'),
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

-- ---------- hero_slides (rotating hero per landing page) ----------
insert into public.hero_slides (page_slug, eyebrow, title, intro, cta_label, cta_href, cta2_label, cta2_href, tone, order_column, visible) values
  ('home', 'Registered Ugandan NGO · Jinja', 'Bridging global learning with local innovation',
    'Community-led development across rural Uganda — clean energy, water, the environment, and livelihoods — paired with hands-on learning for students, researchers, and partners.',
    'Apply for a program', '/apply', 'Partner with FOSCOD', '/partners', 'earth', 1, true),
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

-- ---------- team_members (staff + board placeholders) ----------
insert into public.team_members (name, role, category, short_bio, visible, order_column) values
  ('Programs & Operations Lead', 'Staff', 'staff', 'Coordinates FOSCOD programs and field operations from Jinja.', true, 1),
  ('Global Learning Coordinator', 'Staff', 'staff', 'Supports interns, volunteers, and university cohorts on the ground.', true, 2),
  ('Community Engagement Officer', 'Staff', 'staff', 'Works with local leaders and host families across our districts.', true, 3),
  ('Board Chairperson', 'Board of Directors', 'board', 'Guides FOSCOD''s governance, ethics, and long-term strategy.', true, 1),
  ('Board Member — Finance', 'Board of Directors', 'board', 'Oversees transparency and accountability in financial reporting.', true, 2),
  ('Board Member — Partnerships', 'Board of Directors', 'board', 'Strengthens FOSCOD''s academic and funding partnerships.', true, 3)
on conflict do nothing;

-- ---------- impact-section stories (Impact page card grids) ----------
-- Segmented by category: Impact Story | Impact Video | Community Experience.
insert into public.stories (slug, title, category, excerpt, status, video_url, published_at) values
  ('clean-energy-livelihood', 'Clean energy that powers a livelihood', 'Impact Story',
    'In Naluvule, a solar-powered salon turned an unreliable income into a growing business.', 'published', null, now()),
  ('water-dignity-resilience', 'Water, dignity, and resilience', 'Impact Story',
    'Protected springs and hygiene education across Busoga are reducing illness and restoring dignity.', 'published', null, now()),
  ('regenerating-land-biochar', 'Regenerating land with biochar', 'Impact Story',
    'In Kalagala Parish, invasive water hyacinth becomes biochar — healthier soil, cleaner cooking, and new income.', 'published', null, now()),
  ('video-meet-our-host-families', 'Meet our host families', 'Impact Video',
    'A short film on the families who open their homes to every cohort.', 'published', '', now()),
  ('video-a-project-handover', 'A project handover', 'Impact Video',
    'What it looks like when a community takes full ownership of its work.', 'published', '', now()),
  ('video-cohort-debrief-2025', 'Cohort debrief 2025', 'Impact Video',
    'This year''s interns on what they built and learned across four districts.', 'published', '', now()),
  ('community-opening-our-home', 'Opening our home', 'Community Experience',
    'A host family on what welcoming international learners has meant for them.', 'published', null, now()),
  ('community-savings-group', 'What the savings group changed', 'Community Experience',
    'Members of a VSLA on building income and resilience together.', 'published', null, now()),
  ('community-co-designing', 'Co-designing a project', 'Community Experience',
    'A local leader on setting the priorities — and seeing them delivered.', 'published', null, now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  status = excluded.status, video_url = excluded.video_url;

-- ---------- program_dates (Apply + Global Learning intake table) ----------
insert into public.program_dates (country, companies, confirmed, visible, order_column) values
  ('USA', 'Apple Inc, Microsoft', true, true, 1),
  ('Sweden', 'IKEA Furnitures, Spotify', false, true, 2),
  ('Finland', 'Nokia Communications', true, true, 3)
on conflict do nothing;

-- ---------- blog stories (editorial — shown in the Blog feed) ----------
insert into public.stories (slug, title, category, excerpt, status, published_at) values
  ('water-is-life-lubani', 'Water is Life: a protected spring in Lubani', 'Project Updates',
    'How a single protected spring is changing daily life for an entire village.', 'published', now()),
  ('kalagala-greening-project', 'Greening Kalagala, one tree at a time', 'Project Updates',
    'Agroforestry and tree-planting that restore soil while growing local income.', 'published', now()),
  ('rice-university-menstrual-health', 'A university partnership on menstrual health', 'Alumni Reflections',
    'A Rice University cohort on co-designing a real menstrual-health project with full local supervision.', 'published', now())
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt, status = excluded.status;

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
    'published', 1),
  ('clean-water-initiative', 'Clean Water Initiative', 'internship', 'WASH & Health', 'Kampala, Uganda', '12 weeks',
    'Provide clean drinking water to rural communities through sustainable water-purification systems and community education.',
    'The Clean Water Initiative expands access to safe drinking water through low-cost purification systems, protected sources, and community education.',
    '["Support installation and monitoring of water-purification systems.","Train households and schools on safe storage.","Map water points and track access improvements."]'::jsonb,
    '["Interest in water engineering, public health, or environmental science.","Willingness to work in the field.","Basic data-collection skills."]'::jsonb,
    '["Work on a tangible, life-changing intervention.","Build skills in WASH systems and mobilisation.","Contribute to measurable water-access gains."]'::jsonb,
    '["SDG 6 · Clean Water & Sanitation","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'published', 2),
  ('agroforestry-livelihoods-internship', 'Agroforestry & Livelihoods Internship', 'internship', 'Agroforestry',
    'Buikwe District, Uganda', '2 – 4 months',
    'Support community agroforestry and tree-based livelihoods. Promote climate-resilient practices and restore degraded land.',
    'Interns support agroforestry and tree-based livelihoods that restore degraded land while growing local income.',
    '["Support tree-planting, nurseries, and demonstrations.","Promote climate-resilient farming.","Track land restoration and livelihood outcomes."]'::jsonb,
    '["Interest in agriculture, forestry, or environmental science.","Willingness to work outdoors.","Basic monitoring skills."]'::jsonb,
    '["Work at the intersection of climate and livelihoods.","Build agroforestry and enterprise skills.","Help restore land and grow income."]'::jsonb,
    '["SDG 13 · Climate Action","SDG 1 · No Poverty","SDG 15 · Life on Land"]'::jsonb,
    'published', 3),
  ('community-economic-empowerment-internship', 'Community Economic Empowerment Internship', 'internship', 'Economic Empowerment',
    'Buikwe District, Uganda', '2 – 4 months',
    'Strengthen grassroots economic empowerment through savings groups, green enterprise, and entrepreneurship.',
    'This internship strengthens economic empowerment through VSLAs, microenterprise support, and green entrepreneurship.',
    '["Support VSLA formation and training.","Mentor small enterprises on planning and finance.","Track savings and enterprise outcomes."]'::jsonb,
    '["Interest in economics, business, or community development.","Comfort facilitating group trainings.","Basic financial literacy."]'::jsonb,
    '["See economic empowerment at the grassroots.","Build facilitation and enterprise skills.","Contribute to household resilience."]'::jsonb,
    '["SDG 1 · No Poverty","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'published', 4),
  ('research-baseline-survey-internship', 'Research & Baseline Survey Internship', 'internship', 'Research',
    'Buikwe District, Uganda', '4 months',
    'Work with communities to generate credible evidence on WASH and livelihoods. Findings inform project design.',
    'Interns generate credible evidence through community-based participatory research — surveys, monitoring, and analysis that inform project design.',
    '["Design and run community baseline surveys.","Clean, analyse, and visualise data.","Produce findings that shape design."]'::jsonb,
    '["Background in research methods or social science.","Comfort with data tools.","Attention to detail and research ethics."]'::jsonb,
    '["Practise real applied field research.","See how evidence shapes programming.","Build a research portfolio."]'::jsonb,
    '["SDG 17 · Partnerships for the Goals","SDG 3 · Good Health & Well-Being"]'::jsonb,
    'published', 5),
  ('energy-saving-stove-project', 'Energy Saving Stove Project', 'internship', 'Renewable Energy',
    'Njeru Municipality, Buikwe', '2 – 4 months',
    'Equip schools and communities with improved stove technology that saves energy, improves health, and mitigates deforestation.',
    'Interns support the roll-out of improved, energy-saving cookstoves — cutting wood use, reducing smoke exposure, and easing pressure on forests.',
    '["Support stove installation and demonstrations.","Train households and schools on use.","Track fuel savings and health benefits."]'::jsonb,
    '["Interest in renewable energy or environmental science.","Practical, hands-on attitude.","Comfort working with schools."]'::jsonb,
    '["Work on clean-energy tech that scales.","See health, climate, and cost benefits.","Build clean-energy experience."]'::jsonb,
    '["SDG 7 · Affordable & Clean Energy","SDG 13 · Climate Action"]'::jsonb,
    'published', 6),
  ('community-health-outreach-volunteer', 'Community Health Outreach', 'volunteer', 'WASH & Health',
    'Buikwe District, Uganda', '4 – 12 weeks',
    'Support community health outreach — hygiene promotion, screening days, and health education alongside local health workers.',
    'Volunteers support community health outreach — hygiene promotion, screening days, and health education — alongside local health workers.',
    '["Support outreach and health-education sessions.","Assist with community screening days.","Promote hygiene and disease prevention."]'::jsonb,
    '["Interest in community or public health.","Warmth, patience, and cultural sensitivity.","Willingness to travel to rural sites."]'::jsonb,
    '["Make a direct difference to community health.","Work with local health workers.","Gain grassroots public-health experience."]'::jsonb,
    '["SDG 3 · Good Health & Well-Being","SDG 6 · Clean Water & Sanitation"]'::jsonb,
    'published', 7),
  ('womens-empowerment-enterprise-volunteer', 'Women''s Empowerment & Enterprise', 'volunteer', 'Economic Empowerment',
    'Njeru Municipality, Buikwe', '4 – 12 weeks',
    'Support women''s savings groups and enterprise training — building income, confidence, and leadership.',
    'Volunteers support women''s savings groups and enterprise training — building income, confidence, and leadership through VSLAs and mentorship.',
    '["Support VSLA meetings and training.","Mentor women-led enterprises.","Encourage leadership and confidence."]'::jsonb,
    '["Interest in women''s empowerment or enterprise.","Good facilitation and people skills.","Respect for community leadership."]'::jsonb,
    '["See empowerment in action.","Build facilitation and mentoring skills.","Support lasting change for women."]'::jsonb,
    '["SDG 5 · Gender Equality","SDG 8 · Decent Work & Economic Growth"]'::jsonb,
    'published', 8)
on conflict (slug) do update set
  title = excluded.title, type = excluded.type, category = excluded.category,
  location = excluded.location, duration = excluded.duration, excerpt = excluded.excerpt,
  about = excluded.about, highlights = excluded.highlights, requirements = excluded.requirements,
  why_choose = excluded.why_choose, sdgs = excluded.sdgs, status = excluded.status,
  order_column = excluded.order_column;

-- ---------- testimonials / alumni reviews (illustrative; role-based attribution) ----------
insert into public.testimonials (name, cohort, program, quote, permission, status, order_column) values
  ('WASH intern', 'Cohort 2025', 'WASH Internship',
    'I learned more about ethical development in eight weeks with FOSCOD than in a year of coursework. The community led, and we followed.', true, 'published', 1),
  ('Renewable energy volunteer', 'Cohort 2024', 'Renewable Energy Volunteer',
    'The placement was structured, safe, and genuinely useful to the community. I left with skills and friendships I still carry.', true, 'published', 2),
  ('University group lead', 'Group Program 2025', 'University Cohort',
    'Our university group worked on a real menstrual-health project with full local supervision — exactly the academic value we needed.', true, 'published', 3)
on conflict do nothing;
