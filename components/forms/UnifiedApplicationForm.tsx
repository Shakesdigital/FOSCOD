"use client";

import { useMemo, useState } from "react";

/** GLE application wizard — a short, adaptable flow:
 *  Step 1  Your interest (experience type, classification, thematic
 *          interests, engagement approach, participation format,
 *          optional specific opportunity, learning focus for trips/tours)
 *  Step 2  About you (adapts for individual vs group/trip coordinator)
 *  Step 3  Practical details & motivation
 *  Step 4  Review & submit (explains that submitting starts a matching
 *          process and does not guarantee acceptance or a particular host)
 *
 * Submits to /api/submit with formType "application".
 */

export type WizardOption = { slug: string; label: string };
export type WizardSector = WizardOption & { category: "cedp" | "partner" };

export type ApplicationWizardProps = {
  experienceTypes: WizardOption[];
  sectors: WizardSector[];
  approaches: WizardOption[];
  formats: WizardOption[];
  opportunities: WizardOption[];
  prefill?: {
    opportunity?: string;
    experienceType?: string;
    intent?: "guidance" | "group" | null;
  };
};

const EMPTY: Record<string, string> = {};

function TextInput({
  id, label, required, type = "text", value, onChange, help,
}: {
  id: string; label: string; required?: boolean; type?: string;
  value: string; onChange: (v: string) => void; help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--accent-600)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={help ? `${id}-help` : undefined}
        className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
      />
      {help && <p id={`${id}-help`} className="mt-1 text-xs text-[var(--muted)]">{help}</p>}
    </div>
  );
}

function SelectInput({
  id, label, required, value, onChange, options, placeholder = "Select…", help,
}: {
  id: string; label: string; required?: boolean; value: string;
  onChange: (v: string) => void; options: WizardOption[] | string[]; placeholder?: string; help?: string;
}) {
  const opts: WizardOption[] = (options as (WizardOption | string)[]).map((o) =>
    typeof o === "string" ? { slug: o, label: o } : o
  );
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--accent-600)]">*</span>}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={help ? `${id}-help` : undefined}
        className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
      >
        <option value="" disabled>{placeholder}</option>
        {opts.map((o) => (
          <option key={o.slug} value={o.slug}>{o.label}</option>
        ))}
      </select>
      {help && <p id={`${id}-help`} className="mt-1 text-xs text-[var(--muted)]">{help}</p>}
    </div>
  );
}

function TextArea({
  id, label, required, value, onChange, rows = 4, help,
}: {
  id: string; label: string; required?: boolean; value: string;
  onChange: (v: string) => void; rows?: number; help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--accent-600)]">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={help ? `${id}-help` : undefined}
        className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)]"
      />
      {help && <p id={`${id}-help`} className="mt-1 text-xs text-[var(--muted)]">{help}</p>}
    </div>
  );
}

const GUIDANCE_OPTION: WizardOption = { slug: "guidance", label: "Not sure yet — request placement guidance" };

export default function UnifiedApplicationForm({
  experienceTypes, sectors, approaches, formats, opportunities, prefill,
}: ApplicationWizardProps) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...(prefill?.opportunity ? { opportunity: prefill.opportunity } : {}),
    ...(prefill?.experienceType ? { experienceType: prefill.experienceType } : {}),
    ...(prefill?.intent === "guidance" ? { experienceType: "guidance" } : {}),
    ...(prefill?.intent === "group" ? { groupEnquiry: "yes" } : {}),
  }));
  const [interests, setInterests] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const experienceType = values.experienceType ?? "";
  const isGuidance = experienceType === "guidance";
  const isTripOrTour = experienceType === "service-learning-trip" || experienceType === "study-tour";
  const isGroupish =
    isTripOrTour ||
    experienceType === "group-project" ||
    experienceType === "coordinated-group" ||
    values.groupEnquiry === "yes";

  const classificationOptions = useMemo(() => {
    if (isTripOrTour) return [{ slug: "not-applicable", label: "Not an internship/volunteering classification" }];
    return [
      { slug: "internship", label: "Internship" },
      { slug: "volunteer", label: "Volunteering" },
      { slug: "either", label: "Open to either internship or volunteering" },
      { slug: "not-applicable", label: "Not applicable" },
    ];
  }, [isTripOrTour]);

  const opportunityTitle = opportunities.find((o) => o.slug === values.opportunity)?.label ?? values.opportunity;
  const experienceTitle = (isGuidance ? GUIDANCE_OPTION.label : experienceTypes.find((t) => t.slug === experienceType)?.label) ?? experienceType;

  function validateStep(s: number): string | null {
    const need = (k: string, label: string) =>
      !values[k]?.trim() ? `${label} is required.` : null;
    if (s === 1) {
      if (!experienceType) return "Choose an experience type (or request guidance).";
      if (!isGuidance && !isTripOrTour && !values.classification) return "Choose an internship/volunteering classification.";
      if (isTripOrTour && !values.learningObjectives?.trim()) return "Learning objectives are required for trips and tours.";
      return null;
    }
    if (s === 2) {
      for (const [k, label] of [
        ["firstName", "First name"], ["lastName", "Last name"],
        ["email", "Email address"], ["phone", "Phone number"],
      ] as const) {
        const err = need(k, label);
        if (err) return err;
      }
      if (isGroupish) {
        for (const [k, label] of [
          ["organizationName", "Organization / institution"], ["groupSize", "Expected group size"],
        ] as const) {
          const err = need(k, label);
          if (err) return err;
        }
      }
      return null;
    }
    if (s === 3) {
      for (const [k, label] of [
        ["preferredDuration", "Preferred duration"], ["availableStartDate", "Earliest start date"],
        ["motivation", "What do you hope to give and learn?"],
        ["emergencyContactName", "Emergency contact name"], ["emergencyContactPhone", "Emergency contact phone"],
      ] as const) {
        const err = need(k, label);
        if (err) return err;
      }
      if (!values.codeOfConductAgreement) return "Please agree to the code of conduct to continue.";
      return null;
    }
    return null;
  }

  function next() {
    const err = validateStep(step);
    if (err) { setMessage(err); return; }
    setMessage("");
    setStep((s) => Math.min(4, s + 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setMessage("");
    setStep((s) => Math.max(1, s - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const payload = {
      ...values,
      thematicInterests: interests,
    };
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
        setMessage(data.error ?? "Something went wrong — your application was not saved. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again. Your information has not been sent.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center" role="status">
        <p className="text-3xl text-[var(--success)]">✓</p>
        <h3 className="mt-3 text-xl font-medium text-[var(--ink)]">
          Thank you — your application has been received.
        </h3>
        <p className="mt-2 text-[var(--muted)]">
          Your submission starts a matching process: the FOSCOD team reviews your interest, thematic areas and
          learning objectives against community priorities, partner availability and supervision capacity.
          Matching takes time and does not guarantee acceptance or a particular host organization — we will be
          in touch about next steps.
        </p>
      </div>
    );
  }

  const reviewRows: [string, string][] = ([
    ["Experience type", isGuidance ? "Guidance requested" : experienceTitle],
    ["Classification", values.classification === "not-applicable" ? "Not applicable" : (values.classification ? String(values.classification) : "")],
    ["Thematic interests", interests.map((s) => sectors.find((x) => x.slug === s)?.label ?? s).join(", ")],
    ["Engagement approach", approaches.find((a) => a.slug === values.engagementApproach)?.label ?? (isTripOrTour ? "Learning focus (see objectives)" : "")],
    ["Participation format", formats.find((f) => f.slug === values.participationFormat)?.label ?? ""],
    ["Specific opportunity", opportunityTitle ?? ""],
    ["Learning focus / objectives", [values.learningFocus, values.learningObjectives].filter(Boolean).join(" — ")],
    ["Name", `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim()],
    ["Contact", [values.email, values.phone].filter(Boolean).join(" · ")],
    ["Country of residence", values.countryOfResidence ?? ""],
    ["Organization / institution", isGroupish ? `${values.organizationName ?? ""}${values.organizationType ? ` (${values.organizationType})` : ""}` : (values.institution ?? "")],
    ["Group size", isGroupish ? (values.groupSize ?? "") : ""],
    ["Preferred duration", values.preferredDuration ?? ""],
    ["Earliest start date", values.availableStartDate ?? ""],
    ["Accommodation preference", values.accommodationPreference ?? ""],
    ["What do you hope to give and learn?", values.motivation ?? ""],
    ["Emergency contact", values.emergencyContactName ? `${values.emergencyContactName} (${values.emergencyContactPhone ?? ""})` : ""],
  ] as [string, string][]).filter(([, v]) => v && v.trim() !== "");

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10"
      noValidate
    >
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px]" aria-hidden />

      {/* progress */}
      <ol className="mb-8 flex flex-wrap gap-x-2 gap-y-1 text-[0.78rem] font-[family-name:var(--font-text)] uppercase tracking-[0.1em] text-[var(--muted)]" aria-label="Application steps">
        {["Your interest", "About you", "Practical details", "Review & submit"].map((label, i) => (
          <li key={label} className={i + 1 === step ? "font-semibold text-[var(--accent-700)]" : undefined}>
            {i + 1 > 1 && <span className="mx-1.5">→</span>}
            <span aria-current={i + 1 === step ? "step" : undefined}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      {/* ---------- STEP 1 ---------- */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)]">Your interest</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Your selections inform placement discussions — they do not automatically confirm a specific host,
            project or research opportunity.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectInput
              id="experienceType" label="Experience type" required
              value={experienceType} onChange={(v) => set("experienceType", v)}
              options={[...experienceTypes, GUIDANCE_OPTION]}
            />
            {!isTripOrTour && !isGuidance && (
              <SelectInput
                id="classification" label="Internship / volunteering classification" required
                value={values.classification ?? ""} onChange={(v) => set("classification", v)}
                options={classificationOptions}
                placeholder="Select classification…"
              />
            )}
          </div>

          {isTripOrTour && (
            <div className="space-y-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <TextArea
                id="learningObjectives" label="Learning objectives for this trip or tour" required
                value={values.learningObjectives ?? ""} onChange={(v) => set("learningObjectives", v)}
                help="What should participants learn or achieve? FOSCOD uses these to co-design the experience with your institution and local partners."
              />
              <TextInput
                id="learningFocus" label="Preferred learning focus (optional)"
                value={values.learningFocus ?? ""} onChange={(v) => set("learningFocus", v)}
                help="e.g. community development practice, participatory research exposure, cultural exchange"
              />
            </div>
          )}

          <fieldset>
            <legend className="text-sm font-medium text-[var(--ink)]">
              Thematic interests <span className="text-[var(--muted)]">(choose any that apply)</span>
            </legend>
            <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {sectors.filter((s) => s.category === "cedp").map((s) => (
                <label key={s.slug} className="flex items-start gap-2 text-[0.92rem]">
                  <input
                    type="checkbox"
                    checked={interests.includes(s.slug)}
                    onChange={(e) =>
                      setInterests((prev) => (e.target.checked ? [...prev, s.slug] : prev.filter((x) => x !== s.slug)))
                    }
                    className="mt-1"
                  />
                  <span>
                    {s.label}
                    <span className="ml-1 text-[0.72rem] uppercase tracking-wide text-[var(--accent-700)]">CEDP</span>
                  </span>
                </label>
              ))}
              {sectors.filter((s) => s.category !== "cedp").map((s) => (
                <label key={s.slug} className="flex items-start gap-2 text-[0.92rem]">
                  <input
                    type="checkbox"
                    checked={interests.includes(s.slug)}
                    onChange={(e) =>
                      setInterests((prev) => (e.target.checked ? [...prev, s.slug] : prev.filter((x) => x !== s.slug)))
                    }
                    className="mt-1"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {!isTripOrTour && (
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectInput
                id="engagementApproach" label="Engagement approach (complementary emphases)"
                value={values.engagementApproach ?? ""} onChange={(v) => set("engagementApproach", v)}
                options={[...approaches, { slug: "not-sure", label: "Not sure — open to discussion" }]}
                placeholder="Select approach…"
              />
              <SelectInput
                id="participationFormat" label="Participation format"
                value={values.participationFormat ?? ""} onChange={(v) => set("participationFormat", v)}
                options={formats}
              />
            </div>
          )}

          <SelectInput
            id="opportunity" label="Specific opportunity (optional)"
            value={values.opportunity ?? ""} onChange={(v) => set("opportunity", v)}
            options={[{ slug: "", label: "No specific opening — general interest" }, ...opportunities]}
            placeholder="Select an opening…"
            help="Leave empty to express interest without selecting a specific opening."
          />
        </div>
      )}

      {/* ---------- STEP 2 ---------- */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)]">About you</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput id="firstName" label="First name" required value={values.firstName ?? ""} onChange={(v) => set("firstName", v)} />
            <TextInput id="lastName" label="Last name" required value={values.lastName ?? ""} onChange={(v) => set("lastName", v)} />
            <TextInput id="email" label="Email address" type="email" required value={values.email ?? ""} onChange={(v) => set("email", v)} />
            <TextInput id="phone" label="Phone number (incl. country code)" type="tel" required value={values.phone ?? ""} onChange={(v) => set("phone", v)} />
            <TextInput id="nationality" label="Nationality" value={values.nationality ?? ""} onChange={(v) => set("nationality", v)} />
            <TextInput id="countryOfResidence" label="Country of residence" required value={values.countryOfResidence ?? ""} onChange={(v) => set("countryOfResidence", v)} />
          </div>

          {isGroupish ? (
            <div className="space-y-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <p className="text-sm font-medium">Group / institution / trip coordinator details</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput id="organizationName" label="Organization / institution" required value={values.organizationName ?? ""} onChange={(v) => set("organizationName", v)} />
                <SelectInput
                  id="organizationType" label="Organization type"
                  value={values.organizationType ?? ""} onChange={(v) => set("organizationType", v)}
                  options={["University", "College", "High school", "NGO / Non-profit", "Professional group", "Community group", "Other"]}
                />
                <TextInput id="groupSize" label="Expected group size" type="number" required value={values.groupSize ?? ""} onChange={(v) => set("groupSize", v)} />
                <TextInput id="accompanyingStaff" label="Accompanying staff / faculty (number)" type="number" value={values.accompanyingStaff ?? ""} onChange={(v) => set("accompanyingStaff", v)} />
                <TextInput id="institutionalRefereeName" label="Institutional referee — name" value={values.institutionalRefereeName ?? ""} onChange={(v) => set("institutionalRefereeName", v)} />
                <TextInput id="institutionalRefereeEmail" label="Institutional referee — email" type="email" value={values.institutionalRefereeEmail ?? ""} onChange={(v) => set("institutionalRefereeEmail", v)} />
              </div>
              <TextArea
                id="academicContext" label="Academic credit or recognition involved? (optional)"
                value={values.academicContext ?? ""} onChange={(v) => set("academicContext", v)}
                help="e.g. course credit arranged by the home institution — the home institution remains responsible for approving credit."
              />
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectInput
                id="academicStatus" label="Current status"
                value={values.academicStatus ?? ""} onChange={(v) => set("academicStatus", v)}
                options={["Undergraduate student", "Graduate student", "Recent graduate", "Professional", "Other"]}
                placeholder="Select status…"
              />
              <TextInput id="institution" label="University / institution (if applicable)" value={values.institution ?? ""} onChange={(v) => set("institution", v)} />
              <TextInput id="fieldOfStudy" label="Field of study / profession" value={values.fieldOfStudy ?? ""} onChange={(v) => set("fieldOfStudy", v)} />
            </div>
          )}
        </div>
      )}

      {/* ---------- STEP 3 ---------- */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)]">Practical details & motivation</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectInput
              id="preferredDuration" label="Preferred duration" required
              value={values.preferredDuration ?? ""} onChange={(v) => set("preferredDuration", v)}
              options={["1-2 weeks", "2-3 weeks", "3-4 weeks", "1-2 months", "2-4 months", "4-6 months", "6-12 months", "Flexible"]}
              placeholder="Select duration…"
            />
            <TextInput id="availableStartDate" label="Earliest start date" type="date" required value={values.availableStartDate ?? ""} onChange={(v) => set("availableStartDate", v)} />
            <SelectInput
              id="accommodationPreference" label="Accommodation preference"
              value={values.accommodationPreference ?? ""} onChange={(v) => set("accommodationPreference", v)}
              options={["Host family", "Shared housing", "Single room", "I will arrange my own", "Other — specify in notes"]}
              placeholder="Select preference…"
            />
            <SelectInput
              id="insurance" label="Travel / health insurance"
              value={values.insurance ?? ""} onChange={(v) => set("insurance", v)}
              options={["Yes", "Planning to obtain", "Not yet"]}
              placeholder="Select…"
            />
          </div>
          <TextArea id="motivation" label="What do you hope to give and learn?" required value={values.motivation ?? ""} onChange={(v) => set("motivation", v)} />
          <TextArea id="relevantExperience" label="Relevant experience or skills (optional)" value={values.relevantExperience ?? ""} onChange={(v) => set("relevantExperience", v)} />
          <TextArea id="dietaryAccessibility" label="Dietary requirements, allergies or accessibility needs (optional)" value={values.dietaryAccessibility ?? ""} onChange={(v) => set("dietaryAccessibility", v)} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput id="emergencyContactName" label="Emergency contact — name" required value={values.emergencyContactName ?? ""} onChange={(v) => set("emergencyContactName", v)} />
            <TextInput id="emergencyContactPhone" label="Emergency contact — phone" type="tel" required value={values.emergencyContactPhone ?? ""} onChange={(v) => set("emergencyContactPhone", v)} />
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-2 text-[0.92rem]">
              <input
                type="checkbox"
                checked={values.codeOfConductAgreement === "yes"}
                onChange={(e) => set("codeOfConductAgreement", e.target.checked ? "yes" : "")}
                className="mt-1"
              />
              <span>
                I agree to abide by FOSCOD&apos;s code of conduct, safeguarding requirements and rules for
                photography, stories and research data. <span className="text-[var(--accent-600)]">*</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-[0.92rem]">
              <input
                type="checkbox"
                checked={values.photoConsent === "yes"}
                onChange={(e) => set("photoConsent", e.target.checked ? "yes" : "no")}
                className="mt-1"
              />
              <span>I consent to FOSCOD using photos and video from my program for promotional purposes (optional).</span>
            </label>
          </div>
          <TextArea id="additionalComments" label="Anything else we should know? (optional)" value={values.additionalComments ?? ""} onChange={(v) => set("additionalComments", v)} />
        </div>
      )}

      {/* ---------- STEP 4 ---------- */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)]">Review your application</h2>
          <p className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            <strong>What happens after you submit:</strong> your submission starts a matching process. FOSCOD
            reviews your interest, thematic areas and learning objectives against community priorities, partner
            availability and program requirements. Submitting does not guarantee acceptance or a particular host
            organization — we will confirm next steps with you in writing.
          </p>
          <dl className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
            {reviewRows.map(([k, v]) => (
              <div key={k} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-[var(--ink)]">{k}</dt>
                <dd className="text-sm text-[var(--ink-soft)]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-[var(--muted)]">
            Use the Back button to change anything — your information is preserved between steps.
          </p>
        </div>
      )}

      {message && (
        <p className="mt-5 text-sm text-[var(--error)]" role="alert">{message}</p>
      )}

      {/* nav */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-[0.95rem] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--surface)]"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)]"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={state === "loading"}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] disabled:opacity-60"
          >
            {state === "loading" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </form>
  );
}
