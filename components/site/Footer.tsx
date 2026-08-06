import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Newsletter } from "@/components/home/Newsletter";

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--accent-600)] text-white">
      <Newsletter />

      {/* thick white divider separating the newsletter from the menu columns */}
      <div className="container-page">
        <hr className="border-0 border-t-4 border-white" />
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              FOSCOD
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-white/60">
              Uganda
            </span>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/75">
            {site.legalName}. Bridging global learning with local innovation for
            community-led development across rural Uganda.
          </p>
          <div className="mt-6 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-white/70">
            <p>{site.contact.location}</p>
            <p>{site.contact.mailing}</p>
            <p>{site.contact.email}</p>
            <p>{site.contact.secondaryEmail}</p>
            <p>{site.contact.phone}</p>
          </div>
        </div>

        {footerNav.map((col) => (
          <div key={col.heading}>
            <h4 className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-white">
              {col.heading}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Registered Ugandan
            indigenous NGO (Reg. No. {site.registration.number}).
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/partners" className="hover:text-white">
              Partner With Us
            </Link>
            <Link href="/apply" className="hover:text-white">
              Apply / Volunteer
            </Link>
            <Link href="/donate" className="hover:text-white">
              Support Our Work
            </Link>
            <Link href="/programs/refund-policy" className="hover:text-white">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
