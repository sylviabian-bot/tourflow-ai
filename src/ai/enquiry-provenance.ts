import type {
  EngagementScopeDraft,
  EngagementScopeExtraction,
} from "./enquiry-schema";

export class EvidenceVerificationError extends Error {}

export function verifyExtractionEvidence(
  enquiry: string,
  extraction: EngagementScopeExtraction,
): void {
  const source = normaliseEvidenceText(enquiry);
  const evidence = [
    extraction.mentionedOrganisationName.evidenceExcerpt,
    extraction.engagementType.evidenceExcerpt,
    extraction.dates.evidenceExcerpt,
    extraction.delegationSize.evidenceExcerpt,
    ...extraction.strategicInterests.map((interest) => interest.evidenceExcerpt),
    ...extraction.objectives.map((objective) => objective.evidenceExcerpt),
  ].filter((excerpt): excerpt is string => excerpt !== null);

  for (const excerpt of evidence) {
    const normalisedExcerpt = normaliseEvidenceText(excerpt);
    if (!normalisedExcerpt || !source.includes(normalisedExcerpt)) {
      throw new EvidenceVerificationError("Structured extraction contained evidence that was not present in the source enquiry.");
    }
  }

  const size = extraction.delegationSize;
  if (size.value !== null && size.evidenceExcerpt !== null && !evidenceContainsNumber(size.evidenceExcerpt, size.value)) {
    throw new EvidenceVerificationError(
      "Structured extraction contained a numeric delegation size that was not present in its source evidence.",
    );
  }
}

export function createEngagementScopeDraft(
  extraction: EngagementScopeExtraction,
): EngagementScopeDraft {
  return {
    ...extraction,
    objectives: extraction.objectives.map((objective, index) => ({
      ...objective,
      id: `draft-objective-${String(index + 1).padStart(2, "0")}`,
    })),
  };
}

export function normaliseEvidenceText(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-AU");
}

const NUMBER_WORDS: Record<number, string[]> = {
  1: ["one"], 2: ["two"], 3: ["three"], 4: ["four"], 5: ["five"],
  6: ["six"], 7: ["seven"], 8: ["eight"], 9: ["nine"], 10: ["ten"],
  11: ["eleven"], 12: ["twelve"], 13: ["thirteen"], 14: ["fourteen"], 15: ["fifteen"],
  16: ["sixteen"], 17: ["seventeen"], 18: ["eighteen"], 19: ["nineteen"], 20: ["twenty"],
};

function evidenceContainsNumber(evidence: string, value: number): boolean {
  const normalised = normaliseEvidenceText(evidence);
  if (new RegExp(`(^|\\D)${value}(?=\\D|$)`).test(normalised)) return true;
  return (NUMBER_WORDS[value] ?? []).some((word) => new RegExp(`\\b${word}\\b`).test(normalised));
}
