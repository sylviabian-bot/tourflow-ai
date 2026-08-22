import type { ParticipantReadinessSummary } from "@/domain/types";

export function ParticipantReadinessPanel({
  summary,
  outstandingRequirementCount,
}: {
  summary: ParticipantReadinessSummary;
  outstandingRequirementCount: number;
}) {
  const rows = [
    { label: "Ready", value: summary.ready, dot: "bg-emerald-500" },
    { label: "Needs attention", value: summary.needsAttention, dot: "bg-amber-500" },
    { label: "Blocked", value: summary.blocked, dot: "bg-rose-500" },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="portfolio-readiness-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Portfolio</p>
      <h2 id="portfolio-readiness-heading" className="mt-1 text-xl font-semibold text-slate-950">Participant readiness</h2>
      <p className="mt-2 text-sm text-slate-500">{summary.total} fictional participants across active programs.</p>

      <dl className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
            <dt className="flex items-center gap-2 text-sm text-slate-600">
              <span className={`h-2 w-2 rounded-full ${row.dot}`} aria-hidden="true" />
              {row.label}
            </dt>
            <dd className="font-semibold tabular-nums text-slate-950">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-xs font-medium text-slate-500">Outstanding requirements</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">
          {outstandingRequirementCount}
        </p>
      </div>
    </section>
  );
}
