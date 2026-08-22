import Link from "next/link";

import {
  formatLifecycleStage,
  formatReadinessState,
} from "@/domain/presentation";
import type { ProgramSummary } from "@/domain/types";

import { ReadinessBar } from "../readiness-bar";
import { StatusBadge } from "../status-badge";

export function ProgramCard({ summary }: { summary: ProgramSummary }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.5)] sm:p-6">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone={summary.program.lifecycleStage}>
          {formatLifecycleStage(summary.program.lifecycleStage)}
        </StatusBadge>
        <StatusBadge tone={summary.readinessState}>
          {formatReadinessState(summary.readinessState)}
        </StatusBadge>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-6 text-slate-950">
        <Link href={`/programs/${summary.program.id}`} className="hover:text-[#173f5f] hover:underline">
          {summary.program.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-500">{summary.program.destination}</p>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-slate-100 py-4 text-sm">
        <div>
          <dt className="text-xs text-slate-500">Departs</dt>
          <dd className="mt-1 font-semibold tabular-nums text-slate-900">
            {summary.daysUntilDeparture}d
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Participants</dt>
          <dd className="mt-1 font-semibold tabular-nums text-slate-900">
            {summary.participantCount}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Outstanding</dt>
          <dd className="mt-1 font-semibold tabular-nums text-slate-900">
            {summary.outstandingRequirementCount}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">Requirement readiness</span>
          <span className="font-semibold tabular-nums text-slate-900">
            {summary.readinessPercentage}%
          </span>
        </div>
        <ReadinessBar value={summary.readinessPercentage} className="mt-2" />
      </div>
    </article>
  );
}
