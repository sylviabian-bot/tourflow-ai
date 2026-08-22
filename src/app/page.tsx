import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace";
import {
  itineraryEntries,
  milestones,
  participants,
  programs,
  requirements,
} from "@/data/fixtures";

export default function DashboardPage() {
  return (
    <DashboardWorkspace
      programs={programs}
      participants={participants}
      initialRequirements={requirements}
      milestones={milestones}
      itineraryEntries={itineraryEntries}
    />
  );
}
