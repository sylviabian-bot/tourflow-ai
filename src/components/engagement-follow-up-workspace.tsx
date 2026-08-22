"use client";

import { EngagementLocalNavigation } from "@/components/engagement-local-navigation";
import { SectionHeader } from "@/components/editorial";
import {
  DELEGATION_ENGAGEMENT_ID,
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationships,
} from "@/data/engagement-fixtures";
import { commitments, engagementOutcomes } from "@/data/follow-up-fixtures";
import {
  applyCommitmentCompletionState,
  deriveRelationshipSignalsFromOutcomes,
  getOutcomeRetentionReason,
} from "@/domain/follow-up-rules";
import { formatDemoDate } from "@/domain/presentation";
import type { Commitment } from "@/domain/types";
import { useEngagementPlanning } from "./engagement-planning-provider";

export function EngagementFollowUpWorkspace() {
  const engagement = engagements.find((candidate) => candidate.id === DELEGATION_ENGAGEMENT_ID)!;
  const relationship = relationships.find((candidate) => candidate.id === engagement.relationshipId)!;
  const partner = partnerOrganisations.find((candidate) => candidate.id === relationship.partnerOrganisationId)!;
  const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);
  const objectiveById = new Map(objectives.map((objective) => [objective.id, objective]));
  const outcomeById = new Map(engagementOutcomes.map((outcome) => [outcome.id, outcome]));
  const { completedCommitmentIds, completeCommitment, resetFollowUp } = useEngagementPlanning();
  const currentCommitments = applyCommitmentCompletionState(commitments, completedCommitmentIds);
  const generatedSignals = deriveRelationshipSignalsFromOutcomes(engagementOutcomes, engagements);
  const openCount = currentCommitments.filter((commitment) => commitment.status === "open").length;

  return (
    <div className="space-y-12">
      <header className="border-b border-[var(--divider)] pb-8">
        <p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">POST-ENGAGEMENT FOLLOW-UP</p>
        <h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{engagement.title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{partner.name} · Composite post-engagement demonstration</p>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Fictional outcomes recorded after the visit show how engagement results become owned follow-up and reusable relationship context.
        </p>
      </header>

      <EngagementLocalNavigation engagementId={engagement.id} />

      <section aria-labelledby="outcomes-heading">
        <SectionHeader id="outcomes-heading" title="OUTCOMES" description="Each result remains linked to the objective it advances." />
        <ol className="divide-y divide-[var(--divider)]">
          {engagementOutcomes.map((outcome, index) => {
            const objective = objectiveById.get(outcome.objectiveId)!;
            const linkedCommitments = currentCommitments.filter((commitment) => commitment.outcomeId === outcome.id);
            return (
              <li key={outcome.id} className="grid gap-5 py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
                <span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-xs text-[var(--muted)]">Objective</p>
                  <h2 className="mt-1 text-base font-semibold text-[var(--ink)]">{objective.title}</h2>
                  <div className="mt-5 border-l-2 border-[var(--context)] pl-4">
                    <p className="text-xs text-[var(--muted)]">Outcome · {formatOutcomeType(outcome.type)}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[var(--ink)]">{outcome.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{outcome.summary}</p>
                    <p className="mt-3 text-xs tabular-nums text-[var(--muted)]">Recorded {formatDemoDate(outcome.recordedDate)} · Fictional composite record</p>
                  </div>
                  <p className="mt-4 text-xs text-[var(--navy)]">{linkedCommitments.length} linked follow-up {linkedCommitments.length === 1 ? "commitment" : "commitments"}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="commitments-heading">
        <SectionHeader
          id="commitments-heading"
          title="FOLLOW-UP COMMITMENTS"
          description={`${openCount} open · ${currentCommitments.length - openCount} completed. Commitments exist only because of recorded engagement outcomes.`}
          action={<button type="button" onClick={resetFollowUp} className="text-sm font-semibold text-[var(--navy)] hover:underline">Reset follow-up demo</button>}
        />
        <ol className="divide-y divide-[var(--divider)]">
          {currentCommitments.map((commitment) => {
            const outcome = outcomeById.get(commitment.outcomeId)!;
            const objective = objectiveById.get(outcome.objectiveId)!;
            return (
              <li key={commitment.id} className="grid gap-4 py-6 lg:grid-cols-[8rem_minmax(0,1fr)_11rem] lg:gap-7">
                <div>
                  <p className="text-xs tabular-nums text-[var(--muted)]">Due</p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--ink)]">{formatDemoDate(commitment.dueDate)}</p>
                  <CommitmentStatus commitment={commitment} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--ink)]">{commitment.description}</h3>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div><dt className="text-xs text-[var(--muted)]">Owner</dt><dd className="mt-1 text-[var(--ink)]">{commitment.ownerName} · {commitment.ownerContext}</dd></div>
                    <div><dt className="text-xs text-[var(--muted)]">Direction</dt><dd className="mt-1 text-[var(--ink)]">{formatDirection(commitment.direction)}</dd></div>
                  </dl>
                  <div className="mt-4 border-t border-[var(--divider)] pt-3 text-xs leading-5 text-[var(--muted)]">
                    <p><span className="font-medium text-[var(--ink)]">Source outcome:</span> {outcome.title}</p>
                    <p className="mt-1"><span className="font-medium text-[var(--ink)]">Objective:</span> {objective.title}</p>
                  </div>
                </div>
                <div className="lg:text-right">
                  {commitment.status === "open" ? (
                    <button type="button" onClick={() => completeCommitment(commitment.id)} className="inline-flex min-h-10 items-center justify-center rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--navy)] hover:bg-white">
                      Complete commitment
                    </button>
                  ) : <span className="text-xs text-[var(--sage)]">Follow-up recorded</span>}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="memory-impact-heading">
        <SectionHeader id="memory-impact-heading" title="RELATIONSHIP MEMORY IMPACT" description="Only strategically reusable outcomes are retained for future engagement preparation." />
        <ol className="divide-y divide-[var(--divider)]">
          {generatedSignals.map((signal) => {
            const outcome = engagementOutcomes.find((candidate) => `signal-from-${candidate.id}` === signal.id)!;
            return (
              <li key={signal.id} className="grid gap-4 py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-7">
                <div><p className="text-xs text-[var(--context)]">Retained context</p><p className="mt-1 text-xs tabular-nums text-[var(--muted)]">{formatDemoDate(signal.recordedDate)}</p></div>
                <div><h3 className="text-base font-semibold text-[var(--ink)]">{signal.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{signal.detail}</p><p className="mt-3 text-xs text-[var(--context)]">{getOutcomeRetentionReason(outcome)}</p><p className="mt-2 text-xs text-[var(--muted)]">Source · {engagement.title}</p></div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function CommitmentStatus({ commitment }: { commitment: Commitment }) {
  const completed = commitment.status === "completed";
  return <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[var(--ink)]"><span className={`h-2 w-2 rounded-full ${completed ? "bg-[var(--sage)]" : "bg-[var(--ochre)]"}`} aria-hidden="true" />{completed ? "Completed" : "Open"}</span>;
}

function formatOutcomeType(type: string): string {
  return type.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

function formatDirection(direction: Commitment["direction"]): string {
  if (direction === "our_institution") return "Our institution";
  if (direction === "partner") return "Partner";
  return "Shared";
}
