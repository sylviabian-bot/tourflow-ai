import type {
  Commitment,
  Engagement,
  EngagementObjective,
  EngagementOutcome,
  RelationshipSignal,
} from "./types";

const retainedOutcomeTypes = new Set<EngagementOutcome["type"]>([
  "agreement_to_explore",
  "interest_confirmed",
]);

export function completeCommitment(
  commitments: Commitment[],
  commitmentId: string,
): Commitment[] {
  return commitments.map((commitment) =>
    commitment.id === commitmentId
      ? { ...commitment, status: "completed" as const }
      : commitment,
  );
}

export function applyCommitmentCompletionState(
  commitments: Commitment[],
  completedCommitmentIds: string[],
): Commitment[] {
  const completed = new Set(completedCommitmentIds);
  return commitments.map((commitment) => ({
    ...commitment,
    status: completed.has(commitment.id) ? "completed" : "open",
  }));
}

export function getOutcomeRetentionReason(outcome: EngagementOutcome): string | null {
  if (outcome.type === "agreement_to_explore") {
    return "Retained because an agreement to explore creates context for future engagement design.";
  }
  if (outcome.type === "interest_confirmed") {
    return "Retained because confirmed strategic interest should inform future relationship planning.";
  }
  return null;
}

export function deriveRelationshipSignalsFromOutcomes(
  outcomes: EngagementOutcome[],
  engagements: Engagement[],
): RelationshipSignal[] {
  const engagementById = new Map(engagements.map((engagement) => [engagement.id, engagement]));

  return outcomes.flatMap((outcome) => {
    if (!retainedOutcomeTypes.has(outcome.type)) return [];
    const engagement = engagementById.get(outcome.engagementId);
    if (!engagement) return [];
    return [{
      id: `signal-from-${outcome.id}`,
      relationshipId: engagement.relationshipId,
      sourceEngagementId: engagement.id,
      kind: "strategic_signal" as const,
      title: outcome.title,
      detail: outcome.summary,
      recordedDate: outcome.recordedDate,
      composite: true as const,
    }];
  });
}

export function validateFollowUpTraceability(
  engagements: Engagement[],
  objectives: EngagementObjective[],
  outcomes: EngagementOutcome[],
  commitments: Commitment[],
): string[] {
  const engagementById = new Map(engagements.map((engagement) => [engagement.id, engagement]));
  const objectiveById = new Map(objectives.map((objective) => [objective.id, objective]));
  const outcomeById = new Map(outcomes.map((outcome) => [outcome.id, outcome]));
  const errors: string[] = [];

  for (const outcome of outcomes) {
    const engagement = engagementById.get(outcome.engagementId);
    if (!engagement) {
      errors.push(`${outcome.id}: missing engagement ${outcome.engagementId}`);
      continue;
    }
    const objective = objectiveById.get(outcome.objectiveId);
    if (!objective) errors.push(`${outcome.id}: missing objective ${outcome.objectiveId}`);
    else if (objective.engagementId !== outcome.engagementId) {
      errors.push(`${outcome.id}: objective belongs to another engagement`);
    }
  }

  for (const commitment of commitments) {
    const outcome = outcomeById.get(commitment.outcomeId);
    if (!outcome) {
      errors.push(`${commitment.id}: missing outcome ${commitment.outcomeId}`);
      continue;
    }
    if (commitment.engagementId !== outcome.engagementId) {
      errors.push(`${commitment.id}: engagement does not match outcome`);
    }
    const engagement = engagementById.get(commitment.engagementId);
    if (!engagement) errors.push(`${commitment.id}: missing engagement ${commitment.engagementId}`);
    else if (commitment.relationshipId !== engagement.relationshipId) {
      errors.push(`${commitment.id}: relationship does not match engagement`);
    }
  }

  return errors;
}
