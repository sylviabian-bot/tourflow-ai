"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AttentionQueue } from "@/components/dashboard/attention-queue";
import { ReadinessBar } from "@/components/readiness-bar";
import { StatusBadge } from "@/components/status-badge";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { formatDemoDate, formatLifecycleStage, formatReadinessState } from "@/domain/presentation";
import { confirmRequirement, deriveAttentionItems, getProgramSummary } from "@/domain/rules";
import type { ItineraryEntry, Milestone, Participant, Program, Requirement } from "@/domain/types";

const DEMO_REQUIREMENT_ID = "sha-req-travel-insurance-01";

export function StudyTourDeliveryWorkspace({
  program,
  participants,
  initialRequirements,
  milestones,
  itineraryEntries,
  relationshipHref,
}: {
  program: Program;
  participants: Participant[];
  initialRequirements: Requirement[];
  milestones: Milestone[];
  itineraryEntries: ItineraryEntry[];
  relationshipHref: string;
}) {
  const [requirements, setRequirements] = useState(initialRequirements);
  const summary = useMemo(
    () => getProgramSummary(program, participants, requirements, milestones),
    [milestones, participants, program, requirements],
  );
  const attentionItems = useMemo(
    () =>
      deriveAttentionItems(
        [program],
        participants,
        requirements,
        milestones,
        itineraryEntries,
      ),
    [itineraryEntries, milestones, participants, program, requirements],
  );
  const demoRequirementIsApproved = requirements.some(
    (requirement) =>
      requirement.id === DEMO_REQUIREMENT_ID && requirement.status === "approved",
  );

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            TourFlow · Study Tour Delivery
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            {program.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            The accepted Sprint 01 participant-readiness workflow, now accessed within its broader Partner Relationship.
          </p>
        </div>
        <p className="w-fit rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
          {DEMO_SNAPSHOT_LABEL}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={program.lifecycleStage}>
          Lifecycle · {formatLifecycleStage(program.lifecycleStage)}
        </StatusBadge>
        <StatusBadge tone={summary.readinessState}>
          Readiness · {formatReadinessState(summary.readinessState)}
        </StatusBadge>
        <Link href={relationshipHref} className="ml-auto rounded-sm text-sm font-semibold text-[#173f5f] hover:underline">
          View Partner Relationship →
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="delivery-readiness-heading">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Participant readiness</p>
            <h2 id="delivery-readiness-heading" className="mt-2 text-2xl font-semibold text-slate-950">
              {summary.readinessPercentage}% of represented requirements approved
            </h2>
            <ReadinessBar value={summary.readinessPercentage} className="mt-4 max-w-2xl" />
          </div>
          <dl className="grid grid-cols-3 gap-5 text-sm">
            <div><dt className="text-xs text-slate-500">Participants</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{summary.participantCount}</dd></div>
            <div><dt className="text-xs text-slate-500">Outstanding</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{summary.outstandingRequirementCount}</dd></div>
            <div><dt className="text-xs text-slate-500">Blocked</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{summary.participantReadiness.blocked}</dd></div>
          </dl>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <AttentionQueue
          items={attentionItems}
          programs={[program]}
          demoRequirementIsApproved={demoRequirementIsApproved}
          onConfirmRequirement={(requirementId) =>
            setRequirements((current) => confirmRequirement(current, requirementId))
          }
          onResetDemo={() => setRequirements(initialRequirements)}
        />
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="arrival-logistics-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Itinerary / logistics</p>
          <h2 id="arrival-logistics-heading" className="mt-1 text-xl font-semibold text-slate-950">Arrival day</h2>
          <ol className="mt-5 space-y-4">
            {itineraryEntries.map((entry) => (
              <li key={entry.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-l-2 border-slate-200 pl-4">
                <p className="text-sm font-semibold tabular-nums text-slate-700">{entry.startTime}</p>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{entry.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{formatDemoDate(entry.date)} · {entry.location} · {entry.confirmationState}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
