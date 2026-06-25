// Old WordPress URLs → new structure (mirrors supabase/seed.sql redirects).
const legacyRedirects = [
  ["/about-us", "/about"],
  ["/global-learning-and-exchange", "/programs/global-learning-exchange"],
  ["/apply-now", "/apply"],
  ["/new-apply", "/apply"],
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
  ["/internship", "/internships"],
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
