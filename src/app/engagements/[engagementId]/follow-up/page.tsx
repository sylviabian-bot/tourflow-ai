import { notFound } from "next/navigation";

import { EngagementFollowUpWorkspace } from "@/components/engagement-follow-up-workspace";
import { DELEGATION_ENGAGEMENT_ID } from "@/data/engagement-fixtures";

type FollowUpPageProps = { params: Promise<{ engagementId: string }> };

export function generateStaticParams() {
  return [{ engagementId: DELEGATION_ENGAGEMENT_ID }];
}

export default async function FollowUpPage({ params }: FollowUpPageProps) {
  const { engagementId } = await params;
  if (engagementId !== DELEGATION_ENGAGEMENT_ID) notFound();
  return <EngagementFollowUpWorkspace />;
}
