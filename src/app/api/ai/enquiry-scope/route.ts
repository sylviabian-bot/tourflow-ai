import { NextResponse } from "next/server";

import {
  EnquiryInputError,
  validateEnquiryInput,
} from "@/ai/enquiry-schema";
import {
  DEFAULT_OPENAI_MODEL,
  OpenAIEnquiryExtractor,
} from "@/ai/enquiry-extractor";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Request body must be valid JSON.", 400, "invalid_request");
  }

  let enquiry: string;
  try {
    enquiry = validateEnquiryInput(
      typeof body === "object" && body !== null && "enquiry" in body
        ? (body as { enquiry: unknown }).enquiry
        : undefined,
    );
  } catch (error) {
    if (error instanceof EnquiryInputError) {
      return errorResponse(error.message, error.status, "invalid_enquiry");
    }
    return errorResponse("The enquiry could not be validated.", 400, "invalid_enquiry");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return errorResponse(
      "Live AI extraction is not configured in this environment.",
      503,
      "not_configured",
    );
  }

  try {
    const extractor = new OpenAIEnquiryExtractor({
      apiKey,
      model: process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL,
    });
    const result = await extractor.extract(enquiry);
    if (process.env.NODE_ENV === "development") {
      console.info("Enquiry extraction completed", result.metadata);
    }
    return NextResponse.json(result);
  } catch {
    return errorResponse(
      "The enquiry could not be analysed. Your source text has not been changed.",
      502,
      "extraction_failed",
    );
  }
}

function errorResponse(message: string, status: number, code: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}
