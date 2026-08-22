import { daysFromDemoToday } from "./demo-clock";
import { deriveAttentionItems, getProgramSummary } from "./rules";
import type {
  CoordinationPrompt,
  Engagement,
  EngagementObjective,
  HomeSnapshot,
  ItineraryEntry,
  Milestone,
  Participant,
  PartnerOrganisation,
  Program,
  Relationship,
  RelationshipContinuity,
  RelationshipMemoryState,
  RelationshipSignal,
  RelationshipSummary,
  Requirement,
} from "./types";

export interface StudyTourCoordinationSources {
  programs: Program[];
  participants: Participant[];
  requirements: Requirement[];
  milestones: Milestone[];
  itineraryEntries: ItineraryEntry[];
}

function compareEngagementDates(a: Engagement, b: Engagement): number {
  return a.startDate.localeCompare(b.startDate);
}

export function getEngagementsForRelationship(
  relationshipId: string,
  engagements: Engagement[],
): Engagement[] {
  return engagements
    .filter((engagement) => engagement.relationshipId === relationshipId)
    .toSorted(compareEngagementDates);
}

export function getCurrentOrUpcomingEngagements(
  engagements: Engagement[],
): Engagement[] {
  return engagements
    .filter(
      (engagement) =>
        engagement.stage !== "completed" &&
        daysFromDemoToday(engagement.endDate) >= 0,
    )
    .toSorted(compareEngagementDates);
}

export function getRelationshipMemory(
  relationshipId: string,
  signals: RelationshipSignal[],
): RelationshipSignal[] {
  return signals
    .filter((signal) => signal.relationshipId === relationshipId)
    .toSorted(
      (a, b) =>
        b.recordedDate.localeCompare(a.recordedDate) ||
        a.id.localeCompare(b.id),
    );
}

export function getObjectiveSourceContext(
  objective: EngagementObjective,
  signals: RelationshipSignal[],
  engagements: Engagement[],
): { signal: RelationshipSignal; sourceEngagement: Engagement } | null {
  if (!objective.sourceRelationshipSignalId) return null;

  const signal = signals.find(
    (candidate) => candidate.id === objective.sourceRelationshipSignalId,
  );
  if (!signal) return null;

  const currentEngagement = engagements.find(
    (engagement) => engagement.id === objective.engagementId,
  );
  const sourceEngagement = engagements.find(
    (engagement) => engagement.id === signal.sourceEngagementId,
  );

  if (
    !currentEngagement ||
    !sourceEngagement ||
    signal.relationshipId !== currentEngagement.relationshipId ||
    sourceEngagement.relationshipId !== currentEngagement.relationshipId ||
    sourceEngagement.startDate >= currentEngagement.startDate
  ) {
    return null;
  }

  return { signal, sourceEngagement };
}

export function buildRelationshipMemoryState(
  relationshipId: string,
  signals: RelationshipSignal[],
  objectives: EngagementObjective[],
  engagements: Engagement[],
): RelationshipMemoryState {
  const relationshipSignals = getRelationshipMemory(relationshipId, signals);

  if (relationshipSignals.length === 0) {
    return { kind: "empty", signals: [], continuities: [] };
  }

  const continuities = objectives.flatMap<RelationshipContinuity>((objective) => {
    const currentEngagement = engagements.find(
      (engagement) => engagement.id === objective.engagementId,
    );
    const sourceContext = getObjectiveSourceContext(
      objective,
      relationshipSignals,
      engagements,
    );

    if (
      !currentEngagement ||
      currentEngagement.relationshipId !== relationshipId ||
      !sourceContext
    ) {
      return [];
    }

    return [
      {
        signal: sourceContext.signal,
        sourceEngagement: sourceContext.sourceEngagement,
        objective,
        currentEngagement,
      },
    ];
  }).toSorted((a, b) =>
    a.currentEngagement.startDate.localeCompare(b.currentEngagement.startDate),
  );

  if (continuities.length === 0) {
    return { kind: "signals_only", signals: relationshipSignals, continuities: [] };
  }

  return { kind: "continuity", signals: relationshipSignals, continuities };
}

export function buildRelationshipSummaries(
  relationships: Relationship[],
  partners: PartnerOrganisation[],
  engagements: Engagement[],
  signals: RelationshipSignal[],
): RelationshipSummary[] {
  const partnersById = new Map(partners.map((partner) => [partner.id, partner]));

  return relationships.map((relationship) => {
    const partner = partnersById.get(relationship.partnerOrganisationId);
    if (!partner) {
      throw new Error(`Missing partner for relationship ${relationship.id}`);
    }

    const relationshipEngagements = getEngagementsForRelationship(
      relationship.id,
      engagements,
    );
    const currentOrFutureEngagements = getCurrentOrUpcomingEngagements(
      relationshipEngagements,
    );
    const completedEngagements = relationshipEngagements.filter(
      (engagement) => engagement.stage === "completed",
    );

    return {
      relationship,
      partner,
      engagements: relationshipEngagements,
      latestEngagement: completedEngagements.at(-1) ?? null,
      nextEngagement: currentOrFutureEngagements[0] ?? null,
      latestSignal: getRelationshipMemory(relationship.id, signals)[0] ?? null,
    };
  });
}

export function deriveHomeCoordinationPrompts(
  engagements: Engagement[],
  studyTourSources: StudyTourCoordinationSources,
): CoordinationPrompt[] {
  const currentEngagements = getCurrentOrUpcomingEngagements(engagements);
  const prompts: CoordinationPrompt[] = [];

  for (const engagement of currentEngagements) {
    if (engagement.type === "delegation_visit") {
      const questionCount = engagement.openQuestions?.length ?? 0;
      if (questionCount > 0) {
        prompts.push({
          id: `coordination-${engagement.id}-questions`,
          title: "Resolve delegation scope questions",
          context: `${questionCount} open ${questionCount === 1 ? "question remains" : "questions remain"} before stakeholder coordination begins.`,
          href: `/engagements/${engagement.id}`,
          sourceType: "delegation_questions",
          sourceId: engagement.id,
          count: questionCount,
        });
      }
      continue;
    }

    if (engagement.type !== "study_tour") continue;

    const program = studyTourSources.programs.find(
      (candidate) => candidate.id === engagement.studyTourProgramId,
    );
    if (!program) continue;

    const participants = studyTourSources.participants.filter(
      (participant) => participant.programId === program.id,
    );
    const requirements = studyTourSources.requirements.filter(
      (requirement) => requirement.programId === program.id,
    );
    const milestones = studyTourSources.milestones.filter(
      (milestone) => milestone.programId === program.id,
    );
    const itineraryEntries = studyTourSources.itineraryEntries.filter(
      (entry) => entry.programId === program.id,
    );
    const summary = getProgramSummary(
      program,
      participants,
      requirements,
      milestones,
    );
    const attentionItems = deriveAttentionItems(
      [program],
      participants,
      requirements,
      milestones,
      itineraryEntries,
    );

    if (summary.readinessState === "ready" && attentionItems.length === 0) {
      continue;
    }

    prompts.push({
      id: `coordination-${engagement.id}-readiness`,
      title: "Review Study Tour readiness",
      context: `${summary.outstandingRequirementCount} outstanding ${summary.outstandingRequirementCount === 1 ? "requirement" : "requirements"} · ${attentionItems.length} ${attentionItems.length === 1 ? "attention item" : "attention items"}.`,
      href: `/engagements/${engagement.id}/delivery`,
      sourceType: "study_tour_attention",
      sourceId: engagement.id,
      count: attentionItems.length,
    });
  }

  return prompts;
}

export function buildHomeSnapshot(
  relationships: Relationship[],
  partners: PartnerOrganisation[],
  engagements: Engagement[],
  signals: RelationshipSignal[],
  objectives: EngagementObjective[],
  priorityRelationshipId: string,
  studyTourSources: StudyTourCoordinationSources,
): HomeSnapshot {
  const relationshipSummaries = buildRelationshipSummaries(
    relationships,
    partners,
    engagements,
    signals,
  );
  const priorityRelationship = relationshipSummaries.find(
    (summary) => summary.relationship.id === priorityRelationshipId,
  );

  if (!priorityRelationship) {
    throw new Error(`Missing priority relationship ${priorityRelationshipId}`);
  }

  const priorityMemory = buildRelationshipMemoryState(
    priorityRelationshipId,
    signals,
    objectives,
    engagements,
  );
  const latestRelationshipSignals = signals
    .toSorted(
      (a, b) =>
        b.recordedDate.localeCompare(a.recordedDate) ||
        a.id.localeCompare(b.id),
    )
    .slice(0, 3);

  return {
    priorityRelationship,
    priorityContinuity:
      priorityMemory.kind === "continuity"
        ? priorityMemory.continuities[0]
        : null,
    currentEngagements: getCurrentOrUpcomingEngagements(engagements),
    latestRelationshipSignals,
    openCoordinationItems: deriveHomeCoordinationPrompts(
      engagements,
      studyTourSources,
    ),
  };
}
