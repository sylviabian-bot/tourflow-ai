"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { baselineConfirmedAssignmentIds } from "@/data/planning-fixtures";

type PlanningContextValue = {
  confirmedAssignmentIds: string[];
  confirmAssignment: (assignmentId: string) => void;
  resetAssignments: () => void;
};

const PlanningContext = createContext<PlanningContextValue | null>(null);

export function EngagementPlanningProvider({ children }: { children: React.ReactNode }) {
  const [confirmedAssignmentIds, setConfirmedAssignmentIds] = useState<string[]>(
    () => [...baselineConfirmedAssignmentIds],
  );
  const value = useMemo<PlanningContextValue>(() => ({
    confirmedAssignmentIds,
    confirmAssignment: (assignmentId) => setConfirmedAssignmentIds((current) =>
      current.includes(assignmentId) ? current : [...current, assignmentId]
    ),
    resetAssignments: () => setConfirmedAssignmentIds([...baselineConfirmedAssignmentIds]),
  }), [confirmedAssignmentIds]);

  return <PlanningContext.Provider value={value}>{children}</PlanningContext.Provider>;
}

export function useEngagementPlanning(): PlanningContextValue {
  const context = useContext(PlanningContext);
  if (!context) throw new Error("useEngagementPlanning must be used within EngagementPlanningProvider");
  return context;
}
