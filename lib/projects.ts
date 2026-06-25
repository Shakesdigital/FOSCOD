export type ProjectDetail = {
  slug: string;
  title: string;
  theme: string;
  location: string;
  tone: "earth" | "water" | "forest";
  subhead: string;
  challenge: string;
  approach: string[];
  highlights: string[];
  funding: string;
  ctas: { href: string; label: string; variant?: "primary" | "secondary" | "ghost" }[];
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "wash",
    title: "WASH & Public Health",
    theme: "Water & Health",
    location: "Kalagala, Kyambogo, Naluvule, Wabusanke, Byabuku",
    tone: "water",
    subhead:
      "Improving dignity, health, and resilience through clean water, sanitation, hygiene education, and community-owned infrastructure.",
    challenge:
      "Communities in Kalagala, Kyambogo, Naluvule, Wabusanke, and Byabuku face water, sanitation, and hygiene challenges that undermine health and dignity.",
    approach: [
      "Community assessment and prioritization",
      "Water access — protected springs and rainwater harvesting",
      "Hygiene education and menstrual health",
      "Sanitation facilities and school/community engagement",
      "Monitoring and community ownership",
    ],
    highlights: [
      "Protected springs",
      "Rainwater harvesting",
      "Handwashing promotion",
      "Menstrual health",
      "Community hygiene",
    ],
    funding: "Funding supports infrastructure, hygiene programs, and monitoring.",
    ctas: [
      { href: "/donate", label: "Support WASH projects" },
      { href: "/apply", label: "Apply for a WASH internship", variant: "secondary" },
      { href: "/partners", label: "Partner with us", variant: "ghost" },
    ],
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy for Sustainable Development",
    theme: "Clean Energy",
    location: "Greater Mukono & Buikwe",
    tone: "earth",
    subhead:
      "Clean energy solutions that power livelihoods, reduce household risk, protect forests, and improve community wellbeing.",
    challenge:
      "Reliance on fuelwood and unreliable power limits enterprise, harms health, and drives deforestation.",
    approach: [
      "Solar-powered enterprises and home systems",
      "Solar lights and solar water pumps",
      "Energy-efficient cookstoves and biogas",
      "Enterprise training and maintenance",
    ],
    highlights: [
      "Solar enterprises",
      "Home solar systems",
      "Efficient cookstoves",
      "Biogas",
      "Featured: solar-powered salon in Naluvule",
    ],
    funding:
      "Partner and donor support expands access to clean energy and green jobs.",
    ctas: [
      { href: "/donate", label: "Fund a renewable energy project" },
      { href: "/partners", label: "Partner with us", variant: "secondary" },
    ],
  },
  {
    slug: "biochar-uganda",
    title: "Biochar Uganda",
    theme: "Climate & Soil",
    location: "Kalagala Parish, Buikwe District",
    tone: "forest",
    subhead:
      "Regenerating land, livelihoods, and climate resilience in Kalagala Parish.",
    challenge:
      "Kalagala Parish faces invasive water hyacinth, deforestation, soil degradation, unemployment, and sanitation gaps.",
    approach: [
      "Transform invasive water hyacinth into biochar",
      "Improve soil and support clean cooking",
      "Compost sanitation and carbon removal",
      "Feedstock → processing → products → certification → MRV → credit issuance",
    ],
    highlights: [
      "Carbon removal",
      "Women & youth enterprise",
      "Soil & sanitation",
      "Energy access",
      "Forest protection",
    ],
    funding:
      "Funding need: feasibility studies, MRV setup, cooperative training, and PDD development.",
    ctas: [
      { href: "/partners", label: "Partner on Biochar Uganda" },
      { href: "/donate", label: "Fund the pre-certification phase", variant: "secondary" },
    ],
  },
  {
    slug: "sustainable-livelihood-green-enterprises",
    title: "Sustainable Livelihoods & Green Enterprises",
    theme: "Green Enterprise",
    location: "Buikwe & Mukono",
    tone: "forest",
    subhead:
      "Helping communities grow income while restoring ecosystems and building climate resilience.",
    challenge:
      "Households need income that does not come at the expense of the land they depend on.",
    approach: [
      "Green enterprise model and agroforestry",
      "VSLA and microenterprise development",
      "Food security and climate-smart agriculture",
      "Women and youth livelihoods",
    ],
    highlights: [
      "Agroforestry & tree planting",
      "VSLA savings groups",
      "Climate-smart agriculture",
      "Women & youth enterprise",
    ],
    funding:
      "Support grows enterprises, savings groups, and climate-smart farming.",
    ctas: [
      { href: "/donate", label: "Support livelihood projects" },
      { href: "/apply", label: "Apply for a livelihoods internship", variant: "secondary" },
    ],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((p) => p.slug === slug) ?? null;
}
