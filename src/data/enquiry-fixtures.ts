import { createEngagementScopeDraft } from "@/ai/enquiry-provenance";
import type { EngagementScopeExtraction } from "@/ai/enquiry-schema";

export const SAMPLE_ENQUIRY = `Subject: Proposed senior delegation visit to Sydney

Dear International Partnerships Team,

Eastern Horizon University is considering a two-day visit to Sydney in October with approximately eight senior representatives. Our delegation is particularly interested in artificial intelligence and business analytics. We would also like to understand your student exchange model and discuss whether there may be opportunities for future joint postgraduate programs.

Our dates remain flexible. Could you advise which university colleagues may be most appropriate to meet? We are still confirming the delegates and their roles.

Kind regards,
International Office
Eastern Horizon University`;

export const INCOMPLETE_ENQUIRY = `Harbour Lantern University would like to explore a small visit later this year focused on innovation. Dates and delegation details are still being discussed.`;

export const AMBIGUOUS_PARTNER_ENQUIRY = `Eastern Horizon Institute is considering a partner meeting in November to discuss student mobility.`;

export const VALID_SCOPE_EXTRACTION: EngagementScopeExtraction = {
  mentionedOrganisationName: {
    value: "Eastern Horizon University",
    grounding: "explicit",
    evidenceExcerpt: "Eastern Horizon University is considering a two-day visit",
    inferenceExplanation: null,
  },
  engagementType: {
    value: "delegation_visit",
    grounding: "inferred",
    evidenceExcerpt: "approximately eight senior representatives",
    inferenceExplanation: "Senior representatives travelling together indicates a delegation visit.",
  },
  dates: {
    dateText: "in October",
    normalisedStartDate: null,
    normalisedEndDate: null,
    grounding: "ambiguous",
    evidenceExcerpt: "a two-day visit to Sydney in October",
    inferenceExplanation: "The month and duration are stated, but exact dates are not.",
  },
  delegationSize: {
    value: 8,
    grounding: "explicit",
    evidenceExcerpt: "approximately eight senior representatives",
    inferenceExplanation: null,
  },
  strategicInterests: [
    { value: "Artificial Intelligence", grounding: "explicit", evidenceExcerpt: "interested in artificial intelligence", inferenceExplanation: null },
    { value: "Business Analytics", grounding: "explicit", evidenceExcerpt: "and business analytics", inferenceExplanation: null },
    { value: "Student Mobility", grounding: "inferred", evidenceExcerpt: "understand your student exchange model", inferenceExplanation: "Student exchange is normalised to the existing Student Mobility theme." },
    { value: "Joint Programs", grounding: "inferred", evidenceExcerpt: "future joint postgraduate programs", inferenceExplanation: "The proposed postgraduate collaboration maps to the Joint Programs theme." },
  ],
  objectives: [
    { title: "Explore AI and Business Analytics collaboration", grounding: "inferred", evidenceExcerpt: "interested in artificial intelligence and business analytics", inferenceExplanation: "The stated interests are expressed as a concise discussion objective." },
    { title: "Clarify student mobility opportunities", grounding: "inferred", evidenceExcerpt: "understand your student exchange model", inferenceExplanation: "The request to understand exchange is converted into a reviewable objective." },
    { title: "Test joint-program interest", grounding: "inferred", evidenceExcerpt: "opportunities for future joint postgraduate programs", inferenceExplanation: "The stated opportunity is framed as exploratory rather than agreed." },
  ],
  missingInformation: [
    { field: "dates", detail: "Exact visit dates are not confirmed." },
    { field: "delegateRoles", detail: "Delegate names and roles are still being confirmed." },
    { field: "jointProgramModel", detail: "The preferred joint-program model is not specified." },
  ],
  clarificationQuestions: [
    { question: "Which two dates in October would you prefer?", relatedFields: ["dates"] },
    { question: "Which delegates require executive-level meetings?", relatedFields: ["delegateRoles"] },
    { question: "Which joint postgraduate program models should be prioritised?", relatedFields: ["jointProgramModel"] },
  ],
};

export const VALID_SCOPE_DRAFT = createEngagementScopeDraft(VALID_SCOPE_EXTRACTION);
