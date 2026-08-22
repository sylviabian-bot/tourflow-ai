import { describe, expect, it } from "vitest";

import {
  itineraryEntries,
  milestones,
  participants,
  programs,
  requirements,
} from "../data/fixtures";
import { daysFromDemoToday, getDateUrgency, isOverdue } from "./demo-clock";
import {
  buildDashboardSnapshot,
  confirmRequirement,
  countOutstandingRequirements,
  deriveAttentionItems,
  deriveParticipantReadiness,
  getProgramSummary,
} from "./rules";

const shanghaiProgram = programs.find(
  (program) => program.id === "shanghai-sydney-innovation",
)!;
const osakaProgram = programs.find(
  (program) => program.id === "osaka-global-business",
)!;

describe("fixed demo clock", () => {
  it("calculates days until departure from DEMO_TODAY", () => {
    expect(daysFromDemoToday("2026-09-12")).toBe(21);
    expect(daysFromDemoToday("2026-08-22")).toBe(0);
    expect(isOverdue("2026-08-21")).toBe(true);
    expect(getDateUrgency("2026-08-29")).toBe("urgent");
  });
});

describe("lifecycle and readiness separation", () => {
  it("does not change readiness when only lifecycle changes", () => {
    const baseline = getProgramSummary(
      osakaProgram,
      participants,
      requirements,
      milestones,
    );
    const planningVersion = getProgramSummary(
      { ...osakaProgram, lifecycleStage: "planning" },
      participants,
      requirements,
      milestones,
    );

    expect(baseline.program.lifecycleStage).toBe("pre_departure");
    expect(planningVersion.program.lifecycleStage).toBe("planning");
    expect(planningVersion.readinessState).toBe(baseline.readinessState);
    expect(baseline.readinessState).toBe("ready");
  });
});

describe("participant readiness", () => {
  it("derives blocked, needs-attention, and ready states from requirements", () => {
    expect(deriveParticipantReadiness("sha-participant-01", requirements)).toBe(
      "blocked",
    );
    expect(deriveParticipantReadiness("sha-participant-03", requirements)).toBe(
      "needs_attention",
    );
    expect(deriveParticipantReadiness("sha-participant-07", requirements)).toBe(
      "ready",
    );
  });
});

describe("outstanding requirements and demo transition", () => {
  it("uses one state transition to update readiness and aggregates", () => {
    const beforeCount = countOutstandingRequirements(
      requirements,
      shanghaiProgram.id,
    );
    const beforeSummary = getProgramSummary(
      shanghaiProgram,
      participants,
      requirements,
      milestones,
    );
    const updatedRequirements = confirmRequirement(
      requirements,
      "sha-req-travel-insurance-01",
    );
    const afterCount = countOutstandingRequirements(
      updatedRequirements,
      shanghaiProgram.id,
    );
    const afterSummary = getProgramSummary(
      shanghaiProgram,
      participants,
      updatedRequirements,
      milestones,
    );

    expect(afterCount).toBe(beforeCount - 1);
    expect(
      deriveParticipantReadiness("sha-participant-01", updatedRequirements),
    ).toBe("ready");
    expect(beforeSummary.participantReadiness.blocked).toBe(2);
    expect(afterSummary.participantReadiness.blocked).toBe(1);
    expect(afterSummary.participantReadiness.ready).toBe(
      beforeSummary.participantReadiness.ready + 1,
    );
    expect(afterSummary.readinessPercentage).toBeGreaterThan(
      beforeSummary.readinessPercentage,
    );
  });
});

describe("deterministic attention rules", () => {
  it("creates and resolves the travel-insurance attention item", () => {
    const before = deriveAttentionItems(
      programs,
      participants,
      requirements,
      milestones,
      itineraryEntries,
    );
    const updatedRequirements = confirmRequirement(
      requirements,
      "sha-req-travel-insurance-01",
    );
    const after = deriveAttentionItems(
      programs,
      participants,
      updatedRequirements,
      milestones,
      itineraryEntries,
    );

    const attentionId = "attention-sha-req-travel-insurance-01";
    expect(before.find((item) => item.id === attentionId)).toMatchObject({
      severity: "high",
      rule: "critical_requirement",
      recommendedAction: "Confirm requirement",
    });
    expect(after.some((item) => item.id === attentionId)).toBe(false);
    expect(
      before.some(
        (item) =>
          item.rule === "pending_logistics" &&
          item.sourceId === "sha-itinerary-coach",
      ),
    ).toBe(true);
  });
});

describe("dashboard aggregate consistency", () => {
  it("derives all program and participant totals from the fixtures", () => {
    const snapshot = buildDashboardSnapshot(
      programs,
      participants,
      requirements,
      milestones,
      itineraryEntries,
    );

    expect(participants).toHaveLength(72);
    expect(new Set(participants.map((participant) => participant.id)).size).toBe(72);
    expect(
      new Set(participants.map((participant) => participant.displayName)).size,
    ).toBe(72);
    expect(participants.every((participant) => participant.synthetic)).toBe(true);
    expect(snapshot.participantReadiness.total).toBe(72);
    expect(
      snapshot.programSummaries.map((summary) => summary.participantCount),
    ).toEqual([24, 18, 30]);
    expect(
      snapshot.programSummaries.map((summary) => summary.readinessState),
    ).toEqual(["needs_attention", "ready", "needs_attention"]);
    expect(snapshot.primaryProgram?.program.id).toBe(
      "shanghai-sydney-innovation",
    );
    expect(snapshot.outstandingRequirementCount).toBe(
      countOutstandingRequirements(requirements),
    );
  });
});
