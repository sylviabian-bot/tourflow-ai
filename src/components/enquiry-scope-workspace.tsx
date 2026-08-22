"use client";

import { useState } from "react";

import {
  MAX_ENQUIRY_LENGTH,
  engagementScopeDraftSchema,
  type EngagementScopeDraft,
} from "@/ai/enquiry-schema";
import {
  confirmScope,
  resolvePartnerExact,
  type ConfirmedEngagementScope,
} from "@/ai/enquiry-rules";
import { partnerOrganisations } from "@/data/engagement-fixtures";
import { SAMPLE_ENQUIRY } from "@/data/enquiry-fixtures";
import type { EngagementType } from "@/domain/types";

import { SectionHeader } from "./editorial";
import { GroundingIndicator } from "./grounding-indicator";

type WorkflowState = "source" | "analysing" | "review" | "confirmed";

const engagementTypeOptions: Array<{ value: EngagementType | "unknown"; label: string }> = [
  { value: "delegation_visit", label: "Delegation visit" },
  { value: "study_tour", label: "Study Tour" },
  { value: "partner_meeting", label: "Partner meeting" },
  { value: "short_program", label: "Short program" },
  { value: "unknown", label: "Unknown" },
];

export function EnquiryScopeWorkspace() {
  const [enquiry, setEnquiry] = useState("");
  const [workflowState, setWorkflowState] = useState<WorkflowState>("source");
  const [draft, setDraft] = useState<EngagementScopeDraft | null>(null);
  const [confirmedScope, setConfirmedScope] = useState<ConfirmedEngagementScope | null>(null);
  const [excludedObjectiveIds, setExcludedObjectiveIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function analyseEnquiry() {
    const trimmed = enquiry.trim();
    if (!trimmed) {
      setError("Enter an enquiry before analysing it.");
      return;
    }
    if (trimmed.length > MAX_ENQUIRY_LENGTH) {
      setError(`Enquiry must be ${MAX_ENQUIRY_LENGTH.toLocaleString()} characters or fewer.`);
      return;
    }

    setError(null);
    setWorkflowState("analysing");
    try {
      const response = await fetch("/api/ai/enquiry-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiry: trimmed }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const message = getErrorMessage(payload);
        throw new Error(message);
      }
      const candidate = getDraft(payload);
      const parsed = engagementScopeDraftSchema.safeParse(candidate);
      if (!parsed.success) throw new Error("The AI response did not match the required scope structure.");
      setDraft(parsed.data);
      setExcludedObjectiveIds([]);
      setConfirmedScope(null);
      setWorkflowState("review");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The enquiry could not be analysed. Your source text has not been changed.");
      setWorkflowState("source");
    }
  }

  function loadSample() {
    setEnquiry(SAMPLE_ENQUIRY);
    setError(null);
    setDraft(null);
    setConfirmedScope(null);
    setWorkflowState("source");
  }

  function updateDraft(update: (current: EngagementScopeDraft) => EngagementScopeDraft) {
    setDraft((current) => (current ? update(current) : current));
    setConfirmedScope(null);
    setWorkflowState("review");
  }

  function confirmCurrentScope() {
    if (!draft) return;
    const confirmed = confirmScope(draft, excludedObjectiveIds);
    setConfirmedScope(confirmed);
    setWorkflowState("confirmed");
  }

  return (
    <div className="space-y-12">
      <header className="border-b border-[var(--divider)] pb-8">
        <p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">AI-ASSISTED EXTRACTION</p>
        <h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">Scope a partner enquiry</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Turn an incoming partner message into a reviewable engagement scope. AI structures the source; an officer decides what is accepted.
        </p>
        <p className="mt-4 text-xs text-[var(--burgundy)]">Demo prototype · do not enter confidential student or institutional information.</p>
      </header>

      <section aria-labelledby="source-enquiry-heading">
        <SectionHeader
          id="source-enquiry-heading"
          title="SOURCE ENQUIRY"
          description="One Analyse action sends this text to our server-side OpenAI extraction route. It does not create an Engagement."
          action={<button type="button" onClick={loadSample} className="text-sm font-semibold text-[var(--navy)] hover:underline">Load fictional sample</button>}
        />
        <label htmlFor="enquiry" className="mt-6 block text-sm font-semibold text-[var(--ink)]">Partner message</label>
        <textarea
          id="enquiry"
          value={enquiry}
          onChange={(event) => setEnquiry(event.target.value)}
          maxLength={MAX_ENQUIRY_LENGTH + 1}
          rows={12}
          disabled={workflowState === "analysing"}
          className="mt-2 min-h-64 w-full resize-y rounded border border-[var(--divider)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--ink)]"
          placeholder="Paste a fictional or non-confidential partner enquiry…"
        />
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tabular-nums text-[var(--muted)]">{enquiry.length.toLocaleString()} / {MAX_ENQUIRY_LENGTH.toLocaleString()} characters</p>
          <button
            type="button"
            onClick={analyseEnquiry}
            disabled={workflowState === "analysing"}
            className="inline-flex min-h-11 items-center justify-center rounded bg-[var(--navy)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {workflowState === "analysing" ? "Analysing enquiry…" : "Analyse enquiry"}
          </button>
        </div>
        {workflowState === "analysing" ? <p className="mt-4 text-sm text-[var(--context)]" role="status">Extracting partner context, dates and proposed objectives.</p> : null}
        {error ? <div className="mt-5 border-l-2 border-[var(--burgundy)] pl-4" role="alert"><p className="text-sm font-semibold text-[var(--ink)]">Analysis unavailable</p><p className="mt-1 text-sm text-[var(--muted)]">{error}</p><p className="mt-2 text-xs text-[var(--muted)]">Your source text has not been changed. You can review it and retry.</p></div> : null}
      </section>

      {draft ? (
        <ScopeDraftReview
          draft={draft}
          excludedObjectiveIds={excludedObjectiveIds}
          setExcludedObjectiveIds={setExcludedObjectiveIds}
          updateDraft={updateDraft}
          onConfirm={confirmCurrentScope}
        />
      ) : null}

      {workflowState === "confirmed" && confirmedScope ? <ConfirmedScope scope={confirmedScope} /> : null}
    </div>
  );
}

function ScopeDraftReview({
  draft,
  excludedObjectiveIds,
  setExcludedObjectiveIds,
  updateDraft,
  onConfirm,
}: {
  draft: EngagementScopeDraft;
  excludedObjectiveIds: string[];
  setExcludedObjectiveIds: (ids: string[]) => void;
  updateDraft: (update: (current: EngagementScopeDraft) => EngagementScopeDraft) => void;
  onConfirm: () => void;
}) {
  const partnerResolution = resolvePartnerExact(draft.mentionedOrganisationName.value, partnerOrganisations);
  const excluded = new Set(excludedObjectiveIds);

  return (
    <section aria-labelledby="scope-draft-heading" className="border-t border-[var(--divider)] pt-10">
      <div className="flex flex-col gap-4 border-b border-[var(--divider)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-medium tracking-[0.08em] text-[var(--ochre)]">AI DRAFT · OFFICER REVIEW REQUIRED</p><h2 id="scope-draft-heading" className="editorial-title mt-2 text-3xl text-[var(--ink)]">Structured scope draft</h2></div>
        <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">No canonical Engagement or Objective records have been created.</p>
      </div>

      <div className="divide-y divide-[var(--divider)]">
        <ReviewField label="Partner" grounding={draft.mentionedOrganisationName.grounding} evidence={draft.mentionedOrganisationName.evidenceExcerpt} explanation={draft.mentionedOrganisationName.inferenceExplanation}>
          <input aria-label="Partner organisation" value={draft.mentionedOrganisationName.value ?? ""} onChange={(event) => updateDraft((current) => ({ ...current, mentionedOrganisationName: { ...current.mentionedOrganisationName, value: event.target.value || null } }))} className="w-full max-w-xl rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm" />
          <p className="mt-2 text-xs text-[var(--context)]">{partnerResolution.status === "matched" ? `Matched existing relationship · ${partnerResolution.partner.name}` : partnerResolution.status === "ambiguous" ? "Multiple exact partner records require officer resolution." : "No exact partner match · officer resolution required"}</p>
        </ReviewField>

        <ReviewField label="Engagement type" grounding={draft.engagementType.grounding} evidence={draft.engagementType.evidenceExcerpt} explanation={draft.engagementType.inferenceExplanation}>
          <select aria-label="Engagement type" value={draft.engagementType.value ?? "unknown"} onChange={(event) => updateDraft((current) => ({ ...current, engagementType: { ...current.engagementType, value: event.target.value as EngagementScopeDraft["engagementType"]["value"] } }))} className="w-full max-w-sm rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm">
            {engagementTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </ReviewField>

        <ReviewField label="Dates" grounding={draft.dates.grounding} evidence={draft.dates.evidenceExcerpt} explanation={draft.dates.inferenceExplanation}>
          <input aria-label="Date description" value={draft.dates.dateText ?? ""} onChange={(event) => updateDraft((current) => ({ ...current, dates: { ...current.dates, dateText: event.target.value || null } }))} className="w-full max-w-xl rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm" placeholder="Not provided" />
          <p className="mt-2 text-xs text-[var(--muted)]">Normalised dates: {draft.dates.normalisedStartDate ?? "not established"} → {draft.dates.normalisedEndDate ?? "not established"}</p>
        </ReviewField>

        <ReviewField label="Delegation size" grounding={draft.delegationSize.grounding} evidence={draft.delegationSize.evidenceExcerpt} explanation={draft.delegationSize.inferenceExplanation}>
          <input aria-label="Delegation size" type="number" min="1" value={draft.delegationSize.value ?? ""} onChange={(event) => updateDraft((current) => ({ ...current, delegationSize: { ...current.delegationSize, value: event.target.value ? Number(event.target.value) : null } }))} className="w-full max-w-40 rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm" placeholder="Not provided" />
        </ReviewField>
      </div>

      <section aria-labelledby="interests-heading" className="mt-10"><SectionHeader id="interests-heading" title="STRATEGIC INTERESTS" description="Normalised themes remain grounded in the enquiry." /><ul className="divide-y divide-[var(--divider)]">{draft.strategicInterests.map((interest) => <li key={`${interest.value}-${interest.evidenceExcerpt}`} className="grid gap-3 py-5 sm:grid-cols-[12rem_minmax(0,1fr)]"><div><p className="font-semibold text-[var(--ink)]">{interest.value}</p><div className="mt-2"><GroundingIndicator status={interest.grounding} /></div></div><Evidence evidence={interest.evidenceExcerpt} explanation={interest.inferenceExplanation} /></li>)}</ul></section>

      <section aria-labelledby="objectives-heading" className="mt-10"><SectionHeader id="objectives-heading" title="PROPOSED OBJECTIVES" description="AI-proposed objectives enter the confirmed scope only when the officer keeps them included." /><ol className="divide-y divide-[var(--divider)]">{draft.objectives.map((objective, index) => { const isExcluded = excluded.has(objective.id); return <li key={objective.id} className="grid gap-4 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto]"><span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><h3 className={`font-semibold ${isExcluded ? "text-[var(--muted)] line-through" : "text-[var(--ink)]"}`}>{objective.title}</h3><div className="mt-2"><GroundingIndicator status={objective.grounding} /></div><div className="mt-4"><Evidence evidence={objective.evidenceExcerpt} explanation={objective.inferenceExplanation} /></div></div><button type="button" aria-pressed={isExcluded} onClick={() => setExcludedObjectiveIds(isExcluded ? excludedObjectiveIds.filter((id) => id !== objective.id) : [...excludedObjectiveIds, objective.id])} className="self-start text-sm font-semibold text-[var(--navy)] hover:underline">{isExcluded ? "Include" : "Exclude"}</button></li>; })}</ol></section>

      <section aria-labelledby="missing-heading" className="mt-10 grid gap-10 lg:grid-cols-2"><div><SectionHeader id="missing-heading" title="MISSING INFORMATION" /><ul className="mt-3 divide-y divide-[var(--divider)]">{draft.missingInformation.map((item) => <li key={`${item.field}-${item.detail}`} className="py-4"><p className="text-sm font-semibold text-[var(--ink)]">{item.field}</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.detail}</p></li>)}</ul></div><div><SectionHeader id="questions-heading" title="CLARIFICATION QUESTIONS" /><ol aria-labelledby="questions-heading" className="mt-3 divide-y divide-[var(--divider)]">{draft.clarificationQuestions.map((item, index) => <li key={item.question} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4"><span className="text-xs tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><p className="text-sm leading-6 text-[var(--ink)]">{item.question}</p><p className="mt-1 text-xs text-[var(--muted)]">Addresses · {item.relatedFields.join(", ")}</p></div></li>)}</ol></div></section>

      <div className="mt-10 flex flex-col gap-3 border-t border-[var(--divider)] pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[var(--muted)]">Confirmation is local to this demo session and does not create an Engagement.</p><button type="button" onClick={onConfirm} disabled={draft.objectives.length === excludedObjectiveIds.length} className="inline-flex min-h-11 items-center justify-center rounded bg-[var(--navy)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-50">Confirm scope</button></div>
    </section>
  );
}

function ReviewField({ label, grounding, evidence, explanation, children }: { label: string; grounding: EngagementScopeDraft["engagementType"]["grounding"]; evidence: string | null; explanation: string | null; children: React.ReactNode }) {
  return <section className="grid gap-5 py-6 lg:grid-cols-[12rem_minmax(0,1fr)_minmax(16rem,0.8fr)]"><div><p className="text-sm font-semibold text-[var(--ink)]">{label}</p><div className="mt-2"><GroundingIndicator status={grounding} /></div></div><div>{children}</div><Evidence evidence={evidence} explanation={explanation} /></section>;
}

function Evidence({ evidence, explanation }: { evidence: string | null; explanation: string | null }) {
  return <div><p className="text-xs text-[var(--muted)]">Evidence</p><p className="mt-1 text-sm leading-6 text-[var(--ink)]">{evidence ? `“${evidence}”` : "No source evidence provided."}</p>{explanation ? <p className="mt-2 text-xs leading-5 text-[var(--ochre)]">Inference: {explanation}</p> : null}</div>;
}

function ConfirmedScope({ scope }: { scope: ConfirmedEngagementScope }) {
  return <section aria-labelledby="confirmed-heading" className="border-y border-[var(--sage)] py-8"><p className="text-xs font-medium tracking-[0.08em] text-[var(--sage)]">OFFICER-CONFIRMED SCOPE</p><h2 id="confirmed-heading" className="editorial-title mt-2 text-3xl text-[var(--ink)]">Scope confirmed for this demo session</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">This local confirmation accepts {scope.objectives.length} proposed {scope.objectives.length === 1 ? "objective" : "objectives"}. It has not created or updated canonical Engagement records.</p><dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-xs text-[var(--muted)]">Partner</dt><dd className="mt-1 text-sm font-semibold text-[var(--ink)]">{scope.mentionedOrganisationName.value ?? "Unresolved"}</dd></div><div><dt className="text-xs text-[var(--muted)]">Engagement type</dt><dd className="mt-1 text-sm font-semibold text-[var(--ink)]">{scope.engagementType.value ?? "Unknown"}</dd></div><div><dt className="text-xs text-[var(--muted)]">Dates</dt><dd className="mt-1 text-sm font-semibold text-[var(--ink)]">{scope.dates.dateText ?? "Not established"}</dd></div><div><dt className="text-xs text-[var(--muted)]">Delegation size</dt><dd className="mt-1 text-sm font-semibold text-[var(--ink)]">{scope.delegationSize.value ?? "Not established"}</dd></div></dl></section>;
}

function getDraft(payload: unknown): unknown {
  return typeof payload === "object" && payload !== null && "draft" in payload ? (payload as { draft: unknown }).draft : null;
}

function getErrorMessage(payload: unknown): string {
  if (typeof payload === "object" && payload !== null && "error" in payload) {
    const error = (payload as { error: unknown }).error;
    if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string") return (error as { message: string }).message;
  }
  return "The enquiry could not be analysed. Your source text has not been changed.";
}
