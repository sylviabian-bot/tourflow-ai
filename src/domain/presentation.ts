import type {
  AttentionSeverity,
  LifecycleStage,
  ReadinessState,
  RequirementStatus,
} from "./types";

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

export function formatDemoDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
