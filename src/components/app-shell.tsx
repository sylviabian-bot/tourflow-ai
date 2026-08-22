import Link from "next/link";

import { Navigation } from "./navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-[#112f47] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Brand inverse />
        </div>
        <Navigation variant="desktop" />
        <div className="mt-auto border-t border-white/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            Fictional data
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Portfolio prototype · No live university systems connected
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Brand />
        <Navigation variant="mobile" />
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          {children}
        </div>
      </main>
    </div>
  );
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label="TourFlow Dashboard">
      <span
        className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold ${
          inverse ? "bg-white text-[#173f5f]" : "bg-[#173f5f] text-white"
        }`}
        aria-hidden="true"
      >
        TF
      </span>
      <span>
        <span className={`block text-base font-semibold tracking-[-0.02em] ${inverse ? "text-white" : "text-slate-950"}`}>
          TourFlow
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.14em] ${inverse ? "text-slate-400" : "text-slate-500"}`}>
          Program operations
        </span>
      </span>
    </Link>
  );
}
