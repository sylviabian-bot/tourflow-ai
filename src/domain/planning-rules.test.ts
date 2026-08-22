import { describe, expect, it } from "vitest";

import {
  DELEGATION_ENGAGEMENT_ID,
  STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "../data/engagement-fixtures";
import {
  baselineConfirmedAssignmentIds,
  delegationAgendaItems,
  internalStakeholders,
  universityCapabilities,
} from "../data/planning-fixtures";
import {
  buildExecutiveBrief,
  confirmStakeholderAssignment,
  deriveStakeholderAssignments,
  validateAgendaTraceability,
} from "./planning-rules";

const delegation = engagements.find((engagement) => engagement.id === DELEGATION_ENGAGEMENT_ID)!;
const assignments = deriveStakeholderAssignments(
  delegation,
  engagementObjectives,
  universityCapabilities,
  internalStakeholders,
  baselineConfirmedAssignmentIds,
);
const brief = buildExecutiveBrief({
  engagementId: DELEGATION_ENGAGEMENT_ID,
  relationships,
  partners: partnerOrganisations,
  engagements,
  signals: relationshipSignals,
  objectives: engagementObjectives,
  assignments,
  agendaItems: delegationAgendaItems,
});

describe("deterministic stakeholder matching", () => {
  it("derives suggestions from engagement objectives and themes", () => {
    expect(assignments.some((assignment) => assignment.matchedTheme === "Student Mobility")).toBe(true);
    expect(assignments.some((assignment) => assignment.matchedTheme === "Joint Programs")).toBe(true);
    expect(assignments.every((assignment) => engagementObjectives.some((objective) => objective.id === assignment.objectiveId))).toBe(true);
  });

  it("never returns a suggestion without an explainable rationale", () => {
    expect(assignments.length).toBeGreaterThan(0);
    expect(assignments.every((assignment) => assignment.rationale.length > 20 && assignment.rationale.includes(assignment.matchedTheme))).toBe(true);
  });

  it("keeps a confirmed stakeholder linked to its objective", () => {
    const target = assignments.find((assignment) => assignment.status === "suggested")!;
    const updated = confirmStakeholderAssignment(assignments, target.id).find((assignment) => assignment.id === target.id)!;
    expect(updated.status).toBe("confirmed");
    expect(updated.objectiveId).toBe(target.objectiveId);
    expect(updated.stakeholderId).toBe(target.stakeholderId);
  });
});

describe("agenda traceability", () => {
  it("links every substantive agenda item to at least one objective", () => {
    expect(delegationAgendaItems.filter((item) => item.type !== "meal").every((item) => item.objectiveIds.length > 0)).toBe(true);
  });

  it("uses stakeholder assignments from the same engagement", () => {
    expect(validateAgendaTraceability(delegationAgendaItems, engagementObjectives, assignments)).toEqual([]);
  });
});

describe("executive brief composition", () => {
  it("uses the correct Relationship and Engagement", () => {
    expect(brief.partner.name).toBe("Eastern Horizon University");
    expect(brief.engagement.id).toBe(DELEGATION_ENGAGEMENT_ID);
    expect(brief.relationship.id).toBe(delegation.relationshipId);
  });

  it("includes relevant prior Relationship Memory", () => {
    expect(brief.relationshipMemory.some((signal) => signal.sourceEngagementId === "engagement-study-tour-2025")).toBe(true);
  });

  it("only includes source stakeholder, agenda and objective records for the engagement", () => {
    expect(brief.stakeholderAssignments.every((assignment) => assignments.some((source) => source.id === assignment.id))).toBe(true);
    expect(brief.agendaItems.every((item) => delegationAgendaItems.some((source) => source.id === item.id))).toBe(true);
    expect(brief.objectives.every((objective) => engagementObjectives.some((source) => source.id === objective.id))).toBe(true);
  });

  it("creates deterministic talking-point prompts for each objective", () => {
    expect(brief.talkingPoints).toHaveLength(brief.objectives.length);
    expect(brief.talkingPoints.every((point) => point.prompt.length > 30)).toBe(true);
  });
});

describe("engagement-type isolation", () => {
  it("does not leak delegation planning into Study Tour Delivery", () => {
    const studyTour = engagements.find((engagement) => engagement.id === STUDY_TOUR_DELIVERY_ENGAGEMENT_ID)!;
    expect(deriveStakeholderAssignments(studyTour, engagementObjectives, universityCapabilities, internalStakeholders)).toEqual([]);
    expect(delegationAgendaItems.some((item) => item.engagementId === studyTour.id)).toBe(false);
  });
});
