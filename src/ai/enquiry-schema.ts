import { z } from "zod";

export const MAX_ENQUIRY_LENGTH = 8_000;

export const groundingStatusSchema = z.enum([
  "explicit",
  "inferred",
  "missing",
  "ambiguous",
]);

const groundedTextSchema = z.object({
  value: z.string().min(1).nullable(),
  grounding: groundingStatusSchema,
  evidenceExcerpt: z.string().min(1).max(240).nullable(),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const groundedNumberSchema = z.object({
  value: z.number().int().positive().nullable(),
  grounding: groundingStatusSchema,
  evidenceExcerpt: z.string().min(1).max(240).nullable(),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
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
  grounding: groundingStatusSchema,
  evidenceExcerpt: z.string().min(1).max(240).nullable(),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const datesSchema = z.object({
  dateText: z.string().min(1).nullable(),
  normalisedStartDate: z.string().date().nullable(),
  normalisedEndDate: z.string().date().nullable(),
  grounding: groundingStatusSchema,
  evidenceExcerpt: z.string().min(1).max(240).nullable(),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const groundedThemeSchema = z.object({
  value: z.string().min(1).max(100),
  grounding: z.enum(["explicit", "inferred", "ambiguous"]),
  evidenceExcerpt: z.string().min(1).max(240),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

const objectiveSchema = z.object({
  id: z.string().min(1).max(80),
  title: z.string().min(1).max(160),
  grounding: z.enum(["explicit", "inferred"]),
  evidenceExcerpt: z.string().min(1).max(240),
  inferenceExplanation: z.string().min(1).max(240).nullable(),
});

export const engagementScopeDraftSchema = z
  .object({
    mentionedOrganisationName: groundedTextSchema,
    engagementType: groundedEngagementTypeSchema,
    dates: datesSchema,
    delegationSize: groundedNumberSchema,
    strategicInterests: z.array(groundedThemeSchema).max(10),
    objectives: z.array(objectiveSchema).min(1).max(8),
    missingInformation: z
      .array(
        z.object({
          field: z.string().min(1).max(80),
          detail: z.string().min(1).max(240),
        }),
      )
      .max(12),
    clarificationQuestions: z
      .array(
        z.object({
          question: z.string().min(1).max(240),
          relatedFields: z.array(z.string().min(1).max(80)).min(1).max(4),
        }),
      )
      .max(12),
  })
  .superRefine((draft, context) => {
    validateGroundedField("mentionedOrganisationName", draft.mentionedOrganisationName, context);
    validateGroundedField("engagementType", draft.engagementType, context);
    validateGroundedField("dates", { ...draft.dates, value: draft.dates.dateText }, context);
    validateGroundedField("delegationSize", draft.delegationSize, context);

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
  });

type GroundedValue = {
  value: unknown;
  grounding: z.infer<typeof groundingStatusSchema>;
  evidenceExcerpt: string | null;
  inferenceExplanation: string | null;
};

function validateGroundedField(
  field: string,
  value: GroundedValue,
  context: z.RefinementCtx,
) {
  if (value.grounding === "missing") {
    if (value.value !== null || value.evidenceExcerpt !== null) {
      context.addIssue({ code: "custom", path: [field], message: "Missing fields must not contain a value or evidence." });
    }
    return;
  }

  if (value.evidenceExcerpt === null || (value.value === null && value.grounding !== "ambiguous")) {
    context.addIssue({ code: "custom", path: [field], message: "Grounded fields require source evidence, and explicit or inferred fields require a value." });
  }
  if (value.grounding === "inferred" && value.inferenceExplanation === null) {
    context.addIssue({ code: "custom", path: [field], message: "Inferred fields require an explanation." });
  }
}

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
