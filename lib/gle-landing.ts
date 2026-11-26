/**
 * GLE Volunteer & Internship landing pages — content.
 *
 * Drafted from the "FOSCOD website information request" brief (GLE program
 * description, five program types, thematic areas, engagement approaches and the
 * ethical-engagement commitment) plus the package structure of the former
 * volunteer and internship pages. Fees are never invented here: fees link out to
 * /programs/program-fees, and dates render from the CMS ProgramDatesTable on the
 * GLE apply page.
 */

import type { CommunityIconName } from "@/components/ui/CommunityIcon";

export type GleLandingKind = "volunteer" | "internship";

export type ExpandableItem = {
  title: string;
  /** teaser shown on the card face */
  intro: string;
  /** revealed by "read more" */
  body: string;
};

export type GlePackageItem = ExpandableItem & {
  imageUrl?: string;
  imageAlt?: string;
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
    imageUrl?: string;
    imageAlt?: string;
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
    items: GlePackageItem[];
  };
  eligibility: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    imageUrl?: string;
    imageAlt?: string;
  };
  opportunities: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: { href: string; label: string };
  };
  fees: {
    eyebrow: string;
    title: string;
    body: string;
    cta: { href: string; label: string };
    imageUrl?: string;
    imageAlt?: string;
  };
  readyToApply: {
    eyebrow: string;
    title: string;
    body: string;
    actions: { href: string; label: string; variant?: "primary" | "secondary" | "ghost" }[];
  };
  faqs: { q: string; a: string }[];
  voices: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: { href: string; label: string };
    video?: {
      url: string;
      title: string;
      caption?: string;
      thumbnailUrl?: string;
    };
  };
};

/** Local partner organizations' development sectors, with icons and short
 *  briefs for the looping thematic-area carousel. */
export const glePartnerSectors: {
  title: string;
  brief: string;
  icon: CommunityIconName;
  imageUrl?: string;
  imageAlt?: string;
}[] = [
  {
    title: "Women's Empowerment & Gender Equality",
    brief: "Support initiatives that advance women's leadership, voice and equal opportunity.",
    icon: "volunteer",
    imageUrl: "/images/gle/thematic/womens-empowerment.jpg",
    imageAlt: "Women taking part in a community empowerment and savings group in Uganda",
  },
  {
    title: "Health",
    brief: "Learn alongside community health partners working on prevention, awareness and referrals.",
    icon: "health",
    imageUrl: "/images/gle/thematic/community-health.jpg",
    imageAlt: "A community health outreach session in a Ugandan village",
  },
  {
    title: "Information & Communication Technology (ICT)",
    brief: "Help partners use digital tools to communicate, learn and work more effectively.",
    icon: "enterprise",
    imageUrl: "/images/gle/thematic/ict.jpg",
    imageAlt: "A community ICT and digital skills training session",
  },
  {
    title: "Microenterprise & Microfinance",
    brief: "Explore savings groups, small enterprise and practical financial inclusion.",
    icon: "enterprise",
    imageUrl: "/images/gle/thematic/microenterprise.jpg",
    imageAlt: "A small community enterprise and microfinance group meeting",
  },
  {
    title: "Environment & Conservation",
    brief: "Contribute to conservation, restoration and sustainable natural-resource use.",
    icon: "environment",
    imageUrl: "/images/gle/thematic/environment-conservation.jpg",
    imageAlt: "Tree planting and environmental conservation work in Uganda",
  },
  {
    title: "Community Development",
    brief: "Work with local organizations on priorities that communities have set themselves.",
    icon: "partner",
    imageUrl: "/images/gle/volunteer/who-can-volunteer.jpg",
    imageAlt: "Community members planning a local development project together",
  },
  {
    title: "Human Rights",
    brief: "Learn how local partners protect rights, inclusion and access to justice.",
    icon: "partner",
    imageUrl: "/images/gle/thematic/human-rights.jpg",
    imageAlt: "A community rights and inclusion awareness session",
  },
  {
    title: "Education & Youth Development",
    brief: "Support learning, mentorship and opportunities for young people.",
    icon: "education",
    imageUrl: "/images/gle/volunteer/duration.jpg",
    imageAlt: "Children learning with a FOSCOD participant in a Ugandan community",
  },
  {
    title: "Art, History & Culture – Visual and Performing Arts",
    brief: "Engage with visual and performing arts, heritage and cultural exchange.",
    icon: "education",
    imageUrl: "/images/gle/thematic/arts-culture.jpg",
    imageAlt: "A local visual and performing arts and cultural exchange activity",
  },
  {
    title: "Engineering – Civil, Solar Energy and Water Systems",
    brief: "Apply engineering skills to community infrastructure, solar energy and water systems.",
    icon: "energy",
    imageUrl: "/images/gle/thematic/clean-energy.jpg",
    imageAlt: "Solar energy and water system engineering work in a Ugandan community",
  },
];

const volunteer: GleLandingContent = {
  kind: "volunteer",
  heroSlug: "gle-volunteer",
  subNav: [
    { href: "#about", label: "Program overview" },
    { href: "#types", label: "Volunteer programs" },
    { href: "#package", label: "Package" },
    { href: "#current-openings", label: "Current openings" },
    { href: "#thematic-areas", label: "Thematic areas" },
    { href: "#engagement-approach", label: "Engagement approach" },
    { href: "#eligibility", label: "Who can volunteer" },
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
    intro: "Five program types, hosted by FOSCOD's Community Empowerment and Development Program (CEDP) and local partner organizations. Choose the one that best fits your interests, availability and goals.",
    note: "Virtual participation is available for suitable individual and group placements — contributing remotely to supervised projects and research. Service-learning trips and study tours are primarily in-person programs.",
    items: [
      {
        title: "Individual Internship or Volunteer Placement",
        tag: "1 · Individuals",
        tone: "forest",
        intro: "A structured placement for students, graduates, professionals and volunteers seeking practical experience in community-based development.",
        body: "Participants engage in locally defined projects or research with FOSCOD or its partner organizations, supported by professional supervision, guided reflection and cultural learning. Placements may also fulfil academic requirements through agreed learning objectives and assessments.",
      },
      {
        title: "Group Project Placement",
        tag: "2 · Groups & cohorts",
        tone: "earth",
        intro: "A collaborative placement where participants from the same university or institution work together with a host organization on a shared community development project or research initiative.",
        body: "The program promotes teamwork, experiential learning and collective contributions to locally identified community priorities.",
      },
      {
        title: "Coordinated Group Placement",
        tag: "3 · Coordinated groups",
        tone: "water",
        intro: "A structured program for groups from the same university or institution, with participants placed across different local partner organizations according to their academic interests, skills and learning objectives.",
        body: "Individual placements are complemented by coordinated learning activities, cultural engagement and shared reflection.",
      },
      {
        title: "Service-Learning Trip",
        tag: "4 · Short term · 1–4 weeks",
        tone: "forest",
        intro: "A short-term program, typically lasting 1–4 weeks, that integrates meaningful community engagement with structured learning, guided reflection and cultural immersion.",
        body: "Designed for student and professional groups, the program combines educational objectives with locally identified community priorities to promote mutual learning, social responsibility and sustainable community benefits.",
      },
      {
        title: "Study Tour Program",
        tag: "5 · At least 8 days",
        tone: "earth",
        intro: "A customized educational experience for schools and university groups, lasting at least eight days.",
        body: "Developed collaboratively with participating institutions, study tours combine lectures, community engagement, organizational visits, discussions, guided reflection and cultural excursions to deepen participants' understanding of sustainable community-based development in Uganda.",
      },
    ],
  },
  package: {
    eyebrow: "Volunteer package",
    title: "What your placement includes",
    intro: "Every volunteer placement is built around the same promise: useful work, honest learning, and support at every stage. Expand each item to see what it covers.",
    packageLabel: "Our volunteer package",
    items: [
      {
        title: "Pre-arrival preparation",
        intro: "Before you travel we brief you on the program, your role, cultural guidance and logistics so you arrive prepared and confident.",
        body: "Before you travel we brief you on the program, your role and its boundaries, cultural guidance, packing and logistics — and the background reading that grounds your placement in the community's own priorities.",
      },
      {
        title: "Arrival & orientation",
        intro: "Your first days include orientation with the FOSCOD team, an introduction to your host community, and language and culture basics.",
        body: "Orientation with the FOSCOD team, an introduction to your host community and organization, language and culture basics, and a guided look around the project area in Njeru, Buikwe and greater Jinja.",
      },
      {
        title: "Community project design",
        intro: "Together with your host community and supervisor, you shape a plan of work that reflects local priorities and a clear, useful role for you.",
        body: "With your host community and supervisory arrangement you shape the plan of work — what the community needs, what your role covers, how you'll work together, and what a useful contribution looks like.",
      },
      {
        title: "Project implementation",
        intro: "You contribute hands-on alongside community members and partner staff, within your agreed role and with regular check-ins and monitoring.",
        body: "You work on the project alongside community members and partner staff — contributing time, skills and ideas within your agreed role, with regular check-ins and monitoring.",
      },
      {
        title: "Mid-term retreats",
        intro: "Halfway through, a group retreat gives you time with other volunteers and interns to share experiences, reflect and re-energize.",
        body: "Halfway through your placement, a group retreat offers a change of pace — time with other volunteers and interns to share experiences, reflect and re-energize for the second half.",
      },
      {
        title: "Reflection sessions",
        intro: "Regular guided reflection — journaling, group discussion and supervisor feedback — helps you turn field experience into lasting learning.",
        body: "Regular guided reflection — journaling, group discussion and feedback with your supervisor — helps you process what you're learning about development, culture and yourself.",
      },
      {
        title: "Housing",
        intro: "You stay with a carefully selected host family or in program accommodation, with everyday Ugandan life and a supportive household around you.",
        body: "Stay with a carefully selected host family or in program accommodation — everyday Ugandan life at the centre of your experience, with a supportive household around you.",
      },
      {
        title: "Certificates & documented handover",
        intro: "You complete a documented handover so the work continues after you leave, and receive a certificate recognizing your contribution.",
        body: "At the end of your placement you complete a documented handover so the work continues after you leave, and receive a certificate recognizing your contribution to Ugandan communities.",
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
    imageUrl: "/images/gle/volunteer/who-can-volunteer.jpg",
    imageAlt: "A FOSCOD volunteer taking notes beside community members against a brick wall in Jinja, Uganda",
  },
  opportunities: {
    eyebrow: "Current openings",
    title: "Live volunteer opportunities",
    intro: "A sample of openings currently published in our opportunities directory. Each listing names its host, purpose, learning goals, supervision and practical arrangements.",
    cta: { href: "/opportunities?type=volunteer", label: "View all volunteer opportunities" },
  },
  fees: {
    eyebrow: "Program fees",
    title: "Transparent fees, clearly scoped",
    body: "Volunteer fees cover placement coordination, supervision, orientation, accommodation arrangement and local support. What is included for your specific intake is confirmed in writing before you make any payment — explore the fee structure to see how your contribution supports both your placement and community work.",
    cta: { href: "/programs/program-fees", label: "Review the program fees" },
    imageUrl: "/images/gle/volunteer/fees.jpg",
    imageAlt: "A FOSCOD volunteer reviewing documents with community members in a village in Jinja, Uganda",
  },
  readyToApply: {
    eyebrow: "Ready to apply",
    title: "Volunteer with FOSCOD",
    body: "Join a supervised, ethical volunteering placement in Uganda — matched to a community-defined priority, with local support from day one.",
    actions: [
      { href: "/apply?type=volunteer", label: "Start your volunteer application" },
      { href: "/opportunities?type=volunteer", label: "Explore opportunities", variant: "secondary" },
      { href: "/apply?type=guidance", label: "Request placement guidance", variant: "ghost" },
    ],
  },
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
    video: {
      url: "https://www.youtube.com/watch?v=yBzyBeTkzO0",
      title: "Jocelyn Haines summer internship experience",
      caption: "GLE alumni testimonial video",
      thumbnailUrl: "https://i.ytimg.com/vi/yBzyBeTkzO0/hq720.jpg",
    },
  },
};

const internship: GleLandingContent = {
  kind: "internship",
  heroSlug: "gle-internship",
  subNav: [
    { href: "#about", label: "Program overview" },
    { href: "#types", label: "Internship programs" },
    { href: "#package", label: "Package" },
    { href: "#current-openings", label: "Current openings" },
    { href: "#thematic-areas", label: "Thematic areas" },
    { href: "#engagement-approach", label: "Engagement approach" },
    { href: "#eligibility", label: "Who can apply" },
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
    intro: "Five program types, hosted by FOSCOD's Community Empowerment and Development Program (CEDP) and local partner organizations. Choose the one that best aligns with your interests, academic requirements and professional goals.",
    note: "Virtual participation is available for suitable individual and group internships — a supervised remote placement contributing to projects and research without travelling to Uganda.",
    items: [
      {
        title: "Individual Internship or Volunteer Placement",
        tag: "1 · Individuals",
        tone: "water",
        intro: "A structured placement for students, graduates, professionals and volunteers seeking practical experience in community-based development.",
        body: "Participants engage in locally defined projects or research with FOSCOD or its partner organizations, supported by professional supervision, guided reflection and cultural learning. Placements may also fulfil academic requirements through agreed learning objectives and assessments.",
      },
      {
        title: "Group Project Placement",
        tag: "2 · Groups & cohorts",
        tone: "earth",
        intro: "A collaborative placement where participants from the same university or institution work together with a host organization on a shared community development project or research initiative.",
        body: "The program promotes teamwork, experiential learning and collective contributions to locally identified community priorities.",
      },
      {
        title: "Coordinated Group Placement",
        tag: "3 · Coordinated groups",
        tone: "forest",
        intro: "A structured program for groups from the same university or institution, with participants placed across different local partner organizations according to their academic interests, skills and learning objectives.",
        body: "Individual placements are complemented by coordinated learning activities, cultural engagement and shared reflection.",
      },
      {
        title: "Service-Learning Trip",
        tag: "4 · Short term · 1–4 weeks",
        tone: "water",
        intro: "A short-term program, typically lasting 1–4 weeks, that integrates meaningful community engagement with structured learning, guided reflection and cultural immersion.",
        body: "Designed for student and professional groups, the program combines educational objectives with locally identified community priorities to promote mutual learning, social responsibility and sustainable community benefits.",
      },
      {
        title: "Study Tour Program",
        tag: "5 · At least 8 days",
        tone: "earth",
        intro: "A customized educational experience for schools and university groups, lasting at least eight days.",
        body: "Developed collaboratively with participating institutions, study tours combine lectures, community engagement, organizational visits, discussions, guided reflection and cultural excursions to deepen participants' understanding of sustainable community-based development in Uganda.",
      },
    ],
  },
  package: {
    eyebrow: "Internship package",
    title: "What your internship includes",
    intro: "Internships are structured end to end: preparation, a defined role, supervision, agreed outputs and a documented handover. Expand each item to see what it covers.",
    packageLabel: "Our internship package",
    items: [
      {
        title: "Pre-arrival preparation",
        intro: "Before you travel we brief you on the program, your role, learning objectives and logistics so your internship starts productively.",
        body: "Program briefing, role and boundary expectations, learning-objective alignment with your institution where relevant, cultural guidance and logistics — so your internship starts productively on day one.",
      },
      {
        title: "Arrival & orientation",
        intro: "Your first days include orientation with the FOSCOD team, an introduction to your host organization, and language and culture basics.",
        body: "Orientation with the FOSCOD team, introduction to your host organization and community, language and culture basics, and a guided look around the project area in Njeru, Buikwe and greater Jinja.",
      },
      {
        title: "Community project design",
        intro: "With your supervisor and host organization, you agree the plan of work: role, activities, objectives, supervision and expected outputs.",
        body: "With your supervisor and host organization you agree the plan of work: role, activities, learning objectives, responsibilities, supervision, expected outputs and ethical requirements.",
      },
      {
        title: "Project implementation",
        intro: "You carry your agreed work through implementation on a live community initiative, learning practical project and budget management as you go.",
        body: "You take your agreed work through implementation on a live community initiative — learning practical project and budget management as you go, with regular check-ins and monitoring.",
      },
      {
        title: "Mid-term retreats",
        intro: "Halfway through, a group retreat gives you time with other interns and volunteers to share experiences, reflect and re-energize.",
        body: "Halfway through your placement, a group retreat offers a change of pace — time with other interns and volunteers to share experiences, reflect and re-energize for the second half.",
      },
      {
        title: "Reflection sessions",
        intro: "Regular guided reflection — journaling, group discussion and supervisor feedback — helps you turn field experience into lasting learning.",
        body: "Regular guided reflection — journaling, group discussion and feedback with your supervisor — helps you process what you're learning about development, research and yourself.",
      },
      {
        title: "Housing",
        intro: "You stay with a carefully selected host family or in program accommodation, with everyday Ugandan life and a supportive household around you.",
        body: "Stay with a carefully selected host family or in program accommodation — everyday Ugandan life at the centre of your experience, with a supportive household around you.",
      },
      {
        title: "Certificates & documented handover",
        intro: "You present your work, submit a final report and complete a documented handover so the host keeps what you built — plus a certificate.",
        body: "You present your work to the host organization and community partners, submit a final report and complete a documented handover so the host keeps what you built. You also receive a certificate recognizing your contribution.",
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
    imageUrl: "/images/gle/volunteer/who-can-volunteer.jpg",
    imageAlt: "A FOSCOD participant working alongside community members in Uganda",
  },
  opportunities: {
    eyebrow: "Current openings",
    title: "Live internship opportunities",
    intro: "A sample of openings currently published in our opportunities directory. Each listing names its host, purpose, learning goals, supervision and practical arrangements.",
    cta: { href: "/opportunities?type=internship", label: "View all internships" },
  },
  fees: {
    eyebrow: "Program fees",
    title: "Structured fees, clearly scoped",
    body: "Internship fees cover essential resources and support services: placement coordination, named supervision, orientation, accommodation arrangement and local support. What is included for your specific intake is confirmed in writing before you make any payment — explore the fee structure to see exactly how your investment contributes to a meaningful experience.",
    cta: { href: "/programs/program-fees", label: "Review the program fees" },
    imageUrl: "/images/gle/volunteer/fees.jpg",
    imageAlt: "A FOSCOD participant reviewing project documents with community members in Uganda",
  },
  readyToApply: {
    eyebrow: "Ready to apply",
    title: "Start your internship with FOSCOD",
    body: "Apply for a supervised internship aligned to your learning objectives — a defined role, named supervision and agreed outputs, in service of community-defined priorities.",
    actions: [
      { href: "/apply?type=internship", label: "Start your internship application" },
      { href: "/opportunities?type=internship", label: "Explore opportunities", variant: "secondary" },
      { href: "/apply?type=guidance", label: "Request placement guidance", variant: "ghost" },
    ],
  },
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
      a: "Placements depend on community priorities, partner availability and program requirements — earlier applications allow better matching. Confirmed intake windows appear in the start-dates section on the apply page when scheduled.",
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
    video: {
      url: "https://www.youtube.com/watch?v=yBzyBeTkzO0",
      title: "Jocelyn Haines summer internship experience",
      caption: "GLE alumni testimonial video",
      thumbnailUrl: "https://i.ytimg.com/vi/yBzyBeTkzO0/hq720.jpg",
    },
  },
};

export const gleLandingContent: Record<GleLandingKind, GleLandingContent> = {
  volunteer,
  internship,
};

/**
 * Filter published testimonials to GLE alumni matching this page's audience
 * (volunteers vs interns/researchers). Falls back to all GLE testimonials,
 * then to everything, so the carousel is never empty.
 */
export function selectTestimonials(
  all: { quote: string; name: string; program?: string; cohort?: string; photo_url?: string | null; linked_program?: string | null }[],
  kind: GleLandingKind
): { quote: string; name: string; program?: string; cohort?: string; photoUrl?: string }[] {
  const gle = all.filter((t) => t.linked_program === "GLE");
  const pool = gle.length ? gle : all;
  const keywords = kind === "volunteer" ? ["volunteer"] : ["intern", "research", "fellow"];
  const matched = pool.filter((t) =>
    keywords.some((k) => `${t.program ?? ""} ${t.name}`.toLowerCase().includes(k))
  );
  const chosen = matched.length ? matched : pool;
  return chosen.map((t) => ({
    quote: t.quote,
    name: t.name,
    program: t.program,
    cohort: t.cohort,
    photoUrl: t.photo_url ?? undefined,
  }));
}
