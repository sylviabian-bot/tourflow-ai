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
import {
  itineraryEntries,
  milestones,
  participants,
  programs,
  requirements,
} from "../data/fixtures";
import {
  buildHomeSnapshot,
  buildRelationshipMemoryState,
  buildRelationshipSummaries,
  deriveHomeCoordinationPrompts,
  getCurrentOrUpcomingEngagements,
  getEngagementsForRelationship,
  getObjectiveSourceContext,
  getRelationshipMemory,
} from "./engagement-rules";
import { confirmRequirement, getProgramSummary } from "./rules";
import type { Engagement, Requirement } from "./types";
import { engagementStages, lifecycleStages, readinessStates } from "./types";

const studyTourSources = {
  programs,
  participants,
  requirements,
  milestones,
  itineraryEntries,
};

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
      connected.find(
        (engagement) => engagement.id === PRIOR_STUDY_TOUR_ENGAGEMENT_ID,
      )?.stage,
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

  it("resolves the primary Study Tour signal to the later Delegation objective", () => {
    const state = buildRelationshipMemoryState(
      PRIMARY_RELATIONSHIP_ID,
      relationshipSignals,
      engagementObjectives,
      engagements,
    );

    expect(state.kind).toBe("continuity");
    expect(state.continuities).toHaveLength(1);
    expect(state.continuities[0]).toMatchObject({
      signal: { id: PRIOR_COLLABORATION_SIGNAL_ID },
      sourceEngagement: { id: PRIOR_STUDY_TOUR_ENGAGEMENT_ID },
      objective: { id: "objective-broader-collaboration" },
      currentEngagement: { id: DELEGATION_ENGAGEMENT_ID },
    });
  });

  it("links a Delegation objective only to valid prior relationship context", () => {
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

describe("generic Relationship Memory states", () => {
  it("does not derive the primary Delegation narrative for a supporting relationship", () => {
    const state = buildRelationshipMemoryState(
      "relationship-sakura-coast",
      relationshipSignals,
      engagementObjectives,
      engagements,
    );

    expect(state.kind).toBe("signals_only");
    expect(state.continuities).toEqual([]);
    expect(
      state.signals.some((signal) =>
        signal.detail.includes("broader institutional collaboration"),
      ),
    ).toBe(false);
  });

  it("returns an honest empty data state for a relationship without signals", () => {
    const state = buildRelationshipMemoryState(
      "relationship-straits-meridian",
      relationshipSignals,
      engagementObjectives,
      engagements,
    );

    expect(state).toEqual({ kind: "empty", signals: [], continuities: [] });
  });

  it("keeps signals without linked objectives as context without fabricating continuity", () => {
    const state = buildRelationshipMemoryState(
      "relationship-sakura-coast",
      relationshipSignals,
      engagementObjectives,
      engagements,
    );

    expect(state.kind).toBe("signals_only");
    expect(state.signals).toHaveLength(1);
    expect(state.continuities).toHaveLength(0);
  });

  it("uses latestSignal for the actual most recent RelationshipSignal", () => {
    const summary = buildRelationshipSummaries(
      relationships,
      partnerOrganisations,
      engagements,
      relationshipSignals,
    ).find((candidate) => candidate.relationship.id === PRIMARY_RELATIONSHIP_ID)!;

    expect(summary.latestSignal?.id).toBe(PRIOR_COLLABORATION_SIGNAL_ID);
    expect(summary.latestSignal?.recordedDate).toBe("2025-09-24");
  });
});

describe("derived Home coordination", () => {
  it("derives the Delegation question count from openQuestions", () => {
    const prompt = deriveHomeCoordinationPrompts(
      engagements,
      studyTourSources,
    ).find((candidate) => candidate.sourceType === "delegation_questions");

    expect(prompt).toMatchObject({
      sourceId: DELEGATION_ENGAGEMENT_ID,
      count: 2,
    });
    expect(prompt?.context).toContain("2 open questions remain");
  });

  it("omits the Delegation coordination prompt when openQuestions is empty", () => {
    const withoutQuestions = engagements.map((engagement) =>
      engagement.id === DELEGATION_ENGAGEMENT_ID
        ? { ...engagement, openQuestions: [] }
        : engagement,
    ) as Engagement[];
    const prompts = deriveHomeCoordinationPrompts(
      withoutQuestions,
      studyTourSources,
    );

    expect(
      prompts.some(
        (candidate) => candidate.sourceType === "delegation_questions",
      ),
    ).toBe(false);
  });

  it("derives the Study Tour prompt from readiness and attention source records", () => {
    const prompt = deriveHomeCoordinationPrompts(
      engagements,
      studyTourSources,
    ).find((candidate) => candidate.sourceType === "study_tour_attention");

    expect(prompt).toMatchObject({
      sourceId: STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
      count: 8,
    });
    expect(prompt?.context).toBe(
      "6 outstanding requirements · 8 attention items.",
    );

    const clearedSources = {
      ...studyTourSources,
      requirements: requirements.map((requirement): Requirement => {
        if (requirement.kind === "document") {
          return {
            ...requirement,
            status: "approved",
            documentStatus: "verified",
          };
        }

        return { ...requirement, status: "approved" };
      }),
      milestones: milestones.map((milestone) => ({
        ...milestone,
        status: "completed" as const,
      })),
      itineraryEntries: itineraryEntries.map((entry) => ({
        ...entry,
        confirmationState: "confirmed" as const,
      })),
    };

    expect(
      deriveHomeCoordinationPrompts(engagements, clearedSources).some(
        (candidate) => candidate.sourceType === "study_tour_attention",
      ),
    ).toBe(false);
  });
});

describe("fixed-date current and upcoming semantics", () => {
  it("excludes a past non-completed engagement", () => {
    const pastPlanningEngagement: Engagement = {
      id: "engagement-past-planning",
      relationshipId: PRIMARY_RELATIONSHIP_ID,
      type: "partner_meeting",
      title: "Past planning record",
      stage: "planning",
      startDate: "2026-08-01",
      endDate: "2026-08-02",
      summary: "A deliberately stale non-completed fixture for regression testing.",
      strategicInterests: [],
      composite: true,
    };

    const current = getCurrentOrUpcomingEngagements([
      ...engagements,
      pastPlanningEngagement,
    ]);

    expect(current.some((engagement) => engagement.id === pastPlanningEngagement.id)).toBe(
      false,
    );
    expect(
      current.some((engagement) => engagement.id === DELEGATION_ENGAGEMENT_ID),
    ).toBe(true);
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
  it("derives Home summaries from connected fixture records", () => {
    const snapshot = buildHomeSnapshot(
      relationships,
      partnerOrganisations,
      engagements,
      relationshipSignals,
      engagementObjectives,
      PRIMARY_RELATIONSHIP_ID,
      studyTourSources,
    );

    expect(snapshot.priorityRelationship.engagements).toHaveLength(3);
    expect(snapshot.priorityRelationship.partner.name).toBe(
      "Eastern Horizon University",
    );
    expect(snapshot.priorityContinuity?.objective.id).toBe(
      "objective-broader-collaboration",
    );
    expect(snapshot.currentEngagements).toHaveLength(
      getCurrentOrUpcomingEngagements(engagements).length,
    );
    expect(snapshot.openCoordinationItems).toHaveLength(2);
    expect(
      snapshot.openCoordinationItems.find(
        (prompt) => prompt.sourceType === "study_tour_attention",
      )?.href,
    ).toContain(STUDY_TOUR_DELIVERY_ENGAGEMENT_ID);
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
