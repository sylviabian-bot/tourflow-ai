import { daysFromDemoToday, getDateUrgency, isOverdue } from "./demo-clock";
import type {
  AttentionItem,
  DashboardSnapshot,
  ItineraryEntry,
  Milestone,
  Participant,
  ParticipantReadinessSummary,
  Program,
  ProgramSummary,
  ReadinessState,
  Requirement,
} from "./types";

const severityRank = { high: 0, medium: 1, low: 2 } as const;

export function deriveParticipantReadiness(
  participantId: string,
  requirements: Requirement[],
): ReadinessState {
  const participantRequirements = requirements.filter(
    (requirement) => requirement.participantId === participantId,
  );

  if (
    participantRequirements.some(
      (requirement) =>
        requirement.isCritical &&
        requirement.status === "action_required" &&
        isOverdue(requirement.dueDate),
    )
  ) {
    return "blocked";
  }

  if (
    participantRequirements.length === 0 ||
    participantRequirements.some((requirement) => requirement.status !== "approved")
  ) {
    return "needs_attention";
  }

  return "ready";
}

export function countOutstandingRequirements(
  requirements: Requirement[],
  programId?: string,
): number {
  return requirements.filter(
    (requirement) =>
      requirement.status !== "approved" &&
      (programId === undefined || requirement.programId === programId),
  ).length;
}

export function calculateReadinessPercentage(
  requirements: Requirement[],
  programId: string,
): number {
  const programRequirements = requirements.filter(
    (requirement) => requirement.programId === programId,
  );

  if (programRequirements.length === 0) return 0;

  const approved = programRequirements.filter(
    (requirement) => requirement.status === "approved",
  ).length;

  return Math.round((approved / programRequirements.length) * 100);
}

export function summarizeParticipantReadiness(
  participants: Participant[],
  requirements: Requirement[],
): ParticipantReadinessSummary {
  return participants.reduce<ParticipantReadinessSummary>(
    (summary, participant) => {
      const state = deriveParticipantReadiness(participant.id, requirements);
      summary.total += 1;

      if (state === "ready") summary.ready += 1;
      if (state === "needs_attention") summary.needsAttention += 1;
      if (state === "blocked") summary.blocked += 1;

      return summary;
    },
    { ready: 0, needsAttention: 0, blocked: 0, total: 0 },
  );
}

export function deriveProgramReadiness(
  program: Program,
  participants: Participant[],
  requirements: Requirement[],
  milestones: Milestone[],
): ReadinessState {
  const programParticipants = participants.filter(
    (participant) => participant.programId === program.id,
  );
  const summary = summarizeParticipantReadiness(programParticipants, requirements);
  const hasOverdueBlockingMilestone = milestones.some(
    (milestone) =>
      milestone.programId === program.id &&
      milestone.isBlocking &&
      milestone.status !== "completed" &&
      isOverdue(milestone.dueDate),
  );

  if (hasOverdueBlockingMilestone) return "blocked";
  if (summary.total > 0 && summary.ready === summary.total) return "ready";

  const blockedThreshold = Math.max(3, Math.ceil(summary.total * 0.25));
  if (summary.blocked >= blockedThreshold) return "blocked";

  return "needs_attention";
}

export function confirmRequirement(
  requirements: Requirement[],
  requirementId: string,
): Requirement[] {
  return requirements.map((requirement) => {
    if (requirement.id !== requirementId) return requirement;

    if (requirement.kind === "document") {
      return {
        ...requirement,
        status: "approved",
        documentStatus: "verified",
        updatedAt: "2026-08-22",
      };
    }

    return {
      ...requirement,
      status: "approved",
      updatedAt: "2026-08-22",
    };
  });
}

export function deriveAttentionItems(
  programs: Program[],
  participants: Participant[],
  requirements: Requirement[],
  milestones: Milestone[],
  itineraryEntries: ItineraryEntry[],
): AttentionItem[] {
  const programById = new Map(programs.map((program) => [program.id, program]));
  const participantById = new Map(
    participants.map((participant) => [participant.id, participant]),
  );

  const requirementItems: AttentionItem[] = requirements
    .filter((requirement) => requirement.status !== "approved")
    .map((requirement) => {
      const participant = participantById.get(requirement.participantId);
      const overdue = isOverdue(requirement.dueDate);
      const critical = requirement.isCritical && requirement.status === "action_required";
      const severity = critical || overdue ? "high" : "medium";

      return {
        id: `attention-${requirement.id}`,
        programId: requirement.programId,
        participantId: requirement.participantId,
        severity,
        rule: critical
          ? "critical_requirement"
          : overdue
            ? "overdue_requirement"
            : "requirement_follow_up",
        title: requirement.title,
        reason: `${participant?.displayName ?? "Participant"} · ${
          overdue ? "overdue" : "follow-up required"
        }`,
        recommendedAction:
          requirement.id === "sha-req-travel-insurance-01"
            ? "Confirm requirement"
            : "Review requirement",
        dueDate: requirement.dueDate,
        href: `/programs/${requirement.programId}?participant=${requirement.participantId}`,
        sourceType: "requirement",
        sourceId: requirement.id,
      } satisfies AttentionItem;
    });

  const milestoneItems: AttentionItem[] = milestones
    .filter(
      (milestone) =>
        milestone.status !== "completed" &&
        ["overdue", "urgent"].includes(getDateUrgency(milestone.dueDate)),
    )
    .map((milestone) => ({
      id: `attention-${milestone.id}`,
      programId: milestone.programId,
      severity: isOverdue(milestone.dueDate) ? "high" : "medium",
      rule: "urgent_milestone",
      title: milestone.title,
      reason: `${programById.get(milestone.programId)?.name ?? "Program"} · ${
        isOverdue(milestone.dueDate) ? "milestone overdue" : "due within 7 days"
      }`,
      recommendedAction: "Review milestone",
      dueDate: milestone.dueDate,
      href: `/programs/${milestone.programId}`,
      sourceType: "milestone",
      sourceId: milestone.id,
    }));

  const logisticsItems: AttentionItem[] = itineraryEntries
    .filter((entry) => {
      const program = programById.get(entry.programId);
      return (
        entry.confirmationState === "pending" &&
        entry.type === "transport" &&
        program !== undefined &&
        daysFromDemoToday(program.startDate) <= 30
      );
    })
    .map((entry) => ({
      id: `attention-${entry.id}`,
      programId: entry.programId,
      severity: "medium",
      rule: "pending_logistics",
      title: entry.title,
      reason: `${programById.get(entry.programId)?.name ?? "Program"} · logistics pending`,
      recommendedAction: "Confirm logistics",
      dueDate: entry.date,
      href: `/programs/${entry.programId}`,
      sourceType: "itinerary_entry",
      sourceId: entry.id,
    }));

  return [...requirementItems, ...milestoneItems, ...logisticsItems].sort(
    (a, b) =>
      severityRank[a.severity] - severityRank[b.severity] ||
      daysFromDemoToday(a.dueDate) - daysFromDemoToday(b.dueDate) ||
      a.title.localeCompare(b.title),
  );
}

export function getProgramSummary(
  program: Program,
  participants: Participant[],
  requirements: Requirement[],
  milestones: Milestone[],
): ProgramSummary {
  const programParticipants = participants.filter(
    (participant) => participant.programId === program.id,
  );

  return {
    program,
    participantCount: programParticipants.length,
    readinessState: deriveProgramReadiness(
      program,
      programParticipants,
      requirements,
      milestones,
    ),
    participantReadiness: summarizeParticipantReadiness(
      programParticipants,
      requirements,
    ),
    outstandingRequirementCount: countOutstandingRequirements(
      requirements,
      program.id,
    ),
    readinessPercentage: calculateReadinessPercentage(requirements, program.id),
    daysUntilDeparture: daysFromDemoToday(program.startDate),
  };
}

export function buildDashboardSnapshot(
  programs: Program[],
  participants: Participant[],
  requirements: Requirement[],
  milestones: Milestone[],
  itineraryEntries: ItineraryEntry[],
): DashboardSnapshot {
  const activePrograms = programs.filter(
    (program) => program.lifecycleStage !== "completed",
  );
  const programSummaries = activePrograms
    .map((program) =>
      getProgramSummary(program, participants, requirements, milestones),
    )
    .sort((a, b) => a.daysUntilDeparture - b.daysUntilDeparture);
  const attentionItems = deriveAttentionItems(
    activePrograms,
    participants,
    requirements,
    milestones,
    itineraryEntries,
  );
  const attentionProgramIds = new Set(
    attentionItems.map((attentionItem) => attentionItem.programId),
  );
  const primaryProgram =
    programSummaries.find((summary) =>
      attentionProgramIds.has(summary.program.id),
    ) ??
    programSummaries.find(
      (summary) => summary.readinessState !== "ready",
    ) ??
    programSummaries[0] ??
    null;

  return {
    programSummaries,
    participantReadiness: summarizeParticipantReadiness(
      participants.filter((participant) =>
        activePrograms.some((program) => program.id === participant.programId),
      ),
      requirements,
    ),
    outstandingRequirementCount: countOutstandingRequirements(requirements),
    upcomingMilestones: milestones
      .filter(
        (milestone) =>
          milestone.status !== "completed" &&
          activePrograms.some((program) => program.id === milestone.programId),
      )
      .sort(
        (a, b) =>
          daysFromDemoToday(a.dueDate) - daysFromDemoToday(b.dueDate),
      )
      .slice(0, 5),
    attentionItems,
    primaryProgram,
  };
}
