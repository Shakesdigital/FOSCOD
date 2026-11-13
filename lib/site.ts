/**
 * Site-wide constants and navigation. These are the built-in defaults; once the
 * Supabase `settings` and `navigation` tables are seeded, the data layer reads
 * from there and these act as fallbacks.
 */

export const site = {
  name: "FOSCOD",
  legalName: "Foundation for Sustainable Community-Based Development",
  tagline: "Bridge global learning with local innovation",
  description:
    "FOSCOD empowers underserved communities in Uganda to drive environmental innovation and adopt clean energy through ethical, sustainable development and global knowledge exchange.",
  url: "https://www.foscod.org",
  contact: {
    location: "Kasigwa Road, Plot 2, Njeru Municipality, Buikwe District, Uganda",
    mailing: "P.O. Box 1722, Jinja, Uganda",
    email: "info@foscod.org",
    secondaryEmail: "foscoduganda@gmail.com",
    phone: "+256 772 989971",
  },
  social: {
    facebook: "https://facebook.com/foscoduganda",
    instagram: "",
    linkedin: "https://linkedin.com/company/foundation-for-sustainable-community-based-development",
    youtube: "https://youtube.com/@foscoduganda",
    x: "https://x.com/foscoduganda",
    tiktok: "https://tiktok.com/@foscodug",
  },
  registration: {
    number: "INDR143472008NB",
    authority: "Uganda National Bureau for NGOs",
  },
  mou: {
    partner: "Buikwe Local Government",
    description: "Memorandum of Understanding for community development in Buikwe District",
  },
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

// 5-ITEM MAIN NAVIGATION per spec
// Persistent CTAs (Partner with us, Volunteer or Intern, Donate to a project) are handled in Header component
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Global Learning Exchange Program (GLE)", href: "/programs/global-learning-exchange" },
      { label: "Community Empowerment & Development Program (CEDP)", href: "/programs/community-empowerment-development" },
    ],
  },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Apply", href: "/apply" },
  { label: "Impact", href: "/impact/general" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav: { heading: string; links: NavChild[] }[] = [
  {
    heading: "Programs",
    links: [
      { label: "Global Learning Exchange Program (GLE)", href: "/programs/global-learning-exchange" },
      { label: "Community Empowerment and Development Program (CEDP)", href: "/programs/community-empowerment-development" },
      { label: "Clean Energy & Climate Resilience", href: "/programs/cedp/areas/clean-energy-climate-resilience" },
      { label: "Water, Sanitation & Health Communities", href: "/programs/cedp/areas/water-sanitation-health-communities" },
      { label: "Sustainable Livelihoods & Economic Empowerment", href: "/programs/cedp/areas/sustainable-livelihoods-economic-empowerment" },
    ],
  },
  {
    heading: "Take part",
    links: [
      { label: "Explore opportunities", href: "/opportunities" },
      { label: "Plan your experience / Apply", href: "/apply" },
      { label: "Fees & practical information", href: "/programs/program-fees" },
      { label: "Partner with us", href: "/partners" },
      { label: "Support community work", href: "/donate" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Blog", href: "/stories" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Impact",
    links: [
      { label: "Impact Overview", href: "/impact/general" },
      { label: "Impact Stories", href: "/impact/stories" },
      { label: "Projects", href: "/projects/archive" },
      { label: "Downloads & Reports", href: "/impact#downloads" },
    ],
  },
];

// CEDP sub-program slugs for reference
export const cedpSubPrograms = [
  { slug: "green-skills-renewable-energy", name: "Green Skills & Renewable Energy Education", goal: 1 },
  { slug: "clean-cooking-health", name: "Clean Cooking & Health", goal: 2 },
  { slug: "water-sanitation-hygiene", name: "Water, Sanitation & Hygiene (WASH)", goal: 3 },
  { slug: "green-livelihoods-economic-empowerment", name: "Green Livelihoods & Economic Empowerment", goal: 4 },
  { slug: "inclusive-leadership", name: "Inclusive Leadership — Women, Youth & Climate Leadership", goal: 5 },
  { slug: "ecosystem-restoration-carbon-offsets", name: "Ecosystem Restoration & Carbon Offsets", goal: 6 },
] as const;
