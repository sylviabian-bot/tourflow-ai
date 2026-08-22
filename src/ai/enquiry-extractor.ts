import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import {
  engagementScopeExtractionSchema,
  type EngagementScopeDraft,
} from "./enquiry-schema";
import {
  createEngagementScopeDraft,
  verifyExtractionEvidence,
} from "./enquiry-provenance";
import {
  ENQUIRY_EXTRACTION_INSTRUCTIONS,
  ENQUIRY_EXTRACTION_PROMPT_VERSION,
} from "./enquiry-prompt";

export const DEFAULT_OPENAI_MODEL = "gpt-5.6-terra";

export interface EnquiryExtractor {
  extract(enquiry: string): Promise<ExtractionResult>;
}

export interface ExtractionResult {
  draft: EngagementScopeDraft;
  metadata: { responseId: string; model: string; promptVersion: string };
}

export class OpenAIEnquiryExtractor implements EnquiryExtractor {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(options: { apiKey: string; model?: string }) {
    this.client = new OpenAI({ apiKey: options.apiKey });
    this.model = options.model || DEFAULT_OPENAI_MODEL;
  }

  async extract(enquiry: string): Promise<ExtractionResult> {
    const response = await this.client.responses.parse({
      model: this.model,
      store: false,
      reasoning: { effort: "medium" },
      max_output_tokens: 5_000,
      instructions: ENQUIRY_EXTRACTION_INSTRUCTIONS,
      input: enquiry,
      text: {
        format: zodTextFormat(engagementScopeExtractionSchema, "engagement_scope_extraction"),
      },
    });

    if (!response.output_parsed) {
      throw new Error("The model returned no validated scope draft.");
    }

    verifyExtractionEvidence(enquiry, response.output_parsed);
    const draft = createEngagementScopeDraft(response.output_parsed);

    return {
      draft,
      metadata: {
        responseId: response.id,
        model: response.model,
        promptVersion: ENQUIRY_EXTRACTION_PROMPT_VERSION,
      },
    };
  }
}
