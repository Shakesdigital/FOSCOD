import Link from "next/link";
import { getFooterData } from "@/lib/content";
import { SocialIcons } from "@/components/site/SocialIcons";

/**
 * CMS-backed footer.
 *
 * Three columns:
 *   1. About Us — site description + social icon links
 *   2. Quick Links — Programs, Impact, Get Involved, Blog (from footer_nav)
 *   3. Contacts — location, mailing box number, email, phone
 */
export async function Footer() {
  const data = await getFooterData();

  const { description, columns, contact, social, registrationNumber, legalName } = data;

  // Split columns into the navigation group (Quick Links) and the static
  // About / Contacts columns. The CMS tables define all three, but About and
  // Contacts are rendered from live settings rather than footer_nav links.
  const quickLinksColumn = columns.find((c) => c.key === "quick-links") ?? columns[1] ?? columns[0];
  const otherColumns = columns.filter((c) => c.key !== "quick-links");

  return (
    <footer className="bg-[var(--accent-600)] text-white">
      {/* thick white divider */}
      <div className="container-page">
        <hr className="border-0 border-t-4 border-white" />
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        {/* ---- Column 1: About Us ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em]">
            About Us
          </h3>

          {description ? (
            <p className="text-[0.95rem] leading-relaxed text-white/75">
              {description}
            </p>
          ) : null}

          <SocialIcons social={social} />
        </div>

        {/* ---- Column 2: Quick Links ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em]">
            {quickLinksColumn.title || "Quick Links"}
          </h3>

          {quickLinksColumn.links.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {quickLinksColumn.links.map((link) => (
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
          ) : (
            <p className="text-sm text-white/50">No links configured.</p>
          )}
        </div>

        {/* ---- Column 3: Contacts ---- */}
        <div className="flex flex-col gap-6">
          <h3 className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em]">
            Contacts
          </h3>

          <address className="not-italic font-[family-name:var(--font-mono)] text-xs leading-relaxed text-white/70">
            {contact.location && <span className="block">{contact.location}</span>}
            {contact.mailing && <span className="block">{contact.mailing}</span>}
            {contact.email && (
              <span className="block">
                <span className="text-white/50">Email:</span>{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </span>
            )}
            {contact.phone && (
              <span className="block">
                <span className="text-white/50">Phone:</span> {contact.phone}
              </span>
            )}
          </address>
        </div>
      </div>

      {/* ---- Legal / secondary links ---- */}
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {legalName}. Registered Ugandan
            indigenous NGO (Reg. No. {registrationNumber}).
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
