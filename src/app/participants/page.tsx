import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { milestones, participants, programs, requirements } from "@/data/fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { formatReadinessState } from "@/domain/presentation";
import { getProgramSummary } from "@/domain/rules";

export const metadata: Metadata = { title: "Participants" };

export default function ParticipantsPage() {
  const summaries = programs.map((program) =>
    getProgramSummary(program, participants, requirements, milestones),
  );

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Cohort directory"
        title="Participants"
        description="Sprint 01 confirms the cohort model and aggregate consistency. Individual participant workflows are deferred."
        meta={DEMO_SNAPSHOT_LABEL}
      />

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-950">Cohorts by program</h2>
          <p className="mt-1 text-sm text-slate-500">All 72 identities are fictional demo records.</p>
        </div>
        <div className="divide-y divide-slate-200">
          {summaries.map((summary) => (
            <article
              key={summary.program.id}
              className="grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-950">{summary.program.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{summary.program.destination}</p>
              </div>
              <StatusBadge tone={summary.readinessState}>
                {formatReadinessState(summary.readinessState)}
              </StatusBadge>
              <dl className="flex gap-6 text-sm">
                <div>
                  <dt className="text-slate-500">Participants</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-slate-950">
                    {summary.participantCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Ready</dt>
                  <dd className="mt-1 font-semibold tabular-nums text-slate-950">
                    {summary.participantReadiness.ready}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
