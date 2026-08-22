import type { ReactNode } from "react";

export function SectionHeader({ id, title, description, action }: { id?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--divider)] pb-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 id={id} className="text-sm font-semibold tracking-[0.06em] text-[var(--ink)]">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EditorialDivider() {
  return <hr className="border-0 border-t border-[var(--divider)]" />;
}

export function MetadataList({ children }: { children: ReactNode }) {
  return <dl className="divide-y divide-[var(--divider)] border-y border-[var(--divider)]">{children}</dl>;
}

export function MetadataRow({ label, value }: { label: string; value: ReactNode }) {
  return <div className="grid gap-1 py-3 text-sm sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5"><dt className="text-[var(--muted)]">{label}</dt><dd className="font-medium text-[var(--ink)]">{value}</dd></div>;
}

export function TimelineItem({ date, type, children, last = false }: { date: string; type: string; children: ReactNode; last?: boolean }) {
  return (
    <li className="relative grid gap-4 pb-9 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8">
      {!last ? <span className="absolute bottom-0 left-[5px] top-3 w-px bg-[var(--divider)] sm:left-[8.65rem]" aria-hidden="true" /> : null}
      <div className="pl-6 sm:pl-0 sm:text-right"><p className="text-xs font-semibold tracking-[0.08em] text-[var(--navy)]">{date}</p><p className="mt-1 text-xs text-[var(--muted)]">{type}</p></div>
      <div className="relative pl-6 sm:pl-0"><span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--paper)] bg-[var(--context)] sm:-left-[1.85rem]" aria-hidden="true" />{children}</div>
    </li>
  );
}
