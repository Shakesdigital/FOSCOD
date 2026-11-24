"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  gleEngagement,
  gleMatching,
  gleThematic,
  gleUi,
} from "@/lib/gle-pages";
import {
  buildGleApplicationHref,
  isGleSelectionSelected,
  retainGlePrimarySelection,
  toggleGleSelection,
} from "@/lib/gle-selections";

import {
  ExpandableCard,
  PhotoBand,
  CardGrid,
  IconFeature,
  ContentBlock,
  SectionDivider,
} from "@/components/site/gle-landing";

type GlePathway = "volunteer" | "internship";

export function GleSelectionSections({ pathway }: { pathway: GlePathway }) {
  const [themes, setThemes] = useState<string[]>([]);
  const [engagements, setEngagements] = useState<string[]>([]);
  const [primary, setPrimary] = useState("");
  const [themeGuidance, setThemeGuidance] = useState(false);
  const [approachGuidance, setApproachGuidance] = useState(false);

  function toggleTheme(theme: string, checked: boolean) {
    setThemes((current) => toggleGleSelection(current, theme, checked));
  }

  function toggleEngagement(value: string, checked: boolean) {
    const next = toggleGleSelection(engagements, value, checked);
    setEngagements(next);
    setPrimary((current) => retainGlePrimarySelection(current, next));
  }

  const applicationHref = buildGleApplicationHref(pathway, {
    themes,
    engagements,
    primary,
    themeGuidance,
    approachGuidance,
  });

  return (
    <>
      <SectionDivider />

      <section
        id="thematic-areas"
        className="scroll-mt-36 bg-[var(--surface-2)] py-16 md:py-24"
        aria-label="Choose Your Thematic Area"
      >
        <div className="container-page">
          <SectionHeader
            eyebrow={gleUi.thematicEyebrow}
            title="Choose Your Thematic Area"
            align="center"
          />
          
          <ContentBlock maxWidth="3xl" spacing="normal">
            <p className="italic leading-relaxed text-[var(--muted)]">{gleThematic.stepIntro}</p>
            <p className="leading-relaxed text-[var(--ink-soft)]">{gleThematic.lead}</p>
          </ContentBlock>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.6fr)]">
            <div className="space-y-10">
              <fieldset className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                <legend className="text-xl font-medium text-[var(--ink)] mb-6">
                  {gleThematic.cedp.title}
                </legend>
                <div className="prose-space max-w-3xl">
                  {gleThematic.cedp.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-relaxed text-[var(--ink-soft)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {gleThematic.cedp.areas.map((area, index) => {
                    const id = `gle-theme-cedp-${index}`;
                    const value = area.title;
                    const checked = isGleSelectionSelected(themes, value);
                    return (
                      <label
                        key={area.title}
                        htmlFor={id}
                        className={`flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border p-5 transition-all duration-200 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent-600)] ${
                          checked
                            ? "border-[var(--accent-600)] bg-[var(--accent-50)] ring-2 ring-[var(--accent-200)]"
                            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-300)] hover:bg-[var(--accent-50)]"
                        }`}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => toggleTheme(value, event.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
                        />
                        <span className="flex-1">
                          <span className="block font-medium leading-snug text-[var(--ink)]">{value}</span>
                          <span className="mt-1.5 block text-sm leading-relaxed text-[var(--muted)]">{area.body}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <details open className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                <summary className="cursor-pointer list-none text-xl font-medium text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]">
                  {gleThematic.partners.title}
                </summary>
                <div className="mt-4">
                  <p className="max-w-3xl leading-relaxed text-[var(--ink-soft)]">
                    {gleThematic.partners.lead}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2.5" role="list">
                    {gleThematic.partners.sectors.map((sector, index) => {
                      const id = `gle-theme-partner-${index}`;
                      const checked = themes.includes(sector);
                      return (
                        <li key={sector}>
                          <label
                            htmlFor={id}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-full)] border px-4 py-2.5 text-sm transition-all duration-200 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent-600)] ${
                              checked
                                ? "border-[var(--accent-600)] bg-[var(--accent-600)] text-white ring-2 ring-[var(--accent-200)]"
                                : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent-600)] hover:bg-[var(--accent-50)]"
                            }`}
                          >
                            <input
                              id={id}
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => toggleTheme(sector, event.target.checked)}
                              className={`h-3.5 w-3.5 ${checked ? "accent-white" : "accent-[var(--accent-600)]"}`}
                            />
                            {sector}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            </div>

            <aside className="h-fit rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 lg:sticky lg:top-40 lg:border-[var(--accent-200)] lg:bg-[var(--accent-50)]">
              <div className="space-y-5">
                <div className="rounded-[var(--radius-lg)] bg-[var(--surface-2)] p-5">
                  <p className="italic leading-relaxed text-[var(--muted)]">{gleMatching.note}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    Selections inform discussions and placement planning and do not automatically guarantee a specific host organization, project or research opportunity.
                  </p>
                </div>
                
                <div className="border-t border-[var(--border)] pt-5 space-y-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--ink)]">
                    <input
                      type="checkbox"
                      checked={themeGuidance}
                      onChange={(event) => setThemeGuidance(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
                    />
                    <span>I&apos;m not sure, I&apos;d like FOSCOD&apos;s guidance</span>
                  </label>
                </div>

                {(themes.length > 0 || themeGuidance) && (
                  <div className="border-t border-[var(--border)] pt-5">
                    <h4 className="text-sm font-medium text-[var(--ink)] mb-3">Your thematic selections</h4>
                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme) => (
                        <span key={theme} className="rounded-[var(--radius-full)] bg-[var(--accent-100)] px-3 py-1 text-xs font-medium text-[var(--accent-700)]">
                          {theme}
                        </span>
                      ))}
                      {themeGuidance && (
                        <span className="rounded-[var(--radius-full)] bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--muted)]">
                          Thematic-area guidance requested
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section
        id="engagement-approach"
        className="scroll-mt-36 py-16 md:py-24"
        aria-label="Choose Your Engagement Approach"
      >
        <div className="container-page">
          <SectionHeader
            eyebrow={gleUi.engagementEyebrow}
            title="Choose Your Engagement Approach"
            align="center"
          />
          
          <ContentBlock maxWidth="3xl" spacing="normal">
            <p className="italic leading-relaxed text-[var(--muted)]">{gleEngagement.stepIntro}</p>
            <h3 className="mt-4 text-[clamp(1.3rem,2.4vw,1.7rem)] text-[var(--ink)]">
              {gleEngagement.title}
            </h3>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{gleEngagement.lead}</p>
          </ContentBlock>

          <div className="mt-10">
            <CardGrid columns={3} items={
              gleEngagement.options.map((option) => {
                const checked = engagements.includes(option.letter);
                const id = `gle-approach-${option.letter}`;
                return (
                  <label
                    key={option.letter}
                    htmlFor={id}
                    className={`flex h-full cursor-pointer flex-col rounded-[var(--radius-xl)] border p-6 transition-all duration-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent-600)] ${
                      checked
                        ? "border-[var(--accent-600)] bg-[var(--accent-50)] ring-2 ring-[var(--accent-200)] shadow-[var(--shadow-md)]"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-300)] hover:bg-[var(--accent-50)] hover:shadow-[var(--shadow-sm)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => toggleEngagement(option.letter, event.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent-600)]"
                      />
                      <span className="font-medium leading-snug text-[var(--ink)]">
                        {option.letter}. {option.title}
                      </span>
                    </div>
                    <div className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                      {option.paragraphs.map((paragraph) => (
                        <span key={paragraph} className="block">{paragraph}</span>
                      ))}
                    </div>
                  </label>
                );
              })
            } />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <label htmlFor="gle-primary-emphasis" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Primary emphasis (optional)
              </label>
              <select
                id="gle-primary-emphasis"
                value={primary}
                onChange={(event) => setPrimary(event.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-600)]"
              >
                <option value="">No single emphasis</option>
                {gleEngagement.options
                  .filter((option) => engagements.includes(option.letter))
                  .map((option) => (
                    <option key={option.letter} value={option.letter}>
                      {option.title}
                    </option>
                  ))}
              </select>
              <p className="mt-3 text-sm text-[var(--muted)]">
                This helps FOSCOD understand your top priority when matching you with a placement.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-[var(--radius-lg)] bg-[var(--surface-2)] p-5">
                <p className="italic leading-relaxed text-[var(--muted)]">{gleEngagement.note}</p>
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={approachGuidance}
                  onChange={(event) => setApproachGuidance(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-600)]"
                />
                <span>I&apos;m not sure, I&apos;d like FOSCOD&apos;s guidance</span>
              </label>
            </div>
          </div>

          <aside className="mt-12 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-2)] p-5 md:p-6 lg:border-[var(--accent-200)]" aria-live="polite">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-medium text-[var(--ink)]">Your selections</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <span key={theme} className="rounded-[var(--radius-full)] bg-[var(--accent-100)] px-3 py-1 text-xs font-medium text-[var(--accent-700)]">
                      {theme}
                    </span>
                  ))}
                  {engagements.map((value) => {
                    const option = gleEngagement.options.find((item) => item.letter === value);
                    return (
                      <span key={value} className="rounded-[var(--radius-full)] bg-[var(--accent-100)] px-3 py-1 text-xs font-medium text-[var(--accent-700)]">
                        {option?.title}{primary === value ? " · Primary" : ""}
                      </span>
                    );
                  })}
                  {themeGuidance && (
                    <span className="rounded-[var(--radius-full)] bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--muted)]">
                      Thematic-area guidance
                    </span>
                  )}
                  {approachGuidance && (
                    <span className="rounded-[var(--radius-full)] bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--muted)]">
                      Engagement guidance
                    </span>
                  )}
                  {(themes.length === 0 && engagements.length === 0 && !themeGuidance && !approachGuidance) && (
                    <span className="rounded-[var(--radius-full)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
                      No selections yet
                    </span>
                  )}
                </div>
              </div>
              <Button href={applicationHref} size="md" className="w-full sm:w-auto">
                Continue to application
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}