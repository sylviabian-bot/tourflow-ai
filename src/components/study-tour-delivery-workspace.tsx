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

export function StudyTourDeliveryWorkspace({ program, participants, initialRequirements, milestones, itineraryEntries, relationshipHref }: { program: Program; participants: Participant[]; initialRequirements: Requirement[]; milestones: Milestone[]; itineraryEntries: ItineraryEntry[]; relationshipHref: string }) {
  const [requirements, setRequirements] = useState(initialRequirements);
  const summary = useMemo(() => getProgramSummary(program, participants, requirements, milestones), [milestones, participants, program, requirements]);
  const attentionItems = useMemo(() => deriveAttentionItems([program], participants, requirements, milestones, itineraryEntries), [itineraryEntries, milestones, participants, program, requirements]);
  const demoRequirementIsApproved = requirements.some((requirement) => requirement.id === DEMO_REQUIREMENT_ID && requirement.status === "approved");

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-5 border-b border-[var(--divider)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl"><p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">TourFlow · Study Tour Delivery</p><h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{program.name}</h1><p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">The accepted participant-readiness workflow within its broader Partner Relationship.</p></div>
        <p className="w-fit text-xs text-[var(--muted)]">{DEMO_SNAPSHOT_LABEL}</p>
      </header>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3"><StatusBadge tone={program.lifecycleStage}>Lifecycle · {formatLifecycleStage(program.lifecycleStage)}</StatusBadge><StatusBadge tone={summary.readinessState}>Readiness · {formatReadinessState(summary.readinessState)}</StatusBadge><Link href={relationshipHref} className="ml-auto text-sm font-semibold text-[var(--navy)] hover:underline">View Partner Relationship →</Link></div>

      <section className="border-y border-[var(--divider)] py-7" aria-labelledby="delivery-readiness-heading"><div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"><div><p className="text-xs text-[var(--muted)]">Participant readiness</p><h2 id="delivery-readiness-heading" className="mt-2 text-2xl font-semibold text-[var(--ink)]">{summary.readinessPercentage}% of represented requirements approved</h2><ReadinessBar value={summary.readinessPercentage} className="mt-4 max-w-2xl" /></div><dl className="grid grid-cols-3 gap-5 text-sm"><Metric label="Participants" value={summary.participantCount} /><Metric label="Outstanding" value={summary.outstandingRequirementCount} /><Metric label="Blocked" value={summary.participantReadiness.blocked} attention /></dl></div></section>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]"><AttentionQueue items={attentionItems} programs={[program]} demoRequirementIsApproved={demoRequirementIsApproved} onConfirmRequirement={(requirementId) => setRequirements((current) => confirmRequirement(current, requirementId))} onResetDemo={() => setRequirements(initialRequirements)} /><section className="border-t border-[var(--divider)] pt-5" aria-labelledby="arrival-logistics-heading"><p className="text-xs text-[var(--muted)]">Itinerary / logistics</p><h2 id="arrival-logistics-heading" className="mt-1 text-xl font-semibold text-[var(--ink)]">Arrival day</h2><ol className="mt-5 space-y-4">{itineraryEntries.map((entry) => <li key={entry.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-l border-[var(--divider)] pl-4"><p className="text-sm font-semibold tabular-nums text-[var(--navy)]">{entry.startTime}</p><div><p className="text-sm font-semibold text-[var(--ink)]">{entry.title}</p><p className="mt-1 text-xs leading-5 text-[var(--muted)]">{formatDemoDate(entry.date)} · {entry.location} · {entry.confirmationState}</p></div></li>)}</ol></section></div>
    </div>
  );
}

function Metric({ label, value, attention = false }: { label: string; value: number; attention?: boolean }) {
  return <div><dt className="text-xs text-[var(--muted)]">{label}</dt><dd className={`mt-1 text-2xl font-semibold tabular-nums ${attention ? "text-[var(--burgundy)]" : "text-[var(--ink)]"}`}>{value}</dd></div>;
}
