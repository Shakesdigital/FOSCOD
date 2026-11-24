import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGleApplicationHref,
  allowsGleVirtualParticipation,
  isGleSelectionSelected,
  isGleLearningFocusProgram,
  parseGleApplicationSelections,
  retainGlePrimarySelection,
  retargetGleApplyHref,
  requiresGleFormatSelection,
  toggleGleSelection,
} from "../lib/gle-selections.ts";
import { glePhotoFallbacks, resolveGlePhoto } from "../lib/gle-pages.ts";

test("application selections round-trip as repeated URL parameters", () => {
  const href = buildGleApplicationHref("volunteer", {
    themes: [
      "Clean Energy & Climate Resilience",
      "Women's Empowerment & Gender Equality",
    ],
    engagements: ["A", "C"],
    primary: "C",
    themeGuidance: true,
    approachGuidance: true,
  });
  const url = new URL(href, "https://foscod.org");

  assert.equal(url.pathname, "/programs/global-learning-exchange/apply");
  assert.deepEqual(url.searchParams.getAll("theme"), [
    "Clean Energy & Climate Resilience",
    "Women's Empowerment & Gender Equality",
  ]);
  assert.deepEqual(url.searchParams.getAll("engagement"), ["A", "C"]);
  assert.equal(url.searchParams.get("pathway"), "volunteer");
  assert.equal(url.searchParams.get("program"), "individual");
  assert.equal(url.searchParams.get("primary"), "C");
  assert.equal(url.searchParams.get("themeGuidance"), "true");

  assert.deepEqual(parseGleApplicationSelections(url.searchParams, [
    "Clean Energy & Climate Resilience",
    "Women's Empowerment & Gender Equality",
  ]), {
    pathway: "volunteer",
    program: "individual",
    themes: [
      "Clean Energy & Climate Resilience",
      "Women's Empowerment & Gender Equality",
    ],
    engagements: ["A", "C"],
    primary: "C",
    programGuidance: false,
    themeGuidance: true,
    approachGuidance: true,
  });
});

test("invalid and absent query values do not become preselected", () => {
  const parsed = parseGleApplicationSelections(
    new URLSearchParams("pathway=unknown&program=not-a-program&theme=unknown&engagement=Z&primary=Z"),
    ["Clean Energy & Climate Resilience"]
  );

  assert.deepEqual(parsed, {
    pathway: undefined,
    program: undefined,
    themes: [],
    engagements: [],
    primary: "",
    programGuidance: false,
    themeGuidance: false,
    approachGuidance: false,
  });
});

test("trip and tour program modes are identified separately", () => {
  assert.equal(isGleLearningFocusProgram("service-learning-trip"), true);
  assert.equal(isGleLearningFocusProgram("study-tour"), true);
  assert.equal(isGleLearningFocusProgram("individual"), false);
  assert.equal(isGleLearningFocusProgram(undefined), false);
});

test("trip/tour selections discard hidden engagement values and unknown programs require format choice", () => {
  const parsed = parseGleApplicationSelections(
    new URLSearchParams("program=study-tour&engagement=A&primary=A"),
    []
  );

  assert.deepEqual(parsed.engagements, []);
  assert.equal(parsed.primary, "");
  assert.equal(requiresGleFormatSelection(undefined), true);
  assert.equal(requiresGleFormatSelection("individual"), true);
  assert.equal(requiresGleFormatSelection("study-tour"), false);
});

test("virtual participation is limited to individual and group placements", () => {
  assert.equal(allowsGleVirtualParticipation("individual"), true);
  assert.equal(allowsGleVirtualParticipation("group-project"), true);
  assert.equal(allowsGleVirtualParticipation("coordinated-group"), true);
  assert.equal(allowsGleVirtualParticipation("service-learning-trip"), false);
  assert.equal(allowsGleVirtualParticipation("study-tour"), false);
  assert.equal(allowsGleVirtualParticipation(undefined), false);
});

test("multi-select changes do not remove other choices or duplicate an item", () => {
  const selected = toggleGleSelection(["A", "C"], "B", true);

  assert.deepEqual(selected, ["A", "C", "B"]);
  assert.deepEqual(toggleGleSelection(selected, "B", true), selected);
  assert.deepEqual(toggleGleSelection(selected, "C", false), ["A", "B"]);
  assert.equal(retainGlePrimarySelection("C", ["A", "B"]), "");
  assert.equal(retainGlePrimarySelection("A", ["A", "B"]), "A");
});

test("numbered CEDP labels stay selected with their exact document text", () => {
  const title = "1. Clean Energy & Climate Resilience";
  const selected = toggleGleSelection([], title, true);

  assert.equal(isGleSelectionSelected(selected, title), true);
  assert.equal(isGleSelectionSelected(selected, "Clean Energy & Climate Resilience"), false);
});

test("guidance selections can continue without choosing a theme or approach", () => {
  const href = buildGleApplicationHref("internship", {
    themeGuidance: true,
    approachGuidance: true,
  });
  const parsed = parseGleApplicationSelections(new URL(href, "https://foscod.org").searchParams, []);

  assert.deepEqual(parsed, {
    pathway: "internship",
    program: "individual",
    themes: [],
    engagements: [],
    primary: "",
    programGuidance: false,
    themeGuidance: true,
    approachGuidance: true,
  });
});

test("existing apply and guidance links use the GLE application route and pathway", () => {
  assert.equal(
    retargetGleApplyHref("/apply?type=volunteer", "volunteer"),
    "/programs/global-learning-exchange/apply?pathway=volunteer&program=individual"
  );
  assert.equal(
    retargetGleApplyHref("/apply?type=guidance", "internship"),
    "/programs/global-learning-exchange/apply?pathway=internship&program=individual&programGuidance=true"
  );
  assert.equal(
    retargetGleApplyHref("/opportunities?type=volunteer", "volunteer"),
    "/opportunities?type=volunteer"
  );
});

test("missing GLE image paths resolve only to existing local photos", () => {
  assert.equal(
    resolveGlePhoto("/images/gle/internships.jpg", glePhotoFallbacks.learning),
    glePhotoFallbacks.learning
  );
  assert.equal(
    resolveGlePhoto(glePhotoFallbacks.community, glePhotoFallbacks.learning),
    glePhotoFallbacks.community
  );
  assert.equal(
    resolveGlePhoto("https://media.example.org/gle.jpg", glePhotoFallbacks.learning),
    "https://media.example.org/gle.jpg"
  );
});
