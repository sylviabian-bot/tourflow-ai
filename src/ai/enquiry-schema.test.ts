import { afterEach, describe, expect, it, vi } from "vitest";
import { zodTextFormat } from "openai/helpers/zod";

import { partnerOrganisations, engagements } from "@/data/engagement-fixtures";
import {
  AMBIGUOUS_PARTNER_ENQUIRY,
  INCOMPLETE_ENQUIRY,
  VALID_SCOPE_DRAFT,
} from "@/data/enquiry-fixtures";

import {
  EnquiryInputError,
  MAX_ENQUIRY_LENGTH,
  engagementScopeDraftSchema,
  validateEnquiryInput,
} from "./enquiry-schema";
import { OpenAIEnquiryExtractor } from "./enquiry-extractor";
import { confirmScope, resolvePartnerExact } from "./enquiry-rules";

describe("enquiry scope schema and grounding", () => {
  it("accepts a valid structured extraction", () => {
    expect(engagementScopeDraftSchema.parse(VALID_SCOPE_DRAFT)).toEqual(VALID_SCOPE_DRAFT);
  });

  it("produces a strict Responses API Structured Output format", () => {
    expect(zodTextFormat(engagementScopeDraftSchema, "engagement_scope_draft")).toMatchObject({
      type: "json_schema",
      name: "engagement_scope_draft",
      strict: true,
    });
  });

  it("rejects malformed extraction", () => {
    const malformed = { ...VALID_SCOPE_DRAFT, objectives: [{ id: "bad" }] };
    expect(engagementScopeDraftSchema.safeParse(malformed).success).toBe(false);
  });

  it("rejects an empty enquiry before any model call", () => {
    expect(() => validateEnquiryInput("   ")).toThrow(EnquiryInputError);
  });

  it("rejects an over-length enquiry", () => {
    expect(() => validateEnquiryInput("x".repeat(MAX_ENQUIRY_LENGTH + 1))).toThrow(
      expect.objectContaining({ status: 413 }),
    );
  });

  it("keeps partial dates ambiguous without invented normalised dates", () => {
    expect(VALID_SCOPE_DRAFT.dates).toMatchObject({
      dateText: "in October",
      normalisedStartDate: null,
      normalisedEndDate: null,
      grounding: "ambiguous",
    });
  });

  it("requires missing delegation size to remain null", () => {
    const incomplete = {
      ...VALID_SCOPE_DRAFT,
      delegationSize: {
        value: null,
        grounding: "ambiguous" as const,
        evidenceExcerpt: "a small visit",
        inferenceExplanation: "The source gives no numeric size.",
      },
    };
    expect(engagementScopeDraftSchema.parse(incomplete).delegationSize.value).toBeNull();
    expect(INCOMPLETE_ENQUIRY).toContain("small visit");
  });

  it("requires evidence for every proposed objective", () => {
    const invalid = {
      ...VALID_SCOPE_DRAFT,
      objectives: [{ ...VALID_SCOPE_DRAFT.objectives[0], evidenceExcerpt: "" }],
    };
    expect(engagementScopeDraftSchema.safeParse(invalid).success).toBe(false);
    expect(VALID_SCOPE_DRAFT.objectives.every((objective) => objective.evidenceExcerpt.length > 0)).toBe(true);
  });

  it("requires inferred fields to include an explanation", () => {
    const invalid = {
      ...VALID_SCOPE_DRAFT,
      engagementType: { ...VALID_SCOPE_DRAFT.engagementType, inferenceExplanation: null },
    };
    expect(engagementScopeDraftSchema.safeParse(invalid).success).toBe(false);
  });

  it("requires clarification questions to correspond to missing or ambiguous scope", () => {
    const invalid = {
      ...VALID_SCOPE_DRAFT,
      clarificationQuestions: [
        { question: "Would you like a campus tour?", relatedFields: ["unrelatedPreference"] },
      ],
    };
    expect(engagementScopeDraftSchema.safeParse(invalid).success).toBe(false);
  });
});

describe("application boundaries", () => {
  it("resolves an exact partner to an existing PartnerOrganisation", () => {
    const resolution = resolvePartnerExact("Eastern Horizon University", partnerOrganisations);
    expect(resolution.status).toBe("matched");
    if (resolution.status === "matched") expect(resolution.partner.id).toBe("partner-eastern-horizon");
  });

  it("keeps an unknown partner unresolved without fuzzy matching", () => {
    expect(resolvePartnerExact("Eastern Horizon Institute", partnerOrganisations)).toEqual({
      status: "unresolved",
      mentionedName: "Eastern Horizon Institute",
    });
    expect(AMBIGUOUS_PARTNER_ENQUIRY).toContain("Eastern Horizon Institute");
  });

  it("creates only a local confirmed scope, not a canonical Engagement", () => {
    const canonicalCount = engagements.length;
    const confirmed = confirmScope(VALID_SCOPE_DRAFT, []);
    expect(confirmed.confirmationStatus).toBe("officer_confirmed");
    expect("id" in confirmed).toBe(false);
    expect(engagements).toHaveLength(canonicalCount);
  });

  it("excludes rejected AI-proposed objectives from confirmed scope", () => {
    const excludedId = VALID_SCOPE_DRAFT.objectives[0].id;
    const confirmed = confirmScope(VALID_SCOPE_DRAFT, [excludedId]);
    expect(confirmed.objectives.some((objective) => objective.id === excludedId)).toBe(false);
    expect(confirmed.includedObjectiveIds).not.toContain(excludedId);
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
