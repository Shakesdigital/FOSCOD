import Link from "next/link";
import { site } from "@/lib/site";
import { FooterNewsletter } from "@/components/site/FooterNewsletter";

const quickLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: site.social.facebook || "#",
    icon: (
      <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.61v3.56h3.07V22h3.68v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" />
    ),
  },
  {
    label: "Instagram",
    href: site.social.instagram || "#",
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    ),
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin || "#",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--accent-500)] text-white">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {/* About us */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">About us</h4>
            <p className="mx-auto mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/80">
              Empowering communities with renewable energy and environmental
              sustainability, bridging global learning with local innovation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">Quick links</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">Contact</h4>
            <div className="mt-5 space-y-3 text-[0.95rem] text-white/80">
              <p>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {site.contact.phone}
                </a>
              </p>
              <p>{site.contact.location}</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">Newsletter</h4>
            <p className="mx-auto mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/80">
              Stay updated with our latest news and updates.
            </p>
            <div className="mt-5">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        {/* social icons */}
        <div className="mt-14 flex justify-center gap-3.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--accent-600)] shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* copyright */}
      <div className="border-t border-white/12">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {site.legalName}. Registered Ugandan indigenous NGO.</p>
          <div className="flex gap-5">
            <Link href="/programs/refund-policy" className="transition-colors hover:text-white">Refund Policy</Link>
            <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
