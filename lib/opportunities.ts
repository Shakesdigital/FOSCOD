import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/* ============================================================
   Internship & volunteer project opportunities.
   Supabase-first (once the `opportunities` table is seeded) with a
   rich built-in fallback so the listing + detail pages render fully
   before the database is connected.
   ============================================================ */

export type OpportunityType = "internship" | "volunteer";

export type OpportunitySummary = {
  slug: string;
  title: string;
  type: OpportunityType;
  category: string;
  location: string;
  duration: string;
  excerpt: string;
};

export type Opportunity = OpportunitySummary & {
  about: string;
  highlights: string[];
  requirements: string[];
  whyChoose: string[];
  sdgs: string[];
  gallery: string[];
};

const OPPORTUNITIES: Opportunity[] = [
  {
    slug: "wash-public-health-internship",
    title: "WASH & Public Health Internship",
    type: "internship",
    category: "WASH & Health",
    location: "Naluvule Village, Buikwe District",
    duration: "4 – 16 weeks (flexible)",
    excerpt:
      "Improve household water, sanitation, and hygiene practices in rural communities. Work directly with families and schools to promote healthier living.",
    about:
      "This internship contributes to improving household water, sanitation, and hygiene (WASH) practices in Naluvule Village, with the goal of reducing water-borne diseases and strengthening community resilience. Interns work directly with families, schools, and community groups to promote healthier practices and improve access to safe water.\n\nThe project is aligned with Uganda's National Health Policy, the National Sanitation and Hygiene Policy, and Vision 2040 — all of which emphasize universal access to safe water, improved sanitation, disease prevention, and community-led health initiatives.",
    highlights: [
      "Conduct baseline assessments on household WASH practices.",
      "Co-design and roll out hygiene promotion campaigns in schools and households.",
      "Facilitate community dialogues on safe water, sanitation, and hygiene.",
      "Document and report on community water access improvements and behaviour change.",
      "Link WASH with renewable energy and sustainable livelihoods.",
    ],
    requirements: [
      "A background or strong interest in public health, WASH, or environmental health.",
      "Comfort with community outreach, basic data collection, and facilitation.",
      "Cultural sensitivity, adaptability, and willingness to travel to rural sites.",
      "Strong communication and teamwork skills.",
    ],
    whyChoose: [
      "Gain hands-on experience in rural WASH programming.",
      "Develop field research and behaviour-change communication skills.",
      "Understand the intersection of WASH, energy, and public health.",
      "Contribute directly to Uganda's national WASH goals and policies.",
    ],
    sdgs: ["SDG 3 · Good Health & Well-Being", "SDG 6 · Clean Water & Sanitation", "SDG 7 · Affordable & Clean Energy"],
    gallery: [],
  },
  {
    slug: "clean-water-initiative",
    title: "Clean Water Initiative",
    type: "internship",
    category: "WASH & Health",
    location: "Kampala, Uganda",
    duration: "12 weeks",
    excerpt:
      "Provide clean drinking water to rural communities through sustainable water-purification systems and community education.",
    about:
      "The Clean Water Initiative expands access to safe drinking water for rural and peri-urban households through low-cost purification systems, protected sources, and community education on safe storage and handling.",
    highlights: [
      "Support the installation and monitoring of water-purification systems.",
      "Train households and schools on safe storage and handling.",
      "Map water points and track access improvements.",
    ],
    requirements: [
      "Interest in water engineering, public health, or environmental science.",
      "Willingness to work in the field with communities.",
      "Basic data-collection and reporting skills.",
    ],
    whyChoose: [
      "Work on a tangible, life-changing intervention.",
      "Build skills in WASH systems and community mobilisation.",
      "Contribute to measurable improvements in water access.",
    ],
    sdgs: ["SDG 6 · Clean Water & Sanitation", "SDG 3 · Good Health & Well-Being"],
    gallery: [],
  },
  {
    slug: "maternal-infant-mortality-reduction",
    title: "Maternal and Infant Mortality Reduction Project",
    type: "internship",
    category: "WASH & Health",
    location: "Njeru Municipality, Buikwe",
    duration: "4 months",
    excerpt:
      "Address Uganda's high maternal and infant mortality rates through improved healthcare access and education.",
    about:
      "This project works to reduce maternal and infant mortality by strengthening community health education, referral awareness, and access to essential maternal services in partnership with local health facilities.",
    highlights: [
      "Support maternal and newborn health education sessions.",
      "Strengthen referral awareness and antenatal-care uptake.",
      "Document outcomes and community health indicators.",
    ],
    requirements: [
      "Background or interest in public health, nursing, or midwifery.",
      "Empathy, cultural sensitivity, and strong communication.",
      "Comfort working alongside community health workers.",
    ],
    whyChoose: [
      "Contribute to saving lives where it matters most.",
      "Learn community health systems from the inside.",
      "Grow through mentorship and cross-cultural exchange.",
    ],
    sdgs: ["SDG 3 · Good Health & Well-Being", "SDG 5 · Gender Equality"],
    gallery: [],
  },
  {
    slug: "agroforestry-livelihoods-internship",
    title: "Agroforestry & Livelihoods Internship",
    type: "internship",
    category: "Agroforestry",
    location: "Buikwe District, Uganda",
    duration: "2 – 4 months",
    excerpt:
      "Support community and agroforestry and tree-based livelihoods. Promote climate-resilient practices and restore degraded land.",
    about:
      "Interns support agroforestry and tree-based livelihoods that restore degraded land while growing local income — combining climate-smart agriculture with green enterprise.",
    highlights: [
      "Support tree-planting, nurseries, and agroforestry demonstrations.",
      "Promote climate-resilient farming practices with households.",
      "Track land restoration and livelihood outcomes.",
    ],
    requirements: [
      "Interest in agriculture, forestry, or environmental science.",
      "Willingness to work outdoors with farming communities.",
      "Basic monitoring and documentation skills.",
    ],
    whyChoose: [
      "Work at the intersection of climate and livelihoods.",
      "Build practical agroforestry and enterprise skills.",
      "Help restore land and grow local income.",
    ],
    sdgs: ["SDG 13 · Climate Action", "SDG 1 · No Poverty", "SDG 15 · Life on Land"],
    gallery: [],
  },
  {
    slug: "community-economic-empowerment-internship",
    title: "Community Economic Empowerment Internship",
    type: "internship",
    category: "Economic Empowerment",
    location: "Buikwe District, Uganda",
    duration: "2 – 4 months",
    excerpt:
      "Strengthen grassroots economic empowerment through Village Savings and Loan Associations, green enterprise, and entrepreneurship.",
    about:
      "This internship strengthens grassroots economic empowerment through Village Savings and Loan Associations (VSLAs), microenterprise support, and green entrepreneurship — helping households build income and resilience.",
    highlights: [
      "Support VSLA formation, training, and record-keeping.",
      "Mentor small enterprises on planning and financial literacy.",
      "Track savings, loans, and enterprise outcomes.",
    ],
    requirements: [
      "Interest in economics, business, or community development.",
      "Comfort facilitating trainings with groups.",
      "Basic financial literacy and record-keeping.",
    ],
    whyChoose: [
      "See economic empowerment work at the grassroots.",
      "Build facilitation and enterprise-support skills.",
      "Contribute to lasting household resilience.",
    ],
    sdgs: ["SDG 1 · No Poverty", "SDG 8 · Decent Work & Economic Growth"],
    gallery: [],
  },
  {
    slug: "research-baseline-survey-internship",
    title: "Research & Baseline Survey Internship",
    type: "internship",
    category: "Research",
    location: "Buikwe District, Uganda",
    duration: "4 months",
    excerpt:
      "Work with communities to generate credible evidence on WASH and livelihoods. Findings inform project design.",
    about:
      "Interns work with communities to generate credible evidence through community-based participatory research — baseline surveys, monitoring, and analysis that inform FOSCOD's project design and reporting.",
    highlights: [
      "Design and run community baseline surveys.",
      "Clean, analyse, and visualise data.",
      "Produce findings that shape project design.",
    ],
    requirements: [
      "Background in research methods, statistics, or social science.",
      "Comfort with data collection and analysis tools.",
      "Attention to detail and research ethics.",
    ],
    whyChoose: [
      "Practise real, applied field research.",
      "See how evidence shapes development programming.",
      "Build a portfolio of community-based research.",
    ],
    sdgs: ["SDG 17 · Partnerships for the Goals", "SDG 3 · Good Health & Well-Being"],
    gallery: [],
  },
  {
    slug: "monitoring-data-ict4d-internship",
    title: "Monitoring, Data & ICT4D Internship",
    type: "internship",
    category: "ICT & Data",
    location: "Buikwe District, Uganda",
    duration: "4 months",
    excerpt:
      "Strengthen digital monitoring, evaluation, and learning systems. Design practical digital tools that enable community organisations to track impact.",
    about:
      "This internship strengthens digital monitoring, evaluation, and learning (MEL) systems — designing practical digital tools that enable FOSCOD and community organisations to track and report impact.",
    highlights: [
      "Build and maintain MEL dashboards and data tools.",
      "Digitise data collection with mobile tools.",
      "Train staff and partners on data use.",
    ],
    requirements: [
      "Background in ICT, data science, or M&E.",
      "Familiarity with data tools and spreadsheets.",
      "Problem-solving and documentation skills.",
    ],
    whyChoose: [
      "Apply data skills to real development problems.",
      "Build MEL and ICT4D experience.",
      "Leave behind tools communities keep using.",
    ],
    sdgs: ["SDG 9 · Industry, Innovation & Infrastructure", "SDG 17 · Partnerships for the Goals"],
    gallery: [],
  },
  {
    slug: "communications-storytelling-internship",
    title: "Communications & Storytelling Internship",
    type: "internship",
    category: "Communications",
    location: "Jinja & Kampala, Uganda",
    duration: "2 – 4 months",
    excerpt:
      "Amplify FOSCOD's visibility by documenting pilot projects and producing engaging multimedia content. Support storytelling that inspires.",
    about:
      "Interns amplify FOSCOD's visibility by documenting projects in the field and producing engaging multimedia content — stories, photos, and video that bring the work to life for supporters worldwide.",
    highlights: [
      "Document projects through writing, photo, and video.",
      "Produce content for the blog and social channels.",
      "Support storytelling that inspires action.",
    ],
    requirements: [
      "Skills in writing, photography, or video.",
      "A good eye for story and ethics of representation.",
      "Self-direction and creativity.",
    ],
    whyChoose: [
      "Build a real portfolio of field storytelling.",
      "Shape how FOSCOD's work is seen.",
      "Work across communities and themes.",
    ],
    sdgs: ["SDG 17 · Partnerships for the Goals", "SDG 4 · Quality Education"],
    gallery: [],
  },
  {
    slug: "policy-advocacy-internship",
    title: "Policy & Advocacy Internship",
    type: "internship",
    category: "Policy & Advocacy",
    location: "Jinja & Kampala, Uganda",
    duration: "4 months",
    excerpt:
      "Work at the intersection of community priorities and policy influence. Help position grassroots pilot projects within Uganda's development agenda.",
    about:
      "This internship works at the intersection of community priorities and policy — helping position FOSCOD's grassroots pilots within Uganda's local and national development agenda through advocacy and partnership.",
    highlights: [
      "Research policy landscapes relevant to FOSCOD's work.",
      "Support advocacy briefs and stakeholder engagement.",
      "Link community evidence to policy conversations.",
    ],
    requirements: [
      "Interest in public policy, law, or development.",
      "Strong writing and analysis.",
      "Comfort engaging stakeholders.",
    ],
    whyChoose: [
      "See how grassroots work connects to policy.",
      "Build advocacy and analysis skills.",
      "Contribute to systemic change.",
    ],
    sdgs: ["SDG 16 · Peace, Justice & Strong Institutions", "SDG 17 · Partnerships for the Goals"],
    gallery: [],
  },
  {
    slug: "resource-mobilization-fundraising-internship",
    title: "Resource Mobilization & Fundraising Internship",
    type: "internship",
    category: "Fundraising",
    location: "Njeru HQ, Uganda",
    duration: "4 months",
    excerpt:
      "Support donor research, proposal development, and partnership building. Gain first-hand experience in resource mobilisation.",
    about:
      "Interns support donor research, proposal development, and partnership building — gaining first-hand experience in the resource mobilisation that sustains community-led development.",
    highlights: [
      "Research donors and funding opportunities.",
      "Support proposal and concept-note development.",
      "Help build and steward partnerships.",
    ],
    requirements: [
      "Interest in fundraising, business, or development.",
      "Strong writing and research skills.",
      "Organisation and attention to detail.",
    ],
    whyChoose: [
      "Learn how NGOs fund their work.",
      "Build proposal-writing and partnership skills.",
      "Directly enable more community projects.",
    ],
    sdgs: ["SDG 17 · Partnerships for the Goals", "SDG 1 · No Poverty"],
    gallery: [],
  },
  {
    slug: "food-security-nutrition",
    title: "Food Security & Nutrition Project",
    type: "internship",
    category: "Nutrition",
    location: "Njeru Municipality, Buikwe",
    duration: "4 months",
    excerpt:
      "Empower young people with commercial farming techniques and nutrition knowledge to improve their health outcomes and income.",
    about:
      "This project empowers young people with commercial farming techniques and nutrition knowledge — improving household food security, health outcomes, and income through practical, community-based training.",
    highlights: [
      "Support nutrition and kitchen-garden training.",
      "Promote climate-smart, commercial farming.",
      "Track food-security and nutrition outcomes.",
    ],
    requirements: [
      "Interest in nutrition, agriculture, or public health.",
      "Willingness to work with youth and households.",
      "Basic monitoring skills.",
    ],
    whyChoose: [
      "Tackle nutrition and livelihoods together.",
      "Build practical training and facilitation skills.",
      "Improve real health and income outcomes.",
    ],
    sdgs: ["SDG 2 · Zero Hunger", "SDG 3 · Good Health & Well-Being"],
    gallery: [],
  },
  {
    slug: "energy-saving-stove-project",
    title: "Energy Saving Stove Project",
    type: "internship",
    category: "Renewable Energy",
    location: "Njeru Municipality, Buikwe",
    duration: "2 – 4 months",
    excerpt:
      "Equip schools and communities with improved stove technology that saves energy, improves health, and mitigates deforestation.",
    about:
      "Interns support the roll-out of improved, energy-saving cookstoves in schools and households — cutting wood consumption, reducing smoke exposure, and easing pressure on forests.",
    highlights: [
      "Support stove installation and demonstrations.",
      "Train households and schools on use and maintenance.",
      "Track fuel savings and health benefits.",
    ],
    requirements: [
      "Interest in renewable energy or environmental science.",
      "Practical, hands-on attitude.",
      "Comfort working with schools and households.",
    ],
    whyChoose: [
      "Work on clean-energy technology that scales.",
      "See health, climate, and cost benefits together.",
      "Build practical clean-energy experience.",
    ],
    sdgs: ["SDG 7 · Affordable & Clean Energy", "SDG 13 · Climate Action"],
    gallery: [],
  },

  /* ---------------- volunteer opportunities ---------------- */
  {
    slug: "community-health-outreach-volunteer",
    title: "Community Health Outreach",
    type: "volunteer",
    category: "WASH & Health",
    location: "Buikwe District, Uganda",
    duration: "4 – 12 weeks",
    excerpt:
      "Support community health outreach — hygiene promotion, screening days, and health education alongside local health workers.",
    about:
      "Volunteers support community health outreach — hygiene promotion, screening days, and health education — working alongside local health workers to reach households and schools.",
    highlights: [
      "Support outreach and health-education sessions.",
      "Assist with community screening days.",
      "Promote hygiene and disease prevention.",
    ],
    requirements: [
      "Interest in community or public health.",
      "Warmth, patience, and cultural sensitivity.",
      "Willingness to travel to rural sites.",
    ],
    whyChoose: [
      "Make a direct difference to community health.",
      "Work closely with local health workers.",
      "Gain grassroots public-health experience.",
    ],
    sdgs: ["SDG 3 · Good Health & Well-Being", "SDG 6 · Clean Water & Sanitation"],
    gallery: [],
  },
  {
    slug: "womens-empowerment-enterprise-volunteer",
    title: "Women's Empowerment & Enterprise",
    type: "volunteer",
    category: "Economic Empowerment",
    location: "Njeru Municipality, Buikwe",
    duration: "4 – 12 weeks",
    excerpt:
      "Support women's savings groups and enterprise training — building income, confidence, and leadership.",
    about:
      "Volunteers support women's savings groups and enterprise training — helping build income, confidence, and leadership through VSLAs and practical business mentorship.",
    highlights: [
      "Support VSLA meetings and training.",
      "Mentor women-led enterprises.",
      "Encourage leadership and confidence.",
    ],
    requirements: [
      "Interest in women's empowerment or enterprise.",
      "Good facilitation and people skills.",
      "Respect for community leadership.",
    ],
    whyChoose: [
      "See empowerment in action.",
      "Build facilitation and mentoring skills.",
      "Support lasting change for women.",
    ],
    sdgs: ["SDG 5 · Gender Equality", "SDG 8 · Decent Work & Economic Growth"],
    gallery: [],
  },
  {
    slug: "youth-skills-mentorship-volunteer",
    title: "Youth Skills & Mentorship",
    type: "volunteer",
    category: "Education",
    location: "Jinja, Uganda",
    duration: "4 – 12 weeks",
    excerpt:
      "Mentor young people and support skills-building — from digital literacy to life skills and career guidance.",
    about:
      "Volunteers mentor young people and support skills-building — digital literacy, life skills, and career guidance — helping youth build confidence and opportunity.",
    highlights: [
      "Run skills and mentorship sessions.",
      "Support career and life-skills guidance.",
      "Encourage youth leadership.",
    ],
    requirements: [
      "Interest in education or youth work.",
      "Patience, energy, and good communication.",
      "A skill or experience worth sharing.",
    ],
    whyChoose: [
      "Invest directly in young people.",
      "Build mentoring and facilitation skills.",
      "See confidence and opportunity grow.",
    ],
    sdgs: ["SDG 4 · Quality Education", "SDG 8 · Decent Work & Economic Growth"],
    gallery: [],
  },
  {
    slug: "tree-planting-restoration-volunteer",
    title: "Tree Planting & Land Restoration",
    type: "volunteer",
    category: "Agroforestry",
    location: "Buikwe District, Uganda",
    duration: "4 – 12 weeks",
    excerpt:
      "Get hands-on with tree-planting, nurseries, and land restoration that grow income while healing the land.",
    about:
      "Volunteers get hands-on with tree-planting, nurseries, and land restoration — supporting agroforestry that restores degraded land while growing local income.",
    highlights: [
      "Support nurseries and tree-planting days.",
      "Help households adopt agroforestry.",
      "Track survival and restoration.",
    ],
    requirements: [
      "Interest in the environment and climate.",
      "Willingness to work outdoors.",
      "Team spirit and reliability.",
    ],
    whyChoose: [
      "Do visible, hands-on climate work.",
      "Learn agroforestry from practitioners.",
      "Leave the land better than you found it.",
    ],
    sdgs: ["SDG 13 · Climate Action", "SDG 15 · Life on Land"],
    gallery: [],
  },
];

function toSummary(o: Opportunity): OpportunitySummary {
  return {
    slug: o.slug,
    title: o.title,
    type: o.type,
    category: o.category,
    location: o.location,
    duration: o.duration,
    excerpt: o.excerpt,
  };
}

export async function getOpportunities(type?: OpportunityType): Promise<OpportunitySummary[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    let query = supabase
      ?.from("opportunities")
      .select("slug,title,type,category,location,duration,excerpt")
      .eq("status", "published")
      .order("order_column", { ascending: true });
    if (type && query) query = query.eq("type", type);
    const { data } = (await query) ?? { data: null };
    if (data && data.length) {
      return data.map((o) => ({
        slug: o.slug,
        title: o.title,
        type: (o.type as OpportunityType) ?? "internship",
        category: o.category ?? "",
        location: o.location ?? "",
        duration: o.duration ?? "",
        excerpt: o.excerpt ?? "",
      }));
    }
  }
  const list = type ? OPPORTUNITIES.filter((o) => o.type === type) : OPPORTUNITIES;
  return list.map(toSummary);
}

export async function getOpportunity(slug: string): Promise<Opportunity | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = (await supabase
      ?.from("opportunities")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()) ?? { data: null };
    if (data) {
      return {
        slug: data.slug,
        title: data.title,
        type: (data.type as OpportunityType) ?? "internship",
        category: data.category ?? "",
        location: data.location ?? "",
        duration: data.duration ?? "",
        excerpt: data.excerpt ?? "",
        about: data.about ?? "",
        highlights: (data.highlights as string[]) ?? [],
        requirements: (data.requirements as string[]) ?? [],
        whyChoose: (data.why_choose as string[]) ?? [],
        sdgs: (data.sdgs as string[]) ?? [],
        gallery: (data.gallery as string[]) ?? [],
      };
    }
  }
  return OPPORTUNITIES.find((o) => o.slug === slug) ?? null;
}

/** Distinct categories present for a type, with an "All" leader. */
export async function getOpportunityCategories(type?: OpportunityType): Promise<string[]> {
  const list = await getOpportunities(type);
  const seen: string[] = [];
  for (const o of list) if (o.category && !seen.includes(o.category)) seen.push(o.category);
  return ["All Projects", ...seen];
}

export function allOpportunitySlugs(): string[] {
  return OPPORTUNITIES.map((o) => o.slug);
}
