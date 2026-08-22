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
    <article className="flex h-full flex-col border-t border-[var(--divider)] py-5 sm:py-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={engagement.stage}>
          {formatEngagementStage(engagement.stage)}
        </StatusBadge>
        <span className="text-xs text-[var(--muted)]">
          {formatEngagementType(engagement.type)}
        </span>
      </div>
      <h2 className="mt-4 text-lg font-semibold leading-7 text-[var(--ink)]">
        <Link href={href} className="rounded-sm hover:text-[var(--navy)] hover:underline">
          {engagement.title}
        </Link>
      </h2>
      <p className="mt-1 text-sm font-medium text-[var(--navy)]">{partner.name}</p>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{engagement.summary}</p>
      <div className="mt-auto pt-4 text-xs tabular-nums text-[var(--muted)]">
        {formatDemoDate(engagement.startDate)}–{formatDemoDate(engagement.endDate)}
      </div>
    </article>
  );
}
