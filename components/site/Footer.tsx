import Link from "next/link";
import { getFooterData } from "@/lib/content";

/**
 * CMS-backed footer.
 *
 * Three columns:
 *   1. About Us — site description
 *   2. Quick Links — Community Empowerment & Development, Global Learning &
 *      Exchange, Impact, Get Involved, Blog
 *   3. Contacts — address, mailing box number, email, phone
 */
export async function Footer() {
  const data = await getFooterData();

  const { description, columns, contact, registrationNumber, legalName } = data;

  // Find the Quick Links column from the CMS data, or fall back to the
  // default set if the DB is not configured.
  const quickLinksColumn =
    columns.find((c) => c.key === "quick-links") ?? columns[1] ?? columns[0];

  // Hard-coded Quick Links per the site spec — these always override CMS
  // rows so the footer stays consistent regardless of DB state.
  const quickLinks = [
    { label: "Community Empowerment and Development", href: "/programs/community-empowerment-development" },
    { label: "Global Learning and Education", href: "/programs/global-learning-exchange" },
    { label: "Impact", href: "/impact/general" },
    { label: "Volunteer or Intern", href: "/programs/global-learning-exchange" },
    { label: "Blog", href: "/stories" },
  ];

  return (
    <footer className="bg-[var(--accent-600)] text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        {/* ---- Column 1: About Us ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-text)] text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white">
            About Us
          </h3>

          {description ? (
            <p className="font-[family-name:var(--font-text)] text-[0.95rem] leading-relaxed text-white/75">
              {description}
            </p>
          ) : null}
        </div>

        {/* ---- Column 2: Quick Links ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-text)] text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white">
            {quickLinksColumn.title || "Quick Links"}
          </h3>

          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-[family-name:var(--font-text)] text-[0.9rem] text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Column 3: Contacts ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-text)] text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white">
            Contacts
          </h3>

          <address className="not-italic font-[family-name:var(--font-text)] text-[0.9rem] leading-relaxed text-white/70">
            {contact.location && <span className="block">{contact.location}</span>}
            {contact.mailing && <span className="block">{contact.mailing}</span>}
            {contact.email && (
              <span className="block">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </span>
            )}
            {contact.phone && (
              <span className="block">{contact.phone}</span>
            )}
          </address>
        </div>
      </div>

      {/* ---- Legal / secondary links ---- */}
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/65 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-text)]">
            © {new Date().getFullYear()} {legalName}. Registered Ugandan
            indigenous NGO (Reg. No. {registrationNumber}).
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/partners" className="font-[family-name:var(--font-text)] hover:text-white">
              Partner with us
            </Link>
            <Link href="/programs/global-learning-exchange" className="font-[family-name:var(--font-text)] hover:text-white">
              Volunteer or Intern
            </Link>
            <Link href="/donate" className="font-[family-name:var(--font-text)] hover:text-white">
              Donate to a project
            </Link>
            <Link href="/programs/refund-policy" className="font-[family-name:var(--font-text)] hover:text-white">
              Refund Policy
            </Link>
            <Link href="/contact" className="font-[family-name:var(--font-text)] hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
