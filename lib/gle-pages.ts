/**
 * Global Learning Exchange (GLE) — content for the five-page structure.
 *
 * Every string below is taken verbatim from
 * "Global Learning Exchange website content.docx". Only typographic spacing
 * has been corrected (a hyphen read as a dash in "1–4 weeks" and the two
 * participation-format title dashes). Do not paraphrase or rewrite.
 */

export const GLE = "/programs/global-learning-exchange";

export const gleLinks = {
  overview: GLE,
  volunteer: `${GLE}/volunteer`,
  internship: `${GLE}/internship`,
  opportunities: "/opportunities",
  apply: `${GLE}/apply`,
} as const;

export const glePhotoFallbacks = {
  community: "/images/gle/volunteer/who-can-volunteer.jpg",
  preparation: "/images/gle/volunteer/fees.jpg",
  learning: "/images/gle/volunteer/duration.jpg",
} as const;
const existingGlePhotos = new Set<string>(Object.values(glePhotoFallbacks));

export function resolveGlePhoto(imageUrl: string | undefined, fallback: string) {
  if (
    imageUrl &&
    (imageUrl.startsWith("https://") ||
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("/storage/") ||
      existingGlePhotos.has(imageUrl))
  ) {
    return imageUrl;
  }
  return fallback;
}

export const gleNav = [
  { href: gleLinks.overview, label: "Overview" },
  { href: gleLinks.volunteer, label: "Volunteer" },
  { href: gleLinks.internship, label: "Internship" },
  { href: gleLinks.opportunities, label: "Opportunities" },
  { href: gleLinks.apply, label: "Apply" },
];

export const gleIntro = {
  title: "Global Learning Exchange (GLE)",
  tagline: "Learning Together. Creating Lasting Community Impact.",
  paragraphs: [
    "Global Learning Exchange (GLE) is FOSCOD's community-engaged learning program that designs and facilitates internships, volunteering, research, service learning and study tours in collaboration with local communities and partner organizations.",
    "Through locally defined initiatives, practical engagement, cultural immersion and mutual knowledge exchange, GLE strengthens participants' professional and intercultural competencies while promoting ethical community-based development and lasting community benefits.",
  ],
};

export const gleExplore = {
  title: "Explore GLE Opportunities",
  paragraphs: [
    "FOSCOD offers diverse learning and engagement opportunities through its Community Empowerment and Development Program (CEDP) and a network of local partner organizations working across different development sectors.",
    "Our programs are designed to align participants' academic and professional learning objectives with community priorities, local knowledge and partner expertise.",
  ],
};

export const gleMatching = {
  title: "Matching Your Interests with Opportunities",
  paragraphs: [
    "Participants may select one or more thematic interests from either or both categories.",
    "FOSCOD works with participants and local partners to identify suitable opportunities that align academic and professional goals with community priorities, available expertise and appropriate supervision.",
  ],
  note: "Placement opportunities depend on partner availability, program requirements and agreed learning objectives.",
};

export type GleProgramType = {
  slug: string;
  title: string;
  /** The number as printed in the document ("1." … "5."). */
  number: string;
  paragraphs: string[];
};

export const gleProgramTypes: GleProgramType[] = [
  {
    slug: "individual",
    number: "1.",
    title: "Individual Internship or Volunteer Placement",
    paragraphs: [
      "A structured placement for students, graduates, professionals and volunteers seeking practical experience in community-based development. Participants engage in locally defined projects or research with FOSCOD or its partner organizations, supported by professional supervision, guided reflection and cultural learning.",
      "Placements may also fulfil academic requirements through agreed learning objectives and assessments.",
    ],
  },
  {
    slug: "group-project",
    number: "2.",
    title: "Group Project Placement",
    paragraphs: [
      "A collaborative placement where participants from the same university or institution work together with a host organization on a shared community development project or research initiative.",
      "The program promotes teamwork, experiential learning and collective contributions to locally identified community priorities.",
    ],
  },
  {
    slug: "coordinated-group",
    number: "3.",
    title: "Coordinated Group Placement",
    paragraphs: [
      "A structured program for groups from the same university or institution, with participants placed across different local partner organizations according to their academic interests, skills and learning objectives.",
      "Individual placements are complemented by coordinated learning activities, cultural engagement and shared reflection.",
    ],
  },
  {
    slug: "service-learning-trip",
    number: "4.",
    title: "Service-Learning Trip",
    paragraphs: [
      "A short-term program, typically lasting 1–4 weeks, that integrates meaningful community engagement with structured learning, guided reflection and cultural immersion.",
      "Designed for student and professional groups, the program combines educational objectives with locally identified community priorities to promote mutual learning, social responsibility and sustainable community benefits.",
    ],
  },
  {
    slug: "study-tour",
    number: "5.",
    title: "Study Tour Program",
    paragraphs: [
      "A customized educational experience for schools and university groups, lasting at least eight days.",
      "Developed collaboratively with participating institutions, study tours combine lectures, community engagement, organizational visits, discussions, guided reflection and cultural excursions to deepen participants' understanding of sustainable community-based development in Uganda.",
    ],
  },
];

export const gleSteps = [
  {
    number: "1",
    title: "Choose Your Program Type",
    line: "Select the program that best aligns with your interests, academic requirements and professional goals.",
  },
  {
    number: "2",
    title: "Choose Your Thematic Area",
    line: "Explore development areas that align with your academic interests, professional background and learning objectives.",
  },
  {
    number: "3",
    title: "Choose Your Engagement Approach",
    line: "Select how you would like to engage with communities, apply your skills and contribute to sustainable development.",
  },
  {
    number: "4",
    title: "Choose Your Participation Format",
    line: "Select how you would prefer to participate in your chosen program.",
  },
];

export const gleThematic = {
  stepIntro:
    "Explore development areas that align with your academic interests, professional background and learning objectives.",
  lead: "GLE facilitates learning opportunities through FOSCOD's Community Empowerment and Development Program (CEDP) and its network of local partner organizations.",
  cedp: {
    title: "A. FOSCOD's Community Empowerment and Development Program (CEDP)",
    paragraphs: [
      "CEDP is FOSCOD's place-based development program that supports underserved communities to identify their priorities, strengthen local capacities and lead collaborative solutions to development challenges.",
      "Grounded in ethical community engagement, local leadership and environmental sustainability, CEDP promotes lasting improvements in community well-being and livelihoods through three integrated focus areas:",
    ],
    areas: [
      {
        title: "1. Clean Energy & Climate Resilience",
        body: "Promoting clean energy, climate adaptation, afforestation, ecosystem restoration and sustainable environmental practices.",
        icon: "energy",
        imageUrl: "/images/gle/thematic/clean-energy.jpg",
        imageAlt: "Solar panels and clean energy infrastructure in a rural Ugandan community",
      },
      {
        title: "2. Water, Sanitation & Community Health",
        body: "Improving access to safe water, sanitation and hygiene while promoting community health awareness, disease prevention and appropriate referrals.",
        icon: "water",
        imageUrl: "/images/gle/thematic/water-sanitation.jpg",
        imageAlt: "A protected community water source and sanitation project in Uganda",
      },
      {
        title: "3. Sustainable Livelihoods, Skills & Economic Empowerment",
        body: "Strengthening livelihoods through skills development, agroecology, agroforestry, food security, savings, entrepreneurship and income generation.",
        icon: "livelihoods",
        imageUrl: "/images/gle/thematic/sustainable-livelihoods.jpg",
        imageAlt: "Community members in a sustainable livelihoods and skills training session",
      },
    ],
  },
  partners: {
    title: "B. Local Partner Organizations' Development Sectors",
    lead: "FOSCOD collaborates with local partner organizations to facilitate learning and engagement opportunities across the following development sectors:",
    sectors: [
      "Women's Empowerment & Gender Equality",
      "Health",
      "Information & Communication Technology (ICT)",
      "Microenterprise & Microfinance",
      "Environment & Conservation",
      "Community Development",
      "Human Rights",
      "Education & Youth Development",
      "Art, History & Culture – Visual and Performing Arts",
      "Engineering – Civil, Solar Energy and Water Systems",
    ],
  },
};

export const gleEngagement = {
  stepIntro:
    "Select how you would like to engage with communities, apply your skills and contribute to sustainable development.",
  title: "For Individual and Group Placements",
  lead: "GLE offers three complementary engagement options:",
  options: [
    {
      letter: "A",
      title: "Community-Based Development Projects",
      paragraphs: [
        "Participants collaborate with communities and local partners to identify priorities, plan, implement and monitor development initiatives.",
        "The approach emphasizes practical engagement, locally driven solutions and experiential learning. Participatory inquiry, monitoring and reflection may be incorporated to inform project decisions and improve outcomes.",
      ],
    },
    {
      letter: "B",
      title: "Community-Based Participatory Research (CBPR)",
      paragraphs: [
        "Participants work collaboratively with communities and local partners to investigate locally identified issues, generate relevant knowledge and explore evidence-informed solutions.",
        "The approach develops applied research competencies while supporting community decision-making, development practice and policy.",
        "Research findings are shared with community partners to inform practical action and continuing development.",
      ],
    },
    {
      letter: "C",
      title: "Integrated Community Development & Participatory Research",
      paragraphs: [
        "This approach combines participatory research and practical development activities within a coordinated learning experience.",
        "Participants collaborate with communities and partners to understand development challenges, generate evidence, implement or strengthen appropriate interventions, and assess emerging results.",
        "It promotes continuous learning, allowing research to inform development action while practical experience generates knowledge for future improvements.",
      ],
    },
  ],
  note: "The three approaches are complementary. A participant may select a primary focus or pursue an integrated experience, depending on community priorities, learning objectives and placement opportunities.",
};

export const gleLearningFocus = {
  title: "For Service-Learning Trips and Study Tours",
  heading: "Choose Your Learning Focus",
  paragraphs: [
    "Participants or sponsoring institutions identify their preferred thematic areas and learning objectives.",
    "FOSCOD collaborates with participating institutions and local partners to design suitable experiences that may combine community development practice, participatory learning, research exposure, reflection and cultural exchange.",
    "The scope of activities is tailored to the program's duration, educational objectives and community priorities.",
  ],
};

export const gleParticipation = {
  stepIntro: "Select how you would prefer to participate in your chosen program.",
  formats: [
    {
      letter: "A",
      title: "In-Person Participation – Uganda",
      paragraphs: [
        "Participants engage directly with FOSCOD, local partner organizations and communities through structured placements and learning activities in Uganda. In-person participation combines practical experience, professional supervision, community engagement, cultural immersion and guided reflection.",
        "This format is available across GLE program types, subject to placement arrangements.",
      ],
      note: "",
    },
    {
      letter: "B",
      title: "Virtual Participation – Remote",
      paragraphs: [
        "Participants engage remotely through structured online placements, supervised projects, collaborative research and other agreed activities. Virtual participation provides opportunities to develop professional competencies, exchange knowledge and contribute meaningfully to community development without travelling to Uganda.",
      ],
      note: "Virtual participation is considered for suitable individual and group internships or volunteer placements. Service-learning trips and study tours are primarily in-person programs, with alternative arrangements considered separately.",
    },
  ],
};

export const gleDevelopmentProcess = {
  title: "How We Develop Your GLE Experience",
  intro:
    "FOSCOD works collaboratively with participants, sponsoring institutions, local communities and partner organizations to develop meaningful and mutually beneficial learning experiences.",
  lead: "The process includes:",
  steps: [
    {
      title: "Understanding Your Interests",
      body: "Reviewing your academic background, skills, learning objectives and preferred program options.",
    },
    {
      title: "Identifying Suitable Opportunities",
      body: "Exploring community priorities, available projects, research needs and potential host organizations.",
    },
    {
      title: "Collaborative Placement Planning",
      body: "Agreeing on activities, learning objectives, responsibilities, supervision, expected outputs and ethical requirements.",
    },
    {
      title: "Supported Engagement & Learning",
      body: "Providing orientation, mentorship, practical guidance, monitoring and opportunities for reflection.",
    },
    {
      title: "Knowledge Sharing & Continuity",
      body: "Reviewing outcomes with community partners, sharing findings and documenting lessons to support continuing development.",
    },
  ],
};

export const gleEthics = {
  title: "Our Commitment to Ethical Community Engagement",
  paragraphs: [
    "At FOSCOD, community-engaged learning is grounded in meaningful participation, mutual respect, shared responsibility and sustainable development.",
    "We recognize communities, participants, host organizations and sponsoring institutions as active partners who bring valuable knowledge, skills and experiences to the learning and development process.",
    "Our approach promotes locally defined priorities, community ownership, reciprocal learning and responsible contributions that generate value for all partners and strengthen development beyond individual placements.",
  ],
};

export const gleBegin = {
  title: "Begin Your GLE Journey",
  body: "Explore opportunities that match your interests and learning objectives while contributing to meaningful community-led development in Uganda.",
};

export const gleApply = {
  title: "Start Your GLE Application",
  note: "Not sure which opportunity suits you? Contact FOSCOD for guidance on identifying an appropriate program, thematic area and engagement approach.",
};

/** [ADDED] Functional UI strings, kept in one place for the completion report. */
export const gleUi = {
  overviewEyebrow: "Global Learning Exchange",
  exploreEyebrow: "Explore",
  exploreCta: "Explore GLE opportunities",
  matchingEyebrow: "Thematic interests",
  pathwaysEyebrow: "Find your pathway",
  pathwaysTitle: "Where would you like to start?",
  volunteerLabel: "Volunteer",
  internshipLabel: "Internship",
  opportunitiesLabel: "Opportunities",
  applyLabel: "Apply",
  thematicEyebrow: "Step 2",
  cedpEyebrow: "FOCUS AREA A",
  partnersEyebrow: "FOCUS AREA B",
  engagementEyebrow: "Step 3",
  applyCta: "Start your application",
  opportunitiesCta: "Explore opportunities",
  volunteerCta: "Explore volunteering",
  internshipCta: "Explore internships",
  seeStepsCta: "See the four steps",
  programTypesTitle: "Choose Your Program Type",
  nextStepEyebrow: "Next step",
};
