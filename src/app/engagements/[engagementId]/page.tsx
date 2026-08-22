import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { EngagementLocalNavigation } from "@/components/engagement-local-navigation";
import { MetadataList, MetadataRow, SectionHeader } from "@/components/editorial";
import { StatusBadge } from "@/components/status-badge";
import { engagementObjectives, engagements, partnerOrganisations, relationshipSignals, relationships } from "@/data/engagement-fixtures";
import { getObjectiveSourceContext } from "@/domain/engagement-rules";
import { formatDemoDate, formatEngagementStage, formatEngagementType } from "@/domain/presentation";

type EngagementPageProps = { params: Promise<{ engagementId: string }> };
export function generateStaticParams() { return engagements.map((engagement) => ({ engagementId: engagement.id })); }
export async function generateMetadata({ params }: EngagementPageProps): Promise<Metadata> { const { engagementId } = await params; return { title: engagements.find((candidate) => candidate.id === engagementId)?.title ?? "Engagement" }; }

export default async function EngagementPage({ params }: EngagementPageProps) {
  const { engagementId } = await params;
  const engagement = engagements.find((candidate) => candidate.id === engagementId);
  if (!engagement) notFound();
  const relationship = relationships.find((candidate) => candidate.id === engagement.relationshipId);
  const partner = partnerOrganisations.find((candidate) => candidate.id === relationship?.partnerOrganisationId);
  if (!relationship || !partner) notFound();
  const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);

  return (
    <div className="space-y-12">
      <header className="border-b border-[var(--divider)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">{formatEngagementType(engagement.type).toUpperCase()}</p><h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{engagement.title}</h1><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"><Link href={`/relationships/${relationship.id}`} className="font-semibold text-[var(--navy)] hover:underline">{partner.name}</Link><span className="text-[var(--muted)]">{formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}</span><StatusBadge tone={engagement.stage}>{formatEngagementStage(engagement.stage)}</StatusBadge></div></div><CompositeDisclosure /></div>
      </header>

      {engagement.type === "delegation_visit" ? <EngagementLocalNavigation engagementId={engagement.id} /> : null}

      <section aria-labelledby="purpose-heading"><SectionHeader id="purpose-heading" title="PURPOSE / SUMMARY" /><p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--ink)]">{engagement.summary}</p></section>

      {engagement.type === "delegation_visit" ? <>
        <section aria-label="Delegation overview"><MetadataList><MetadataRow label="Engagement stage" value={<StatusBadge tone={engagement.stage}>{formatEngagementStage(engagement.stage)}</StatusBadge>} /><MetadataRow label="Delegation" value={`${engagement.delegationSize ?? 0} synthetic representatives`} /><MetadataRow label="Proposed dates" value={`${formatDemoDate(engagement.startDate)}–${formatDemoDate(engagement.endDate)}`} /><MetadataRow label="Strategic interests" value={<ul className="flex flex-wrap gap-x-4 gap-y-1">{engagement.strategicInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>} /></MetadataList></section>

        <section aria-labelledby="objectives-heading"><SectionHeader id="objectives-heading" title="OBJECTIVES" description="Current engagement objectives, including any source relationship context." /><ol className="divide-y divide-[var(--divider)]">{objectives.map((objective, index) => { const source = getObjectiveSourceContext(objective, relationshipSignals, engagements); return <li key={objective.id} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5"><span className="text-sm tabular-nums text-[var(--context)]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold text-[var(--ink)]">{objective.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{objective.description}</p>{source ? <div className="mt-4 border-l-2 border-[var(--context)] pl-4"><p className="text-xs text-[var(--context)]">Informed by previous Study Tour context</p><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink)]">{source.signal.detail}</p><Link href={`/relationships/${relationship.id}#relationship-memory-heading`} className="mt-3 inline-flex text-sm font-semibold text-[var(--navy)] hover:underline">View source in Relationship Memory →</Link></div> : null}</div></li>; })}</ol></section>

        <div className="grid gap-10 lg:grid-cols-2"><section aria-labelledby="source-enquiry-heading"><SectionHeader id="source-enquiry-heading" title="SOURCE ENQUIRY" /><p className="mt-5 text-sm leading-7 text-[var(--muted)]">{engagement.sourceEnquiry}</p></section><section aria-labelledby="open-questions-heading"><SectionHeader id="open-questions-heading" title="OPEN QUESTIONS" /><ol className="mt-5 divide-y divide-[var(--divider)]">{engagement.openQuestions?.map((question, index) => <li key={question} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3 text-sm leading-6 text-[var(--ink)]"><span className="tabular-nums text-[var(--ochre)]">{index + 1}</span>{question}</li>)}</ol></section></div>
      </> : <section className="border-y border-[var(--divider)] py-7"><h2 className="text-sm font-semibold tracking-[0.06em] text-[var(--ink)]">ENGAGEMENT OVERVIEW</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">This supporting engagement is represented for relationship continuity and portfolio variation. Its detailed workflow is outside Sprint 02A.</p>{engagement.type === "study_tour" && engagement.studyTourProgramId === "shanghai-sydney-innovation" ? <Link href={`/engagements/${engagement.id}/delivery`} className="mt-5 inline-flex min-h-11 items-center rounded bg-[var(--navy)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-strong)]">Open TourFlow Study Tour Delivery</Link> : null}</section>}
    </div>
  );
}
