import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our Impact",
  "Explore FOSCOD's verified community development record, named projects, and evidence-led impact reporting."
);

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
