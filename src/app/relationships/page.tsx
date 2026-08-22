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
      <div className="grid gap-4 lg:grid-cols-2">
        {summaries.map((summary) => (
          <article key={summary.relationship.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{summary.partner.location}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              <Link href={`/relationships/${summary.relationship.id}`} className="rounded-sm hover:text-[#173f5f] hover:underline">{summary.partner.name}</Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{summary.relationship.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Strategic themes">
              {summary.relationship.strategicThemes.map((theme) => (
                <li key={theme} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">{theme}</li>
              ))}
            </ul>
            <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-500">Latest engagement</dt>
                <dd className="mt-1 font-medium text-slate-900">{summary.latestEngagement ? formatEngagementType(summary.latestEngagement.type) : "No completed engagement"}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Next engagement</dt>
                <dd className="mt-1 font-medium text-slate-900">{summary.nextEngagement?.title ?? "Not scheduled"}</dd>
              </div>
            </dl>
            {summary.latestSignal ? (
              <div className="mt-5 border-l-2 border-teal-600 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">Latest relationship context</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">{summary.latestSignal.detail}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
