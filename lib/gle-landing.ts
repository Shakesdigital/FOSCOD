/**
 * GLE Volunteer & Internship landing pages — content.
 *
 * Drafted from the "FOSCOD website information request" brief (GLE program
 * description, five program types, thematic areas, engagement approaches and the
 * ethical-engagement commitment) plus the package/benefit structure of the
 * former volunteer and internship pages. Fees, dates and statistics are never
 * invented here: fees link out to /programs/program-fees, dates render from the
 * CMS ProgramDatesTable, and stats come from the verified impact_stats table.
 */

export type GleLandingKind = "volunteer" | "internship";

export type ExpandableItem = {
  title: string;
  /** teaser shown on the card face */
  intro: string;
  /** revealed by "read more" */
  body: string;
};

export type GleLandingContent = {
  kind: GleLandingKind;
  /** key into lib/content.ts heroSlides fallbacks (and CMS page_slug) */
  heroSlug: string;
  subNav: { href: string; label: string }[];
  about: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  types: {
    eyebrow: string;
    title: string;
    intro: string;
    /** optional footnote shown under the grid (e.g. virtual participation) */
    note?: string;
    items: (ExpandableItem & { tag: string; tone: "earth" | "water" | "forest" })[];
  };
  package: {
    eyebrow: string;
    title: string;
    intro: string;
    packageLabel: string;
    benefitsLabel: string;
    items: ExpandableItem[];
    benefits: ExpandableItem[];
  };
  eligibility: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
  };
  opportunities: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: { href: string; label: string };
  };
  impact: {
    eyebrow: string;
    title: string;
    intro: string;
    /** metric_name values, in display order — selected from verified impact_stats */
    metrics: string[];
    cta: { href: string; label: string };
  };
  fees: {
    eyebrow: string;
    title: string;
    body: string;
    cta: { href: string; label: string };
  };
  duration: {
    eyebrow: string;
    title: string;
    body: string;
  };
  location: {
    eyebrow: string;
    title: string;
    body: string;
    cta: { href: string; label: string };
  };
  applySteps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  voices: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: { href: string; label: string };
  };
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    actions: { href: string; label: string; variant?: "primary" | "secondary" | "ghost" }[];
  };
};

/* Shared — how a GLE placement is developed (the brief's five stages). */
const applySteps: { title: string; body: string }[] = [
  {
    title: "Apply & share your interests",
    body: "Submit the application form with your background, skills, thematic interests and preferred program type. Applying starts a conversation — it is not a commitment.",
  },
  {
    title: "Application review",
    body: "The FOSCOD team reviews your application against community priorities, partner availability and supervision capacity, and responds with feedback on program fit.",
  },
  {
    title: "Interview & placement planning",
    body: "We schedule an interview to clarify goals and aspirations, then agree activities, responsibilities, supervision, expected outputs and ethical requirements with the host community or organization.",
  },
  {
    title: "Confirmation & pre-arrival",
    body: "Your placement, timing, support and costs are confirmed in writing before you pay — with pre-arrival preparation and orientation materials to get you ready.",
  },
  {
    title: "Supported engagement & learning",
    body: "On the ground: orientation, mentorship, practical guidance, monitoring and guided reflection. At the end, outcomes are reviewed with community partners and your work is handed over so it continues after you leave.",
  },
];

const volunteer: GleLandingContent = {
  kind: "volunteer",
  heroSlug: "gle-volunteer",
  subNav: [
    { href: "#about", label: "About" },
    { href: "#types", label: "Types of volunteering" },
    { href: "#package", label: "Package & benefits" },
    { href: "#eligibility", label: "Who can volunteer" },
    { href: "#opportunities", label: "Opportunities" },
    { href: "#impact", label: "Impact" },
    { href: "#dates", label: "Start dates" },
    { href: "#fees", label: "Fees" },
    { href: "#duration", label: "Duration" },
    { href: "#location", label: "Location" },
    { href: "#how", label: "How to apply" },
    { href: "#faqs", label: "FAQs" },
    { href: "#voices", label: "Alumni experiences" },
  ],
  about: {
    eyebrow: "About the volunteer program",
    title: "Community-led volunteering, done ethically",
    body: "FOSCOD's Volunteer Program is part of the Global Learning Exchange Program (GLE) — our community-engaged learning program that designs and facilitates volunteering, internships, research, service learning and study tours in collaboration with local communities and partner organizations in Uganda.\n\nAs a volunteer you contribute to priorities that communities have identified themselves — clean energy and climate resilience, water, sanitation & community health, and sustainable livelihoods — working under local supervision, with orientation, guided reflection and genuine cultural exchange.\n\nFOSCOD's program is training in doing ethical, sustainable community-based development — not simply an organization inviting students to help with its work. Volunteers learn alongside community members, and communities gain useful, respectful support that continues beyond any single placement.",
    ctaLabel: "Browse volunteer placements",
    ctaHref: "/opportunities?type=volunteer",
  },
  types: {
    eyebrow: "Types of volunteer programs",
    title: "Choose how you take part",
    intro: "Volunteering runs as individual, group or global service trip formats — hosted by FOSCOD's Community Empowerment and Development Program (CEDP) and local partner organizations, with shared development sectors across both.",
    note: "Virtual participation is available for suitable individual and group placements — contributing remotely to supervised projects and research. Service-learning trips and study tours are primarily in-person programs.",
    items: [
      {
        title: "Individual volunteering",
        tag: "Individuals",
        tone: "forest",
        intro: "A structured placement for students, graduates, professionals and volunteers seeking hands-on experience in community-based development.",
        body: "You engage in locally defined projects or community work with FOSCOD's CEDP or a partner organization — supported by orientation, a named supervisory arrangement and guided reflection. Placements are matched to your interests, skills and the community's own priorities, so the contribution you make is real, not manufactured.",
      },
      {
        title: "Group volunteering",
        tag: "Groups & cohorts",
        tone: "earth",
        intro: "Participants from the same university, institution or organization work together with a host community on a shared project.",
        body: "Group placements promote teamwork, experiential learning and collective contribution to locally identified priorities. For larger cohorts we can also coordinate placements across several partner organizations — matched to each member's interests and skills, with shared learning activities and reflection.",
      },
      {
        title: "Global service trip",
        tag: "Short term · 1–4 weeks",
        tone: "water",
        intro: "A short-term program integrating meaningful community engagement with structured learning, reflection and cultural immersion.",
        body: "Designed for student and professional groups, a service-learning trip combines educational objectives with a community-defined priority — so even a short visit contributes to a plan the community already owns, and every participant comes home with grounded, practical insight into development work.",
      },
    ],
  },
  package: {
    eyebrow: "Volunteer package & benefits",
    title: "What your placement includes — and what it gives you",
    intro: "Every volunteer placement is built around the same promise: useful work, honest learning, and support at every stage. Expand each item to see what it covers.",
    packageLabel: "Our volunteer package",
    benefitsLabel: "Benefits of the program",
    items: [
      {
        title: "Pre-arrival preparation",
        intro: "Getting ready for a meaningful journey.",
        body: "Before you travel we brief you on the program, your role and its boundaries, cultural guidance, packing and logistics — and the background reading that grounds your placement in the community's own priorities.",
      },
      {
        title: "Arrival: orientation & cultural immersion",
        intro: "Your first days, well supported.",
        body: "Orientation with the FOSCOD team, an introduction to your host community and organization, language and culture basics, and a guided look around the project area in Njeru, Buikwe and greater Jinja.",
      },
      {
        title: "Community project design",
        intro: "Shaping the work with the community.",
        body: "With your host community and supervisory arrangement you shape the plan of work — what the community needs, what your role covers, how you'll work together, and what a useful contribution looks like.",
      },
      {
        title: "Project implementation",
        intro: "Hands-on contribution, locally supervised.",
        body: "You work on the project alongside community members and partner staff — contributing time, skills and ideas within your agreed role, with regular check-ins and monitoring.",
      },
      {
        title: "Mid-term retreat",
        intro: "Rest, reflection and exchange.",
        body: "Halfway through your placement, a group retreat offers a change of pace — time with other volunteers and interns to share experiences, reflect and re-energize for the second half.",
      },
      {
        title: "Reflection sessions",
        intro: "Turning field experience into learning.",
        body: "Regular guided reflection — journaling, group discussion and feedback with your supervisor — helps you process what you're learning about development, culture and yourself.",
      },
      {
        title: "Housing: living the experience",
        intro: "A safe base in community life.",
        body: "Stay with a carefully selected host family or in program accommodation — everyday Ugandan life at the centre of your experience, with a supportive household around you.",
      },
      {
        title: "Certificate & documented handover",
        intro: "Finishing well.",
        body: "At the end of your placement you complete a documented handover so the work continues after you leave, and receive a certificate recognizing your contribution to Ugandan communities.",
      },
    ],
    benefits: [
      {
        title: "Impactful & ethical development work",
        intro: "Contribution that is real.",
        body: "Your work supports community-defined priorities — measured against the community's own plan, not invented tasks. That is what makes the difference you make meaningful and lasting.",
      },
      {
        title: "A personalized experience",
        intro: "Matched to you.",
        body: "You select thematic areas from CEDP and partner organizations, and we identify openings that align your interests and skills with community priorities, available expertise and appropriate supervision.",
      },
      {
        title: "Cross-cultural exchange",
        intro: "Learning flows both ways.",
        body: "Live and work with host communities, families and local organizations — deepening your global awareness and your ability to collaborate in diverse environments.",
      },
      {
        title: "Personal & professional growth",
        intro: "Skills that travel with you.",
        body: "Strengthen problem-solving, leadership and adaptability while making a tangible difference in people's lives — capabilities employers and graduate schools recognize.",
      },
      {
        title: "Retreats & excursions",
        intro: "Culture, travel and bonding.",
        body: "Group bonding activities and immersive cultural experiences around Jinja — from the source of the Nile to Mabira Forest — are part of the program, not an extra.",
      },
      {
        title: "Community development skills",
        intro: "Practical, field-based learning.",
        body: "Community engagement, resource management, implementation, evaluation and ethical leadership — learned by doing, in collaboration with local partners and communities.",
      },
    ],
  },
  eligibility: {
    eyebrow: "Who can volunteer",
    title: "Made for people who want to contribute properly",
    intro: "There is no single 'volunteer profile'. What matters is your willingness to learn with communities and work within agreed roles.",
    bullets: [
      "University students seeking hands-on service experience and complementary field learning.",
      "Recent graduates building practical experience and career direction.",
      "Professionals and career changers contributing skills in a new context.",
      "Groups — student cohorts, community and faith organizations, families.",
      "Anyone open to ethical community-based development: role requirements vary by placement and are confirmed in writing before you commit.",
    ],
  },
  opportunities: {
    eyebrow: "Current openings",
    title: "Live volunteer opportunities",
    intro: "A sample of openings currently published in our opportunities directory. Each listing names its host, purpose, learning goals, supervision and practical arrangements.",
    cta: { href: "/opportunities?type=volunteer", label: "View all volunteer opportunities" },
  },
  impact: {
    eyebrow: "Volunteer project impact",
    title: "Change that communities own",
    intro: "Volunteers contribute to community-led change — and the results speak through what continues after placements end. Figures below are FOSCOD's verified track record.",
    metrics: [
      "Development practitioners trained",
      "Completed projects sustaining benefits",
      "Community projects implemented",
    ],
    cta: { href: "/impact/general", label: "Read more impact stories" },
  },
  fees: {
    eyebrow: "Program fees",
    title: "Transparent fees, clearly scoped",
    body: "Volunteer fees cover placement coordination, supervision, orientation, accommodation arrangement and local support. What is included for your specific intake is confirmed in writing before you make any payment — explore the fee structure to see how your contribution supports both your placement and community work.",
    cta: { href: "/programs/program-fees", label: "Review the program fees" },
  },
  duration: {
    eyebrow: "Volunteer duration",
    title: "Flexible timeframes, matched to the work",
    body: "Placements are scheduled individually. Typical volunteer windows run from a few weeks to several months; service-learning trips run one to four weeks and study tours at least eight days. Each opportunity listing states its duration, and we match timing to community priorities, partner availability and your own availability.",
  },
  location: {
    eyebrow: "Location",
    title: "Buikwe District & Jinja, Uganda — where the Nile meets community-led change",
    body: "FOSCOD's community program (CEDP) is based in Kalagala Parish, Njeru Municipality, Buikwe District — a peri-urban community bordering Mabira Forest — with placements extending through partner organizations around Iganga, Jinja and Buikwe. Jinja, home to the source of the Nile, pairs your placement with a rich cultural and natural setting: vibrant local communities, breathtaking landscapes and genuine connection.",
    cta: { href: "/contact", label: "Ask us about the location" },
  },
  applySteps,
  faqs: [
    {
      q: "Who defines the work?",
      a: "FOSCOD develops volunteer roles from priorities identified with communities and local partners. Your interests help with matching — they don't replace the community-defined purpose of the work.",
    },
    {
      q: "Do I need previous experience?",
      a: "Requirements depend on the role. Observation and learning activities may be suitable for beginners; technical, health-related or direct community work requires relevant preparation and closer review. Role requirements are always confirmed before placement.",
    },
    {
      q: "How long can I volunteer for?",
      a: "Placements are scheduled individually — typical windows run from a few weeks to several months, and service-learning trips run one to four weeks. Each opportunity listing states its duration.",
    },
    {
      q: "Can my family or group volunteer together?",
      a: "Yes. Group placements can work a shared project with one host, or be coordinated across several partner organizations according to each member's interests. Contact us to discuss a group.",
    },
    {
      q: "What support is included?",
      a: "The current program brief confirms the supervisory arrangement, orientation, accommodation arrangement, local transport, emergency contact and other support for that specific intake. Services are not assumed until confirmed in writing.",
    },
    {
      q: "Is virtual volunteering possible?",
      a: "Yes — suitable individual and group placements can be arranged remotely, contributing to supervised projects and research without travelling to Uganda.",
    },
    {
      q: "Does applying guarantee a placement?",
      a: "No. Submitting an application starts a matching process that considers community priorities, partner availability and program requirements — it does not guarantee acceptance or a particular host organization.",
    },
  ],
  voices: {
    eyebrow: "Volunteer alumni experiences",
    title: "In their own words",
    intro: "Published stories from GLE volunteers. Each has a named participant and confirmed permission.",
    cta: { href: "/testimonials", label: "Read all alumni stories" },
  },
  finalCta: {
    eyebrow: "Ready to apply?",
    title: "Volunteer with FOSCOD",
    body: "Join a supervised, ethical volunteering placement in Uganda — matched to a community-defined priority, with local support from day one. Submitting an application starts a matching process and does not guarantee acceptance or a particular host.",
    actions: [
      { href: "/apply?type=volunteer", label: "Start your volunteer application" },
      { href: "/opportunities?type=volunteer", label: "Explore opportunities", variant: "secondary" },
      { href: "/apply?type=guidance", label: "Request placement guidance", variant: "ghost" },
    ],
  },
};

const internship: GleLandingContent = {
  kind: "internship",
  heroSlug: "gle-internship",
  subNav: [
    { href: "#about", label: "About" },
    { href: "#types", label: "Types of internships" },
    { href: "#package", label: "Package & benefits" },
    { href: "#eligibility", label: "Who can apply" },
    { href: "#opportunities", label: "Opportunities" },
    { href: "#impact", label: "Impact" },
    { href: "#dates", label: "Start dates" },
    { href: "#fees", label: "Fees" },
    { href: "#duration", label: "Duration" },
    { href: "#location", label: "Location" },
    { href: "#how", label: "How to apply" },
    { href: "#faqs", label: "FAQs" },
    { href: "#voices", label: "Alumni experiences" },
  ],
  about: {
    eyebrow: "About the internship program",
    title: "Internships aligned to your goals, grounded in community priorities",
    body: "FOSCOD's Internship Program is part of the Global Learning Exchange Program (GLE) — our community-engaged learning program that designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations in Uganda.\n\nAn internship with FOSCOD is a structured placement aligned to your learning objectives: a defined role, a named supervisory arrangement, regular monitoring and reflection, agreed outputs, and a useful handover that strengthens the host organization. Placements may also fulfil academic requirements through agreed learning objectives and assessments — your home institution remains responsible for approving academic credit.\n\nFOSCOD's program is training in doing ethical, sustainable community-based development. Interns don't simply help with our work — they learn alongside communities and partners, and their outputs are designed to be useful after they leave.",
    ctaLabel: "Browse internships",
    ctaHref: "/opportunities?type=internship",
  },
  types: {
    eyebrow: "Types of internships",
    title: "Choose your internship pathway",
    intro: "Internships run as individual, group or global service trip formats — hosted by FOSCOD's Community Empowerment and Development Program (CEDP) and local partner organizations, with shared development sectors across both.",
    note: "Virtual participation is available for suitable individual and group internships — a supervised remote placement contributing to projects and research without travelling to Uganda.",
    items: [
      {
        title: "Individual internship",
        tag: "Individuals",
        tone: "water",
        intro: "A supervised placement tailored to your field, timeline and career goals.",
        body: "You take a defined role with FOSCOD's CEDP or a partner organization: a named supervisory arrangement, regular monitoring and reflection, agreed outputs and a documented handover. Placements may fulfil academic requirements through agreed learning objectives and assessments.",
      },
      {
        title: "Group engage internship",
        tag: "Groups & cohorts",
        tone: "earth",
        intro: "Participants from the same university or institution work together with a host organization on a shared community project or research initiative.",
        body: "The group pathway promotes teamwork, experiential learning and collective impact — ideal for academic credit programs, service-learning groups and professional development teams. For larger cohorts we can also coordinate placements across several partner organizations, matched to each member's academic interests, with shared learning activities and reflection.",
      },
      {
        title: "Global service trip",
        tag: "Short term · 1–4 weeks",
        tone: "forest",
        intro: "A short-term internship pathway combining meaningful engagement with structured learning, reflection and cultural immersion.",
        body: "Designed for student and professional groups, a service-learning internship compresses the full arc — preparation, contribution within a defined role, reflection and handover — into one to four weeks of immersive field learning tied to a community-defined priority.",
      },
    ],
  },
  package: {
    eyebrow: "Internship package & benefits",
    title: "What your internship includes — and what it gives you",
    intro: "Internships are structured end to end: preparation, a defined role, supervision, agreed outputs and a documented handover. Expand each item to see what it covers.",
    packageLabel: "Our internship package",
    benefitsLabel: "Benefits of the internship",
    items: [
      {
        title: "Pre-arrival: preparing for a meaningful journey",
        intro: "Preparation before you travel.",
        body: "Program briefing, role and boundary expectations, learning-objective alignment with your institution where relevant, cultural guidance and logistics — so your internship starts productively on day one.",
      },
      {
        title: "Arrival: orientation & cultural immersion",
        intro: "Your first days, well supported.",
        body: "Orientation with the FOSCOD team, introduction to your host organization and community, language and culture basics, and a guided look around the project area in Njeru, Buikwe and greater Jinja.",
      },
      {
        title: "Project design",
        intro: "Agreeing the scope of your internship.",
        body: "With your supervisory arrangement and host community you agree the plan of work: role, activities, learning objectives, responsibilities, supervision, expected outputs and ethical requirements.",
      },
      {
        title: "Project implementation & budget management",
        intro: "Carrying the work through.",
        body: "You take your agreed work through implementation on a live community initiative — learning practical project and budget management as you go, with regular check-ins and monitoring.",
      },
      {
        title: "Final presentation & reporting",
        intro: "Evidence of learning — and a useful record.",
        body: "You present your work to the host organization and community partners and submit a final report. It documents your learning and leaves the host something it can actually use.",
      },
      {
        title: "Supplementary learning sessions",
        intro: "Structured learning alongside fieldwork.",
        body: "Sector briefings, methodology clinics and practitioner sessions run alongside your placement — connecting what you see in the field to the wider practice of community-based development.",
      },
      {
        title: "Mid-term retreat",
        intro: "Rest, reflection and exchange.",
        body: "Halfway through your placement, a group retreat offers a change of pace — time with other interns and volunteers to share experiences, reflect and re-energize for the second half.",
      },
      {
        title: "Reflection sessions",
        intro: "Turning field experience into learning.",
        body: "Regular guided reflection — journaling, group discussion and feedback with your supervisor — helps you process what you're learning about development, research and yourself.",
      },
      {
        title: "Housing: living the experience",
        intro: "A safe base in community life.",
        body: "Stay with a carefully selected host family or in program accommodation — everyday Ugandan life at the centre of your experience, with a supportive household around you.",
      },
    ],
    benefits: [
      {
        title: "Academic & career alignment",
        intro: "Built around your objectives.",
        body: "Placements are matched to your academic and professional learning objectives — and can fulfil academic requirements through agreed learning objectives and assessments, with your home institution approving credit.",
      },
      {
        title: "Named supervision & mentorship",
        intro: "You always know who guides you.",
        body: "A named supervisory arrangement, regular monitoring and structured feedback — so your internship has professional shape, not loose shadowing.",
      },
      {
        title: "Real contribution to community priorities",
        intro: "Work that matters.",
        body: "You contribute to locally defined priorities — clean energy and climate resilience, water, sanitation & community health, sustainable livelihoods and partner-sector work — not manufactured tasks.",
      },
      {
        title: "Professional references & certificate",
        intro: "Credentials for your next step.",
        body: "On completion you receive a certificate recognizing your contribution, and on request a reference documenting your role, supervision and outputs — grounded in real, evidenced work.",
      },
      {
        title: "Cross-cultural competence",
        intro: "Working across contexts.",
        body: "Host-family immersion and daily collaboration with communities and local organizations build the intercultural skills global employers and graduate schools look for.",
      },
      {
        title: "Research & CBPR experience",
        intro: "A rigorous research pathway.",
        body: "Pursue community-based participatory research (CBPR): investigate locally identified issues, generate relevant knowledge, and share findings back with community partners to inform practical action.",
      },
    ],
  },
  eligibility: {
    eyebrow: "Who can apply",
    title: "Built for serious learners",
    intro: "Internships are matched to your background and objectives — eligibility specifics are confirmed per role.",
    bullets: [
      "University students seeking hands-on experience or academic credits through internship programs.",
      "Recent graduates looking to apply their knowledge in real-world settings.",
      "Early-career professionals eager to gain practical skills in sustainable development.",
      "Researchers and postgraduates pursuing community-based participatory research (CBPR).",
      "Anyone passionate about global health, education, sustainable agriculture, clean energy or women's empowerment who wants to make a meaningful impact.",
    ],
  },
  opportunities: {
    eyebrow: "Current openings",
    title: "Live internship opportunities",
    intro: "A sample of openings currently published in our opportunities directory. Each listing names its host, purpose, learning goals, supervision and practical arrangements.",
    cta: { href: "/opportunities?type=internship", label: "View all internships" },
  },
  impact: {
    eyebrow: "Internship impact",
    title: "Experience that changes careers — and communities",
    intro: "Interns leave with practical, evidenced experience; hosts gain useful outputs and documented handovers. Figures below are FOSCOD's verified track record.",
    metrics: [
      "Development practitioners trained",
      "Virtual interns engaged",
      "Completed projects sustaining benefits",
    ],
    cta: { href: "/impact/general", label: "Read more impact stories" },
  },
  fees: {
    eyebrow: "Program fees",
    title: "Structured fees, clearly scoped",
    body: "Internship fees cover essential resources and support services: placement coordination, named supervision, orientation, accommodation arrangement and local support. What is included for your specific intake is confirmed in writing before you make any payment — explore the fee structure to see exactly how your investment contributes to a meaningful experience.",
    cta: { href: "/programs/program-fees", label: "Review the program fees" },
  },
  duration: {
    eyebrow: "Internship duration",
    title: "Flexible timeframes to match your goals",
    body: "Internships run from a minimum of four weeks to twelve weeks, with extended options available for deeper engagement; service-learning internships run one to four weeks. Duration can be customized to your specific interests, project needs and desired community impact — and virtual internships offer a remote pathway for suitable placements.",
  },
  location: {
    eyebrow: "Location",
    title: "Buikwe District & Jinja, Uganda — where professional growth meets purpose",
    body: "FOSCOD's community program (CEDP) is based in Kalagala Parish, Njeru Municipality, Buikwe District — a peri-urban community bordering Mabira Forest — with placements extending through partner organizations around Iganga, Jinja and Buikwe. Jinja, home to the source of the Nile, blends professional growth with cultural immersion: engaging with vibrant local communities while exploring Uganda's breathtaking landscapes.",
    cta: { href: "/contact", label: "Ask us about the location" },
  },
  applySteps,
  faqs: [
    {
      q: "Can my institution award academic credit?",
      a: "FOSCOD can work with your institution to align activities and evidence of learning with agreed learning objectives and assessments. Your home institution remains responsible for approving academic credit.",
    },
    {
      q: "Who supervises my internship?",
      a: "Each placement has a named supervisory arrangement, agreed in the placement plan, with regular monitoring, check-ins and structured feedback throughout your internship.",
    },
    {
      q: "What outputs am I expected to deliver?",
      a: "Outputs are agreed during collaborative placement planning and documented in your placement plan — typically a final presentation and report plus a documented handover so the host organization keeps what you built.",
    },
    {
      q: "Do I need specific experience?",
      a: "Requirements depend on the role. Observation and learning activities may suit beginners; research, technical or health-related placements require relevant preparation and closer review. Requirements are confirmed before placement.",
    },
    {
      q: "Can I intern remotely?",
      a: "Yes — virtual participation is considered for suitable individual and group internships: supervised remote projects, collaborative research and other agreed activities.",
    },
    {
      q: "How far in advance should I apply?",
      a: "Placements depend on community priorities, partner availability and program requirements — earlier applications allow better matching. Confirmed intake windows appear in the start-dates section when scheduled.",
    },
    {
      q: "Does applying guarantee a placement?",
      a: "No. Submitting an application starts a matching process that considers community priorities, partner availability and program requirements — it does not guarantee acceptance or a particular host organization.",
    },
  ],
  voices: {
    eyebrow: "Intern alumni experiences",
    title: "In their own words",
    intro: "Published stories from GLE interns and research fellows. Each has a named participant and confirmed permission.",
    cta: { href: "/testimonials", label: "Read all alumni stories" },
  },
  finalCta: {
    eyebrow: "Ready to apply?",
    title: "Start your internship with FOSCOD",
    body: "Apply for a supervised internship aligned to your learning objectives — a defined role, a named supervisor and agreed outputs, in service of community-defined priorities. Submitting an application starts a matching process and does not guarantee acceptance or a particular host.",
    actions: [
      { href: "/apply?type=internship", label: "Start your internship application" },
      { href: "/opportunities?type=internship", label: "Explore opportunities", variant: "secondary" },
      { href: "/apply?type=guidance", label: "Request placement guidance", variant: "ghost" },
    ],
  },
};

export const gleLandingContent: Record<GleLandingKind, GleLandingContent> = {
  volunteer,
  internship,
};

/**
 * Pick verified GLE/organizational impact stats by metric name, in display order.
 * Falls back to the first three verified stats if a name is missing from the CMS.
 */
export function selectImpactStats(
  stats: { metric_name: string; current_value: string; source_note?: string }[],
  metricNames: string[]
): { value: string; label: string; note?: string }[] {
  const byName = new Map(stats.map((s) => [s.metric_name, s]));
  const picked = metricNames
    .map((name) => byName.get(name))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ value: s.current_value, label: s.metric_name, note: s.source_note }));
  if (picked.length >= 2) return picked.slice(0, 3);
  return stats.slice(0, 3).map((s) => ({ value: s.current_value, label: s.metric_name, note: s.source_note }));
}

/**
 * Filter published testimonials to GLE alumni matching this page's audience
 * (volunteers vs interns/researchers). Falls back to all GLE testimonials,
 * then to everything, so the carousel is never empty.
 */
export function selectTestimonials(
  all: { quote: string; name: string; program?: string; cohort?: string; linked_program?: string | null }[],
  kind: GleLandingKind
): { quote: string; name: string; program?: string; cohort?: string }[] {
  const gle = all.filter((t) => t.linked_program === "GLE");
  const pool = gle.length ? gle : all;
  const keywords = kind === "volunteer" ? ["volunteer"] : ["intern", "research", "fellow"];
  const matched = pool.filter((t) =>
    keywords.some((k) => `${t.program ?? ""} ${t.name}`.toLowerCase().includes(k))
  );
  const chosen = matched.length ? matched : pool;
  return chosen.map((t) => ({ quote: t.quote, name: t.name, program: t.program, cohort: t.cohort }));
}
