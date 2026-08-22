import { describe, expect, it } from "vitest";

import {
  DELEGATION_ENGAGEMENT_ID,
  STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
  engagementObjectives,
  engagements,
  relationshipSignals,
} from "../data/engagement-fixtures";
import {
  baselineCompletedCommitmentIds,
  commitments,
  engagementOutcomes,
} from "../data/follow-up-fixtures";
import { buildRelationshipMemoryState } from "./engagement-rules";
import { DEMO_TODAY } from "./demo-clock";
import { POST_ENGAGEMENT_SCENARIO_DATE } from "./follow-up-scenario";
import {
  applyCommitmentCompletionState,
  completeCommitment,
  deriveRelationshipSignalsFromOutcomes,
  validateFollowUpTraceability,
} from "./follow-up-rules";

describe("follow-up traceability", () => {
  it("keeps every outcome linked to an objective in the same engagement", () => {
    expect(validateFollowUpTraceability(engagements, engagementObjectives, engagementOutcomes, commitments)).toEqual([]);
  });

  it("rejects an outcome objective from another engagement", () => {
    const invalid = { ...engagementOutcomes[0], objectiveId: "foreign-objective" };
    const foreignObjective = {
      ...engagementObjectives[0],
      id: "foreign-objective",
      engagementId: STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
    };
    expect(validateFollowUpTraceability(engagements, [...engagementObjectives, foreignObjective], [invalid], []))
      .toContain(`${invalid.id}: objective belongs to another engagement`);
  });

  it("requires every commitment to reference an existing outcome", () => {
    const invalid = { ...commitments[0], outcomeId: "missing-outcome" };
    expect(validateFollowUpTraceability(engagements, engagementObjectives, engagementOutcomes, [invalid]))
      .toContain(`${invalid.id}: missing outcome missing-outcome`);
  });

  it("requires commitment engagement and relationship to match its source", () => {
    const wrongEngagement = { ...commitments[0], engagementId: STUDY_TOUR_DELIVERY_ENGAGEMENT_ID };
    const wrongRelationship = { ...commitments[0], id: "wrong-relationship", relationshipId: "relationship-sakura-coast" };
    const errors = validateFollowUpTraceability(engagements, engagementObjectives, engagementOutcomes, [wrongEngagement, wrongRelationship]);
    expect(errors).toContain(`${wrongEngagement.id}: engagement does not match outcome`);
    expect(errors).toContain(`${wrongRelationship.id}: relationship does not match engagement`);
  });

  it("marks only the intended commitment complete and preserves traceability", () => {
    const target = commitments.find((commitment) => commitment.status === "open")!;
    const updated = completeCommitment(commitments, target.id);
    expect(updated.find((commitment) => commitment.id === target.id)?.status).toBe("completed");
    expect(updated.filter((commitment) => commitment.id !== target.id)).toEqual(
      commitments.filter((commitment) => commitment.id !== target.id),
    );
    expect(updated.find((commitment) => commitment.id === target.id)?.outcomeId).toBe(target.outcomeId);
  });

  it("restores the baseline follow-up state", () => {
    const allCompleted = applyCommitmentCompletionState(commitments, commitments.map((commitment) => commitment.id));
    expect(allCompleted.every((commitment) => commitment.status === "completed")).toBe(true);
    expect(applyCommitmentCompletionState(commitments, baselineCompletedCommitmentIds)).toEqual(commitments);
  });
});

describe("relationship memory write-back", () => {
  const generatedSignals = deriveRelationshipSignalsFromOutcomes(engagementOutcomes, engagements, engagementObjectives);

  it("keeps the global and post-engagement scenario clocks explicit", () => {
    const delegation = engagements.find((engagement) => engagement.id === DELEGATION_ENGAGEMENT_ID)!;
    expect(DEMO_TODAY).toBe("2026-08-22");
    expect(delegation).toMatchObject({ stage: "planning", startDate: "2026-10-19", endDate: "2026-10-20" });
    expect(POST_ENGAGEMENT_SCENARIO_DATE > delegation.endDate).toBe(true);
    expect(engagementOutcomes.every((outcome) => outcome.recordedDate <= POST_ENGAGEMENT_SCENARIO_DATE)).toBe(true);
    expect(commitments.length).toBeGreaterThan(0);
  });

  it("retains only eligible outcome types", () => {
    expect(generatedSignals).toHaveLength(2);
    expect(generatedSignals.some((signal) => signal.id.includes("faculty-workshop"))).toBe(true);
    expect(generatedSignals.some((signal) => signal.id.includes("mobility-capacity"))).toBe(false);
  });

  it("retains the correct source engagement", () => {
    expect(generatedSignals.every((signal) => signal.sourceEngagementId === DELEGATION_ENGAGEMENT_ID)).toBe(true);
  });

  it("does not retain an eligible outcome with a missing objective", () => {
    const invalid = { ...engagementOutcomes[0], objectiveId: "missing-objective" };
    expect(deriveRelationshipSignalsFromOutcomes([invalid], engagements, engagementObjectives)).toEqual([]);
  });

  it("does not retain an eligible outcome whose objective belongs to another engagement", () => {
    const foreignObjective = { ...engagementObjectives[0], id: "foreign-objective", engagementId: STUDY_TOUR_DELIVERY_ENGAGEMENT_ID };
    const invalid = { ...engagementOutcomes[0], objectiveId: foreignObjective.id };
    expect(deriveRelationshipSignalsFromOutcomes([invalid], engagements, [...engagementObjectives, foreignObjective])).toEqual([]);
  });

  it("can combine historical Study Tour memory with later Delegation context in the future scenario", () => {
    const memory = buildRelationshipMemoryState(
      "relationship-eastern-horizon",
      [...relationshipSignals, ...generatedSignals],
      engagementObjectives,
      engagements,
    );
    expect(memory.signals.some((signal) => signal.sourceEngagementId === "engagement-study-tour-2025")).toBe(true);
    expect(memory.signals.some((signal) => signal.sourceEngagementId === DELEGATION_ENGAGEMENT_ID)).toBe(true);
  });

  it("keeps future Delegation signals out of the global relationship baseline", () => {
    const memory = buildRelationshipMemoryState(
      "relationship-eastern-horizon",
      relationshipSignals,
      engagementObjectives,
      engagements,
    );
    expect(memory.signals.every((signal) => signal.recordedDate <= DEMO_TODAY)).toBe(true);
    expect(memory.signals.some((signal) => signal.sourceEngagementId === DELEGATION_ENGAGEMENT_ID)).toBe(false);
  });

  it("does not add follow-up records to Study Tour Delivery", () => {
    expect(engagementOutcomes.some((outcome) => outcome.engagementId === STUDY_TOUR_DELIVERY_ENGAGEMENT_ID)).toBe(false);
    expect(commitments.some((commitment) => commitment.engagementId === STUDY_TOUR_DELIVERY_ENGAGEMENT_ID)).toBe(false);
  });
});
