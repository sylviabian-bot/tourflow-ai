import Link from "next/link";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { EngagementCard } from "@/components/engagement-card";
import { StatusBadge } from "@/components/status-badge";
import {
  PRIMARY_RELATIONSHIP_ID,
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "@/data/engagement-fixtures";
import {
  itineraryEntries,
  milestones,
  participants,
  programs,
  requirements,
} from "@/data/fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { buildHomeSnapshot } from "@/domain/engagement-rules";
import { formatEngagementStage, formatEngagementType } from "@/domain/presentation";

export default function HomePage() {
  const snapshot = buildHomeSnapshot(
    relationships,
    partnerOrganisations,
    engagements,
    relationshipSignals,
    engagementObjectives,
    PRIMARY_RELATIONSHIP_ID,
    { programs, participants, requirements, milestones, itineraryEntries },
  );
  const partnerByRelationship = new Map(
    relationships.map((relationship) => [
      relationship.id,
      partnerOrganisations.find(
        (partner) => partner.id === relationship.partnerOrganisationId,
      )!,
    ]),
  );
  const continuity = snapshot.priorityContinuity;
  const currentEngagement =
    continuity?.currentEngagement ?? snapshot.priorityRelationship.nextEngagement;
  const latestSignal =
    continuity?.signal ?? snapshot.priorityRelationship.latestSignal;
  const studyTourProgramIds = new Set(programs.map((program) => program.id));

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Engagement coordination</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">What needs attention now?</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Use prior relationship context to prepare the next engagement, while keeping type-specific delivery work accessible.
          </p>
        </div>
        <p className="w-fit rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">{DEMO_SNAPSHOT_LABEL}</p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-34px_rgba(15,23,42,0.45)]" aria-labelledby="priority-relationship-heading">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Relationship requiring coordination</p>
              {currentEngagement ? (
                <StatusBadge tone={currentEngagement.stage}>
                  {formatEngagementStage(currentEngagement.stage)}
                </StatusBadge>
              ) : null}
            </div>
            <h2 id="priority-relationship-heading" className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl">{snapshot.priorityRelationship.partner.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{snapshot.priorityRelationship.partner.location} · Owner {snapshot.priorityRelationship.relationship.owner}</p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">{snapshot.priorityRelationship.relationship.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/relationships/${PRIMARY_RELATIONSHIP_ID}`} className="inline-flex min-h-11 items-center rounded-lg bg-[#173f5f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0e2f49]">Review relationship</Link>
              {currentEngagement ? (
                <Link href={`/engagements/${currentEngagement.id}`} className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#173f5f] shadow-sm hover:bg-slate-50">Open engagement</Link>
              ) : null}
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Latest relationship context</p>
            <p className="mt-3 text-base font-semibold leading-6 text-slate-950">{latestSignal?.title ?? "No relationship context recorded"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{latestSignal?.detail ?? "No reusable signal is available for the current engagement."}</p>
            {continuity ? (
              <div className="mt-5 border-l-2 border-teal-600 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">Relevant now</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">This prior signal informs the current objective: {continuity.objective.title}.</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {continuity ? (
      <section aria-labelledby="continuity-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Relationship continuity</p>
            <h2 id="continuity-heading" className="mt-1 text-xl font-semibold text-slate-950">From previous engagement to current objective</h2>
          </div>
          <CompositeDisclosure />
        </div>
        <ol className="mt-4 grid gap-3 md:grid-cols-4" aria-label="Relationship memory flow">
          {[
            ["1", `Previous ${formatEngagementType(continuity.sourceEngagement.type)}`, continuity.sourceEngagement.title],
            ["2", "Strategic signal", continuity.signal.title],
            ["3", "Relationship Memory", "Reusable context retained with the partner"],
            ["4", "Current objective", continuity.objective.title],
          ].map(([number, title, copy]) => (
            <li key={number} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-teal-700">Step {number}</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <section aria-labelledby="upcoming-engagements-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="upcoming-engagements-heading" className="text-xl font-semibold text-slate-950">Current and upcoming engagements</h2>
            <Link href="/engagements" className="text-sm font-semibold text-[#173f5f] hover:underline">View all</Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {snapshot.currentEngagements.slice(0, 2).map((engagement) => (
              <EngagementCard key={engagement.id} engagement={engagement} partner={partnerByRelationship.get(engagement.relationshipId)!} href={engagement.type === "study_tour" && studyTourProgramIds.has(engagement.studyTourProgramId) ? `/engagements/${engagement.id}/delivery` : `/engagements/${engagement.id}`} />
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="coordination-items-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Open coordination</p>
          <h2 id="coordination-items-heading" className="mt-1 text-xl font-semibold text-slate-950">Next actions</h2>
          <ul className="mt-5 divide-y divide-slate-200">
            {snapshot.openCoordinationItems.map((item) => (
              <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                <Link href={item.href} className="rounded-sm text-sm font-semibold text-slate-950 hover:text-[#173f5f] hover:underline">{item.title}</Link>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.context}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
