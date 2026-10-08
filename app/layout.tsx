import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";
import { getBrandingStyle } from "@/lib/settings";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [brandingStyle, headerList] = await Promise.all([
    getBrandingStyle(),
    headers(),
  ]);
  const isAdmin = (headerList.get("x-pathname") ?? "").startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {brandingStyle ? (
          <style dangerouslySetInnerHTML={{ __html: brandingStyle }} />
        ) : null}
        {isAdmin ? (
          children
        ) : (
          <>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-[var(--accent-600)] focus:px-4 focus:py-2 focus:text-[var(--accent-fg)]"
            >
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
