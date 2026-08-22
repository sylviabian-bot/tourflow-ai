import type { PartnerOrganisation } from "@/domain/types";

import type { EngagementScopeDraft } from "./enquiry-schema";

export type PartnerResolution =
  | { status: "matched"; partner: PartnerOrganisation }
  | { status: "unresolved"; mentionedName: string | null }
  | { status: "ambiguous"; mentionedName: string; candidates: PartnerOrganisation[] };

export interface ConfirmedEngagementScope extends EngagementScopeDraft {
  confirmationStatus: "officer_confirmed";
  includedObjectiveIds: string[];
}

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
  excludedObjectiveIds: string[],
): ConfirmedEngagementScope {
  const excluded = new Set(excludedObjectiveIds);
  const objectives = draft.objectives.filter((objective) => !excluded.has(objective.id));
  return {
    ...draft,
    objectives,
    confirmationStatus: "officer_confirmed",
    includedObjectiveIds: objectives.map((objective) => objective.id),
  };
}

function normaliseName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-AU");
}
