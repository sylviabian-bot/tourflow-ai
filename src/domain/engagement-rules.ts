import { daysFromDemoToday } from "./demo-clock";
import type {
  Engagement,
  EngagementObjective,
  HomeSnapshot,
  PartnerOrganisation,
  Relationship,
  RelationshipSignal,
  RelationshipSummary,
} from "./types";

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

export function getRelationshipMemory(
  relationshipId: string,
  signals: RelationshipSignal[],
): RelationshipSignal[] {
  return signals
    .filter((signal) => signal.relationshipId === relationshipId)
    .toSorted((a, b) => b.recordedDate.localeCompare(a.recordedDate));
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
    const currentOrFutureEngagements = relationshipEngagements.filter(
      (engagement) =>
        engagement.stage !== "completed" && daysFromDemoToday(engagement.endDate) >= 0,
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
      openSignal: getRelationshipMemory(relationship.id, signals)[0] ?? null,
    };
  });
}

export function buildHomeSnapshot(
  relationships: Relationship[],
  partners: PartnerOrganisation[],
  engagements: Engagement[],
  signals: RelationshipSignal[],
  priorityRelationshipId: string,
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

  const currentEngagements = engagements
    .filter((engagement) => engagement.stage !== "completed")
    .toSorted(compareEngagementDates);
  const latestRelationshipSignals = signals
    .toSorted((a, b) => b.recordedDate.localeCompare(a.recordedDate))
    .slice(0, 3);

  return {
    priorityRelationship,
    currentEngagements,
    latestRelationshipSignals,
    openCoordinationItems: [
      {
        id: "coordination-delegation-scope",
        title: "Resolve delegation scope questions",
        context: "Two questions remain open before stakeholder coordination begins.",
        href: "/engagements/engagement-senior-delegation-2026",
      },
      {
        id: "coordination-study-tour-readiness",
        title: "Review Study Tour readiness",
        context: "Participant requirements and arrival logistics still need attention.",
        href: "/engagements/engagement-study-tour-2026/delivery",
      },
    ],
  };
}
