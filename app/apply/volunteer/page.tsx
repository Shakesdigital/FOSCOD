import { HeroSlider } from "@/components/site/HeroSlider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { ApplicationForm, type Field } from "@/components/forms/ApplicationForm";

export const metadata = pageMeta(
  "Volunteer Application",
  "Apply to volunteer with FOSCOD in Uganda. Fields cover your background, skills, preferred program area, and availability."
);

const volunteerFields: Field[] = [
  // Personal Details
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", required: true },
  { name: "dateOfBirth", label: "Date of birth", type: "date", required: true },
  { name: "nationality", label: "Nationality", required: true },
  { name: "countryOfResidence", label: "Country of residence", required: true },
  { name: "passportNumber", label: "Passport number", required: false },

  // Accommodation & Logistics
  { name: "accommodationPreference", label: "Preferred accommodation", required: true, type: "select", options: ["Host family", "Shared housing", "Single room", "I will arrange my own", "Other"] },
  { name: "dietaryRequirements", label: "Dietary requirements or allergies", type: "textarea", required: false, full: true },
  { name: "accessibilityNeeds", label: "Accessibility requirements", type: "textarea", required: false, full: true },

  // Volunteer Background
  { name: "currentStatus", label: "Current status", required: true, type: "select", options: ["Undergraduate student", "Graduate student", "Recent graduate", "Professional", "Professional (sabbatical)", "Retired", "Gap year", "Other"] },
  { name: "occupation", label: "Current occupation / role", required: false },
  { name: "institutionOrEmployer", label: "University / Employer", required: false },
  { name: "yearsOfExperience", label: "Years of relevant experience", type: "number", required: false },
  { name: "previousVolunteerExperience", label: "Previous volunteer or development experience", type: "textarea", required: true, full: true },
  { name: "relevantSkills", label: "Relevant skills (e.g. language, technical, teaching)", type: "textarea", required: true, full: true },

  // Program Preferences
  { name: "programArea", label: "Area of interest", required: true, type: "select", options: ["Clean energy", "WASH (water, sanitation, hygiene)", "Livelihoods & economic empowerment", "Health & wellbeing", "Education & youth", "Environment & ecosystem restoration", "Women's & social inclusion", "Research & data", "ICT & media", "Other"] },
  { name: "preferredDuration", label: "Preferred duration", required: true, type: "select", options: ["1-2 weeks", "3-4 weeks", "1-2 months", "2-3 months", "3-6 months", "Flexible"] },
  { name: "availableStartDate", label: "Earliest start date", type: "date", required: true },
  { name: "flexibleDates", label: "Are you flexible with dates?", required: true, type: "select", options: ["Yes", "No"] },
  { name: "groupOrIndividual", label: "Are you applying as part of a group?", required: true, type: "select", options: ["Individual", "Small group (2-5)", "Group (6+)", "University cohort", "Other"] },
  { name: "englishProficiency", label: "English proficiency", required: true, type: "select", options: ["Native", "Fluent", "Proficient", "Intermediate", "Basic"] },
  { name: "otherLanguages", label: "Other languages spoken", type: "textarea", required: false, full: true },

  // Motivation
  { name: "whyVolunteer", label: "Why do you want to volunteer with FOSCOD?", type: "textarea", required: true, full: true },
  { name: "motivationAndExpectations", label: "What do you hope to give, and what do you hope to learn?", type: "textarea", required: true, full: true },
  { name: "previousTravelExperience", label: "Have you traveled or volunteered internationally before?", type: "textarea", required: false, full: true },

  // Health & Safety
  { name: "medicalConditions", label: "Medical conditions or allergies we should know about", type: "textarea", required: false, full: true },
  { name: "emergencyContactName", label: "Emergency contact — Name", required: true },
  { name: "emergencyContactPhone", label: "Emergency contact — Phone", type: "tel", required: true },
  { name: "emergencyContactRelationship", label: "Emergency contact — Relationship", required: true },
  { name: "emergencyContactEmail", label: "Emergency contact — Email", type: "email", required: false },
  { name: "insuranceCoverage", label: "Do you have travel/health insurance that covers Uganda?", required: true, type: "select", options: ["Yes", "No", "Planning to obtain"] },
  { name: "vaccinations", label: "Have you completed recommended vaccinations?", type: "textarea", required: false, full: true },

  // References
  { name: "referee1Name", label: "Reference 1 — Name", required: true },
  { name: "referee1Email", label: "Reference 1 — Email", type: "email", required: true },
  { name: "referee1Phone", label: "Reference 1 — Phone", type: "tel", required: false },
  { name: "referee1Relationship", label: "Reference 1 — Relationship", required: true },
  { name: "referee2Name", label: "Reference 2 — Name", required: false },
  { name: "referee2Email", label: "Reference 2 — Email", type: "email", required: false },
  { name: "referee2Relationship", label: "Reference 2 — Relationship", required: false },

  // Agreement & Additional Info
  { name: "codeOfConductAgreement", label: "Do you agree to abide by FOSCOD's code of conduct and community guidelines?", required: true, type: "select", options: ["Yes, I agree"] },
  { name: "photoStoryConsent", label: "Do you consent to FOSCOD using photos/videos taken during your placement for promotional purposes?", required: true, type: "select", options: ["Yes", "No"] },
  { name: "additionalComments", label: "Anything else we should know?", type: "textarea", required: false, full: true },
];

export default async function VolunteerApplicationPage() {
  const heroSlides = await getHeroSlides("apply");

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro */}
      <section className="bg-[var(--surface-2)] py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Volunteer application</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.8rem)]">Apply to volunteer with FOSCOD</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            We match motivated volunteers to genuine community priorities. Fill in
            the form below, and our placement team will review your fit and reach
            out with the current program brief, fees, and next steps.
          </p>
        </div>
      </section>

      {/* form */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <ApplicationForm
              formType="volunteer"
              fields={volunteerFields}
              submitLabel="Submit application"
              successTitle="Volunteer application received"
              successBody="Thank you. A member of the FOSCOD placement team will review your application and reach out within 5 business days."
            />
          </div>
        </div>
      </section>
    </>
  );
}
