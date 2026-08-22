"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ReadinessBar } from "@/components/readiness-bar";
import { StatusBadge } from "@/components/status-badge";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import {
  formatLifecycleStage,
  formatReadinessState,
} from "@/domain/presentation";
import { buildDashboardSnapshot, confirmRequirement } from "@/domain/rules";
import type {
  ItineraryEntry,
  Milestone,
  Participant,
  Program,
  Requirement,
} from "@/domain/types";

import { AttentionQueue } from "./attention-queue";
import { MilestoneList } from "./milestone-list";
import { ParticipantReadinessPanel } from "./participant-readiness-panel";
import { ProgramCard } from "./program-card";

const DEMO_REQUIREMENT_ID = "sha-req-travel-insurance-01";

interface DashboardWorkspaceProps {
  programs: Program[];
  participants: Participant[];
  initialRequirements: Requirement[];
  milestones: Milestone[];
  itineraryEntries: ItineraryEntry[];
}

export function DashboardWorkspace({
  programs,
  participants,
  initialRequirements,
  milestones,
  itineraryEntries,
}: DashboardWorkspaceProps) {
  const [requirements, setRequirements] = useState(initialRequirements);
  const snapshot = useMemo(
    () =>
      buildDashboardSnapshot(
        programs,
        participants,
        requirements,
        milestones,
        itineraryEntries,
      ),
    [itineraryEntries, milestones, participants, programs, requirements],
  );
  const demoRequirementIsApproved =
    requirements.find((requirement) => requirement.id === DEMO_REQUIREMENT_ID)
      ?.status === "approved";
  const primaryProgram = snapshot.primaryProgram;

  function handleConfirmRequirement(requirementId: string) {
    setRequirements((current) => confirmRequirement(current, requirementId));
  }

  function handleResetDemo() {
    setRequirements(initialRequirements);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Portfolio triage
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            What needs your attention today?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Review program readiness, time-sensitive requirements, and the next
            operational milestones across the active portfolio.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-teal-600" aria-hidden="true" />
          {DEMO_SNAPSHOT_LABEL}
        </div>
      </header>

      {primaryProgram ? (
        <section
          aria-labelledby="priority-focus-heading"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.45)]"
        >
          <div className="grid xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.55fr)]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Priority focus
                </p>
                <StatusBadge tone={primaryProgram.program.lifecycleStage}>
                  {formatLifecycleStage(primaryProgram.program.lifecycleStage)}
                </StatusBadge>
                <StatusBadge tone={primaryProgram.readinessState}>
                  {formatReadinessState(primaryProgram.readinessState)}
                </StatusBadge>
              </div>
              <h2
                id="priority-focus-heading"
                className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl"
              >
                {primaryProgram.program.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {primaryProgram.program.destination} · Departs in{" "}
                <span className="font-semibold text-slate-900">
                  {primaryProgram.daysUntilDeparture} days
                </span>
              </p>

              <div className="mt-7 max-w-2xl">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Program readiness</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Derived from participant requirements
                    </p>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums text-slate-950">
                    {primaryProgram.readinessPercentage}%
                  </p>
                </div>
                <ReadinessBar value={primaryProgram.readinessPercentage} className="mt-3" />
              </div>

              <Link
                href={`/programs/${primaryProgram.program.id}`}
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#173f5f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e2f49]"
              >
                Review program
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 xl:border-l xl:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Why it needs attention
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-xs font-medium text-slate-500">Outstanding requirements</dt>
                  <dd className="mt-2 text-3xl font-semibold tabular-nums text-slate-950">
                    {primaryProgram.outstandingRequirementCount}
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-xs font-medium text-slate-500">Blocked participants</dt>
                  <dd className="mt-2 text-3xl font-semibold tabular-nums text-slate-950">
                    {primaryProgram.participantReadiness.blocked}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Start with high-priority participant requirements, then confirm
                the arrival-day coach allocation.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="active-programs-heading">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Active portfolio
            </p>
            <h2 id="active-programs-heading" className="mt-1 text-xl font-semibold text-slate-950">
              Programs
            </h2>
          </div>
          <Link href="/programs" className="text-sm font-semibold text-[#173f5f] hover:underline">
            View all programs
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {snapshot.programSummaries.map((summary) => (
            <ProgramCard key={summary.program.id} summary={summary} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <AttentionQueue
          items={snapshot.attentionItems.slice(0, 7)}
          programs={programs}
          demoRequirementIsApproved={demoRequirementIsApproved}
          onConfirmRequirement={handleConfirmRequirement}
          onResetDemo={handleResetDemo}
        />
        <div className="space-y-6">
          <ParticipantReadinessPanel
            summary={snapshot.participantReadiness}
            outstandingRequirementCount={snapshot.outstandingRequirementCount}
          />
          <MilestoneList milestones={snapshot.upcomingMilestones} programs={programs} />
        </div>
      </div>
    </div>
  );
}
