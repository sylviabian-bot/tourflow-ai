import { notFound } from "next/navigation";

import { DelegationProgramWorkspace } from "@/components/delegation-program-workspace";
import { DELEGATION_ENGAGEMENT_ID } from "@/data/engagement-fixtures";

export function generateStaticParams() { return [{ engagementId: DELEGATION_ENGAGEMENT_ID }]; }

export default async function ProgramPage({ params }: { params: Promise<{ engagementId: string }> }) {
  const { engagementId } = await params;
  if (engagementId !== DELEGATION_ENGAGEMENT_ID) notFound();
  return <DelegationProgramWorkspace />;
}
