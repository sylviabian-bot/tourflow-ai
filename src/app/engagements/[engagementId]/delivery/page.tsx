import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StudyTourDeliveryWorkspace } from "@/components/study-tour-delivery-workspace";
import { engagements } from "@/data/engagement-fixtures";
import { itineraryEntries, milestones, participants, programs, requirements } from "@/data/fixtures";

type DeliveryPageProps = { params: Promise<{ engagementId: string }> };

export const metadata: Metadata = { title: "Study Tour Delivery" };

export function generateStaticParams() {
  return engagements
    .filter((engagement) => engagement.type === "study_tour" && engagement.studyTourProgramId === "shanghai-sydney-innovation")
    .map((engagement) => ({ engagementId: engagement.id }));
}
export default async function DeliveryPage({ params }: DeliveryPageProps) {
  const { engagementId } = await params;
  const engagement = engagements.find((candidate) => candidate.id === engagementId);
  if (!engagement || engagement.type !== "study_tour") notFound();

  const program = programs.find((candidate) => candidate.id === engagement.studyTourProgramId);
  if (!program) notFound();

  return (
    <StudyTourDeliveryWorkspace
      program={program}
      participants={participants.filter((participant) => participant.programId === program.id)}
      initialRequirements={requirements.filter((requirement) => requirement.programId === program.id)}
      milestones={milestones.filter((milestone) => milestone.programId === program.id)}
      itineraryEntries={itineraryEntries.filter((entry) => entry.programId === program.id)}
      relationshipHref={`/relationships/${engagement.relationshipId}`}
    />
  );
}
