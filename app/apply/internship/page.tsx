import { HeroSlider } from "@/components/site/HeroSlider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { ApplicationForm, type Field } from "@/components/forms/ApplicationForm";

export const metadata = pageMeta(
  "Internship Application",
  "Apply for a supervised internship with FOSCOD in Uganda. Fields include personal details, academic background, field interests, and availability."
);

const internshipFields: Field[] = [
  // Personal Details
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", required: true },
  { name: "alternateEmail", label: "Alternate email (optional)", type: "email", required: false },
  { name: "dateOfBirth", label: "Date of birth", type: "date", required: true },
  { name: "nationality", label: "Nationality", required: true },
  { name: "countryOfResidence", label: "Country of residence", required: true },
  { name: "passportNumber", label: "Passport number (if applicable)", required: false },

  // Accommodation
  { name: "accommodationPreference", label: "Preferred accommodation", required: true, type: "select", options: ["Host family", "Shared housing", "Single room", "Other"] },
  { name: "dietaryRequirements", label: "Dietary requirements", type: "textarea", required: false, full: true },

  // Academic / Professional Background
  { name: "currentStatus", label: "Current status", required: true, type: "select", options: ["Undergraduate student", "Graduate student", "Recent graduate", "Professional", "Other"] },
  { name: "institution", label: "University / Institution", required: false },
  { name: "fieldOfStudy", label: "Field of study", required: true },
  { name: "graduationYear", label: "Expected graduation year", type: "number", required: false },
  { name: "gpa", label: "GPA (if applicable)", required: false },
  { name: "relevantExperience", label: "Relevant experience", type: "textarea", required: true, full: true },

  // Program Preferences
  { name: "programArea", label: "Area of interest", required: true, type: "select", options: ["Clean energy", "WASH", "Livelihoods", "Health & wellbeing", "Environment", "Research", "Education", "ICT/Media", "Other"] },
  { name: "preferredDuration", label: "Preferred duration", required: true, type: "select", options: ["4-6 weeks", "8-12 weeks", "12-16 weeks", "3-6 months", "Flexible"] },
  { name: "availableStartDate", label: "Earliest start date", type: "date", required: true },
  { name: "flexibleDates", label: "Are you flexible with dates?", required: true, type: "select", options: ["Yes", "No"] },
  { name: "englishProficiency", label: "English proficiency", required: true, type: "select", options: ["Native", "Fluent", "Proficient", "Intermediate"] },

  // Motivation
  { name: "whyFoscod", label: "Why do you want to intern with FOSCOD?", type: "textarea", required: true, full: true },
  { name: "learningGoals", label: "What are your learning goals?", type: "textarea", required: true, full: true },
  { name: "skillsToOffer", label: "What skills can you offer? (e.g. language, technical)", type: "textarea", required: false, full: true },

  // References
  { name: "referee1Name", label: "Reference 1 — Name", required: true },
  { name: "referee1Email", label: "Reference 1 — Email", type: "email", required: true },
  { name: "referee1Phone", label: "Reference 1 — Phone", type: "tel", required: false },
  { name: "referee1Relationship", label: "Reference 1 — Relationship", required: true },
  { name: "referee2Name", label: "Reference 2 — Name", required: true },
  { name: "referee2Email", label: "Reference 2 — Email", type: "email", required: true },
  { name: "referee2Phone", label: "Reference 2 — Phone", type: "tel", required: false },
  { name: "referee2Relationship", label: "Reference 2 — Relationship", required: true },

  // Health & Safety
  { name: "medicalConditions", label: "Medical conditions or allergies we should know about", type: "textarea", required: false, full: true },
  { name: "emergencyContactName", label: "Emergency contact — Name", required: true },
  { name: "emergencyContactPhone", label: "Emergency contact — Phone", type: "tel", required: true },
  { name: "emergencyContactRelationship", label: "Emergency contact — Relationship", required: true },
  { name: "insuranceCoverage", label: "Do you have travel/health insurance?", required: true, type: "select", options: ["Yes", "No", "Pending"] },

  // Additional
  { name: "additionalSupport", label: "Any additional support needs?", type: "textarea", required: false, full: true },
  { name: "additionalComments", label: "Additional comments", type: "textarea", required: false, full: true },
];

export default async function InternshipApplicationPage() {
  const heroSlides = await getHeroSlides("apply");

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro */}
      <section className="bg-[var(--surface-2)] py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Internship application</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.8rem)]">Start your internship application</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Fill in the form below and our placement team will review your fit with
            current community-defined roles. We&rsquo;ll be in touch with next steps,
            program fees, and the intake brief.
          </p>
        </div>
      </section>

      {/* form */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <ApplicationForm
              formType="internship"
              fields={internshipFields}
              submitLabel="Submit application"
              successTitle="Internship application received"
              successBody="Thank you. A member of the FOSCOD placement team will review your application and reach out within 5 business days."
            />
          </div>
        </div>
      </section>
    </>
  );
}
