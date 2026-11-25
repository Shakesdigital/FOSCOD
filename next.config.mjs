// Old WordPress URLs → new structure (mirrors supabase/seed.sql redirects).
const legacyRedirects = [
  ["/about-us", "/about"],
  ["/global-learning-and-exchange", "/programs/global-learning-exchange"],
  ["/apply-now", "/apply"],
  ["/new-apply", "/apply"],
  ["/apply/form", "/apply"],
  ["/program-fees", "/programs/program-fees"],
  ["/refund-policy", "/programs/refund-policy"],
  ["/ced-program", "/programs/community-empowerment-development"],
  ["/foscod-projects", "/projects"],
  ["/wash-project", "/projects/wash"],
  ["/renewable-energy", "/projects/renewable-energy"],
  ["/biochar-uganda", "/projects/biochar-uganda"],
  ["/sustainable-livelihood-green-enterprises", "/projects/sustainable-livelihood-green-enterprises"],
  ["/social-inclusion-and-empowerment", "/focus/social-inclusion-empowerment"],
  ["/health-and-well-being", "/focus/health-wellbeing"],
  ["/partner-with-foscod", "/partners"],
  ["/partner-with-us", "/partners"],
  ["/meet-the-team", "/team"],
  ["/board-of-directors", "/team"],
  ["/our-staff", "/team"],
  ["/alumni-network", "/alumni"],
  ["/alumni-forum", "/alumni"],
  ["/alumni-reviews", "/alumni"],
  ["/contact-us", "/contact"],
  ["/blog", "/stories"],
  ["/home", "/"],
  ["/home-one", "/"],
  ["/internship", "/programs/global-learning-exchange"],
  ["/internships", "/programs/global-learning-exchange"],
  ["/internships/opportunities", "/opportunities"],
  ["/internships/:path*", "/programs/global-learning-exchange"],
  ["/volunteer", "/programs/global-learning-exchange"],
  ["/volunteer/opportunities", "/opportunities"],
  ["/volunteer/:path*", "/programs/global-learning-exchange"],
  ["/programs/finder", "/opportunities"],
  ["/programs/global-learning-exchange/opportunities", "/opportunities"],
  ["/programs/cedp/green-skills-renewable-energy", "/programs/cedp/areas/clean-energy-climate-resilience"],
  ["/programs/cedp/clean-cooking-health", "/programs/cedp/areas/clean-energy-climate-resilience"],
  ["/programs/cedp/ecosystem-restoration-carbon-offsets", "/programs/cedp/areas/clean-energy-climate-resilience"],
  ["/programs/cedp/water-sanitation-hygiene", "/programs/cedp/areas/water-sanitation-health-communities"],
  ["/programs/cedp/green-livelihoods-economic-empowerment", "/programs/cedp/areas/sustainable-livelihoods-economic-empowerment"],
  ["/programs/cedp/inclusive-leadership", "/programs/cedp/areas/sustainable-livelihoods-economic-empowerment"],
  ["/solar-project", "/projects/renewable-energy"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase Storage public bucket (set NEXT_PUBLIC_SUPABASE_URL host here once known)
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
