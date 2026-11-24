"use client";

/**
 * GLE application wizard — six screens that mirror the document's four steps
 * (program type → thematic area → engagement approach → participation format),
 * followed by applicant details and a review screen.
 *
 * Steps 3 and 4 adapt to the program type. Selections inform placement
 * discussions only — submitting does not confirm a host, project or research
 * opportunity.
 */

import { useState } from "react";
import {
  allowsGleVirtualParticipation,
  isGleLearningFocusProgram,
  requiresGleFormatSelection,
  retainGlePrimarySelection,
  toggleGleSelection,
  type GleApplicationSelections,
} from "@/lib/gle-selections";
import {
  gleApply,
  gleEngagement,
  gleLearningFocus,
  gleMatching,
  gleParticipation,
  gleProgramTypes,
  gleSteps,
  gleThematic,
} from "@/lib/gle-pages";

const STEP_LABELS = [
  "Program type",
  "Thematic area",
  "Engagement",
  "Format",
  "Your details",
  "Review",
];

const PROGRAM_OPTIONS = gleProgramTypes.map((p) => ({ value: p.slug, label: p.title }));

const THEME_OPTIONS = [
  ...gleThematic.cedp.areas.map((a) => ({ label: a.title, group: "CEDP focus area" })),
  ...gleThematic.partners.sectors.map((s) => ({ label: s, group: "Local partner sector" })),
];

const APPROACH_OPTIONS = gleEngagement.options.map((o) => ({
  value: o.letter,
  label: `${o.letter}. ${o.title}`,
}));

const SELECTION_NOTE =
  "Your selections inform placement discussions and placement planning. They do not automatically guarantee a specific host organization, project or research opportunity.";
const IN_PERSON_FORMAT = gleParticipation.formats[0].title;

const GUIDANCE_LABEL = "I'm not sure, I'd like FOSCOD's guidance";

const inputClass =
  "mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-[var(--accent-600)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]";

type Errors = Record<string, string>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--error)]" role="alert">
      {message}
    </p>
  );
}

function TextField({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  error,
  help,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  help?: string;
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
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className={inputClass}
      />
      {help && !error && (
        <p id={`${id}-help`} className="mt-1 text-xs text-[var(--muted)]">
          {help}
        </p>
      )}
      <FieldError id={id} message={error} />
    </div>
  );
}

function Textarea({
  id,
  label,
  value,
  onChange,
  rows = 4,
  error,
  help,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  error?: string;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--ink)]">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className={inputClass}
      />
      {help && !error && (
        <p id={`${id}-help`} className="mt-1 text-xs text-[var(--muted)]">
          {help}
        </p>
      )}
      <FieldError id={id} message={error} />
    </div>
  );
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
  description,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 text-[0.92rem] leading-relaxed">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
      />
      <span>
        {label}
        {description && <span className="mt-1 block text-[0.82rem] text-[var(--muted)]">{description}</span>}
      </span>
    </label>
  );
}

function GuidanceCheckbox({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3">
      <Checkbox id={id} label={GUIDANCE_LABEL} checked={checked} onChange={onChange} />
    </div>
  );
}

function CardChoice({
  type,
  name,
  value,
  label,
  checked,
  onChange,
  disabled,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border p-4 text-[0.92rem] transition-colors ${
        checked
          ? "border-[var(--accent-600)] bg-[var(--accent-50)]"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
      />
      <span>{label}</span>
    </label>
  );
}

export default function GleApplicationForm({
  initialSelections,
}: {
  initialSelections: GleApplicationSelections;
}) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  // Selections
  const [program, setProgram] = useState(initialSelections.program ?? "");
  const [pathway, setPathway] = useState(initialSelections.pathway ?? "");
  const [programGuidance, setProgramGuidance] = useState(initialSelections.programGuidance);
  const [themes, setThemes] = useState(initialSelections.themes);
  const [themeGuidance, setThemeGuidance] = useState(initialSelections.themeGuidance);
  const [approaches, setApproaches] = useState(initialSelections.engagements);
  const [primaryApproach, setPrimaryApproach] = useState(initialSelections.primary);
  const [approachGuidance, setApproachGuidance] = useState(initialSelections.approachGuidance);
  const [learningFocus, setLearningFocus] = useState("");
  const [format, setFormat] = useState(
    isGleLearningFocusProgram(initialSelections.program) ? IN_PERSON_FORMAT : ""
  );

  // Applicant details
  const [details, setDetails] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  const isTripOrTour = isGleLearningFocusProgram(program);
  const canChooseVirtual = allowsGleVirtualParticipation(program);
  const isGroupish = isTripOrTour || program === "group-project" || program === "coordinated-group";

  const setDetail = (k: string, v: string) => setDetails((prev) => ({ ...prev, [k]: v }));

  function toggleTheme(label: string, on: boolean) {
    setThemes((prev) => toggleGleSelection(prev, label, on));
  }

  function toggleApproach(value: string, on: boolean) {
    const next = toggleGleSelection(approaches, value, on);
    setApproaches(next);
    setPrimaryApproach((primary) => retainGlePrimarySelection(primary, next));
  }

  function validate(s: number): Errors {
    const e: Errors = {};
    if (s === 1 && !program && !programGuidance) {
      e.program = "Choose a program type, or select the guidance option.";
    }
    if (s === 1 && program === "individual" && !pathway && !programGuidance) {
      e.pathway = "Choose Internship or Volunteer, or select the guidance option.";
    }
    if (s === 2 && themes.length === 0 && !themeGuidance) {
      e.themes = "Choose at least one thematic area, or select the guidance option.";
    }
    if (s === 3) {
      if (isTripOrTour) {
        if (!learningFocus.trim() && !approachGuidance) {
          e.learningFocus = "Tell us your learning objectives and preferred focus, or select the guidance option.";
        }
      } else if (approaches.length === 0 && !approachGuidance) {
        e.approaches = "Choose one or more engagement approaches, or select the guidance option.";
      }
    }
    if (s === 4) {
      if (requiresGleFormatSelection(program) && !format) {
        e.format = "Choose a participation format.";
      }
    }
    if (s === 5) {
      if (!details.firstName?.trim()) e.firstName = "First name is required.";
      if (!details.lastName?.trim()) e.lastName = "Last name is required.";
      if (!details.email?.trim()) e.email = "Email address is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = "Enter a valid email address.";
      if (!details.phone?.trim()) e.phone = "Phone number is required.";
      if (!details.countryOfResidence?.trim()) e.countryOfResidence = "Country of residence is required.";
      if (isGroupish) {
        if (!details.organizationName?.trim()) e.organizationName = "Organization or institution is required.";
        if (!details.groupSize?.trim()) e.groupSize = "Expected group size is required.";
      }
      if (!consent) e.consent = "Please confirm you understand how selections are used.";
    }
    return e;
  }

  function goTo(next: number) {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const all = validate(5);
    if (Object.keys(all).length > 0) {
      setErrors(all);
      setStep(5);
      return;
    }
    setStatus("loading");
    setSubmitError("");

    const payload: Record<string, unknown> = {
      ...details,
      programType: program,
      individualPathway: program === "individual" ? pathway : "",
      programGuidance,
      thematicAreas: themes,
      thematicGuidance: themeGuidance,
      engagementApproaches: isTripOrTour ? [] : approaches,
      primaryApproach: isTripOrTour ? "" : primaryApproach,
      engagementGuidance: approachGuidance,
      learningObjectives: isTripOrTour ? learningFocus : "",
      participationFormat: isTripOrTour ? IN_PERSON_FORMAT : format,
      guidanceRequested: programGuidance || themeGuidance || approachGuidance,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "application", payload }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setSubmitError(data.error ?? "Something went wrong — your application was not saved. Please try again.");
      }
    } catch {
      setStatus("error");
      setSubmitError("Network error — please try again. Your information has not been sent.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center"
        role="status"
      >
        <p className="text-3xl text-[var(--success)]">✓</p>
        <h3 className="mt-3 text-xl font-medium text-[var(--ink)]">Thank you — your application has been received.</h3>
        <p className="mt-2 text-[var(--muted)]">
          Your submission starts a matching process. FOSCOD reviews your interest, thematic areas and learning
          objectives against community priorities, partner availability and program requirements. It does not
          guarantee acceptance or a particular host organization — we will confirm next steps with you in writing.
        </p>
      </div>
    );
  }

  const programLabel = PROGRAM_OPTIONS.find((p) => p.value === program)?.label ?? "";
  const pathwayLabel = pathway === "internship" ? "Internship" : pathway === "volunteer" ? "Volunteer" : "";
  const formatLabel = isTripOrTour ? IN_PERSON_FORMAT : format;
  const approachLabels = approaches
    .map((v) => APPROACH_OPTIONS.find((o) => o.value === v)?.label ?? v)
    .join(", ");

  const reviewRows: [string, string][] = (
    [
      ["Program type", [programLabel, programGuidance ? "FOSCOD guidance requested" : ""].filter(Boolean).join(" · ")],
      ["Internship or Volunteer", program === "individual" ? pathwayLabel : ""],
      ["Thematic areas", [themes.join(", "), themeGuidance ? "FOSCOD guidance requested" : ""].filter(Boolean).join(" · ")],
      [
        "Engagement approach",
        isTripOrTour
          ? `Learning focus: ${learningFocus || "FOSCOD guidance requested"}`
          : [approachLabels, approachGuidance ? "FOSCOD guidance requested" : ""].filter(Boolean).join(" · "),
      ],
      ["Primary emphasis", isTripOrTour ? "" : APPROACH_OPTIONS.find((o) => o.value === primaryApproach)?.label ?? ""],
      ["Participation format", formatLabel],
      ["Name", `${details.firstName ?? ""} ${details.lastName ?? ""}`.trim()],
      ["Contact", [details.email, details.phone].filter(Boolean).join(" · ")],
      ["Country of residence", details.countryOfResidence ?? ""],
      ["Organization / institution", isGroupish ? details.organizationName ?? "" : details.institution ?? ""],
      ["Group size", isGroupish ? details.groupSize ?? "" : ""],
    ] as [string, string][]
  ).filter(([, v]) => v && v.trim() !== "");

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10"
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden
      />

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-[0.78rem] font-medium text-[var(--muted)]">
          <span>
            Step {step} of {STEP_LABELS.length}
          </span>
          <span>{STEP_LABELS[step - 1]}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]" aria-hidden>
          <div
            className="h-full rounded-full bg-[var(--accent-600)] transition-all duration-300"
            style={{ width: `${(step / STEP_LABELS.length) * 100}%` }}
          />
        </div>
        <ol className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
          {STEP_LABELS.map((label, i) => (
            <li key={label} aria-current={i + 1 === step ? "step" : undefined} className={i + 1 === step ? "font-semibold text-[var(--accent-700)]" : undefined}>
              {i + 1}. {label}
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- 1. Program type ---------- */}
      {step === 1 && (
        <fieldset className="space-y-4">
          <legend className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">
            Choose Your Program Type
          </legend>
          <p className="text-sm italic leading-relaxed text-[var(--muted)]">{gleSteps[0].line}</p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">{SELECTION_NOTE}</p>
          <div className="grid gap-3">
            {PROGRAM_OPTIONS.map((p) => (
              <CardChoice
                key={p.value}
                type="radio"
                name="programType"
                value={p.value}
                label={p.label}
                checked={program === p.value}
                onChange={() => {
                  setProgram(p.value);
                  if (p.value !== "individual") setPathway("");
                  setFormat(
                    isGleLearningFocusProgram(p.value) ? IN_PERSON_FORMAT : ""
                  );
                  if (isGleLearningFocusProgram(p.value)) {
                    setApproaches([]);
                    setPrimaryApproach("");
                  }
                }}
              />
            ))}
          </div>
          {program === "individual" && (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[var(--ink)]">Internship or Volunteer</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["internship", "volunteer"] as const).map((value) => (
                  <CardChoice
                    key={value}
                    type="radio"
                    name="individualPathway"
                    value={value}
                    label={value === "internship" ? "Internship" : "Volunteer"}
                    checked={pathway === value}
                    onChange={() => setPathway(value)}
                  />
                ))}
              </div>
              <FieldError id="pathway" message={errors.pathway} />
            </fieldset>
          )}
          <GuidanceCheckbox
            id="programGuidance"
            checked={programGuidance}
            onChange={setProgramGuidance}
          />
          <FieldError id="program" message={errors.program} />
        </fieldset>
      )}

      {/* ---------- 2. Thematic area ---------- */}
      {step === 2 && (
        <fieldset className="space-y-4">
          <legend className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">
            Choose Your Thematic Area
          </legend>
          <p className="text-sm italic leading-relaxed text-[var(--muted)]">{gleThematic.stepIntro}</p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Select any areas that interest you — from FOSCOD&apos;s Community Empowerment and Development Program
            (CEDP) focus areas, the local partner sectors, or both.
          </p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">{SELECTION_NOTE}</p>
          <div className="space-y-6">
            {[THEME_OPTIONS.slice(0, 3), THEME_OPTIONS.slice(3)].map((group, gi) => (
              <div key={gi}>
                <p className="text-[0.72rem] uppercase tracking-[0.1em] text-[var(--accent-700)]">
                  {gi === 0 ? "CEDP focus areas" : "Local partner sectors"}
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {group.map((t) => (
                    <Checkbox
                      key={t.label}
                      id={`theme-${t.label}`}
                      label={t.label}
                      checked={themes.includes(t.label)}
                      onChange={(on) => toggleTheme(t.label, on)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <GuidanceCheckbox
            id="themeGuidance"
            checked={themeGuidance}
            onChange={setThemeGuidance}
          />
          <FieldError id="themes" message={errors.themes} />
        </fieldset>
      )}

      {/* ---------- 3. Engagement approach / learning focus ---------- */}
      {step === 3 && (
        <fieldset className="space-y-4">
          <legend className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">
            {isTripOrTour ? gleLearningFocus.title : "Choose Your Engagement Approach"}
          </legend>
          {isTripOrTour && (
            <h3 className="text-lg font-medium text-[var(--ink)]">{gleLearningFocus.heading}</h3>
          )}
          <p className="text-sm italic leading-relaxed text-[var(--muted)]">
            {isTripOrTour
              ? gleLearningFocus.paragraphs[0]
              : gleEngagement.stepIntro}
          </p>

          {isTripOrTour ? (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{gleLearningFocus.paragraphs[1]}</p>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{gleLearningFocus.paragraphs[2]}</p>
              <Textarea
                id="learningFocus"
                label="Your learning objectives and preferred learning focus"
                value={learningFocus}
                onChange={setLearningFocus}
                error={errors.learningFocus}
                help="What should participants learn or achieve? FOSCOD uses these to co-design the experience with your institution and local partners."
              />
              <GuidanceCheckbox
                id="approachGuidance-trip"
                checked={approachGuidance}
                onChange={setApproachGuidance}
              />
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{gleEngagement.lead}</p>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{SELECTION_NOTE}</p>
              <div className="grid gap-2.5">
                {APPROACH_OPTIONS.map((o) => (
                  <Checkbox
                    key={o.value}
                    id={`approach-${o.value}`}
                    label={o.label}
                    checked={approaches.includes(o.value)}
                    onChange={(on) => toggleApproach(o.value, on)}
                  />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-[var(--muted)]">{gleEngagement.note}</p>
              {approaches.length > 0 && (
                <div>
                  <label htmlFor="primaryApproach" className="block text-sm font-medium text-[var(--ink)]">
                    Primary emphasis (optional)
                  </label>
                  <select
                    id="primaryApproach"
                    value={primaryApproach}
                    onChange={(e) => setPrimaryApproach(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">No single emphasis</option>
                    {APPROACH_OPTIONS.filter((o) => approaches.includes(o.value)).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <GuidanceCheckbox
                id="approachGuidance"
                checked={approachGuidance}
                onChange={setApproachGuidance}
              />
              <FieldError id="approaches" message={errors.approaches} />
            </>
          )}
        </fieldset>
      )}

      {/* ---------- 4. Participation format ---------- */}
      {step === 4 && (
        <fieldset className="space-y-4">
          <legend className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">
            Choose Your Participation Format
          </legend>
          <p className="text-sm italic leading-relaxed text-[var(--muted)]">{gleParticipation.stepIntro}</p>

          {isTripOrTour ? (
            <div className="space-y-4">
              <div className="rounded-[var(--radius-md)] border border-[var(--accent-600)] bg-[var(--accent-50)] p-4">
                <p className="text-[0.92rem] font-medium text-[var(--ink)]">{gleParticipation.formats[0].title}</p>
                {gleParticipation.formats[0].paragraphs.map((para, i) => (
                  <p key={i} className="mt-2 text-[0.88rem] leading-relaxed text-[var(--ink-soft)]">
                    {para}
                  </p>
                ))}
              </div>
              {isTripOrTour && (
                <p className="text-[0.88rem] italic leading-relaxed text-[var(--muted)]">
                  {gleParticipation.formats[1].note}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                {(canChooseVirtual ? gleParticipation.formats : [gleParticipation.formats[0]]).map((f) => {
                  const id = `format-${f.letter}`;
                  return (
                    <label
                      key={f.title}
                      htmlFor={id}
                      className={`flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border p-4 transition-colors ${
                        format === f.title
                          ? "border-[var(--accent-600)] bg-[var(--accent-50)]"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name="participationFormat"
                        value={f.title}
                        checked={format === f.title}
                        onChange={() => setFormat(f.title)}
                        className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
                      />
                      <span>
                        <span className="block font-medium text-[var(--ink)]">{f.title}</span>
                        {f.paragraphs.map((para, i) => (
                          <span key={i} className="mt-1 block text-[0.88rem] leading-relaxed text-[var(--muted)]">
                            {para}
                          </span>
                        ))}
                        {f.note && (
                          <span className="mt-2 block text-[0.88rem] italic leading-relaxed text-[var(--muted)]">
                            {f.note}
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="format" message={errors.format} />
            </>
          )}
        </fieldset>
      )}

      {/* ---------- 5. Applicant details ---------- */}
      {step === 5 && (
        <div className="space-y-5">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">Your details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="firstName" label="First name" required value={details.firstName ?? ""} onChange={(v) => setDetail("firstName", v)} error={errors.firstName} />
            <TextField id="lastName" label="Last name" required value={details.lastName ?? ""} onChange={(v) => setDetail("lastName", v)} error={errors.lastName} />
            <TextField id="email" label="Email address" type="email" required value={details.email ?? ""} onChange={(v) => setDetail("email", v)} error={errors.email} />
            <TextField id="phone" label="Phone number (incl. country code)" type="tel" required value={details.phone ?? ""} onChange={(v) => setDetail("phone", v)} error={errors.phone} />
            <TextField id="countryOfResidence" label="Country of residence" required value={details.countryOfResidence ?? ""} onChange={(v) => setDetail("countryOfResidence", v)} error={errors.countryOfResidence} />
            <TextField id="institution" label="University / institution (if applicable)" value={details.institution ?? ""} onChange={(v) => setDetail("institution", v)} />
            {isGroupish && (
              <>
                <TextField id="organizationName" label="Organization / institution" required value={details.organizationName ?? ""} onChange={(v) => setDetail("organizationName", v)} error={errors.organizationName} />
                <TextField id="groupSize" label="Expected group size" type="number" required value={details.groupSize ?? ""} onChange={(v) => setDetail("groupSize", v)} error={errors.groupSize} />
              </>
            )}
          </div>
          <Textarea
            id="notes"
            label="Anything else we should know? (optional)"
            value={details.notes ?? ""}
            onChange={(v) => setDetail("notes", v)}
            rows={3}
          />
          <div>
            <Checkbox
              id="consent"
              label="I understand that my selections inform discussions and placement planning, and do not automatically guarantee a specific host organization, project or research opportunity."
              checked={consent}
              onChange={setConsent}
            />
            <FieldError id="consent" message={errors.consent} />
          </div>
        </div>
      )}

      {/* ---------- 6. Review ---------- */}
      {step === 6 && (
        <div className="space-y-6">
          <h2 className="text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium text-[var(--ink)]">Review your application</h2>
          <p className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            <strong>What happens after you submit:</strong> {SELECTION_NOTE}
          </p>
          <p className="text-sm italic leading-relaxed text-[var(--muted)]">{gleMatching.note}</p>
          <dl className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
            {reviewRows.map(([k, v]) => (
              <div key={k} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-[var(--ink)]">{k}</dt>
                <dd className="text-sm text-[var(--ink-soft)]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-[var(--muted)]">Need to change something? Use Back — your answers are kept.</p>
          {status === "error" && submitError && (
            <p className="text-sm text-[var(--error)]" role="alert">
              {submitError}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((s) => Math.max(1, s - 1));
            }}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-[0.95rem] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 6 ? (
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent-600)] px-7 py-3 font-medium text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-700)] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-700)]"
          >
            {status === "loading" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>

      {status === "error" && step !== 6 && submitError && (
        <p className="mt-4 text-sm text-[var(--error)]" role="alert">
          {submitError}
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">{gleApply.note}</p>
    </form>
  );
}
