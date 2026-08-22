import type { PartnerOrganisation } from "@/domain/types";

import type { EngagementScopeDraft } from "./enquiry-schema";

export interface ScopeReviewEdits {
  mentionedOrganisationName?: string | null;
  engagementType?: EngagementScopeDraft["engagementType"]["value"];
  dateText?: string | null;
  delegationSize?: number | null;
}

export interface EffectiveScopeValues {
  mentionedOrganisationName: string | null;
  engagementType: EngagementScopeDraft["engagementType"]["value"];
  dateText: string | null;
  delegationSize: number | null;
}

export type PartnerResolution =
  | { status: "matched"; partner: PartnerOrganisation }
  | { status: "unresolved"; mentionedName: string | null }
  | { status: "ambiguous"; mentionedName: string; candidates: PartnerOrganisation[] };

export interface ConfirmedEngagementScope {
  confirmationStatus: "officer_confirmed";
  sourceDraft: EngagementScopeDraft;
  reviewEdits: ScopeReviewEdits;
  effective: EffectiveScopeValues;
  objectives: EngagementScopeDraft["objectives"];
  includedObjectiveIds: string[];
}

export class ScopeConfirmationError extends Error {}

export function resolvePartnerExact(
  mentionedName: string | null,
  partners: PartnerOrganisation[],
): PartnerResolution {
  if (!mentionedName) return { status: "unresolved", mentionedName: null };
  const normalised = normaliseName(mentionedName);
  const matches = partners.filter((partner) => normaliseName(partner.name) === normalised);
  if (matches.length === 1) return { status: "matched", partner: matches[0] };
  if (matches.length > 1) return { status: "ambiguous", mentionedName, candidates: matches };
  return { status: "unresolved", mentionedName };
}

export function confirmScope(
  draft: EngagementScopeDraft,
  reviewEdits: ScopeReviewEdits,
  excludedObjectiveIds: string[],
): ConfirmedEngagementScope {
  const excluded = new Set(excludedObjectiveIds);
  const objectives = draft.objectives.filter((objective) => !excluded.has(objective.id));
  if (objectives.length === 0) {
    throw new ScopeConfirmationError(
      "At least one grounded objective must be included before the scope can be confirmed.",
    );
  }
  return {
    confirmationStatus: "officer_confirmed",
    sourceDraft: draft,
    reviewEdits: { ...reviewEdits },
    effective: getEffectiveScopeValues(draft, reviewEdits),
    objectives,
    includedObjectiveIds: objectives.map((objective) => objective.id),
  };
}

export function getEffectiveScopeValues(
  draft: EngagementScopeDraft,
  reviewEdits: ScopeReviewEdits,
): EffectiveScopeValues {
  return {
    mentionedOrganisationName: hasEdit(reviewEdits, "mentionedOrganisationName")
      ? reviewEdits.mentionedOrganisationName ?? null
      : draft.mentionedOrganisationName.value,
    engagementType: hasEdit(reviewEdits, "engagementType")
      ? reviewEdits.engagementType ?? null
      : draft.engagementType.value,
    dateText: hasEdit(reviewEdits, "dateText")
      ? reviewEdits.dateText ?? null
      : draft.dates.dateText,
    delegationSize: hasEdit(reviewEdits, "delegationSize")
      ? reviewEdits.delegationSize ?? null
      : draft.delegationSize.value,
  };
}

export function hasReviewEdit(
  reviewEdits: ScopeReviewEdits,
  field: keyof ScopeReviewEdits,
): boolean {
  return hasEdit(reviewEdits, field);
}

function hasEdit(reviewEdits: ScopeReviewEdits, field: keyof ScopeReviewEdits) {
  return Object.prototype.hasOwnProperty.call(reviewEdits, field);
}

function normaliseName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-AU");
}
