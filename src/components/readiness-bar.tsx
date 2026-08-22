export function ReadinessBar({ value, className = "" }: { value: number; className?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`h-1.5 overflow-hidden bg-[#e4e0d8] ${className}`}
      role="progressbar"
      aria-label="Requirement readiness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <div className="h-full bg-[var(--sage)]" style={{ width: `${safeValue}%` }} />
    </div>
  );
}
