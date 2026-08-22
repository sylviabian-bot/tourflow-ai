import { afterEach, describe, expect, it, vi } from "vitest";
import { zodTextFormat } from "openai/helpers/zod";

import { engagements, partnerOrganisations } from "@/data/engagement-fixtures";
import {
  AMBIGUOUS_PARTNER_ENQUIRY,
  INCOMPLETE_ENQUIRY,
  SAMPLE_ENQUIRY,
  VALID_SCOPE_DRAFT,
  VALID_SCOPE_EXTRACTION,
} from "@/data/enquiry-fixtures";

import {
  EnquiryInputError,
  MAX_ENQUIRY_LENGTH,
  engagementScopeDraftSchema,
  engagementScopeExtractionSchema,
  validateEnquiryInput,
} from "./enquiry-schema";
import { OpenAIEnquiryExtractor } from "./enquiry-extractor";
import {
  EvidenceVerificationError,
  createEngagementScopeDraft,
  verifyExtractionEvidence,
} from "./enquiry-provenance";
import {
  ScopeConfirmationError,
  confirmScope,
  getDateNormalisationPresentation,
  getEffectiveScopeValues,
  resolvePartnerExact,
} from "./enquiry-rules";

describe("enquiry scope schema and grounding", () => {
  it("accepts a valid structured extraction", () => {
    expect(engagementScopeExtractionSchema.parse(VALID_SCOPE_EXTRACTION)).toEqual(VALID_SCOPE_EXTRACTION);
    expect(engagementScopeDraftSchema.parse(VALID_SCOPE_DRAFT)).toEqual(VALID_SCOPE_DRAFT);
  });

  it("produces a strict Responses API Structured Output format", () => {
    expect(zodTextFormat(engagementScopeExtractionSchema, "engagement_scope_draft")).toMatchObject({
      type: "json_schema",
      name: "engagement_scope_draft",
      strict: true,
    });
  });

  it("rejects malformed extraction", () => {
    expect(engagementScopeExtractionSchema.safeParse({ ...VALID_SCOPE_EXTRACTION, objectives: [{}] }).success).toBe(false);
  });

  it("rejects an empty or over-length enquiry before any model call", () => {
    expect(() => validateEnquiryInput("   ")).toThrow(EnquiryInputError);
    expect(() => validateEnquiryInput("x".repeat(MAX_ENQUIRY_LENGTH + 1))).toThrow(
      expect.objectContaining({ status: 413 }),
    );
  });

  it("requires inferred strategic interests and objectives to include explanations", () => {
    const invalidInterest = structuredClone(VALID_SCOPE_EXTRACTION);
    invalidInterest.strategicInterests[2].inferenceExplanation = null;
    expect(engagementScopeExtractionSchema.safeParse(invalidInterest).success).toBe(false);

    const invalidObjective = structuredClone(VALID_SCOPE_EXTRACTION);
    invalidObjective.objectives[0].inferenceExplanation = null;
    expect(engagementScopeExtractionSchema.safeParse(invalidObjective).success).toBe(false);
  });

  it("requires missing fields and dates to contain no value or evidence", () => {
    const missingDates = structuredClone(VALID_SCOPE_EXTRACTION);
    missingDates.dates = {
      dateText: null,
      normalisedStartDate: "2026-10-19",
      normalisedEndDate: null,
      grounding: "missing",
      evidenceExcerpt: null,
      inferenceExplanation: null,
    };
    expect(engagementScopeExtractionSchema.safeParse(missingDates).success).toBe(false);
  });

  it("rejects exact dates invented from an ambiguous partial phrase", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.dates.normalisedStartDate = "2026-10-19";
    invalid.dates.normalisedEndDate = "2026-10-20";
    expect(engagementScopeExtractionSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects a normalised start date after its end date", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.dates = {
      dateText: "19 to 18 October 2026",
      normalisedStartDate: "2026-10-19",
      normalisedEndDate: "2026-10-18",
      grounding: "explicit",
      evidenceExcerpt: "19 to 18 October 2026",
      inferenceExplanation: null,
    };
    expect(engagementScopeExtractionSchema.safeParse(invalid).success).toBe(false);
  });

  it("does not allow an ambiguous qualitative delegation description to contain a number", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.delegationSize = {
      value: 5,
      grounding: "ambiguous",
      evidenceExcerpt: "a small visit",
      inferenceExplanation: "The source gives no numeric size.",
    };
    expect(engagementScopeExtractionSchema.safeParse(invalid).success).toBe(false);
    expect(INCOMPLETE_ENQUIRY).toContain("small visit");
  });

  it("allows zero objectives when the enquiry cannot support one", () => {
    const empty = { ...VALID_SCOPE_EXTRACTION, objectives: [] };
    expect(engagementScopeExtractionSchema.parse(empty).objectives).toEqual([]);
  });

  it("requires clarification questions to address missing or ambiguous scope", () => {
    const invalid = {
      ...VALID_SCOPE_EXTRACTION,
      clarificationQuestions: [{ question: "Would you like a campus tour?", relatedFields: ["unrelatedPreference"] }],
    };
    expect(engagementScopeExtractionSchema.safeParse(invalid).success).toBe(false);
  });
});

describe("deterministic evidence verification", () => {
  it("accepts real source excerpts with case and whitespace normalisation", () => {
    verifyExtractionEvidence(SAMPLE_ENQUIRY, VALID_SCOPE_EXTRACTION);
    const normalised = structuredClone(VALID_SCOPE_EXTRACTION);
    normalised.mentionedOrganisationName.evidenceExcerpt = "EASTERN   HORIZON UNIVERSITY IS CONSIDERING";
    expect(() => verifyExtractionEvidence(SAMPLE_ENQUIRY, normalised)).not.toThrow();
  });

  it("rejects fabricated scalar evidence", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.mentionedOrganisationName.evidenceExcerpt = "A fabricated source sentence";
    expect(() => verifyExtractionEvidence(SAMPLE_ENQUIRY, invalid)).toThrow(EvidenceVerificationError);
  });

  it("rejects fabricated objective evidence", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.objectives[0].evidenceExcerpt = "The partner approved an AI centre";
    expect(() => verifyExtractionEvidence(SAMPLE_ENQUIRY, invalid)).toThrow(EvidenceVerificationError);
  });

  it("rejects fabricated theme evidence", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.strategicInterests[0].evidenceExcerpt = "quantum computing and robotics";
    expect(() => verifyExtractionEvidence(SAMPLE_ENQUIRY, invalid)).toThrow(EvidenceVerificationError);
  });

  it("rejects a numeric delegation size not present in its evidence", () => {
    const invalid = structuredClone(VALID_SCOPE_EXTRACTION);
    invalid.delegationSize.value = 5;
    invalid.delegationSize.evidenceExcerpt = "a small delegation";
    invalid.engagementType.evidenceExcerpt = "a small delegation";
    const source = SAMPLE_ENQUIRY.replace("approximately eight senior representatives", "a small delegation");
    expect(() => verifyExtractionEvidence(source, invalid)).toThrow(EvidenceVerificationError);
  });

  it("generates unique presentation-only objective IDs in application code", () => {
    const extraction = structuredClone(VALID_SCOPE_EXTRACTION);
    extraction.objectives.push(structuredClone(extraction.objectives[0]));
    const draft = createEngagementScopeDraft(extraction);
    expect(new Set(draft.objectives.map((objective) => objective.id)).size).toBe(draft.objectives.length);
    expect(draft.objectives[0].id).toBe("draft-objective-01");
  });
});

describe("application review boundaries", () => {
  it("resolves exact, unresolved, and duplicate exact partner states without fuzzy matching", () => {
    expect(resolvePartnerExact("Eastern Horizon University", partnerOrganisations).status).toBe("matched");
    expect(resolvePartnerExact("Eastern Horizon Institute", partnerOrganisations)).toEqual({
      status: "unresolved",
      mentionedName: "Eastern Horizon Institute",
    });
    const duplicatePartners = [...partnerOrganisations, { ...partnerOrganisations[0], id: "duplicate-partner" }];
    expect(resolvePartnerExact("Eastern Horizon University", duplicatePartners).status).toBe("ambiguous");
    expect(AMBIGUOUS_PARTNER_ENQUIRY).toContain("Eastern Horizon Institute");
  });

  it("keeps the AI extraction immutable while applying officer corrections", () => {
    const original = structuredClone(VALID_SCOPE_DRAFT);
    const effective = getEffectiveScopeValues(VALID_SCOPE_DRAFT, {
      mentionedOrganisationName: "Harbour Lantern University",
      delegationSize: 9,
    });
    expect(effective).toMatchObject({ mentionedOrganisationName: "Harbour Lantern University", delegationSize: 9 });
    expect(VALID_SCOPE_DRAFT).toEqual(original);
    expect(VALID_SCOPE_DRAFT.mentionedOrganisationName.evidenceExcerpt).toContain("Eastern Horizon University");
  });

  it("uses officer-corrected effective values in local confirmation", () => {
    const confirmed = confirmScope(VALID_SCOPE_DRAFT, { mentionedOrganisationName: "Harbour Lantern University" }, []);
    expect(confirmed.effective.mentionedOrganisationName).toBe("Harbour Lantern University");
    expect(confirmed.sourceDraft.mentionedOrganisationName.value).toBe("Eastern Horizon University");
    expect(confirmed.reviewEdits).toEqual({ mentionedOrganisationName: "Harbour Lantern University" });
  });

  it("labels normalised dates as original AI provenance after an officer date correction", () => {
    const datedDraft = structuredClone(VALID_SCOPE_DRAFT);
    datedDraft.dates = {
      ...datedDraft.dates,
      dateText: "19–20 October 2026",
      normalisedStartDate: "2026-10-19",
      normalisedEndDate: "2026-10-20",
      grounding: "explicit",
    };

    expect(getDateNormalisationPresentation(datedDraft, {})).toEqual({
      label: "Normalised dates",
      startDate: "2026-10-19",
      endDate: "2026-10-20",
      requiresReview: false,
    });
    expect(getDateNormalisationPresentation(datedDraft, { dateText: "5–6 November 2026" })).toEqual({
      label: "Original AI normalisation",
      startDate: "2026-10-19",
      endDate: "2026-10-20",
      requiresReview: true,
    });
    expect(datedDraft.dates.dateText).toBe("19–20 October 2026");
  });

  it("does not confirm an incomplete scope with zero included objectives", () => {
    const emptyDraft = createEngagementScopeDraft({ ...VALID_SCOPE_EXTRACTION, objectives: [] });
    expect(() => confirmScope(emptyDraft, {}, [])).toThrow(ScopeConfirmationError);
  });

  it("creates only local confirmation and excludes rejected objectives", () => {
    const canonicalCount = engagements.length;
    const excludedId = VALID_SCOPE_DRAFT.objectives[0].id;
    const confirmed = confirmScope(VALID_SCOPE_DRAFT, {}, [excludedId]);
    expect(confirmed.confirmationStatus).toBe("officer_confirmed");
    expect(confirmed.objectives.some((objective) => objective.id === excludedId)).toBe(false);
    expect("id" in confirmed).toBe(false);
    expect(engagements).toHaveLength(canonicalCount);
  });
});

describe("server failure boundaries", () => {
  const originalKey = process.env.OPENAI_API_KEY;

  afterEach(() => {
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it("reports API-key-missing honestly without calling OpenAI", async () => {
    delete process.env.OPENAI_API_KEY;
    const extractSpy = vi.spyOn(OpenAIEnquiryExtractor.prototype, "extract");
    const { POST } = await import("@/app/api/ai/enquiry-scope/route");
    const response = await POST(new Request("http://localhost/api/ai/enquiry-scope", {
      method: "POST",
      body: JSON.stringify({ enquiry: "A fictional partner requests a meeting." }),
      headers: { "Content-Type": "application/json" },
    }));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "not_configured", message: "Live AI extraction is not configured in this environment." },
    });
    expect(extractSpy).not.toHaveBeenCalled();
  });

  it("rejects invalid input before model construction", async () => {
    process.env.OPENAI_API_KEY = "test-placeholder-never-used";
    const extractSpy = vi.spyOn(OpenAIEnquiryExtractor.prototype, "extract");
    const { POST } = await import("@/app/api/ai/enquiry-scope/route");
    const response = await POST(new Request("http://localhost/api/ai/enquiry-scope", {
      method: "POST",
      body: JSON.stringify({ enquiry: "" }),
      headers: { "Content-Type": "application/json" },
    }));
    expect(response.status).toBe(400);
    expect(extractSpy).not.toHaveBeenCalled();
  });
});
