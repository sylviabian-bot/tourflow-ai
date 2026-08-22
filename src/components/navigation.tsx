"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/relationships", label: "Relationships" },
  { href: "/engagements", label: "Engagements" },
] as const;

export function Navigation({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <details className="group relative">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded border border-[var(--divider)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--navy)]">
          Menu
          <span className="text-slate-400 transition group-open:rotate-180" aria-hidden="true">⌄</span>
        </summary>
        <nav
          aria-label="Primary navigation"
          className="absolute right-0 top-12 w-56 rounded border border-[var(--divider)] bg-[var(--surface)] p-2 shadow-[0_8px_22px_rgba(32,41,52,0.12)]"
        >
          {navigationItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} mobile />
          ))}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-1 px-4 py-6">
      {navigationItems.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

function NavLink({
  item,
  pathname,
  mobile = false,
}: {
  item: (typeof navigationItems)[number];
  pathname: string;
  mobile?: boolean;
}) {
  const active =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 items-center border-l-2 px-3 text-sm transition ${
        mobile
          ? active
            ? "border-[var(--navy)] bg-[#efede7] font-semibold text-[var(--navy)]"
            : "border-transparent text-[var(--muted)] hover:bg-[#f3f0ea] hover:text-[var(--ink)]"
          : active
            ? "border-[var(--navy)] bg-[#efede7] font-semibold text-[var(--navy)]"
            : "border-transparent text-[var(--muted)] hover:bg-[#f3f0ea] hover:text-[var(--ink)]"
      }`}
    >
      {item.label}
    </Link>
  );
}
