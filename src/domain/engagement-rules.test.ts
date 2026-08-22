import { describe, expect, it } from "vitest";

import {
  DELEGATION_ENGAGEMENT_ID,
  PRIMARY_RELATIONSHIP_ID,
  PRIOR_COLLABORATION_SIGNAL_ID,
  PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
  STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "../data/engagement-fixtures";
import { milestones, participants, programs, requirements } from "../data/fixtures";
import {
  buildHomeSnapshot,
  getEngagementsForRelationship,
  getObjectiveSourceContext,
  getRelationshipMemory,
} from "./engagement-rules";
import { confirmRequirement, getProgramSummary } from "./rules";
import { engagementStages, lifecycleStages, readinessStates } from "./types";

describe("connected Relationship and Engagement model", () => {
  it("keeps the previous Study Tour and later Delegation in one relationship", () => {
    const connected = getEngagementsForRelationship(
      PRIMARY_RELATIONSHIP_ID,
      engagements,
    );

    expect(connected.map((engagement) => engagement.id)).toEqual(
      expect.arrayContaining([
        PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
        STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
        DELEGATION_ENGAGEMENT_ID,
      ]),
    );
    expect(
      connected.find((engagement) => engagement.id === PRIOR_STUDY_TOUR_ENGAGEMENT_ID)
        ?.stage,
    ).toBe("completed");
  });

  it("represents the earlier Study Tour signal in Relationship Memory", () => {
    const memory = getRelationshipMemory(
      PRIMARY_RELATIONSHIP_ID,
      relationshipSignals,
    );
    const signal = memory.find(
      (candidate) => candidate.id === PRIOR_COLLABORATION_SIGNAL_ID,
    );

    expect(signal).toMatchObject({
      sourceEngagementId: PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
      kind: "strategic_signal",
    });
    expect(signal?.detail).toContain("beyond short-term student programs");
  });

  it("links a Delegation objective to valid prior relationship context", () => {
    const objective = engagementObjectives.find(
      (candidate) => candidate.id === "objective-broader-collaboration",
    )!;
    const sourceContext = getObjectiveSourceContext(
      objective,
      relationshipSignals,
      engagements,
    );

    expect(objective.engagementId).toBe(DELEGATION_ENGAGEMENT_ID);
    expect(sourceContext?.signal.id).toBe(PRIOR_COLLABORATION_SIGNAL_ID);
    expect(sourceContext?.sourceEngagement.id).toBe(
      PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
    );
  });

  it("does not apply Study Tour delivery fields to a Delegation", () => {
    const delegation = engagements.find(
      (engagement) => engagement.id === DELEGATION_ENGAGEMENT_ID,
    )!;

    expect(delegation.type).toBe("delegation_visit");
    expect(delegation).not.toHaveProperty("studyTourProgramId");
    expect(delegation).not.toHaveProperty("lifecycleStage");
    expect(delegation).not.toHaveProperty("readinessState");
    expect(delegation).not.toHaveProperty("participants");
    expect(delegation).not.toHaveProperty("requirements");
  });
});
describe("separate status semantics", () => {
  it("keeps EngagementStage separate from Study Tour lifecycle and readiness", () => {
    expect(engagementStages).toContain("scoping");
    expect(engagementStages).toContain("scheduled");
    expect(lifecycleStages).not.toContain("scoping" as never);
    expect(readinessStates).not.toContain("scheduled" as never);
    expect(engagementStages).not.toContain("pre_departure" as never);
    expect(engagementStages).not.toContain("needs_attention" as never);
  });
});

describe("Home and Study Tour compatibility", () => {
  it("derives Home summaries from the connected fixture records", () => {
    const snapshot = buildHomeSnapshot(
      relationships,
      partnerOrganisations,
      engagements,
      relationshipSignals,
      PRIMARY_RELATIONSHIP_ID,
    );

    expect(snapshot.priorityRelationship.engagements).toHaveLength(3);
    expect(snapshot.priorityRelationship.partner.name).toBe(
      "Eastern Horizon University",
    );
    expect(snapshot.currentEngagements).toHaveLength(
      engagements.filter((engagement) => engagement.stage !== "completed").length,
    );
    expect(snapshot.openCoordinationItems).toHaveLength(2);
    expect(snapshot.openCoordinationItems[1].href).toContain(
      STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
    );
  });

  it("preserves Confirm requirement and reset-to-baseline behaviour", () => {
    const program = programs.find(
      (candidate) => candidate.id === "shanghai-sydney-innovation",
    )!;
    const baselineSummary = getProgramSummary(
      program,
      participants,
      requirements,
      milestones,
    );
    const confirmedRequirements = confirmRequirement(
      requirements,
      "sha-req-travel-insurance-01",
    );
    const confirmedSummary = getProgramSummary(
      program,
      participants,
      confirmedRequirements,
      milestones,
    );
    const resetSummary = getProgramSummary(
      program,
      participants,
      requirements,
      milestones,
    );

    expect(confirmedSummary.outstandingRequirementCount).toBe(
      baselineSummary.outstandingRequirementCount - 1,
    );
    expect(confirmedSummary.readinessPercentage).toBeGreaterThan(
      baselineSummary.readinessPercentage,
    );
    expect(resetSummary).toEqual(baselineSummary);
  });
});
