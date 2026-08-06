export type AudiencePath = {
  title: string;
  body: string;
  href: string;
  cta: string;
};

export const audiencePaths: AudiencePath[] = [
  {
    title: "Students & early-career professionals",
    body: "Build practical experience through a supervised internship or volunteer placement connected to a community-defined priority.",
    href: "/internships",
    cta: "Explore internships",
  },
  {
    title: "Universities & research teams",
    body: "Co-design field learning, faculty-led programs, or community-based research around academic outcomes and local value.",
    href: "/partners",
    cta: "Discuss an academic partnership",
  },
  {
    title: "Funders & technical partners",
    body: "Support a defined program or project with agreed outcomes, evidence requirements, roles, and reporting milestones.",
    href: "/partners",
    cta: "Explore partnership options",
  },
  {
    title: "Community & public-sector partners",
    body: "Bring local priorities, implementation knowledge, coordination, and accountability into a shared program design.",
    href: "/contact",
    cta: "Start a local conversation",
  },
];

export const responsibleEngagement = [
  {
    title: "Community direction",
    body: "Priorities are identified with communities and local partners before participant or funder activity is designed.",
  },
  {
    title: "Right role, right support",
    body: "People are matched to work that fits their skills, preparation, safeguarding requirements, and the supervision available.",
  },
  {
    title: "Useful work and shared learning",
    body: "Each engagement should produce value for the community as well as learning for the participant or institution.",
  },
  {
    title: "Evidence with consent",
    body: "FOSCOD separates verified results from future targets and publishes personal stories only when consent is recorded.",
  },
];

export type SubProgramContext = {
  why: string;
  success: string[];
  partnerFit: string;
  evidenceNote: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const subProgramContext: Record<string, SubProgramContext> = {
  "green-skills-renewable-energy": {
    why: "Uganda's energy transition needs more than equipment. It also needs technicians, entrepreneurs, community awareness, and inclusive pathways into work so new energy services can be installed, maintained, and used well.",
    success: [
      "Learners complete practical, locally relevant training",
      "Technicians and enterprises can support systems after installation",
      "Women, young people, and underserved groups can access training and opportunity",
    ],
    partnerFit: "A strong fit for technical institutes, renewable-energy companies, equipment partners, certification bodies, and funders focused on skills and livelihoods.",
    evidenceNote: "Training counts are reported separately from employment or income outcomes. Job and enterprise claims require follow-up evidence.",
    sourceLabel: "Uganda Energy Transition Plan — IEA and Uganda MEMD",
    sourceUrl: "https://www.iea.org/reports/uganda-energy-transition-plan/executive-summary",
  },
  "clean-cooking-health": {
    why: "Cooking choices connect household health, time, affordability, gender, forest pressure, and climate. Effective programs therefore need suitable technology, user adoption, finance, after-sales support, and careful measurement—not stove distribution alone.",
    success: [
      "Households can access and consistently use an appropriate cooking solution",
      "Technology performance and user experience are monitored",
      "Health or carbon benefits are claimed only when the required evidence exists",
    ],
    partnerFit: "A strong fit for clean-cooking suppliers, public-health teams, women's enterprise partners, carbon specialists, researchers, and patient capital.",
    evidenceNote: "FOSCOD does not treat every improved biomass stove as 'clean for health.' Health language depends on emissions performance and exposure evidence; carbon claims depend on an approved methodology and verification.",
    sourceLabel: "Household air pollution and clean technologies — WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health",
  },
  "water-sanitation-hygiene": {
    why: "A water point is only the beginning. Safe and sustained service depends on access, water quality, sanitation and hygiene behaviour, inclusive governance, maintenance, and a practical plan for repairs.",
    success: [
      "Communities help select and govern appropriate infrastructure",
      "Water quality, functionality, and use are monitored over time",
      "Local committees understand maintenance roles and escalation routes",
    ],
    partnerFit: "A strong fit for WASH funders, engineers, public-health teams, local government, water-quality specialists, and community governance partners.",
    evidenceNote: "Infrastructure completion is reported separately from reliable service, use, water quality, or health outcomes.",
    sourceLabel: "Uganda WASH sector overview — UNICEF",
    sourceUrl: "https://www.unicef.org/uganda/what-we-do/wash",
  },
  "green-livelihoods-economic-empowerment": {
    why: "Climate resilience becomes tangible when households and groups can protect natural resources while improving income security. Skills, savings, market access, production risk, and enterprise follow-up must be considered together.",
    success: [
      "Enterprises respond to a real market opportunity and local capacity",
      "Participants can access savings, peer support, or appropriate finance",
      "Income, business survival, and environmental outcomes are tracked separately",
    ],
    partnerFit: "A strong fit for agribusiness, cooperatives, VSLA and financial-inclusion partners, market actors, researchers, and livelihoods funders.",
    evidenceNote: "People trained, enterprises started, and livelihoods improved are different measures. FOSCOD reports them separately as evidence becomes available.",
    sourceLabel: "Jobs and skills priorities in Uganda — World Bank",
    sourceUrl: "https://www.worldbank.org/en/news/press-release/2026/06/04/world-bank-group-launches-ten-year-strategy-to-drive-jobs-and-prosperity-in-uganda",
  },
  "inclusive-leadership": {
    why: "Participation is most meaningful when women, young people, people with disabilities, and other underrepresented groups can influence decisions—not only attend activities. Accessible formats, safe participation, and leadership roles matter.",
    success: [
      "Participation barriers are identified during design",
      "Underrepresented groups hold visible roles in decisions and delivery",
      "Feedback can be given safely and changes are documented",
    ],
    partnerFit: "A strong fit for women's rights, youth, disability-inclusion, education, leadership, safeguarding, and civic-participation partners.",
    evidenceNote: "Attendance is not presented as empowerment. FOSCOD distinguishes participation, decision-making roles, skills, and longer-term outcomes.",
    sourceLabel: "Uganda National Population and Housing Census 2024 — UBOS",
    sourceUrl: "https://statistics.ubos.org/nphc/reports/National-Population-and-Housing-Census-2024-Final-Report-Volume-1-Main.pdf",
  },
  "ecosystem-restoration-carbon-offsets": {
    why: "Restoration lasts when communities have secure roles, practical livelihood incentives, appropriate species and sites, and a way to monitor survival and ecosystem change. Carbon finance adds requirements for baselines, safeguards, ownership, verification, and transparent benefit sharing.",
    success: [
      "Restoration design reflects local ecology and community priorities",
      "Tree survival and ecosystem indicators are followed beyond planting day",
      "Any carbon units and benefits are verified and communicated without double counting",
    ],
    partnerFit: "A strong fit for restoration science, forestry, biodiversity, remote sensing, community tenure, carbon standards, MRV, and long-term finance partners.",
    evidenceNote: "The Carbon Credit Project is planned. FOSCOD will not describe projected credits, removals, or co-benefits as achieved before validation and verification under the relevant standard.",
    sourceLabel: "Uganda's Updated Nationally Determined Contribution — UNFCCC",
    sourceUrl: "https://unfccc.int/documents/613828",
  },
};
