"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Dashboard" },
  { href: "/programs", label: "Programs" },
  { href: "/participants", label: "Participants" },
] as const;

export function Navigation({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <details className="group relative">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm">
          Menu
          <span className="text-slate-400 transition group-open:rotate-180" aria-hidden="true">⌄</span>
        </summary>
        <nav
          aria-label="Primary navigation"
          className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          {navigationItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} mobile />
          ))}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-1 px-3 py-5">
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
      className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
        mobile
          ? active
            ? "bg-slate-100 text-slate-950"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
          : active
            ? "bg-white/12 text-white"
            : "text-slate-300 hover:bg-white/7 hover:text-white"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? (mobile ? "bg-teal-600" : "bg-teal-300") : mobile ? "bg-slate-300" : "bg-slate-600"
        }`}
        aria-hidden="true"
      />
      {item.label}
    </Link>
  );
}
