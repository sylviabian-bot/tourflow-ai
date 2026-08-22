import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { StatusBadge } from "@/components/status-badge";
import {
  engagementObjectives,
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "@/data/engagement-fixtures";
import { getObjectiveSourceContext } from "@/domain/engagement-rules";
import { formatDemoDate, formatEngagementStage, formatEngagementType } from "@/domain/presentation";

type EngagementPageProps = { params: Promise<{ engagementId: string }> };

export function generateStaticParams() {
  return engagements.map((engagement) => ({ engagementId: engagement.id }));
}
export async function generateMetadata({ params }: EngagementPageProps): Promise<Metadata> {
  const { engagementId } = await params;
  return { title: engagements.find((candidate) => candidate.id === engagementId)?.title ?? "Engagement" };
}

export default async function EngagementPage({ params }: EngagementPageProps) {
  const { engagementId } = await params;
  const engagement = engagements.find((candidate) => candidate.id === engagementId);
  if (!engagement) notFound();

  const relationship = relationships.find((candidate) => candidate.id === engagement.relationshipId);
  const partner = partnerOrganisations.find((candidate) => candidate.id === relationship?.partnerOrganisationId);
  if (!relationship || !partner) notFound();

  const objectives = engagementObjectives.filter((objective) => objective.engagementId === engagement.id);

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={engagement.stage}>{formatEngagementStage(engagement.stage)}</StatusBadge>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{formatEngagementType(engagement.type)}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">{engagement.title}</h1>
            <p className="mt-2 text-sm text-slate-600">
              <Link href={`/relationships/${relationship.id}`} className="font-semibold text-[#173f5f] hover:underline">{partner.name}</Link> · {formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{engagement.summary}</p>
          </div>
          <CompositeDisclosure />
        </div>
      </header>

      {engagement.type === "delegation_visit" ? (
        <>
          <section className="grid gap-4 md:grid-cols-3" aria-label="Delegation overview">
            <OverviewField label="Engagement stage" value={formatEngagementStage(engagement.stage)} />
            <OverviewField label="Delegation" value={`${engagement.delegationSize ?? 0} synthetic representatives`} />
            <OverviewField label="Proposed dates" value={`${formatDemoDate(engagement.startDate)}–${formatDemoDate(engagement.endDate)}`} />
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="objectives-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Purpose</p>
              <h2 id="objectives-heading" className="mt-1 text-2xl font-semibold text-slate-950">Objectives</h2>
              <div className="mt-5 space-y-4">
                {objectives.map((objective) => {
                  const sourceContext = getObjectiveSourceContext(objective, relationshipSignals, engagements);
                  return (
                    <article key={objective.id} className={`rounded-xl border p-5 ${sourceContext ? "border-teal-200 bg-teal-50/55" : "border-slate-200 bg-slate-50"}`}>
                      <h3 className="text-base font-semibold text-slate-950">{objective.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{objective.description}</p>
                      {sourceContext ? (
                        <div className="mt-4 border-l-2 border-teal-600 pl-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">Informed by previous Study Tour outcome</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{sourceContext.signal.detail}</p>
                          <Link href={`/relationships/${relationship.id}#relationship-memory-heading`} className="mt-2 inline-flex rounded-sm text-xs font-semibold text-[#173f5f] hover:underline">View source in Relationship Memory →</Link>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>

            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="source-enquiry-heading">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Incoming request</p>
                <h2 id="source-enquiry-heading" className="mt-1 text-xl font-semibold text-slate-950">Source enquiry</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">{engagement.sourceEnquiry}</p>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="open-questions-heading">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scoping</p>
                <h2 id="open-questions-heading" className="mt-1 text-xl font-semibold text-slate-950">Open questions</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {engagement.openQuestions?.map((question) => <li key={question} className="border-l-2 border-amber-400 pl-3">{question}</li>)}
                </ul>
              </section>
            </div>
          </div>

          <section aria-labelledby="strategic-interests-heading">
            <h2 id="strategic-interests-heading" className="text-sm font-semibold text-slate-950">Strategic interests</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {engagement.strategicInterests.map((interest) => <li key={interest} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">{interest}</li>)}
            </ul>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">Engagement overview</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">This supporting engagement is represented for relationship continuity and portfolio variation. Its detailed workflow is outside Sprint 02A.</p>
          {engagement.type === "study_tour" && engagement.studyTourProgramId === "shanghai-sydney-innovation" ? (
            <Link href={`/engagements/${engagement.id}/delivery`} className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#173f5f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0e2f49]">Open TourFlow Study Tour Delivery</Link>
          ) : null}
        </section>
      )}
    </div>
  );
}

function OverviewField({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-base font-semibold text-slate-950">{value}</p></div>;
}
