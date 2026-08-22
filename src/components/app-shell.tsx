import Link from "next/link";

import { Navigation } from "./navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-[var(--divider)] bg-[var(--surface)] lg:flex">
        <div className="border-b border-[var(--divider)] px-6 py-7">
          <Brand />
        </div>
        <Navigation variant="desktop" />
        <div className="mt-auto border-t border-[var(--divider)] px-6 py-5">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--navy)]">
            Portfolio prototype
          </p>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Composite demo data · No live university systems connected
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-[var(--divider)] bg-[var(--surface)] px-4 lg:hidden">
        <Brand />
        <Navigation variant="mobile" />
      </header>

      <main className="lg:pl-60">
        <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-7 sm:py-10 lg:px-12 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className="inline-block rounded-sm" aria-label="Global Engagement Home">
      <span>
        <span className="block text-sm font-semibold tracking-[0.08em] text-[var(--navy)]">
          GLOBAL ENGAGEMENT
        </span>
        <span className="mt-1 block text-[11px] text-[var(--muted)]">
          International Office Workspace
        </span>
      </span>
    </Link>
  );
}
