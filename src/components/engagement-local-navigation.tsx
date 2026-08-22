"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function EngagementLocalNavigation({ engagementId }: { engagementId: string }) {
  const pathname = usePathname();
  const base = `/engagements/${engagementId}`;
  const items = [
    { href: base, label: "Overview" },
    { href: `${base}/program`, label: "Program" },
    { href: `${base}/brief`, label: "Brief" },
  ];
  return (
    <nav aria-label="Engagement sections" className="border-b border-[var(--divider)]">
      <ul className="flex gap-6 overflow-x-auto">
        {items.map((item) => {
          const active = pathname === item.href;
          return <li key={item.href}><Link href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-11 items-center border-b-2 text-sm ${active ? "border-[var(--navy)] font-semibold text-[var(--navy)]" : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"}`}>{item.label}</Link></li>;
        })}
      </ul>
    </nav>
  );
}
