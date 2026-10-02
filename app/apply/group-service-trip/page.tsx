import { HeroSlider } from "@/components/site/HeroSlider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { getHeroSlides } from "@/lib/content";
import { ApplicationForm, type Field } from "@/components/forms/ApplicationForm";

export const metadata = pageMeta(
  "Group Service Trip Application",
  "Apply for a faculty-led group service trip to Uganda with FOSCOD. Fields cover group details, program area, timeline, academic integration, and support needs."
);

const groupServiceTripFields: Field[] = [
  // Primary Contact
  { name: "primaryContactName", label: "Primary contact name", required: true },
  { name: "primaryContactEmail", label: "Primary contact email", type: "email", required: true },
  { name: "primaryContactPhone", label: "Primary contact phone", type: "tel", required: true },
  { name: "primaryContactRole", label: "Primary contact role", required: true },

  // Organization
  { name: "organizationName", label: "Organization / University name", required: true },
  { name: "organizationType", label: "Organization type", required: true, type: "select", options: ["University", "College", "High school", "NGO / Non-profit", "Professional group", "Community group", "Other"] },
  { name: "organizationAddress", label: "Organization address", type: "textarea", required: true, full: true },
  { name: "departmentOrFaculty", label: "Department / Faculty (if academic)", required: false },
  { name: "website", label: "Website or social media", required: false },

  // Group Details
  { name: "groupSize", label: "Expected group size", type: "number", required: true },
  { name: "participantAges", label: "Age range of participants", required: true, type: "select", options: ["18-21", "22-25", "26-35", "36-50", "Mixed / Other", "Specify in comments"] },
  { name: "accompanyingStaff", label: "Number of accompanying staff/faculty", type: "number", required: true },
  { name: "staffBios", label: "Brief bios of accompanying staff/faculty", type: "textarea", required: true, full: true },

  // Program Preferences
  { name: "programArea", label: "Primary area of interest", required: true, type: "select", options: ["Clean energy", "WASH (water, sanitation, hygiene)", "Livelihoods & economic empowerment", "Health & wellbeing", "Environment & ecosystem restoration", "Women's & social inclusion", "Education & youth", "Research & data", "ICT & media", "Multiple areas", "Flexible"] },
  { name: "secondaryProgramArea", label: "Secondary area of interest (if multiple)", required: false },
  { name: "preferredDuration", label: "Preferred program duration", required: true, type: "select", options: ["1-2 weeks", "2-3 weeks", "3-4 weeks", "4-6 weeks", "Flexible"] },
  { name: "availableDates", label: "Preferred dates or date range", type: "textarea", required: true, full: true },
  { name: "accommodationPreference", label: "Accommodation preference", required: true, type: "select", options: ["Host families", "Shared housing", "Single rooms", "Mix", "I will arrange", "Other"] },
  { name: "englishProficiency", label: "Group English proficiency", required: true, type: "select", options: ["Native", "Fluent", "Proficient", "Mixed", "Basic"] },

  // Academic Integration
  { name: "academicCredit", label: "Is academic credit or recognition involved?", required: true, type: "select", options: ["Yes — academic credit", "Yes — other recognition", "No — personal enrichment", "Not sure"] },
  { name: "learningOutcomes", label: "Intended learning outcomes / objectives", type: "textarea", required: true, full: true },
  { name: "serviceHours", label: "Number of service hours required (if applicable)", type: "number", required: false },
  { name: "preDeparturePrep", label: "Planned pre-departure preparation topics", type: "textarea", required: false, full: true },

  // Risk & Support
  { name: "riskManagement", label: "How will your organization handle risk management?", type: "textarea", required: true, full: true },
  { name: "travelInsurance", label: "Travel insurance responsibility", required: true, type: "select", options: ["Organization covers", "Participants arrange", "Shared cost", "Other"] },
  { name: "accessibilityNeeds", label: "Accessibility requirements for any participants", type: "textarea", required: false, full: true },
  { name: "medicalRequirements", label: "Any medical requirements or special support needs", type: "textarea", required: false, full: true },

  // References & Documentation
  { name: "institutionalRefereeName", label: "Institutional referee — Name", required: true },
  { name: "institutionalRefereeTitle", label: "Institutional referee — Title", required: true },
  { name: "institutionalRefereeEmail", label: "Institutional referee — Email", type: "email", required: true },
  { name: "foscodReferee", label: "Have you worked with FOSCOD before? If so, name your contact.", required: false },

  // Motivation
  { name: "whyFoscodGroup", label: "Why do you want to bring your group to FOSCOD?", type: "textarea", required: true, full: true },
  { name: "expectedOutcomes", label: "What does your group hope to achieve, and how will the community benefit?", type: "textarea", required: true, full: true },
  { name: "additionalInfo", label: "Any additional information or questions for us?", type: "textarea", required: false, full: true },

  // Agreement
  { name: "codeOfConductAgreement", label: "Do you and your group agree to abide by FOSCOD's code of conduct and community guidelines?", required: true, type: "select", options: ["Yes, I agree on behalf of the group"] },
  { name: "photoStoryConsent", label: "Do you consent to FOSCOD using photos/videos taken during the program for promotional purposes?", required: true, type: "select", options: ["Yes", "No"] },
];

export default async function GroupServiceTripApplicationPage() {
  const heroSlides = await getHeroSlides("apply");

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* intro */}
      <section className="bg-[var(--surface-2)] py-12 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <Eyebrow>Group service trip application</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.8rem)]">Apply for a group service trip</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
            Bring your university cohort, faculty-led group, or professional team to
            collaborate on a genuine community-priority project. Complete the form
            below and our partnerships team will guide you through co-design,
            logistics, risk management, and the current program brief.
          </p>
        </div>
      </section>

      {/* form */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <ApplicationForm
              formType="group"
              fields={groupServiceTripFields}
              submitLabel="Submit group application"
              successTitle="Group service trip application received"
              successBody="Thank you. A member of the FOSCOD partnerships team will review your application and schedule a co-design conversation within 5 business days."
            />
          </div>
        </div>
      </section>
    </>
  );
}
