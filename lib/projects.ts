export type ProjectDetail = {
  slug: string;
  title: string;
  theme: string;
  location: string;
  tone: "earth" | "water" | "forest";
  subhead: string;
  challenge: string;
  challengeImage?: string;
  approach: string[];
  highlights: string[];
  funding: string;
  heroImage?: string;
  gallery?: { url: string; alt?: string; caption?: string; beforeAfter?: "before" | "after" }[];
  timeline?: { date: string; milestone: string; description?: string }[];
  budget?: string;
  outcomes?: { metric: string; value: string; unit?: string; note?: string; status?: "verified" | "draft" }[];
  communityVoice?: { quote: string; name?: string; role?: string };
  projectBriefUrl?: string;
  relatedActivities?: { slug: string; title: string; status: "planned" | "ongoing" | "completed" }[];
  ctas: { href: string; label: string; variant?: "primary" | "secondary" | "ghost" }[];
};

/* ---------- project detail page: activities & impact cards ---------- */

export type ProjectActivity = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
};

export type ProjectImpactCard = {
  title: string;
  excerpt?: string;
  imageUrl?: string;
  imageAlt?: string;
  verifiedOutcome?: string;
  href?: string;
  ctaLabel?: string;
};

export const projectActivities: Record<string, ProjectActivity[]> = {
  "solar-powered-water-system-naluvule": [
    {
      title: "Community needs assessment",
      description:
        "FOSCOD and the Naluvule community conducted a joint field survey mapping water access points, daily water-collection patterns, and existing energy sources. The assessment established a 25% community co-contribution agreement and identified the solar-borehole site at the village edge as the priority location.",
      imageAlt: "Community members mapping water points during needs assessment",
    },
    {
      title: "Solar system design & procurement",
      description:
        "Engineers from FOSCOD and a technical partner designed a 3 kW solar array to power a 7.5 HP submersible pump capable of delivering 40,000 litres per day. The system includes a 5,000 L overhead tank, a gravity-feed manifold, and kiosk connections to six distribution points across the village. All equipment was locally sourced where possible.",
      imageAlt: "Solar panel array and pump schematic",
    },
    {
      title: "Installation & community training",
      description:
        "Over eight weeks, local technicians and village volunteers installed the solar array, drilled the borehole, and constructed the tank foundation. A three-day train-the-trainer workshop certified twelve community members in basic solar maintenance, pump servicing, and financial record-keeping for the water user committee.",
      imageAlt: "Community technicians installing solar panels",
    },
    {
      title: "System commissioning & handover",
      description:
        "The solar-powered water system was officially handed over to the Naluvule Water User Committee in a village ceremony attended by local government officials, the FOSCOD team, and community elders. A maintenance register, spare-parts fund, and quarterly inspection schedule were established to guarantee long-term sustainability.",
      imageAlt: "Handover ceremony with community and FOSCOD representatives",
    },
  ],
};

export const projectImpacts: Record<string, ProjectImpactCard[]> = {
  "solar-powered-water-system-naluvule": [
    {
      title: "Solar-powered hair salon",
      excerpt:
        "A solar-powered hair salon turned an unreliable income into a growing business — clean energy powering livelihoods.",
      verifiedOutcome: "3 households gained reliable evening lighting and new income streams",
      href: "/impact/stories/solar-powered-salon-naluvule/full",
      ctaLabel: "Read the impact story",
      imageAlt: "Salon owner working under solar-powered lighting",
    },
    {
      title: "Reliable water access for 240 people",
      excerpt:
        "The community solar borehole delivers treated water daily with 95% uptime in its first year — eliminating the need for long water-collection trips.",
      verifiedOutcome: "240 people access treated water daily with 95% system uptime",
      href: "/impact/stories/naluvule-water-access/full",
      ctaLabel: "Read the impact story",
      imageAlt: "Children filling jerrycans at the solar-powered water kiosk",
    },
    {
      title: "Youth technical skills program",
      excerpt:
        "Twelve community members were certified in solar PV installation and pump maintenance, creating a local technical workforce.",
      verifiedOutcome: "12 technicians trained; 8 employed within 6 months",
      href: "/impact/stories/naluvule-youth-tech/full",
      ctaLabel: "Read the impact story",
      imageAlt: "Graduating youth technicians in solar training workshop",
    },
  ],
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "greening-kalagala",
    title: "Greening Kalagala",
    theme: "Ecosystem Restoration",
    location: "Kalagala Parish, Buikwe District",
    tone: "forest",
    subhead: "A community reforestation campaign in FOSCOD's core CEDP implementation area.",
    challenge: "Kalagala Parish borders the Mabira Forest ecosystem and faces forest degradation, unsustainable land-use pressure, and the need for community-owned restoration.",
    approach: [
      "Mobilize communities around locally defined restoration priorities",
      "Support native planting and degraded-land rehabilitation",
      "Build conservation knowledge through schools and community groups",
      "Use participatory biodiversity monitoring to guide learning",
    ],
    highlights: ["Community-led restoration", "Native planting", "Mabira Forest buffer", "Participatory monitoring"],
    funding: "Support community mobilization, planting, training, and long-term monitoring.",
    ctas: [
      { href: "/donate?program=ecosystem", label: "Support ecosystem restoration" },
      { href: "/partners", label: "Partner with FOSCOD", variant: "secondary" },
    ],
  },
  {
    slug: "water-spring-protection-naluvule",
    title: "Water Spring Protection in Naluvule Community",
    theme: "Water, Sanitation & Hygiene",
    location: "Naluvule, Buikwe District",
    tone: "water",
    subhead: "Community-led protection of a natural water spring in Naluvule.",
    challenge: "Kalagala Parish communities face unreliable access to safe water, inadequate sanitation, and gaps between rural and municipal service delivery.",
    approach: [
      "Assess the spring and surrounding community water needs",
      "Protect the natural source and reduce contamination risks",
      "Strengthen community operation, maintenance, and governance",
      "Link water-quality and health monitoring to future improvements",
    ],
    highlights: ["Natural spring protection", "Community governance", "Water quality", "Naluvule"],
    funding: "Support water-source protection, community governance, and monitoring.",
    ctas: [
      { href: "/donate?program=wash", label: "Support WASH work" },
      { href: "/partners", label: "Partner on WASH", variant: "secondary" },
    ],
  },
  {
    slug: "coffee-farming-mobilization",
    title: "Coffee Farming Mobilization",
    theme: "Green Livelihoods",
    location: "Kalagala Parish, Buikwe District",
    tone: "earth",
    subhead: "Community mobilization around coffee farming and resilient local livelihoods.",
    challenge: "Households in Kalagala Parish face food insecurity, constrained market access, and the need for livelihoods that are resilient to climate and land-use pressure.",
    approach: [
      "Mobilize farmers around shared priorities and local knowledge",
      "Connect coffee farming with climate-smart agriculture and agroforestry",
      "Strengthen enterprise, cooperative, and market-readiness skills",
      "Build local ownership through community-led planning",
    ],
    highlights: ["Coffee value chain", "Farmer mobilization", "Climate-smart agriculture", "Local enterprise"],
    funding: "Support farmer learning, demonstration activities, enterprise skills, and market linkages.",
    ctas: [
      { href: "/donate?program=livelihoods", label: "Support green livelihoods" },
      { href: "/partners", label: "Partner on livelihoods", variant: "secondary" },
    ],
  },
  {
    slug: "solar-powered-water-system-naluvule",
    title: "Solar-Powered Water System, Naluvule Village",
    theme: "Clean Energy & WASH",
    location: "Naluvule, Buikwe District",
    tone: "water",
    subhead: "A solar-powered water initiative linking renewable energy with community water access.",
    challenge: "Naluvule needs reliable water infrastructure that can operate sustainably while reducing dependence on costly or unreliable energy sources.",
    challengeImage: "/images/naluvule/challenge-site.jpg",
    approach: [
      "Combine solar energy with community water infrastructure",
      "Train local committees in operation, maintenance, and governance",
      "Use community participation to support ownership and sustainability",
      "Track water access, system functionality, and learning",
    ],
    highlights: ["Solar-powered water", "Community management", "Renewable energy", "Naluvule"],
    funding: "Support system development, maintenance training, and community water governance.",
    ctas: [
      { href: "/donate?program=wash", label: "Support solar-powered water" },
      { href: "/partners", label: "Partner on clean energy", variant: "secondary" },
    ],
  },
  {
    slug: "carbon-credit-project",
    title: "Carbon Credit Project",
    theme: "Clean Cooking & Ecosystem Restoration",
    location: "Kalagala Parish, Buikwe District",
    tone: "forest",
    subhead: "A planned clean-cookstove and reforestation initiative with transparent community benefit sharing.",
    challenge: "Charcoal dependence, indoor air pollution, deforestation, and ecosystem degradation require an approach that connects household energy, restoration, and durable local benefit.",
    approach: [
      "Develop clean-cookstove and community reforestation activities",
      "Align project design with Gold Standard and Verra REDD+ methodologies",
      "Build local capacity for measurement, reporting, and verification",
      "Design transparent community governance and benefit-sharing mechanisms",
    ],
    highlights: ["Clean cooking", "Reforestation", "Carbon accounting", "Community benefit sharing"],
    funding: "Support technical design, community safeguards, certification readiness, and transparent monitoring.",
    ctas: [
      { href: "/partners", label: "Explore a carbon partnership" },
      { href: "/donate?program=ecosystem", label: "Support restoration", variant: "secondary" },
    ],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((project) => project.slug === slug) ?? null;
}
