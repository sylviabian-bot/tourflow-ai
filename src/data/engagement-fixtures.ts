import type {
  Engagement,
  EngagementObjective,
  PartnerOrganisation,
  Relationship,
  RelationshipSignal,
} from "@/domain/types";

export const PRIMARY_RELATIONSHIP_ID = "relationship-eastern-horizon";
export const PRIOR_STUDY_TOUR_ENGAGEMENT_ID = "engagement-study-tour-2025";
export const STUDY_TOUR_DELIVERY_ENGAGEMENT_ID = "engagement-study-tour-2026";
export const DELEGATION_ENGAGEMENT_ID = "engagement-senior-delegation-2026";
export const PRIOR_COLLABORATION_SIGNAL_ID = "signal-broader-collaboration";

export const partnerOrganisations: PartnerOrganisation[] = [
  {
    id: "partner-eastern-horizon",
    name: "Eastern Horizon University",
    location: "Shanghai, China",
    organisationType: "higher_education",
    composite: true,
  },
  {
    id: "partner-sakura-coast",
    name: "Sakura Coast Institute",
    location: "Osaka, Japan",
    organisationType: "higher_education",
    composite: true,
  },
  {
    id: "partner-straits-meridian",
    name: "Straits Meridian University",
    location: "Singapore",
    organisationType: "higher_education",
    composite: true,
  },
];
export const relationships: Relationship[] = [
  {
    id: PRIMARY_RELATIONSHIP_ID,
    partnerOrganisationId: "partner-eastern-horizon",
    owner: "Elena Park",
    summary:
      "An active education partnership moving from successful short-program delivery toward broader faculty and mobility collaboration.",
    strategicThemes: [
      "Artificial Intelligence",
      "Business Analytics",
      "Student Mobility",
      "Joint Programs",
    ],
  },
  {
    id: "relationship-sakura-coast",
    partnerOrganisationId: "partner-sakura-coast",
    owner: "Noah Bennett",
    summary:
      "A developing relationship centred on global business education and reciprocal short-program activity.",
    strategicThemes: ["Global Business", "Short Programs"],
  },
  {
    id: "relationship-straits-meridian",
    partnerOrganisationId: "partner-straits-meridian",
    owner: "Aisha Morgan",
    summary:
      "An early-stage relationship exploring leadership education and regional student engagement.",
    strategicThemes: ["Leadership", "Student Engagement"],
  },
];

export const engagements: Engagement[] = [
  {
    id: PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    type: "study_tour",
    title: "Sydney Innovation Study Tour · 2025",
    stage: "completed",
    startDate: "2025-09-13",
    endDate: "2025-09-22",
    summary:
      "A completed composite Study Tour connecting students and academic staff with Business Analytics and innovation programming.",
    strategicInterests: ["Business Analytics", "Innovation", "Student Mobility"],
    studyTourProgramId: "historical-study-tour-2025",
    composite: true,
  },
  {
    id: STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    type: "study_tour",
    title: "Sydney Innovation Study Tour · 2026 delivery",
    stage: "scheduled",
    startDate: "2026-09-12",
    endDate: "2026-09-21",
    summary:
      "The accepted 24-participant Study Tour Delivery workflow, retained through a compatibility link to the Sprint 01 program model.",
    strategicInterests: ["Business Analytics", "Innovation", "Student Mobility"],
    studyTourProgramId: "shanghai-sydney-innovation",
    composite: true,
  },
  {
    id: DELEGATION_ENGAGEMENT_ID,
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    type: "delegation_visit",
    title: "Senior Delegation Visit",
    stage: "planning",
    startDate: "2026-10-19",
    endDate: "2026-10-20",
    summary:
      "A proposed visit by eight synthetic senior representatives to explore the next phase of institutional collaboration.",
    strategicInterests: [
      "Artificial Intelligence",
      "Business Analytics",
      "Student Mobility",
      "Joint Programs",
    ],
    delegationSize: 8,
    sourceEnquiry:
      "The partner is considering an October visit by eight senior representatives and would like to explore AI, Business Analytics, student mobility and potential joint programs.",
    openQuestions: [
      "Which joint-program models should be prioritised for discussion?",
      "Which delegates require executive-level meetings?",
    ],
    composite: true,
  },
  {
    id: "engagement-osaka-partner-meeting",
    relationshipId: "relationship-sakura-coast",
    type: "partner_meeting",
    title: "Annual Partnership Planning Meeting",
    stage: "scheduled",
    startDate: "2026-09-08",
    endDate: "2026-09-08",
    summary: "A scheduled planning discussion for the next academic year.",
    strategicInterests: ["Global Business", "Short Programs"],
    composite: true,
  },
  {
    id: "engagement-singapore-short-program",
    relationshipId: "relationship-straits-meridian",
    type: "short_program",
    title: "Future Leaders Program Scoping",
    stage: "scoping",
    startDate: "2027-01-18",
    endDate: "2027-01-27",
    summary: "An early scoping record for a synthetic leadership short program.",
    strategicInterests: ["Leadership", "Student Engagement"],
    composite: true,
  },
];

export const relationshipSignals: RelationshipSignal[] = [
  {
    id: "signal-study-tour-outcome",
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    sourceEngagementId: PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
    kind: "outcome",
    title: "Study Tour outcome",
    detail:
      "Strong student and academic engagement with Business Analytics and innovation programming identified an opportunity for broader institutional collaboration.",
    recordedDate: "2025-09-23",
    composite: true,
  },
  {
    id: PRIOR_COLLABORATION_SIGNAL_ID,
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    sourceEngagementId: PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
    kind: "strategic_signal",
    title: "Broader collaboration opportunity",
    detail:
      "Explore opportunities to extend collaboration beyond short-term student programs.",
    recordedDate: "2025-09-24",
    composite: true,
  },
  {
    id: "signal-sakura-next-cycle",
    relationshipId: "relationship-sakura-coast",
    sourceEngagementId: "engagement-osaka-partner-meeting",
    kind: "strategic_signal",
    title: "Confirm next-cycle priorities",
    detail: "Agree the academic focus and delivery window for the next short program.",
    recordedDate: "2026-08-18",
    composite: true,
  },
];

export const engagementObjectives: EngagementObjective[] = [
  {
    id: "objective-broader-collaboration",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    title: "Explore broader institutional collaboration",
    description:
      "Identify practical areas for collaboration beyond short-term student programs.",
    themes: ["Institutional Collaboration", "Artificial Intelligence", "Innovation"],
    sourceRelationshipSignalId: PRIOR_COLLABORATION_SIGNAL_ID,
  },
  {
    id: "objective-mobility-pathways",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    title: "Clarify student mobility opportunities",
    description:
      "Understand the partner's preferred mobility models and the information needed for a future feasibility review.",
    themes: ["Student Mobility"],
  },
  {
    id: "objective-joint-program-interest",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    title: "Test joint-program interest",
    description:
      "Clarify the intended academic level, discipline and desired form of joint-program collaboration.",
    themes: ["Joint Programs", "Business Analytics"],
  },
];
