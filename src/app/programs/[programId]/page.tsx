import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ReadinessBar } from "@/components/readiness-bar";
import { StatusBadge } from "@/components/status-badge";
import { milestones, participants, programs, requirements } from "@/data/fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import {
  formatLifecycleStage,
  formatReadinessState,
} from "@/domain/presentation";
import { getProgramSummary } from "@/domain/rules";

type ProgramPageProps = {
  params: Promise<{ programId: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ programId: program.id }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { programId } = await params;
  const program = programs.find((candidate) => candidate.id === programId);
  return { title: program?.name ?? "Program" };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { programId } = await params;
  const program = programs.find((candidate) => candidate.id === programId);

  if (!program) notFound();

  const summary = getProgramSummary(program, participants, requirements, milestones);

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Program overview"
        title={program.name}
        description={`${program.destination} · ${summary.participantCount} participants`}
        meta={DEMO_SNAPSHOT_LABEL}
      />

      <div className="flex flex-wrap gap-2">
        <StatusBadge tone={program.lifecycleStage}>
          Lifecycle · {formatLifecycleStage(program.lifecycleStage)}
        </StatusBadge>
        <StatusBadge tone={summary.readinessState}>
          Readiness · {formatReadinessState(summary.readinessState)}
        </StatusBadge>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Program overview metrics">
        <OverviewMetric label="Days to departure" value={String(summary.daysUntilDeparture)} />
        <OverviewMetric label="Participants" value={String(summary.participantCount)} />
        <OverviewMetric
          label="Outstanding requirements"
          value={String(summary.outstandingRequirementCount)}
        />
        <OverviewMetric label="Blocked participants" value={String(summary.participantReadiness.blocked)} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Program readiness
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {summary.readinessPercentage}% of represented requirements approved
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sprint 01 provides a reliable summary destination for Dashboard links.
              Detailed readiness, participant, and itinerary workflows remain deliberately deferred.
            </p>
          </div>
          <Link href="/" className="text-sm font-semibold text-[#173f5f] hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <ReadinessBar value={summary.readinessPercentage} className="mt-6" />
      </section>
    </div>
  );
}

function OverviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-950">{value}</p>
    </div>
  );
}
