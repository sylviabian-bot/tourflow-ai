export function ReadinessBar({ value, className = "" }: { value: number; className?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`h-2.5 overflow-hidden rounded-full bg-slate-200 ${className}`}
      role="progressbar"
      aria-label="Requirement readiness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <div className="h-full rounded-full bg-teal-600" style={{ width: `${safeValue}%` }} />
    </div>
  );
}
