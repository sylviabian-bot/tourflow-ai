import { buildRelationshipMemoryState } from "./engagement-rules";
import type {
  AgendaItem,
  Engagement,
  EngagementObjective,
  ExecutiveBrief,
  InternalStakeholder,
  PartnerOrganisation,
  Relationship,
  RelationshipSignal,
  StakeholderAssignment,
  UniversityCapability,
} from "./types";

function getObjectiveThemes(objective: EngagementObjective): string[] {
  const text = `${objective.title} ${objective.description}`.toLowerCase();
  if (text.includes("mobility")) return ["Student Mobility"];
  if (text.includes("joint-program") || text.includes("joint program")) {
    return ["Joint Programs", "Business Analytics"];
  }
  if (text.includes("broader") || text.includes("institutional collaboration")) {
    return ["Institutional Collaboration", "Artificial Intelligence", "Innovation"];
  }
  return [];
}

export function deriveStakeholderAssignments(
  engagement: Engagement,
  objectives: EngagementObjective[],
  capabilities: UniversityCapability[],
  stakeholders: InternalStakeholder[],
  confirmedAssignmentIds: string[] = [],
): StakeholderAssignment[] {
  const confirmed = new Set(confirmedAssignmentIds);
  const capabilityById = new Map(capabilities.map((capability) => [capability.id, capability]));

  return objectives.flatMap((objective) => {
    if (objective.engagementId !== engagement.id) return [];
    const objectiveThemes = getObjectiveThemes(objective);
    return stakeholders.flatMap((stakeholder) => {
      const capability = capabilityById.get(stakeholder.capabilityId);
      if (!capability) return [];
      const matchedTheme = objectiveThemes.find((theme) => capability.themes.includes(theme));
      if (!matchedTheme || !engagement.strategicInterests.some((interest) =>
        interest === matchedTheme || matchedTheme === "Institutional Collaboration" || matchedTheme === "Innovation"
      )) return [];

      const id = `assignment-${objective.id}-${stakeholder.id}`;
      return [{
        id,
        engagementId: engagement.id,
        objectiveId: objective.id,
        stakeholderId: stakeholder.id,
        roleInEngagement: capability.category === "professional" ? "Operational lead" : "Subject-matter host",
        rationale: `${matchedTheme} matches ${capability.name}'s institutional focus and this engagement objective.`,
        matchedTheme,
        status: confirmed.has(id) ? "confirmed" : "suggested",
      } satisfies StakeholderAssignment];
    });
  });
}

export function confirmStakeholderAssignment(
  assignments: StakeholderAssignment[],
  assignmentId: string,
): StakeholderAssignment[] {
  return assignments.map((assignment) =>
    assignment.id === assignmentId
      ? { ...assignment, status: "confirmed" as const }
      : assignment,
  );
}

export function validateAgendaTraceability(
  agendaItems: AgendaItem[],
  objectives: EngagementObjective[],
  assignments: StakeholderAssignment[],
): string[] {
  const objectiveIds = new Set(objectives.map((objective) => objective.id));
  const assignmentsById = new Map(assignments.map((assignment) => [assignment.id, assignment]));
  const errors: string[] = [];

  for (const item of agendaItems) {
    if (item.type !== "meal" && item.objectiveIds.length === 0) {
      errors.push(`${item.id}: substantive agenda item has no objective`);
    }
    for (const objectiveId of item.objectiveIds) {
      if (!objectiveIds.has(objectiveId)) errors.push(`${item.id}: unknown objective ${objectiveId}`);
    }
    for (const assignmentId of item.stakeholderAssignmentIds) {
      const assignment = assignmentsById.get(assignmentId);
      if (!assignment || assignment.engagementId !== item.engagementId) {
        errors.push(`${item.id}: invalid stakeholder assignment ${assignmentId}`);
      }
    }
  }
  return errors;
}

function buildTalkingPoint(objective: EngagementObjective): string {
  const title = objective.title.toLowerCase();
  if (title.includes("mobility")) return "Clarify preferred mobility models, indicative scale and the information required for a feasibility review.";
  if (title.includes("joint-program")) return "Clarify the academic level, discipline and collaboration model the partner wants to prioritise.";
  return "Clarify which collaboration models the partner wants to prioritise beyond short-term programs.";
}

export function buildExecutiveBrief({
  engagementId,
  relationships,
  partners,
  engagements,
  signals,
  objectives,
  assignments,
  agendaItems,
}: {
  engagementId: string;
  relationships: Relationship[];
  partners: PartnerOrganisation[];
  engagements: Engagement[];
  signals: RelationshipSignal[];
  objectives: EngagementObjective[];
  assignments: StakeholderAssignment[];
  agendaItems: AgendaItem[];
}): ExecutiveBrief {
  const engagement = engagements.find((candidate) => candidate.id === engagementId);
  if (!engagement) throw new Error(`Missing engagement ${engagementId}`);
  const relationship = relationships.find((candidate) => candidate.id === engagement.relationshipId);
  if (!relationship) throw new Error(`Missing relationship for ${engagementId}`);
  const partner = partners.find((candidate) => candidate.id === relationship.partnerOrganisationId);
  if (!partner) throw new Error(`Missing partner for ${relationship.id}`);
  const briefObjectives = objectives.filter((objective) => objective.engagementId === engagementId);
  const memory = buildRelationshipMemoryState(relationship.id, signals, objectives, engagements);

  return {
    relationship,
    partner,
    engagement,
    relationshipMemory: memory.signals,
    objectives: briefObjectives,
    stakeholderAssignments: assignments.filter((assignment) => assignment.engagementId === engagementId),
    agendaItems: agendaItems.filter((item) => item.engagementId === engagementId),
    talkingPoints: briefObjectives.map((objective) => ({ objectiveId: objective.id, prompt: buildTalkingPoint(objective) })),
    openQuestions: engagement.type === "study_tour" ? [] : engagement.openQuestions ?? [],
  };
}
