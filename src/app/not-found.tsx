import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Not found</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-950">This TourFlow page is unavailable.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Return to the Dashboard to continue reviewing the demo portfolio.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#173f5f] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
