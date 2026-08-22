import type { GroundingStatus } from "@/ai/enquiry-schema";

const labels: Record<GroundingStatus, string> = {
  explicit: "Explicit from enquiry",
  inferred: "Inferred — review required",
  missing: "Missing",
  ambiguous: "Ambiguous",
};

const tones: Record<GroundingStatus, string> = {
  explicit: "bg-[var(--sage)]",
  inferred: "bg-[var(--ochre)]",
  missing: "bg-[var(--burgundy)]",
  ambiguous: "bg-[var(--ochre)]",
};

export function GroundingIndicator({ status }: { status: GroundingStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink)]">
      <span className={`h-2 w-2 rounded-full ${tones[status]}`} aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
