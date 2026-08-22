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
