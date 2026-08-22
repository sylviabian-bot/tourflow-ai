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
import { programs } from "@/data/fixtures";
import {
  buildRelationshipMemoryState,
  getEngagementsForRelationship,
} from "@/domain/engagement-rules";
import {
  formatDemoDate,
  formatEngagementStage,
  formatEngagementType,
} from "@/domain/presentation";

type RelationshipPageProps = { params: Promise<{ relationshipId: string }> };

export function generateStaticParams() {
  return relationships.map((relationship) => ({ relationshipId: relationship.id }));
}

export async function generateMetadata({
  params,
}: RelationshipPageProps): Promise<Metadata> {
  const { relationshipId } = await params;
  const relationship = relationships.find(
    (candidate) => candidate.id === relationshipId,
  );
  const partner = partnerOrganisations.find(
    (candidate) => candidate.id === relationship?.partnerOrganisationId,
  );
  return { title: partner?.name ?? "Relationship" };
}

export default async function RelationshipPage({ params }: RelationshipPageProps) {
  const { relationshipId } = await params;
  const relationship = relationships.find(
    (candidate) => candidate.id === relationshipId,
  );
  if (!relationship) notFound();

  const partner = partnerOrganisations.find(
    (candidate) => candidate.id === relationship.partnerOrganisationId,
  );
  if (!partner) notFound();

  const relationshipEngagements = getEngagementsForRelationship(
    relationship.id,
    engagements,
  );
  const memoryState = buildRelationshipMemoryState(
    relationship.id,
    relationshipSignals,
    engagementObjectives,
    engagements,
  );
  const sourcedObjectiveIds = new Set(
    memoryState.continuities.map((continuity) => continuity.objective.id),
  );
  const availableProgramIds = new Set(programs.map((program) => program.id));

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Partner Relationship
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              {partner.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {partner.location} · Relationship owner {relationship.owner}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {relationship.summary}
            </p>
          </div>
          <CompositeDisclosure />
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Strategic themes">
          {relationship.strategicThemes.map((theme) => (
            <li
              key={theme}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              {theme}
            </li>
          ))}
        </ul>
      </header>

      <section
        aria-labelledby="relationship-memory-heading"
        className="rounded-2xl border border-teal-200 bg-teal-50/55 p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          Reusable context
        </p>
        <h2
          id="relationship-memory-heading"
          className="mt-1 text-2xl font-semibold text-slate-950"
        >
          {memoryState.kind === "continuity"
            ? "Relationship Memory"
            : "Relationship Context"}
        </h2>

        {memoryState.kind === "continuity" ? (
          <div className="mt-5 space-y-5">
            {memoryState.continuities.map((continuity) => (
              <div
                key={`${continuity.signal.id}-${continuity.objective.id}`}
                className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center"
              >
                <div className="rounded-xl border border-teal-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Previous signal
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {continuity.signal.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {continuity.signal.detail}
                  </p>
                  <Link
                    href={`/engagements/${continuity.sourceEngagement.id}`}
                    className="mt-3 inline-flex rounded-sm text-xs font-semibold text-[#173f5f] hover:underline"
                  >
                    View source engagement →
                  </Link>
                </div>
                <span className="hidden text-2xl text-teal-700 lg:block" aria-hidden="true">
                  →
                </span>
                <div className="rounded-xl border border-teal-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                    Relevant current objective
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {continuity.objective.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {continuity.objective.description}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Informed by context recorded from {continuity.sourceEngagement.title}.
                  </p>
                  <Link
                    href={`/engagements/${continuity.currentEngagement.id}`}
                    className="mt-3 inline-flex rounded-sm text-xs font-semibold text-[#173f5f] hover:underline"
                  >
                    Open current engagement →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : memoryState.kind === "signals_only" ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {memoryState.signals.map((signal) => {
              const sourceEngagement = relationshipEngagements.find(
                (engagement) => engagement.id === signal.sourceEngagementId,
              );
              return (
                <article key={signal.id} className="rounded-xl border border-teal-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Recorded relationship signal
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-slate-950">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{signal.detail}</p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    No later engagement objective currently references this signal.
                  </p>
                  {sourceEngagement ? (
                    <Link
                      href={`/engagements/${sourceEngagement.id}`}
                      className="mt-3 inline-flex rounded-sm text-xs font-semibold text-[#173f5f] hover:underline"
                    >
                      View source engagement →
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white/75 p-5">
            <p className="text-sm leading-6 text-slate-600">
              No reusable relationship context has been recorded yet.
            </p>
          </div>
        )}
      </section>

      <section aria-labelledby="engagement-history-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Traceable history
        </p>
        <h2
          id="engagement-history-heading"
          className="mt-1 text-2xl font-semibold text-slate-950"
        >
          Engagement History
        </h2>
        <ol className="mt-6 space-y-4">
          {relationshipEngagements.map((engagement, index) => {
            const engagementSignals = memoryState.signals.filter(
              (signal) => signal.sourceEngagementId === engagement.id,
            );
            const objectives = engagementObjectives.filter(
              (objective) => objective.engagementId === engagement.id,
            );
            const hasDelivery =
              engagement.type === "study_tour" &&
              availableProgramIds.has(engagement.studyTourProgramId);
            const href = hasDelivery
              ? `/engagements/${engagement.id}/delivery`
              : `/engagements/${engagement.id}`;

            return (
              <li
                key={engagement.id}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <StatusBadge tone={engagement.stage}>
                        {formatEngagementStage(engagement.stage)}
                      </StatusBadge>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {formatEngagementType(engagement.type)}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-950">
                      {engagement.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}
                    </p>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      {engagement.summary}
                    </p>
                  </div>
                  <Link
                    href={href}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#173f5f] shadow-sm hover:bg-slate-50"
                  >
                    Open engagement
                  </Link>
                </div>

                {engagementSignals.length > 0 ? (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {engagementSignals.map((signal) => (
                      <div key={signal.id} className="border-l-2 border-teal-600 pl-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                          {signal.kind === "outcome" ? "Composite outcome" : "Strategic signal"}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {signal.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {objectives.length > 0 ? (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Current objectives
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                      {objectives.map((objective) => (
                        <li key={objective.id}>
                          • {objective.title}
                          {sourcedObjectiveIds.has(objective.id)
                            ? " · informed by prior relationship history"
                            : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
