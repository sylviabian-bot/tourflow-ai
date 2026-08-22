import type {
  AttentionSeverity,
  EngagementStage,
  EngagementType,
  LifecycleStage,
  ReadinessState,
  RequirementStatus,
} from "./types";

const engagementStageLabels: Record<EngagementStage, string> = {
  enquiry: "Enquiry",
  scoping: "Scoping",
  planning: "Planning",
  scheduled: "Scheduled",
  in_progress: "In progress",
  follow_up: "Follow-up",
  completed: "Completed",
};

const engagementTypeLabels: Record<EngagementType, string> = {
  delegation_visit: "Senior Delegation Visit",
  study_tour: "Study Tour",
  partner_meeting: "Partner Meeting",
  short_program: "Short Program",
};

const lifecycleLabels: Record<LifecycleStage, string> = {
  planning: "Planning",
  applications: "Applications",
  pre_departure: "Pre-departure",
  on_tour: "On tour",
  completed: "Completed",
};

const readinessLabels: Record<ReadinessState, string> = {
  ready: "Ready",
  needs_attention: "Needs attention",
  blocked: "Blocked",
};

const requirementStatusLabels: Record<RequirementStatus, string> = {
  not_started: "Not started",
  submitted: "Submitted",
  under_review: "Under review",
  approved: "Approved",
  action_required: "Action required",
};

const attentionSeverityLabels: Record<AttentionSeverity, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function formatLifecycleStage(stage: LifecycleStage): string {
  return lifecycleLabels[stage];
}

export function formatReadinessState(state: ReadinessState): string {
  return readinessLabels[state];
}

export function formatRequirementStatus(status: RequirementStatus): string {
  return requirementStatusLabels[status];
}

export function formatAttentionSeverity(severity: AttentionSeverity): string {
  return attentionSeverityLabels[severity];
}

export function formatEngagementStage(stage: EngagementStage): string {
  return engagementStageLabels[stage];
}

export function formatEngagementType(type: EngagementType): string {
  return engagementTypeLabels[type];
}

export function formatDemoDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
