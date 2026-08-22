import type { Metadata } from "next";

import { CompositeDisclosure } from "@/components/composite-disclosure";
import { EngagementCard } from "@/components/engagement-card";
import { PageHeader } from "@/components/page-header";
import {
  STUDY_TOUR_DELIVERY_ENGAGEMENT_ID,
  engagements,
  partnerOrganisations,
  relationships,
} from "@/data/engagement-fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";

export const metadata: Metadata = { title: "Engagements" };

export default function EngagementsPage() {
  const partnersByRelationship = new Map(
    relationships.map((relationship) => [
      relationship.id,
      partnerOrganisations.find(
        (partner) => partner.id === relationship.partnerOrganisationId,
      )!,
    ]),
  );

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Coordinated activity"
        title="Engagements"
        description="Delegations, Study Tours, partner meetings and short programs viewed in their relationship context."
        meta={DEMO_SNAPSHOT_LABEL}
      />
      <CompositeDisclosure />
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {engagements.map((engagement) => (
          <EngagementCard
            key={engagement.id}
            engagement={engagement}
            partner={partnersByRelationship.get(engagement.relationshipId)!}
            href={engagement.id === STUDY_TOUR_DELIVERY_ENGAGEMENT_ID ? `/engagements/${engagement.id}/delivery` : `/engagements/${engagement.id}`}
          />
        ))}
      </div>
    </div>
  );
}
