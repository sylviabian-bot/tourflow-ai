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
  planning: "bg-[var(--ochre)]", applications: "bg-[var(--ochre)]", pre_departure: "bg-[var(--navy)]", on_tour: "bg-[var(--navy)]",
  completed: "bg-[var(--sage)]", enquiry: "bg-[var(--ochre)]", scoping: "bg-[var(--ochre)]", scheduled: "bg-[var(--context)]",
  in_progress: "bg-[var(--navy)]", follow_up: "bg-[var(--ochre)]", ready: "bg-[var(--sage)]", needs_attention: "bg-[var(--burgundy)]",
  blocked: "bg-[var(--burgundy)]", high: "bg-[var(--burgundy)]", medium: "bg-[var(--ochre)]", low: "bg-[var(--muted)]", neutral: "bg-[var(--muted)]",
};

export function StatusBadge({
  tone,
  children,
}: {
  tone: StatusTone;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[var(--ink)]">
      <span className={`h-2 w-2 rounded-full ${toneClasses[tone]}`} aria-hidden="true" />
      {children}
    </span>
  );
}
