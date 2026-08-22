"use client";

import Link from "next/link";

import { AgendaParticipation } from "@/components/agenda-participation";
import { EngagementLocalNavigation } from "@/components/engagement-local-navigation";
import { SectionHeader } from "@/components/editorial";
import { DELEGATION_ENGAGEMENT_ID, engagementObjectives, engagements } from "@/data/engagement-fixtures";
import { delegationAgendaItems, internalStakeholders, universityCapabilities } from "@/data/planning-fixtures";
import { deriveStakeholderAssignments } from "@/domain/planning-rules";
import { formatDemoDate } from "@/domain/presentation";
import { useEngagementPlanning } from "./engagement-planning-provider";

export function DelegationProgramWorkspace() {
  const engagement = engagements.find((candidate) => candidate.id === DELEGATION_ENGAGEMENT_ID)!;
  const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);
  const { confirmedAssignmentIds, confirmAssignment, resetAssignments } = useEngagementPlanning();
  const assignments = deriveStakeholderAssignments(engagement, objectives, universityCapabilities, internalStakeholders, confirmedAssignmentIds);
  const stakeholderById = new Map(internalStakeholders.map((stakeholder) => [stakeholder.id, stakeholder]));
  const capabilityById = new Map(universityCapabilities.map((capability) => [capability.id, capability]));
  const confirmedCount = assignments.filter((assignment) => assignment.status === "confirmed").length;

  return (
    <div className="space-y-10">
      <header className="border-b border-[var(--divider)] pb-8"><p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">ENGAGEMENT PROGRAM</p><h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">Senior Delegation Visit</h1><p className="mt-4 text-sm text-[var(--muted)]">Eastern Horizon University · {formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}</p></header>
      <EngagementLocalNavigation engagementId={engagement.id} />

      <section aria-labelledby="stakeholder-planning-heading">
        <SectionHeader id="stakeholder-planning-heading" title="OBJECTIVES AND INTERNAL STAKEHOLDERS" description="Deterministic suggestions based on shared themes. Officer confirmation is required before institutional involvement is treated as agreed." action={<button type="button" onClick={resetAssignments} className="text-sm font-semibold text-[var(--navy)] hover:underline">Reset review</button>} />
        <div className="divide-y divide-[var(--divider)]">
          {objectives.map((objective, index) => {
            const objectiveAssignments = assignments.filter((assignment) => assignment.objectiveId === objective.id);
            return <article key={objective.id} className="grid gap-5 py-7 lg:grid-cols-[3rem_minmax(0,0.8fr)_minmax(24rem,1.2fr)]"><span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="text-lg font-semibold text-[var(--ink)]">{objective.title}</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{objective.description}</p></div><ul className="divide-y divide-[var(--divider)] border-t border-[var(--divider)]">{objectiveAssignments.map((assignment) => { const stakeholder = stakeholderById.get(assignment.stakeholderId)!; const capability = capabilityById.get(stakeholder.capabilityId)!; return <li key={assignment.id} className="py-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold text-[var(--ink)]">{stakeholder.name}</h3><AssignmentStatus status={assignment.status} /></div><p className="mt-1 text-sm text-[var(--navy)]">{stakeholder.role}</p><p className="mt-1 text-xs text-[var(--muted)]">{capability.name}</p><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]"><span className="font-medium text-[var(--ink)]">Suggested because:</span> {assignment.rationale}</p></div>{assignment.status === "suggested" ? <button type="button" onClick={() => confirmAssignment(assignment.id)} className="inline-flex min-h-10 shrink-0 items-center justify-center rounded border border-[var(--divider)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--navy)] hover:bg-white">Confirm stakeholder</button> : null}</div></li>; })}</ul></article>;
          })}
        </div>
      </section>

      <section aria-labelledby="program-heading"><SectionHeader id="program-heading" title="MONDAY · 19 OCTOBER" description="Objective-led visit program. Activities remain proposed unless marked confirmed." /><ol className="divide-y divide-[var(--divider)]">{delegationAgendaItems.map((item) => { const itemObjectives = objectives.filter((objective) => item.objectiveIds.includes(objective.id)); return <li key={item.id} className="grid gap-4 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"><div><p className="text-lg font-semibold tabular-nums text-[var(--navy)]">{item.startTime}</p><p className="mt-1 text-xs tabular-nums text-[var(--muted)]">to {item.endTime}</p></div><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h2><AgendaStatus status={item.status} /></div><p className="mt-1 text-sm text-[var(--muted)]">{item.location}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ink)]">{item.purpose}</p>{itemObjectives.length > 0 ? <p className="mt-3 text-xs leading-5 text-[var(--context)]">Supports · {itemObjectives.map((objective) => objective.title).join("; ")}</p> : <p className="mt-3 text-xs text-[var(--muted)]">Relationship-building activity · no standalone objective</p>}<AgendaParticipation item={item} assignments={assignments} stakeholders={internalStakeholders} /></div></li>; })}</ol></section>

      <section className="border-y border-[var(--divider)] py-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-[var(--muted)]">Brief preparation state</p><p className="mt-1 text-base font-semibold text-[var(--ink)]">{confirmedCount} of {assignments.length} stakeholder assignments confirmed</p></div><Link href={`/engagements/${engagement.id}/brief`} className="text-sm font-semibold text-[var(--navy)] hover:underline">Open executive brief →</Link></div></section>
    </div>
  );
}

function AssignmentStatus({ status }: { status: "suggested" | "confirmed" }) { return <span className="inline-flex items-center gap-2 text-xs text-[var(--ink)]"><span className={`h-2 w-2 rounded-full ${status === "confirmed" ? "bg-[var(--sage)]" : "bg-[var(--ochre)]"}`} aria-hidden="true" />{status === "confirmed" ? "Confirmed" : "Suggested"}</span>; }
function AgendaStatus({ status }: { status: "draft" | "proposed" | "confirmed" }) { const colour = status === "confirmed" ? "bg-[var(--sage)]" : status === "proposed" ? "bg-[var(--context)]" : "bg-[var(--ochre)]"; return <span className="inline-flex items-center gap-2 text-xs capitalize text-[var(--ink)]"><span className={`h-2 w-2 rounded-full ${colour}`} aria-hidden="true" />{status}</span>; }
