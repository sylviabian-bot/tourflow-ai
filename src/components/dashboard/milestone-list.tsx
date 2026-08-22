import { formatDemoDate } from "@/domain/presentation";
import type { Milestone, Program } from "@/domain/types";

export function MilestoneList({
  milestones,
  programs,
}: {
  milestones: Milestone[];
  programs: Program[];
}) {
  const programNames = new Map(programs.map((program) => [program.id, program.name]));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="milestones-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Next dates</p>
      <h2 id="milestones-heading" className="mt-1 text-xl font-semibold text-slate-950">Upcoming milestones</h2>
      <ol className="mt-5 space-y-4">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1f7a70]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{milestone.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {formatDemoDate(milestone.dueDate)} · {programNames.get(milestone.programId)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
