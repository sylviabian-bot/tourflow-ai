export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
}) {
  return (
    <header className="flex flex-col gap-5 border-b border-[var(--divider)] pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium tracking-[0.08em] text-[var(--navy)]">{eyebrow}</p>
        <h1 className="editorial-title mt-2 text-4xl text-[var(--ink)] sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">{description}</p>
      </div>
      <p className="w-fit border-l border-[var(--divider)] pl-3 text-xs text-[var(--muted)]">
        {meta}
      </p>
    </header>
  );
}
