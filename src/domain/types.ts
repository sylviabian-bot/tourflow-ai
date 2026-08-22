export const lifecycleStages = [
  "planning",
  "applications",
  "pre_departure",
  "on_tour",
  "completed",
] as const;

export type LifecycleStage = (typeof lifecycleStages)[number];

export const readinessStates = [
  "ready",
  "needs_attention",
  "blocked",
] as const;

export type ReadinessState = (typeof readinessStates)[number];

export type ParticipantType = "student" | "staff" | "chaperone";

export type RequirementStatus =
  | "not_started"
  | "submitted"
  | "under_review"
  | "approved"
  | "action_required";

export type RequirementKind =
  | "document"
  | "confirmation"
  | "task"
  | "briefing"
  | "travel_detail";

export type DocumentStatus = "not_provided" | "received" | "verified";

export interface Program {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  lifecycleStage: LifecycleStage;
  coordinator: string;
  academicLead: string;
}

export interface Participant {
  id: string;
  programId: string;
  displayName: string;
  participantType: ParticipantType;
  synthetic: true;
}

interface RequirementBase {
  id: string;
  programId: string;
  participantId: string;
  title: string;
  status: RequirementStatus;
  dueDate: string;
  updatedAt: string;
  isCritical: boolean;
}

export type Requirement =
  | (RequirementBase & {
      kind: "document";
      documentStatus: DocumentStatus;
    })
  | (RequirementBase & {
      kind: Exclude<RequirementKind, "document">;
      documentStatus?: never;
    });

export type MilestoneStatus = "not_started" | "in_progress" | "completed";

export interface Milestone {
  id: string;
  programId: string;
  title: string;
  dueDate: string;
  status: MilestoneStatus;
  isBlocking: boolean;
}

export type ItineraryEntryType =
  | "academic"
  | "cultural"
  | "briefing"
  | "transport"
  | "accommodation"
  | "free_time";

export interface ItineraryEntry {
  id: string;
  programId: string;
  date: string;
  startTime: string;
  title: string;
  location: string;
  type: ItineraryEntryType;
  details: string;
  confirmationState: "confirmed" | "pending";
}

export type AttentionSeverity = "high" | "medium" | "low";

export interface AttentionItem {
  id: string;
  programId: string;
  participantId?: string;
  severity: AttentionSeverity;
  rule:
    | "critical_requirement"
    | "overdue_requirement"
    | "requirement_follow_up"
    | "urgent_milestone"
    | "pending_logistics";
  title: string;
  reason: string;
  recommendedAction: string;
  dueDate: string;
  href: string;
  sourceType: "requirement" | "milestone" | "itinerary_entry";
  sourceId: string;
}

export interface ParticipantReadinessSummary {
  ready: number;
  needsAttention: number;
  blocked: number;
  total: number;
}

export interface ProgramSummary {
  program: Program;
  participantCount: number;
  readinessState: ReadinessState;
  participantReadiness: ParticipantReadinessSummary;
  outstandingRequirementCount: number;
  readinessPercentage: number;
  daysUntilDeparture: number;
}

export interface DashboardSnapshot {
  programSummaries: ProgramSummary[];
  participantReadiness: ParticipantReadinessSummary;
  outstandingRequirementCount: number;
  upcomingMilestones: Milestone[];
  attentionItems: AttentionItem[];
  primaryProgram: ProgramSummary | null;
}

export const engagementStages = [
  "enquiry",
  "scoping",
  "planning",
  "scheduled",
  "in_progress",
  "follow_up",
  "completed",
] as const;

export type EngagementStage = (typeof engagementStages)[number];

export type EngagementType =
  | "delegation_visit"
  | "study_tour"
  | "partner_meeting"
  | "short_program";

export interface PartnerOrganisation {
  id: string;
  name: string;
  location: string;
  organisationType: "higher_education";
  composite: true;
}

export interface Relationship {
  id: string;
  partnerOrganisationId: string;
  owner: string;
  summary: string;
  strategicThemes: string[];
}

interface EngagementBase {
  id: string;
  relationshipId: string;
  title: string;
  stage: EngagementStage;
  startDate: string;
  endDate: string;
  summary: string;
  strategicInterests: string[];
  composite: true;
}

export interface StudyTourEngagement extends EngagementBase {
  type: "study_tour";
  studyTourProgramId: string;
}

export interface GeneralEngagement extends EngagementBase {
  type: Exclude<EngagementType, "study_tour">;
  delegationSize?: number;
  sourceEnquiry?: string;
  openQuestions?: string[];
}

export type Engagement = StudyTourEngagement | GeneralEngagement;

export interface EngagementObjective {
  id: string;
  engagementId: string;
  title: string;
  description: string;
  sourceRelationshipSignalId?: string;
}

export type RelationshipSignalKind = "outcome" | "strategic_signal";

export interface RelationshipSignal {
  id: string;
  relationshipId: string;
  sourceEngagementId: string;
  kind: RelationshipSignalKind;
  title: string;
  detail: string;
  recordedDate: string;
  composite: true;
}

export interface RelationshipSummary {
  relationship: Relationship;
  partner: PartnerOrganisation;
  engagements: Engagement[];
  latestEngagement: Engagement | null;
  nextEngagement: Engagement | null;
  openSignal: RelationshipSignal | null;
}

export interface HomeSnapshot {
  priorityRelationship: RelationshipSummary;
  currentEngagements: Engagement[];
  latestRelationshipSignals: RelationshipSignal[];
  openCoordinationItems: Array<{
    id: string;
    title: string;
    context: string;
    href: string;
  }>;
}
