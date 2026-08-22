import Link from "next/link";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { SectionHeader } from "@/components/editorial";
import { StatusBadge } from "@/components/status-badge";
import {
  PRIMARY_RELATIONSHIP_ID,
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "@/data/engagement-fixtures";
import { itineraryEntries, milestones, participants, programs, requirements } from "@/data/fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { buildHomeSnapshot } from "@/domain/engagement-rules";
import { formatDemoDate, formatEngagementStage, formatEngagementType } from "@/domain/presentation";

export default function HomePage() {
  const snapshot = buildHomeSnapshot(relationships, partnerOrganisations, engagements, relationshipSignals, engagementObjectives, PRIMARY_RELATIONSHIP_ID, { programs, participants, requirements, milestones, itineraryEntries });
  const continuity = snapshot.priorityContinuity;
  const latestSignal = continuity?.signal ?? snapshot.priorityRelationship.latestSignal;
  const partnerByRelationship = new Map(relationships.map((relationship) => [relationship.id, partnerOrganisations.find((partner) => partner.id === relationship.partnerOrganisationId)!]));
  const studyTourProgramIds = new Set(programs.map((program) => program.id));

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-5 border-b border-[var(--divider)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">TODAY</p>
          <h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">Engagement briefing desk</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">Current relationship context, coordination work and upcoming international engagements.</p>
        </div>
        <p className="text-xs text-[var(--muted)]">{DEMO_SNAPSHOT_LABEL}</p>
      </header>

      <section aria-labelledby="current-engagements-heading">
        <SectionHeader id="current-engagements-heading" title="CURRENT ENGAGEMENT FOCUS" action={<Link href="/engagements" className="text-sm font-semibold text-[var(--navy)] hover:underline">View all engagements</Link>} />
        <div className="divide-y divide-[var(--divider)]">
          {snapshot.currentEngagements.slice(0, 3).map((engagement) => {
            const partner = partnerByRelationship.get(engagement.relationshipId)!;
            const href = engagement.type === "study_tour" && studyTourProgramIds.has(engagement.studyTourProgramId) ? `/engagements/${engagement.id}/delivery` : `/engagements/${engagement.id}`;
            return (
              <article key={engagement.id} className="grid gap-3 py-5 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6">
                <div className="text-xs tabular-nums text-[var(--muted)]"><p>{formatDemoDate(engagement.startDate)}</p><p className="mt-1">{formatEngagementType(engagement.type)}</p></div>
                <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-base font-semibold text-[var(--ink)]"><Link href={href} className="hover:text-[var(--navy)] hover:underline">{engagement.title}</Link></h2><StatusBadge tone={engagement.stage}>{formatEngagementStage(engagement.stage)}</StatusBadge></div><p className="mt-2 text-sm text-[var(--muted)]">{partner.name}</p></div>
                <Link href={href} className="text-sm font-semibold text-[var(--navy)] hover:underline">Open →</Link>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="relationship-context-heading" className="grid gap-8 border-y border-[var(--divider)] py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-xs font-medium tracking-[0.08em] text-[var(--context)]">RELATIONSHIP CONTEXT</p><h2 id="relationship-context-heading" className="editorial-title mt-2 text-3xl text-[var(--ink)]">{snapshot.priorityRelationship.partner.name}</h2><p className="mt-3 text-sm text-[var(--muted)]">{snapshot.priorityRelationship.partner.location} · Owner {snapshot.priorityRelationship.relationship.owner}</p><Link href={`/relationships/${PRIMARY_RELATIONSHIP_ID}`} className="mt-5 inline-flex text-sm font-semibold text-[var(--navy)] hover:underline">Open relationship dossier →</Link></div>
        <div className="border-l-2 border-[var(--context)] pl-5"><p className="text-base font-semibold text-[var(--ink)]">{latestSignal?.title ?? "No relationship context recorded"}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{latestSignal?.detail ?? "No reusable signal is available."}</p>{continuity ? <div className="mt-5 border-t border-[var(--divider)] pt-4"><p className="text-xs text-[var(--muted)]">Relevant now</p><p className="mt-1 text-sm font-medium text-[var(--ink)]">{continuity.objective.title}</p></div> : null}</div>
      </section>

      <section aria-labelledby="coordination-items-heading">
        <SectionHeader id="coordination-items-heading" title="OPEN COORDINATION" description="Source-backed prompts requiring review before delivery progresses." action={<Link href="/engagements/new" className="text-sm font-semibold text-[var(--navy)] hover:underline">Scope a new enquiry</Link>} />
        <ol className="divide-y divide-[var(--divider)]">
          {snapshot.openCoordinationItems.map((item, index) => <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-5"><span className="text-sm tabular-nums text-[var(--burgundy)]">{String(index + 1).padStart(2, "0")}</span><div><Link href={item.href} className="font-semibold text-[var(--ink)] hover:text-[var(--navy)] hover:underline">{item.title}</Link><p className="mt-1 text-sm text-[var(--muted)]">{item.context}</p></div><span className="text-xs text-[var(--muted)]">Review required</span></li>)}
        </ol>
      </section>

      <div className="flex justify-end"><CompositeDisclosure /></div>
    </div>
  );
}
