"use client";

import { EngagementLocalNavigation } from "@/components/engagement-local-navigation";
import { AgendaParticipation } from "@/components/agenda-participation";
import { SectionHeader } from "@/components/editorial";
import { DELEGATION_ENGAGEMENT_ID, engagementObjectives, engagements, partnerOrganisations, relationshipSignals, relationships } from "@/data/engagement-fixtures";
import { delegationAgendaItems, internalStakeholders, universityCapabilities } from "@/data/planning-fixtures";
import { buildExecutiveBrief, deriveStakeholderAssignments } from "@/domain/planning-rules";
import { formatDemoDate, formatEngagementType } from "@/domain/presentation";
import { useEngagementPlanning } from "./engagement-planning-provider";

export function ExecutiveBriefWorkspace() {
  const engagement = engagements.find((candidate) => candidate.id === DELEGATION_ENGAGEMENT_ID)!;
  const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);
  const { confirmedAssignmentIds } = useEngagementPlanning();
  const assignments = deriveStakeholderAssignments(engagement, objectives, universityCapabilities, internalStakeholders, confirmedAssignmentIds);
  const brief = buildExecutiveBrief({ engagementId: engagement.id, relationships, partners: partnerOrganisations, engagements, signals: relationshipSignals, objectives: engagementObjectives, assignments, agendaItems: delegationAgendaItems });
  const stakeholderById = new Map(internalStakeholders.map((stakeholder) => [stakeholder.id, stakeholder]));
  const confirmedCount = assignments.filter((assignment) => assignment.status === "confirmed").length;

  return (
    <article className="mx-auto max-w-5xl space-y-10">
      <header className="border-b-2 border-[var(--ink)] pb-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-medium tracking-[0.1em] text-[var(--navy)]">VISIT BRIEF</p><h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{brief.partner.name}</h1><p className="mt-3 text-base text-[var(--ink)]">{brief.engagement.title}</p><p className="mt-1 text-sm text-[var(--muted)]">{formatDemoDate(brief.engagement.startDate)}–{formatDemoDate(brief.engagement.endDate)}</p></div><p className="max-w-xs text-xs leading-5 text-[var(--muted)]">Deterministically composed from structured relationship and engagement records. Composite demonstration.</p></div></header>
      <EngagementLocalNavigation engagementId={engagement.id} />

      <BriefSection id="purpose" title="PURPOSE OF VISIT"><p className="text-base leading-7 text-[var(--ink)]">{brief.engagement.summary}</p></BriefSection>
      <BriefSection id="partner-context" title="PARTNER CONTEXT"><p className="text-sm leading-7 text-[var(--ink)]">{brief.relationship.summary}</p><p className="mt-4 text-xs text-[var(--muted)]">Strategic themes · {brief.relationship.strategicThemes.join(" · ")}</p></BriefSection>
      <BriefSection id="relationship-history" title="RELEVANT RELATIONSHIP HISTORY"><ol className="divide-y divide-[var(--divider)]">{brief.relationshipMemory.map((signal) => { const source = engagements.find((candidate) => candidate.id === signal.sourceEngagementId)!; return <li key={signal.id} className="grid gap-3 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]"><div><p className="text-xs tabular-nums text-[var(--navy)]">{formatDemoDate(source.startDate)}</p><p className="mt-1 text-xs text-[var(--muted)]">{formatEngagementType(source.type)}</p></div><div><p className="font-semibold text-[var(--ink)]">{signal.title}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{signal.detail}</p></div></li>; })}</ol></BriefSection>
      <BriefSection id="delegation-profile" title="DELEGATION PROFILE"><dl className="grid gap-5 sm:grid-cols-2"><div><dt className="text-xs text-[var(--muted)]">Delegation</dt><dd className="mt-1 font-semibold text-[var(--ink)]">{engagement.type === "delegation_visit" ? engagement.delegationSize : 0} synthetic senior representatives</dd></div><div><dt className="text-xs text-[var(--muted)]">Strategic interests</dt><dd className="mt-1 text-sm leading-6 text-[var(--ink)]">{engagement.strategicInterests.join(" · ")}</dd></div></dl></BriefSection>
      <BriefSection id="brief-objectives" title="OBJECTIVES"><ol className="divide-y divide-[var(--divider)]">{brief.objectives.map((objective, index) => <li key={objective.id} className="grid gap-3 py-4 sm:grid-cols-[3rem_minmax(0,1fr)]"><span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><p className="font-semibold text-[var(--ink)]">{objective.title}</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{objective.description}</p></div></li>)}</ol></BriefSection>
      <BriefSection id="brief-stakeholders" title="INTERNAL UNIVERSITY STAKEHOLDERS"><ul className="divide-y divide-[var(--divider)]">{brief.stakeholderAssignments.map((assignment) => { const stakeholder = stakeholderById.get(assignment.stakeholderId)!; return <li key={assignment.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_7rem]"><div><p className="font-semibold text-[var(--ink)]">{stakeholder.name}</p><p className="mt-1 text-xs text-[var(--muted)]">{stakeholder.role}</p></div><p className="text-sm leading-6 text-[var(--muted)]">{assignment.rationale}</p><AssignmentStatus status={assignment.status} /></li>; })}</ul></BriefSection>
      <BriefSection id="program-glance" title="PROGRAM AT A GLANCE"><ol className="divide-y divide-[var(--divider)]">{brief.agendaItems.map((item) => <li key={item.id} className="grid gap-2 py-4 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(12rem,0.6fr)]"><p className="font-semibold tabular-nums text-[var(--navy)]">{item.startTime}</p><div><p className="font-semibold text-[var(--ink)]">{item.title}</p><p className="mt-1 text-xs text-[var(--muted)]">{item.location}</p></div><AgendaParticipation item={item} assignments={assignments} stakeholders={internalStakeholders} /></li>)}</ol></BriefSection>
      <BriefSection id="talking-points" title="KEY TALKING-POINT PROMPTS"><ol className="divide-y divide-[var(--divider)]">{brief.talkingPoints.map((point, index) => <li key={point.objectiveId} className="grid gap-3 py-4 sm:grid-cols-[3rem_minmax(0,1fr)]"><span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><p className="text-xs text-[var(--muted)]">Derived from objective</p><p className="mt-1 text-sm leading-6 text-[var(--ink)]">{point.prompt}</p></div></li>)}</ol><p className="mt-4 text-xs text-[var(--muted)]">Structured prompts only · not AI-generated</p></BriefSection>
      <BriefSection id="open-questions" title="OPEN QUESTIONS"><ol className="divide-y divide-[var(--divider)]">{brief.openQuestions.map((question, index) => <li key={question} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3 text-sm leading-6 text-[var(--ink)]"><span className="text-[var(--ochre)]">{index + 1}</span>{question}</li>)}</ol></BriefSection>
      <BriefSection id="preparation-status" title="PREPARATION STATUS"><p className="text-lg font-semibold text-[var(--ink)]">{confirmedCount} of {assignments.length} stakeholder assignments confirmed</p><p className="mt-2 text-sm text-[var(--muted)]">Remaining suggestions require International Office review before hosts are treated as confirmed.</p></BriefSection>
    </article>
  );
}

function BriefSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) { return <section aria-labelledby={`${id}-heading`}><SectionHeader id={`${id}-heading`} title={title} /><div className="mt-5">{children}</div></section>; }
function AssignmentStatus({ status }: { status: "suggested" | "confirmed" }) { return <span className="inline-flex items-center gap-2 text-xs text-[var(--ink)]"><span className={`h-2 w-2 rounded-full ${status === "confirmed" ? "bg-[var(--sage)]" : "bg-[var(--ochre)]"}`} aria-hidden="true" />{status === "confirmed" ? "Confirmed" : "Suggested"}</span>; }
