import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { formatDemoDate, formatEngagementStage, formatEngagementType } from "@/domain/presentation";
import type { Engagement, PartnerOrganisation } from "@/domain/types";

export function EngagementCard({
  engagement,
  partner,
  href,
}: {
  engagement: Engagement;
  partner: PartnerOrganisation;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.5)] sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={engagement.stage}>
          {formatEngagementStage(engagement.stage)}
        </StatusBadge>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {formatEngagementType(engagement.type)}
        </span>
      </div>
      <h2 className="mt-4 text-lg font-semibold leading-7 text-slate-950">
        <Link href={href} className="rounded-sm hover:text-[#173f5f] hover:underline">
          {engagement.title}
        </Link>
      </h2>
      <p className="mt-1 text-sm font-medium text-slate-600">{partner.name}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{engagement.summary}</p>
      <div className="mt-auto border-t border-slate-100 pt-4 text-xs text-slate-500">
        {formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}
      </div>
    </article>
  );
}
