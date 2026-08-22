import type { Metadata } from "next";
import Link from "next/link";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { PageHeader } from "@/components/page-header";
import {
  engagements,
  partnerOrganisations,
  relationshipSignals,
  relationships,
} from "@/data/engagement-fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { buildRelationshipSummaries } from "@/domain/engagement-rules";
import { formatEngagementType } from "@/domain/presentation";

export const metadata: Metadata = { title: "Relationships" };

export default function RelationshipsPage() {
  const summaries = buildRelationshipSummaries(
    relationships,
    partnerOrganisations,
    engagements,
    relationshipSignals,
  );

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Institutional context"
        title="Relationships"
        description="A focused view of partner context, recent engagement history and signals that should inform what happens next."
        meta={DEMO_SNAPSHOT_LABEL}
      />
      <CompositeDisclosure />
      <div className="divide-y divide-[var(--divider)] border-y border-[var(--divider)]">
        {summaries.map((summary) => (
          <article key={summary.relationship.id} className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-12">
            <div>
            <p className="text-xs text-[var(--muted)]">{summary.partner.location}</p>
            <h2 className="editorial-title mt-2 text-2xl text-[var(--ink)] sm:text-3xl">
              <Link href={`/relationships/${summary.relationship.id}`} className="rounded-sm hover:text-[var(--navy)] hover:underline">{summary.partner.name}</Link>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{summary.relationship.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Strategic themes">
              {summary.relationship.strategicThemes.map((theme) => (
                <li key={theme} className="text-xs text-[var(--navy)]">{theme}</li>
              ))}
            </ul>
            </div>
            <div>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[var(--muted)]">Latest engagement</dt>
                <dd className="mt-1 font-medium text-[var(--ink)]">{summary.latestEngagement ? formatEngagementType(summary.latestEngagement.type) : "No completed engagement"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">Next engagement</dt>
                <dd className="mt-1 font-medium text-[var(--ink)]">{summary.nextEngagement?.title ?? "Not scheduled"}</dd>
              </div>
            </dl>
            {summary.latestSignal ? (
              <div className="mt-5 border-l-2 border-[var(--context)] pl-4">
                <p className="text-xs text-[var(--muted)]">Latest relationship context</p>
                <p className="mt-1 text-sm leading-6 text-[var(--ink)]">{summary.latestSignal.detail}</p>
              </div>
            ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
