import {
  DELEGATION_ENGAGEMENT_ID,
  PRIMARY_RELATIONSHIP_ID,
} from "./engagement-fixtures";
import type { Commitment, EngagementOutcome } from "../domain/types";

export const engagementOutcomes: EngagementOutcome[] = [
  {
    id: "outcome-faculty-workshop",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    objectiveId: "objective-broader-collaboration",
    title: "Faculty-level collaboration workshop",
    summary:
      "Both parties expressed interest in exploring a faculty-level collaboration workshop focused on Business Analytics and Artificial Intelligence.",
    recordedDate: "2026-10-20",
    type: "agreement_to_explore",
    composite: true,
  },
  {
    id: "outcome-mobility-capacity",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    objectiveId: "objective-mobility-pathways",
    title: "Mobility capacity information requested",
    summary:
      "The partner requested indicative semester exchange capacity and subject-area availability for a future feasibility discussion.",
    recordedDate: "2026-10-20",
    type: "information_shared",
    composite: true,
  },
  {
    id: "outcome-joint-program-interest",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    objectiveId: "objective-joint-program-interest",
    title: "Joint-program interest confirmed",
    summary:
      "The delegation confirmed interest in a future workshop to test postgraduate joint-program models in Business Analytics.",
    recordedDate: "2026-10-20",
    type: "interest_confirmed",
    composite: true,
  },
];

export const commitments: Commitment[] = [
  {
    id: "commitment-mobility-summary",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    outcomeId: "outcome-mobility-capacity",
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    description: "Prepare an indicative exchange capacity and subject-area summary.",
    ownerType: "internal_stakeholder",
    ownerName: "Priya Nair",
    ownerContext: "Global Mobility Team",
    dueDate: "2026-10-30",
    status: "open",
    direction: "our_institution",
    composite: true,
  },
  {
    id: "commitment-workshop-outline",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    outcomeId: "outcome-faculty-workshop",
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    description: "Prepare an outline for a faculty-level collaboration workshop.",
    ownerType: "internal_stakeholder",
    ownerName: "Sofia Martins",
    ownerContext: "International Partnerships",
    dueDate: "2026-11-05",
    status: "open",
    direction: "our_institution",
    composite: true,
  },
  {
    id: "commitment-program-priorities",
    engagementId: DELEGATION_ENGAGEMENT_ID,
    outcomeId: "outcome-joint-program-interest",
    relationshipId: PRIMARY_RELATIONSHIP_ID,
    description: "Share priority postgraduate disciplines for the proposed workshop.",
    ownerType: "partner_contact",
    ownerName: "Delegation secretariat",
    ownerContext: "Eastern Horizon University",
    dueDate: "2026-11-10",
    status: "completed",
    direction: "partner",
    composite: true,
  },
];

export const baselineCompletedCommitmentIds = commitments
  .filter((commitment) => commitment.status === "completed")
  .map((commitment) => commitment.id);
