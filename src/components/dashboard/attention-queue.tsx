import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import {
  formatAttentionSeverity,
  formatDemoDate,
} from "@/domain/presentation";
import type { AttentionItem, Program } from "@/domain/types";

export function AttentionQueue({
  items,
  programs,
  demoRequirementIsApproved,
  onConfirmRequirement,
  onResetDemo,
}: {
  items: AttentionItem[];
  programs: Program[];
  demoRequirementIsApproved: boolean;
  onConfirmRequirement: (requirementId: string) => void;
  onResetDemo: () => void;
}) {
  const programNames = new Map(programs.map((program) => [program.id, program.name]));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="attention-heading">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Prioritised queue</p>
          <h2 id="attention-heading" className="mt-1 text-xl font-semibold text-slate-950">Attention</h2>
          <p className="mt-1 text-sm text-slate-500">Explainable rules, ordered by urgency and impact.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-700">
          {items.length}
        </span>
      </div>

      {demoRequirementIsApproved ? (
        <div
          className="flex flex-col gap-3 border-b border-emerald-200 bg-emerald-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          role="status"
          aria-live="polite"
        >
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              Travel insurance · Approved
            </p>
            <p className="mt-1 text-xs leading-5 text-emerald-800">
              Participant readiness, attention, and program metrics were recalculated.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetDemo}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-100"
          >
            Reset demo
          </button>
        </div>
      ) : null}

      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <article key={item.id} className="px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={item.severity}>
                    {formatAttentionSeverity(item.severity)}
                  </StatusBadge>
                  {item.recommendedAction === "Confirm requirement" ? (
                    <StatusBadge tone="neutral">Action required</StatusBadge>
                  ) : null}
                  <span className="text-xs font-medium text-slate-500">Due {formatDemoDate(item.dueDate)}</span>
                </div>
                <h3 className="mt-3 font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.reason}</p>
                <p className="mt-1 truncate text-xs text-slate-400">{programNames.get(item.programId)}</p>
              </div>
              {item.recommendedAction === "Confirm requirement" ? (
                <button
                  type="button"
                  onClick={() => onConfirmRequirement(item.sourceId)}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#173f5f] shadow-sm hover:bg-slate-50"
                >
                  {item.recommendedAction}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#173f5f] shadow-sm hover:bg-slate-50"
                >
                  {item.recommendedAction}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
