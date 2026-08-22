import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { SectionHeader, TimelineItem } from "@/components/editorial";
import { StatusBadge } from "@/components/status-badge";
import { engagementObjectives, engagements, partnerOrganisations, relationshipSignals, relationships } from "@/data/engagement-fixtures";
import { programs } from "@/data/fixtures";
import { engagementOutcomes } from "@/data/follow-up-fixtures";
import { buildRelationshipMemoryState, getEngagementsForRelationship } from "@/domain/engagement-rules";
import { deriveRelationshipSignalsFromOutcomes } from "@/domain/follow-up-rules";
import { formatDemoDate, formatEngagementStage, formatEngagementType } from "@/domain/presentation";

type RelationshipPageProps = { params: Promise<{ relationshipId: string }> };

export function generateStaticParams() { return relationships.map((relationship) => ({ relationshipId: relationship.id })); }

export async function generateMetadata({ params }: RelationshipPageProps): Promise<Metadata> {
  const { relationshipId } = await params;
  const relationship = relationships.find((candidate) => candidate.id === relationshipId);
  const partner = partnerOrganisations.find((candidate) => candidate.id === relationship?.partnerOrganisationId);
  return { title: partner?.name ?? "Relationship" };
}

export default async function RelationshipPage({ params }: RelationshipPageProps) {
  const { relationshipId } = await params;
  const relationship = relationships.find((candidate) => candidate.id === relationshipId);
  if (!relationship) notFound();
  const partner = partnerOrganisations.find((candidate) => candidate.id === relationship.partnerOrganisationId);
  if (!partner) notFound();

  const relationshipEngagements = getEngagementsForRelationship(relationship.id, engagements);
  const generatedSignals = deriveRelationshipSignalsFromOutcomes(engagementOutcomes, engagements);
  const allRelationshipSignals = [...relationshipSignals, ...generatedSignals];
  const memoryState = buildRelationshipMemoryState(relationship.id, allRelationshipSignals, engagementObjectives, engagements);
  const sourcedObjectiveIds = new Set(memoryState.continuities.map((continuity) => continuity.objective.id));
  const continuitySignalIds = new Set(memoryState.continuities.map((continuity) => continuity.signal.id));
  const retainedSignals = memoryState.signals.filter((signal) => !continuitySignalIds.has(signal.id));
  const availableProgramIds = new Set(programs.map((program) => program.id));

  return (
    <div className="space-y-12">
      <header className="border-b border-[var(--divider)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">PARTNER RELATIONSHIP</p>
            <h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{partner.name}</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">{partner.location} · Relationship owner · {relationship.owner}</p>
          </div>
          <CompositeDisclosure />
        </div>
        <div className="mt-7 grid gap-6 border-t border-[var(--divider)] pt-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-xs text-[var(--muted)]">Strategic themes</p><ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{relationship.strategicThemes.map((theme) => <li key={theme} className="text-sm text-[var(--navy)]">{theme}</li>)}</ul></div>
          <div><p className="text-xs text-[var(--muted)]">Relationship context</p><p className="mt-2 max-w-2xl text-base leading-7 text-[var(--ink)]">{relationship.summary}</p></div>
        </div>
      </header>

      <section id="relationship-memory-heading" aria-labelledby="relationship-memory-title">
        <SectionHeader id="relationship-memory-title" title={memoryState.kind === "continuity" ? "RELATIONSHIP MEMORY" : "RELATIONSHIP CONTEXT"} description="Reusable institutional context carried across engagements." />
        {memoryState.kind === "continuity" ? (
          <div className="mt-8 space-y-10">
            {memoryState.continuities.map((continuity) => (
              <ol key={`${continuity.signal.id}-${continuity.objective.id}`} aria-label="Relationship continuity chronology">
                <TimelineItem date={formatDemoDate(continuity.sourceEngagement.startDate)} type={formatEngagementType(continuity.sourceEngagement.type)}>
                  <h3 className="text-lg font-semibold text-[var(--ink)]">{continuity.sourceEngagement.title}</h3>
                  <div className="mt-5 grid gap-5 md:grid-cols-2"><div><p className="text-xs text-[var(--muted)]">Outcome / signal</p><p className="mt-2 text-sm font-semibold text-[var(--ink)]">{continuity.signal.title}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{continuity.signal.detail}</p></div><div className="border-l-2 border-[var(--context)] pl-4"><p className="text-xs text-[var(--context)]">Context carried forward</p><p className="mt-2 text-sm leading-6 text-[var(--ink)]">This signal is retained as source context for the later engagement objective.</p></div></div>
                  <Link href={`/engagements/${continuity.sourceEngagement.id}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--navy)] hover:underline">View source engagement →</Link>
                </TimelineItem>
                <TimelineItem date={formatDemoDate(continuity.currentEngagement.startDate)} type={formatEngagementType(continuity.currentEngagement.type)} last>
                  <h3 className="text-lg font-semibold text-[var(--ink)]">{continuity.currentEngagement.title}</h3>
                  <p className="mt-4 text-xs text-[var(--muted)]">Current objective</p><p className="mt-2 text-base font-semibold text-[var(--ink)]">{continuity.objective.title}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{continuity.objective.description}</p><p className="mt-3 text-xs text-[var(--context)]">Informed by {continuity.sourceEngagement.title}</p>
                  <Link href={`/engagements/${continuity.currentEngagement.id}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--navy)] hover:underline">Open current engagement →</Link>
                </TimelineItem>
              </ol>
            ))}
            {retainedSignals.length > 0 ? (
              <div className="border-t border-[var(--divider)] pt-8">
                <p className="text-xs font-medium tracking-[0.08em] text-[var(--context)]">NEW CONTEXT RETAINED</p>
                <ol className="mt-6 divide-y divide-[var(--divider)]">
                  {retainedSignals.map((signal) => {
                    const source = relationshipEngagements.find((engagement) => engagement.id === signal.sourceEngagementId);
                    return <li key={signal.id} className="grid gap-4 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:gap-6"><div><p className="text-xs tabular-nums text-[var(--muted)]">{formatDemoDate(signal.recordedDate)}</p><p className="mt-1 text-xs text-[var(--context)]">Retained outcome</p></div><div><h3 className="text-base font-semibold text-[var(--ink)]">{signal.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{signal.detail}</p><p className="mt-3 text-xs text-[var(--muted)]">Source · {source?.title ?? "Engagement outcome"} · Fictional composite record</p></div>{source ? <Link href={`/engagements/${source.id}/follow-up`} className="text-sm font-semibold text-[var(--navy)] hover:underline">Open follow-up →</Link> : null}</li>;
                  })}
                </ol>
              </div>
            ) : null}
          </div>
        ) : memoryState.kind === "signals_only" ? (
          <div className="mt-7 divide-y divide-[var(--divider)] border-y border-[var(--divider)]">{memoryState.signals.map((signal) => { const source = relationshipEngagements.find((engagement) => engagement.id === signal.sourceEngagementId); return <article key={signal.id} className="py-6"><p className="text-xs text-[var(--muted)]">Recorded relationship signal</p><h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{signal.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{signal.detail}</p><p className="mt-3 text-xs text-[var(--context)]">No later engagement objective currently references this signal.</p>{source ? <Link href={`/engagements/${source.id}`} className="mt-3 inline-flex text-sm font-semibold text-[var(--navy)] hover:underline">View source engagement →</Link> : null}</article>; })}</div>
        ) : (
          <div className="mt-7 border-y border-dashed border-[var(--divider)] py-8"><p className="text-sm text-[var(--muted)]">No reusable relationship context has been recorded yet.</p></div>
        )}
      </section>

      <section aria-labelledby="engagement-history-heading">
        <SectionHeader id="engagement-history-heading" title="ENGAGEMENT HISTORY" description="A chronological record of activity associated with this partner relationship." />
        <ol className="divide-y divide-[var(--divider)]">
          {relationshipEngagements.map((engagement) => {
            const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);
            const hasDelivery = engagement.type === "study_tour" && availableProgramIds.has(engagement.studyTourProgramId);
            const href = hasDelivery ? `/engagements/${engagement.id}/delivery` : `/engagements/${engagement.id}`;
            return <li key={engagement.id} className="grid gap-4 py-6 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:gap-6"><div><p className="text-xs tabular-nums text-[var(--muted)]">{formatDemoDate(engagement.startDate)}</p><div className="mt-2"><StatusBadge tone={engagement.stage}>{formatEngagementStage(engagement.stage)}</StatusBadge></div></div><div><p className="text-xs text-[var(--muted)]">{formatEngagementType(engagement.type)}</p><h3 className="mt-1 text-base font-semibold text-[var(--ink)]">{engagement.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{engagement.summary}</p>{objectives.length > 0 ? <ul className="mt-3 space-y-1 text-sm text-[var(--ink)]">{objectives.map((objective) => <li key={objective.id}>Objective · {objective.title}{sourcedObjectiveIds.has(objective.id) ? " · informed by prior relationship history" : ""}</li>)}</ul> : null}</div><Link href={href} className="text-sm font-semibold text-[var(--navy)] hover:underline">Open →</Link></li>;
          })}
        </ol>
      </section>
    </div>
  );
}
