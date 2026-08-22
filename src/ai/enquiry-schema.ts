import { z } from "zod";

export const MAX_ENQUIRY_LENGTH = 8_000;

export const groundingStatusSchema = z.enum([
  "explicit",
  "inferred",
  "missing",
  "ambiguous",
]);

const evidenceFields = {
  grounding: groundingStatusSchema,
  evidenceExcerpt: z.string().min(1).max(240).nullable(),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
};

const groundedTextSchema = z.object({
  value: z.string().min(1).nullable(),
  ...evidenceFields,
});

const groundedNumberSchema = z.object({
  value: z.number().int().positive().nullable(),
  ...evidenceFields,
});

const groundedEngagementTypeSchema = z.object({
  value: z
    .enum([
      "delegation_visit",
      "study_tour",
      "partner_meeting",
      "short_program",
      "unknown",
    ])
    .nullable(),
  ...evidenceFields,
});

const datesSchema = z.object({
  dateText: z.string().min(1).nullable(),
  normalisedStartDate: z.string().date().nullable(),
  normalisedEndDate: z.string().date().nullable(),
  ...evidenceFields,
});

const groundedThemeSchema = z.object({
  value: z.string().min(1).max(100),
  grounding: z.enum(["explicit", "inferred", "ambiguous"]),
  evidenceExcerpt: z.string().min(1).max(240),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const extractedObjectiveSchema = z.object({
  title: z.string().min(1).max(160),
  grounding: z.enum(["explicit", "inferred"]),
  evidenceExcerpt: z.string().min(1).max(240),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const draftObjectiveSchema = extractedObjectiveSchema.extend({
  id: z.string().min(1).max(80),
});

const missingInformationSchema = z.array(
  z.object({
    field: z.string().min(1).max(80),
    detail: z.string().min(1).max(240),
  }),
).max(12);

const clarificationQuestionsSchema = z.array(
  z.object({
    question: z.string().min(1).max(240),
    relatedFields: z.array(z.string().min(1).max(80)).min(1).max(4),
  }),
).max(12);

const scopeShape = {
  mentionedOrganisationName: groundedTextSchema,
  engagementType: groundedEngagementTypeSchema,
  dates: datesSchema,
  delegationSize: groundedNumberSchema,
  strategicInterests: z.array(groundedThemeSchema).max(10),
  missingInformation: missingInformationSchema,
  clarificationQuestions: clarificationQuestionsSchema,
};

export const engagementScopeExtractionSchema = z
  .object({
    ...scopeShape,
    objectives: z.array(extractedObjectiveSchema).max(8),
  })
  .superRefine(validateScopeInvariants);

export const engagementScopeDraftSchema = z
  .object({
    ...scopeShape,
    objectives: z.array(draftObjectiveSchema).max(8),
  })
  .superRefine((draft, context) => {
    validateScopeInvariants(draft, context);
    if (new Set(draft.objectives.map((objective) => objective.id)).size !== draft.objectives.length) {
      context.addIssue({ code: "custom", path: ["objectives"], message: "Draft objective IDs must be unique." });
    }
  });

type ScopeForValidation = z.infer<typeof engagementScopeExtractionSchema>;

function validateScopeInvariants(draft: ScopeForValidation, context: z.RefinementCtx) {
  validateGroundedField("mentionedOrganisationName", draft.mentionedOrganisationName, context);
  validateGroundedField("engagementType", draft.engagementType, context);
  validateGroundedField("delegationSize", draft.delegationSize, context);
  if (draft.delegationSize.grounding === "ambiguous" && draft.delegationSize.value !== null) {
    context.addIssue({
      code: "custom",
      path: ["delegationSize"],
      message: "Ambiguous delegation descriptions cannot contain a numeric size.",
    });
  }
  validateDates(draft.dates, context);

  for (const [index, interest] of draft.strategicInterests.entries()) {
    validateInferenceExplanation(["strategicInterests", index], interest, context);
  }
  for (const [index, objective] of draft.objectives.entries()) {
    validateInferenceExplanation(["objectives", index], objective, context);
  }

  const reviewFields = new Set(draft.missingInformation.map((item) => item.field));
  if (["missing", "ambiguous"].includes(draft.dates.grounding)) reviewFields.add("dates");
  if (["missing", "ambiguous"].includes(draft.delegationSize.grounding)) reviewFields.add("delegationSize");
  if (["missing", "ambiguous"].includes(draft.mentionedOrganisationName.grounding)) reviewFields.add("partner");

  for (const [index, question] of draft.clarificationQuestions.entries()) {
    if (!question.relatedFields.some((field) => reviewFields.has(field))) {
      context.addIssue({
        code: "custom",
        path: ["clarificationQuestions", index, "relatedFields"],
        message: "Clarification questions must address missing or ambiguous scope.",
      });
    }
  }
}

type GroundedValue = {
  value: unknown;
  grounding: z.infer<typeof groundingStatusSchema>;
  evidenceExcerpt: string | null;
  inferenceExplanation: string | null;
};

function validateGroundedField(field: string, value: GroundedValue, context: z.RefinementCtx) {
  if (value.grounding === "missing") {
    if (value.value !== null || value.evidenceExcerpt !== null) {
      context.addIssue({ code: "custom", path: [field], message: "Missing fields must not contain a value or evidence." });
    }
    return;
  }

  if (value.evidenceExcerpt === null || (value.value === null && value.grounding !== "ambiguous")) {
    context.addIssue({ code: "custom", path: [field], message: "Grounded fields require source evidence, and explicit or inferred fields require a value." });
  }
  validateInferenceExplanation([field], value, context);
}

function validateInferenceExplanation(
  path: Array<string | number>,
  value: { grounding: string; inferenceExplanation: string | null },
  context: z.RefinementCtx,
) {
  if (value.grounding === "inferred" && value.inferenceExplanation === null) {
    context.addIssue({ code: "custom", path, message: "Inferred values require an explanation." });
  }
}

function validateDates(dates: z.infer<typeof datesSchema>, context: z.RefinementCtx) {
  validateGroundedField("dates", { ...dates, value: dates.dateText }, context);

  if (dates.grounding === "missing") {
    if (dates.dateText !== null || dates.normalisedStartDate !== null || dates.normalisedEndDate !== null || dates.evidenceExcerpt !== null) {
      context.addIssue({ code: "custom", path: ["dates"], message: "Missing dates must not contain source or normalised values." });
    }
    return;
  }

  if (dates.grounding === "ambiguous") {
    if (dates.dateText === null || dates.normalisedStartDate !== null || dates.normalisedEndDate !== null) {
      context.addIssue({ code: "custom", path: ["dates"], message: "Ambiguous dates must preserve their source phrase without exact normalised dates." });
    }
  }

  if (dates.normalisedStartDate && dates.normalisedEndDate && dates.normalisedStartDate > dates.normalisedEndDate) {
    context.addIssue({ code: "custom", path: ["dates"], message: "Normalised start date cannot be after end date." });
  }
}

export type EngagementScopeExtraction = z.infer<typeof engagementScopeExtractionSchema>;
export type EngagementScopeDraft = z.infer<typeof engagementScopeDraftSchema>;
export type GroundingStatus = z.infer<typeof groundingStatusSchema>;

export function validateEnquiryInput(input: unknown): string {
  if (typeof input !== "string") throw new EnquiryInputError("Enquiry must be text.", 400);
  const trimmed = input.trim();
  if (!trimmed) throw new EnquiryInputError("Enter an enquiry before analysing it.", 400);
  if (trimmed.length > MAX_ENQUIRY_LENGTH) {
    throw new EnquiryInputError(`Enquiry must be ${MAX_ENQUIRY_LENGTH.toLocaleString()} characters or fewer.`, 413);
  }
  return trimmed;
}

export class EnquiryInputError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}
