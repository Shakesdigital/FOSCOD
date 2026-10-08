"use client";

import { useState } from "react";
import { Field } from "./ApplicationForm";
import { Button } from "@/components/ui/Button";

/** UnifiedApplicationForm — a single dynamic form for all FOSCOD program types.
 *
 * After selecting a program type (Volunteer, Internship, Group Service Trip),
 * the form shows program-specific optional fields, then common fields for
 * personal details, accommodation, program preferences, motivation, health &
 * safety, references, and agreements.
 *
 * Submits to /api/submit with formType "application".
 */

const programTypes = [
  { value: "volunteer", label: "Volunteer" },
  { value: "internship", label: "Internship" },
  { value: "group-service-trip", label: "Group Service Trip" },
];

const gleSectors = [
  "Clean Energy",
  "WASH (Water, Sanitation & Hygiene)",
  "Livelihoods & Economic Empowerment",
  "Health & Community Wellbeing",
  "Environment & Ecosystem Restoration",
  "Research & Knowledge Exchange",
  "Education & Capacity Building",
  "Governance & Leadership",
  "ICT, Media & Communications",
];

const cedpSubPrograms = [
  "Green Skills & Renewable Energy Education",
  "Clean Cooking & Health",
  "Water, Sanitation & Hygiene (WASH)",
  "Green Livelihoods & Economic Empowerment",
  "Inclusive Leadership (Women, Youth & Climate)",
  "Ecosystem Restoration & Carbon Offsets",
];

const durations = [
  "1-2 weeks",
  "2-3 weeks",
  "1 month",
  "2 months",
  "3-4 months",
  "4-6 months",
  "6-8 months",
  "8-12 months",
  "Flexible",
];

/** Common fields shown to all applicants after program-type selection. */
const commonFields: Field[] = [
  // Personal details
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", required: true },
  { name: "dateOfBirth", label: "Date of birth", type: "date", required: true },
  { name: "nationality", label: "Nationality", required: true },
  { name: "countryOfResidence", label: "Country of residence", required: true },
  { name: "passportNumber", label: "Passport number (if applicable)", required: false },

  // Accommodation
  { name: "accommodationPreference", label: "Preferred accommodation", required: true, type: "select", options: ["Host family", "Shared housing", "Single room", "I will arrange my own", "Other"] },
  { name: "dietaryRequirements", label: "Dietary requirements or allergies", type: "textarea", required: false, full: true },
  { name: "accessibilityNeeds", label: "Accessibility requirements", type: "textarea", required: false, full: true },

  // Program preferences
  { name: "programArea", label: "Primary area of interest", required: true, type: "select", options: [...gleSectors, "Multiple areas", "Flexible (open to discussion)"] },
  { name: "secondaryProgramArea", label: "Secondary area of interest (if multiple)", required: false, type: "select", options: [...gleSectors, ...cedpSubPrograms] },
  { name: "preferredDuration", label: "Preferred duration", required: true, type: "select", options: durations },
  { name: "availableStartDate", label: "Earliest start date", type: "date", required: true },
  { name: "flexibleDates", label: "Are you flexible with dates?", required: true, type: "select", options: ["Yes", "No"] },
  { name: "englishProficiency", label: "English proficiency", required: true, type: "select", options: ["Native", "Fluent", "Proficient", "Intermediate", "Basic"] },
  { name: "otherLanguages", label: "Other languages spoken", type: "textarea", required: false, full: true },

  // Motivation
  { name: "whyFoscod", label: "Why do you want to join FOSCOD?", type: "textarea", required: true, full: true },
  { name: "motivationAndGoals", label: "What do you hope to give and learn?", type: "textarea", required: true, full: true },
  { name: "experienceRelevant", label: "Relevant experience or skills", type: "textarea", required: false, full: true },

  // Health & Safety
  { name: "medicalConditions", label: "Medical conditions or allergies we should know about", type: "textarea", required: false, full: true },
  { name: "emergencyContactName", label: "Emergency contact — Name", required: true },
  { name: "emergencyContactPhone", label: "Emergency contact — Phone", type: "tel", required: true },
  { name: "emergencyContactRelationship", label: "Emergency contact — Relationship", required: true },
  { name: "emergencyContactEmail", label: "Emergency contact — Email", type: "email", required: false },
  { name: "insuranceCoverage", label: "Do you have travel/health insurance?", required: true, type: "select", options: ["Yes", "No", "Planning to obtain"] },

  // References
  { name: "referee1Name", label: "Reference 1 — Name", required: true },
  { name: "referee1Email", label: "Reference 1 — Email", type: "email", required: true },
  { name: "referee1Phone", label: "Reference 1 — Phone", type: "tel", required: false },
  { name: "referee1Relationship", label: "Reference 1 — Relationship", required: true },
  { name: "referee2Name", label: "Reference 2 — Name", required: false },
  { name: "referee2Email", label: "Reference 2 — Email", type: "email", required: false },
  { name: "referee2Relationship", label: "Reference 2 — Relationship", required: false },

  // Agreements
  { name: "codeOfConductAgreement", label: "Do you agree to abide by FOSCOD's code of conduct and community guidelines?", required: true, type: "select", options: ["Yes, I agree"] },
  { name: "photoStoryConsent", label: "Do you consent to FOSCOD using photos/videos taken during your program for promotional purposes?", required: true, type: "select", options: ["Yes", "No"] },
  { name: "additionalComments", label: "Anything else we should know?", type: "textarea", required: false, full: true },
];

/** Group-specific fields shown only when "Group Service Trip" is selected. */
const groupFields: Field[] = [
  { name: "organizationName", label: "Organization / University name", required: true },
  { name: "organizationType", label: "Organization type", required: true, type: "select", options: ["University", "College", "High school", "NGO / Non-profit", "Professional group", "Community group", "Other"] },
  { name: "departmentOrFaculty", label: "Department / Faculty (if academic)", required: false },
  { name: "groupSize", label: "Expected group size", type: "number", required: true },
  { name: "participantAges", label: "Age range of participants", required: true, type: "select", options: ["18-21", "22-25", "26-35", "36-50", "Mixed / Other", "Specify in comments"] },
  { name: "accompanyingStaff", label: "Number of accompanying staff/faculty", type: "number", required: true },
  { name: "staffBios", label: "Brief bios of accompanying staff/faculty", type: "textarea", required: true, full: true },
  { name: "academicCredit", label: "Is academic credit or recognition involved?", required: true, type: "select", options: ["Yes — academic credit", "Yes — other recognition", "No — personal enrichment", "Not sure"] },
  { name: "learningOutcomes", label: "Intended learning outcomes / objectives", type: "textarea", required: true, full: true },
  { name: "riskManagement", label: "How will your organization handle risk management?", type: "textarea", required: true, full: true },
  { name: "travelInsurance", label: "Travel insurance responsibility", required: true, type: "select", options: ["Organization covers", "Participants arrange", "Shared cost", "Other"] },
  { name: "institutionalRefereeName", label: "Institutional referee — Name", required: true },
  { name: "institutionalRefereeTitle", label: "Institutional referee — Title", required: true },
  { name: "institutionalRefereeEmail", label: "Institutional referee — Email", type: "email", required: true },
  { name: "whyGroupFoscod", label: "Why do you want to bring your group to FOSCOD?", type: "textarea", required: true, full: true },
];

/** Internship-specific fields shown after program type selection. */
const internshipFields: Field[] = [
  { name: "academicStatus", label: "Current status", required: true, type: "select", options: ["Undergraduate student", "Graduate student", "Recent graduate", "Professional", "Other"] },
  { name: "institution", label: "University / Institution", required: false },
  { name: "fieldOfStudy", label: "Field of study", required: true },
  { name: "graduationYear", label: "Expected graduation year", type: "number", required: false },
];

/** Volunteer-specific fields shown after program type selection. */
const volunteerFields: Field[] = [
  { name: "volunteerBackground", label: "Describe your relevant experience or skills", type: "textarea", required: true, full: true },
  { name: "previousVolunteerIntl", label: "Have you volunteered or traveled internationally before?", type: "textarea", required: false, full: true },
];

export default function UnifiedApplicationForm() {
  const [programType, setProgramType] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const showInternshipFields = programType === "internship";
  const showVolunteerFields = programType === "volunteer";
  const showGroupFields = programType === "group-service-trip";

  // Build the full field set dynamically
  const allFields: Field[] = [
    { name: "programType", label: "Program type", required: true, type: "select", options: programTypes.map((p) => p.label) },
    { name: "gleSector", label: "GLE sector of interest", required: false, type: "select", options: [...gleSectors, "Multiple", "Not sure yet"] },
    { name: "cedpSubProgram", label: "CEDP sub-program of interest", required: false, type: "select", options: [...cedpSubPrograms, "Multiple", "Not sure yet"] },
    ...(showInternshipFields ? internshipFields : []),
    ...(showVolunteerFields ? volunteerFields : []),
    ...(showGroupFields ? groupFields : []),
    ...commonFields,
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "application", payload }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("done");
        setMessage("");
      } else {
        setState("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <p className="text-3xl text-[var(--success)]">✓</p>
        <h3 className="mt-3 text-xl font-medium text-[var(--ink)]">
          Thank you — your application has been received.
        </h3>
        <p className="mt-2 text-[var(--muted)]">
          The FOSCOD team will review your details and be in touch within 5 business
          days. We&rsquo;ll confirm next steps, program fees, and the current intake
          brief for your preferred cohort.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
    >
      {/* honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden
      />

      {/* Program type selector — always shown at the top */}
      {!programType ? (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)]">Which program are you interested in?</h2>
          <p className="mt-3 text-[var(--muted)]">
            Select the program type that best matches your interests. You can always
            adjust this later if your plans change.
          </p>
          <div className="mt-8 grid gap-4">
            {programTypes.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setProgramType(p.value)}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-left transition-all hover:border-[var(--accent-500)] hover:bg-[var(--accent-50)]"
              >
                <span className="font-medium text-[var(--ink)]">{p.label}</span>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {p.value === "volunteer"
                    ? "Give your time and skills to community-led projects with full local support."
                    : p.value === "internship"
                      ? "Supervised, credit-friendly field experience in your area of study or career."
                      : "Faculty-led group programs and service trips with risk management built in."}
                </p>
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--muted)]">
            Already have a program type in mind? It will be saved as the first field
            in your form below.
          </p>
        </div>
      ) : (
        <>
          {/* Hidden input to capture the selected program type */}
          <input type="hidden" name="programType" value={programType} />

          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="font-[family-name:var(--font-text)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent-700)]">
                Program type: {programTypes.find((p) => p.value === programType)?.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setProgramType("")}
              className="text-sm text-[var(--accent-700)] hover:underline"
            >
              Change program type
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {allFields.map((f) => {
              const isFull = f.full || f.type === "textarea";
              return (
                <div key={f.name} className={isFull ? "sm:col-span-2" : ""}>
                  <label
                    htmlFor={f.name}
                    className="block text-sm font-medium text-[var(--ink)]"
                  >
                    {f.label}
                    {f.required && <span className="ml-0.5 text-[var(--accent-600)]">*</span>}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={f.name}
                      name={f.name}
                      required={f.required}
                      rows={4}
                      className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
                    />
                  ) : f.type === "select" ? (
                    <select
                      id={f.name}
                      name={f.name}
                      required={f.required}
                      defaultValue=""
                      className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type ?? "text"}
                      required={f.required}
                      className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {state === "error" && (
            <p className="mt-4 text-sm text-[var(--error)]">{message}</p>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] disabled:opacity-60"
          >
            {state === "loading" ? "Sending…" : "Submit application"}
          </button>
        </>
      )}
    </form>
  );
}
