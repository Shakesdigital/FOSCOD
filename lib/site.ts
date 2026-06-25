/**
 * Site-wide constants and navigation. These are the built-in defaults; once the
 * Supabase `settings` and `navigation` tables are seeded, the data layer reads
 * from there and these act as fallbacks.
 */

export const site = {
  name: "FOSCOD",
  legalName: "Foundation for Sustainable Community Based Development",
  tagline: "Bridge global learning with local innovation",
  description:
    "FOSCOD empowers rural and underserved communities in Uganda through community-led development, clean energy, environmental sustainability, and hands-on global learning programs.",
  url: "https://www.foscod.org",
  contact: {
    location: "Jinja / Njeru, Uganda",
    email: "info@foscod.org",
    phone: "+256 700 000 000",
  },
  social: {
    facebook: "https://facebook.com/foscod",
    instagram: "https://instagram.com/foscod",
    linkedin: "https://linkedin.com/company/foscod",
    youtube: "",
  },
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs/global-learning-exchange",
    children: [
      { label: "Global Learning & Exchange", href: "/programs/global-learning-exchange" },
      { label: "Internships", href: "/internships" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Community Empowerment (CEDP)", href: "/programs/community-empowerment-development" },
      { label: "Program Finder", href: "/programs/finder" },
      { label: "Program Fees", href: "/programs/program-fees" },
    ],
  },
  {
    label: "Projects & Impact",
    href: "/projects",
    children: [
      { label: "Project Library", href: "/projects" },
      { label: "WASH & Public Health", href: "/projects/wash" },
      { label: "Renewable Energy", href: "/projects/renewable-energy" },
      { label: "Biochar Uganda", href: "/projects/biochar-uganda" },
      { label: "Sustainable Livelihoods", href: "/projects/sustainable-livelihood-green-enterprises" },
      { label: "Impact Dashboard", href: "/impact" },
      { label: "Stories", href: "/stories" },
    ],
  },
  {
    label: "Get Involved",
    href: "/apply",
    children: [
      { label: "Apply", href: "/apply" },
      { label: "Partner with FOSCOD", href: "/partners" },
      { label: "Donate", href: "/donate" },
    ],
  },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavChild[] }[] = [
  {
    heading: "Programs",
    links: [
      { label: "Global Learning & Exchange", href: "/programs/global-learning-exchange" },
      { label: "Internships", href: "/internships" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Program Finder", href: "/programs/finder" },
      { label: "Program Fees", href: "/programs/program-fees" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { label: "WASH & Public Health", href: "/projects/wash" },
      { label: "Renewable Energy", href: "/projects/renewable-energy" },
      { label: "Biochar Uganda", href: "/projects/biochar-uganda" },
      { label: "Impact Dashboard", href: "/impact" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Partner with Us", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
