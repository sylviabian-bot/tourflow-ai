import { EngagementPlanningProvider } from "@/components/engagement-planning-provider";

export default function EngagementLayout({ children }: { children: React.ReactNode }) {
  return <EngagementPlanningProvider>{children}</EngagementPlanningProvider>;
}
