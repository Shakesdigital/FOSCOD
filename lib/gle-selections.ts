const APPLICATION_PATH = "/programs/global-learning-exchange/apply";
const PATHWAYS = new Set(["volunteer", "internship"]);
const PROGRAMS = new Set([
  "individual",
  "group-project",
  "coordinated-group",
  "service-learning-trip",
  "study-tour",
]);
const APPROACHES = new Set(["A", "B", "C"]);
const LEARNING_FOCUS_PROGRAMS = new Set(["service-learning-trip", "study-tour"]);
const VIRTUAL_PROGRAMS = new Set(["individual", "group-project", "coordinated-group"]);

export type GleSelectionValues = {
  program?: string;
  themes?: string[];
  engagements?: string[];
  primary?: string;
  programGuidance?: boolean;
  themeGuidance?: boolean;
  approachGuidance?: boolean;
};

export type GleApplicationSelections = {
  pathway?: "volunteer" | "internship";
  program?: string;
  themes: string[];
  engagements: string[];
  primary: string;
  programGuidance: boolean;
  themeGuidance: boolean;
  approachGuidance: boolean;
};

export function toggleGleSelection(current: string[], value: string, checked: boolean) {
  if (checked) return current.includes(value) ? current : [...current, value];
  return current.filter((item) => item !== value);
}

export function isGleSelectionSelected(current: string[], value: string) {
  return current.includes(value);
}

export function retainGlePrimarySelection(primary: string, selections: string[]) {
  return selections.includes(primary) ? primary : "";
}

export function buildGleApplicationHref(
  pathway: string | undefined,
  selections: GleSelectionValues,
  applicationPath = APPLICATION_PATH
) {
  const params = new URLSearchParams();
  if (PATHWAYS.has(pathway ?? "")) params.set("pathway", pathway!);
  const program = selections.program ?? (pathway && PATHWAYS.has(pathway) ? "individual" : undefined);
  if (program && PROGRAMS.has(program)) params.set("program", program);
  for (const theme of selections.themes ?? []) params.append("theme", theme);
  for (const engagement of selections.engagements ?? []) params.append("engagement", engagement);
  if (selections.primary && (selections.engagements ?? []).includes(selections.primary)) {
    params.set("primary", selections.primary);
  }
  if (selections.programGuidance) params.set("programGuidance", "true");
  if (selections.themeGuidance) params.set("themeGuidance", "true");
  if (selections.approachGuidance) params.set("approachGuidance", "true");

  const query = params.toString();
  return query ? `${applicationPath}?${query}` : applicationPath;
}

export function retargetGleApplyHref(
  href: string,
  pathway: "volunteer" | "internship",
  applicationPath = APPLICATION_PATH
) {
  const url = new URL(href, "https://foscod.org");
  if (url.pathname !== "/apply" && url.pathname !== APPLICATION_PATH) return href;

  const type = url.searchParams.get("type") ?? "";
  return buildGleApplicationHref(
    pathway,
    {
      program: PATHWAYS.has(type) ? "individual" : PROGRAMS.has(type) ? type : undefined,
      programGuidance: type === "guidance",
    },
    applicationPath
  );
}

export function parseGleApplicationSelections(
  searchParams: URLSearchParams,
  allowedThemes: readonly string[]
): GleApplicationSelections {
  const rawPathway = searchParams.get("pathway");
  const pathway = PATHWAYS.has(rawPathway ?? "")
    ? (rawPathway as GleApplicationSelections["pathway"])
    : undefined;
  const rawProgram = searchParams.get("program");
  const program =
    rawProgram && PROGRAMS.has(rawProgram)
      ? rawProgram
      : pathway
        ? "individual"
        : undefined;
  const allowedThemeSet = new Set(allowedThemes);
  const themes = [...new Set(searchParams.getAll("theme"))].filter((theme) =>
    allowedThemeSet.has(theme)
  );
  const engagements = isGleLearningFocusProgram(program)
    ? []
    : [...new Set(searchParams.getAll("engagement").filter((value) => APPROACHES.has(value)))];
  const rawPrimary = searchParams.get("primary") ?? "";

  return {
    pathway,
    program,
    themes,
    engagements,
    primary: engagements.includes(rawPrimary) ? rawPrimary : "",
    programGuidance: searchParams.get("programGuidance") === "true",
    themeGuidance: searchParams.get("themeGuidance") === "true",
    approachGuidance: searchParams.get("approachGuidance") === "true",
  };
}

export function isGleLearningFocusProgram(program: string | undefined) {
  return LEARNING_FOCUS_PROGRAMS.has(program ?? "");
}

export function requiresGleFormatSelection(program: string | undefined) {
  return !isGleLearningFocusProgram(program);
}

export function allowsGleVirtualParticipation(program: string | undefined) {
  return VIRTUAL_PROGRAMS.has(program ?? "");
}
