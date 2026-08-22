import type {
  AttentionSeverity,
  EngagementStage,
  LifecycleStage,
  ReadinessState,
} from "@/domain/types";

type StatusTone =
  | LifecycleStage
  | EngagementStage
  | ReadinessState
  | AttentionSeverity
  | "neutral";

const toneClasses: Record<StatusTone, string> = {
  planning: "border-sky-200 bg-sky-50 text-sky-800",
  applications: "border-violet-200 bg-violet-50 text-violet-800",
  pre_departure: "border-indigo-200 bg-indigo-50 text-indigo-800",
  on_tour: "border-teal-200 bg-teal-50 text-teal-800",
  completed: "border-slate-200 bg-slate-100 text-slate-700",
  enquiry: "border-violet-200 bg-violet-50 text-violet-800",
  scoping: "border-sky-200 bg-sky-50 text-sky-800",
  scheduled: "border-teal-200 bg-teal-50 text-teal-800",
  in_progress: "border-indigo-200 bg-indigo-50 text-indigo-800",
  follow_up: "border-amber-200 bg-amber-50 text-amber-900",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
  needs_attention: "border-amber-200 bg-amber-50 text-amber-900",
  blocked: "border-rose-200 bg-rose-50 text-rose-800",
  high: "border-rose-200 bg-rose-50 text-rose-800",
  medium: "border-amber-200 bg-amber-50 text-amber-900",
  low: "border-slate-200 bg-slate-100 text-slate-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function StatusBadge({
  tone,
  children,
}: {
  tone: StatusTone;
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
