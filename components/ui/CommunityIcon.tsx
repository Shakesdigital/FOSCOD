import { SVGProps } from "react";

/**
 * CommunityIcon — a stroke-based SVG icon system representing global community
 * themes (volunteerism, partnership, donation, clean energy, water, livelihoods,
 * education, health, environment, research, enterprise).
 *
 * Replaces the previous emoji-based icon system with crisp, scalable SVGs that
 * match the project's existing stroke-icon language (see OpportunityCard's
 * PinIcon / ClockIcon).
 *
 * Usage: <CommunityIcon name="volunteer" className="h-6 w-6" />
 */

export type CommunityIconName =
  | "volunteer"
  | "partner"
  | "donate"
  | "energy"
  | "water"
  | "livelihoods"
  | "education"
  | "health"
  | "environment"
  | "research"
  | "enterprise";

const iconPaths: Record<CommunityIconName, string[]> = {
  // Person / volunteer figure — globe at feet
  volunteer: [
    "M12 2v6m4.23-3.77A8 8 0 0 1 12 20h0M12 2A8 8 0 0 0 4 10h8z",
    "M10 12l2 2 4-4",
    "M9 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  ],
  // Two hands meeting — partnership / handshake
  partner: [
    "M12 5v14",
    "M5 12h14",
    "M8 8l4 4 4-4",
    "M8 16l4-4 4 4",
  ],
  // Heart with hands — donation / giving
  donate: [
    "M12 21s-6-4.35-6-10a6 6 0 0 1 12 0C18 16.65 12 21 12 21z",
    "M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0z",
    "M12 12v6",
  ],
  // Sun with solar panels — clean energy
  energy: [
    "M12 3v2m0 14v2M5.64 5.64l1.42 1.42m10.12 10.12l1.42 1.42M3 12h2m14 0h2M5.64 18.36l1.42-1.42M18.36 5.64l1.42-1.42",
    "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  ],
  // Water drop / well — WASH
  water: [
    "M12 2C8 6 8 10 12 14c4-4 4-8 0-12z",
    "M12 14c-2.21 3-4 5.24-4 7a4 4 0 0 0 8 0c0-1.76-1.79-4-4-7z",
    "M10 16h4v4a2 2 0 0 1-4 0z",
  ],
  // Hands holding sprouting plant — livelihoods
  livelihoods: [
    "M6 17h12v2a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z",
    "M9 17V9a3 3 0 1 1 6 0v8M9 9l3-3 3 3M10 14h4v3a2 2 0 0 1-4 0z",
    "M8 17V13a4 4 0 0 1 8 0v4",
  ],
  // Graduation cap — education
  education: [
    "M12 3L2 9l10 6 10-6-10-6z",
    "M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6",
    "M5 12l7 4 7-4",
  ],
  // Medical cross — health & wellbeing
  health: [
    "M16 4h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2M8 4H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2",
    "M9 9h6v6H9zM12 6v12M9 12h6",
  ],
  // Tree / leaf — environment & stewardship
  environment: [
    "M12 2v4m7.75 3.75A3 3 0 0 1 17 12h-1.5a5 5 0 0 1-.87-9.9 3 3 0 0 0 0 .65z",
    "M6.25 9.75A3 3 0 0 1 7 5.5 5 5 0 0 1 13 5.5a3 3 0 0 1-.13 1.25M6.25 9.75L8 14l4-2-1-4-4.75-1.25zM4 17h16M8 17l-2-4M16 17l2-4",
  ],
  // Microscope / magnifying glass — research
  research: [
    "M2 8l7-4v12l-7-4zM9 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9",
    "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 12h2",
    "M15 8l2-2v8l-2-2",
  ],
  // Factory / building — enterprise & economic empowerment
  enterprise: [
    "M3 14h2v4H3zM6 12h6v6H6zM3 9h2v2H3zM12 9h8v6h-2V9zM12 11h6v4h-4v-2",
    "M5 14h2v4H5zM8 12h6v6H8zM5 9h2v2H5z",
  ],
};

const iconLabels: Record<CommunityIconName, string> = {
  volunteer: "Volunteer",
  partner: "Partnership",
  donate: "Donate",
  energy: "Energy",
  water: "Water",
  livelihoods: "Livelihoods",
  education: "Education",
  health: "Health",
  environment: "Environment",
  research: "Research",
  enterprise: "Enterprise",
};

export function CommunityIcon({
  name,
  className = "h-6 w-6",
  ...props
}: {
  name: CommunityIconName;
} & SVGProps<SVGSVGElement>) {
  const paths = iconPaths[name] ?? iconPaths.volunteer;
  const label = iconLabels[name] ?? "Icon";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={label}
      {...props}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/**
 * Map an old emoji string or new icon name to a valid CommunityIconName.
 * Returns undefined for unrecognized values so callers can fall back to
 * a default icon.
 */
export function resolveCommunityIcon(value: string | undefined): CommunityIconName | undefined {
  if (!value) return undefined;

  // If it's already a valid icon name, use it directly
  if (value in iconPaths) return value as CommunityIconName;

  // Map old emoji to a new icon name for backward compatibility
  const emojiMap: Record<string, CommunityIconName> = {
    "🌱": "volunteer",
    "🌿": "volunteer",
    "🎓": "education",
    "🏥": "health",
    "💚": "donate",
    "❤️": "donate",
    "☀️": "energy",
    "🚰": "water",
    "💧": "water",
    "💼": "enterprise",
    "🔬": "research",
    "🤝": "partner",
  };

  return emojiMap[value];
}
