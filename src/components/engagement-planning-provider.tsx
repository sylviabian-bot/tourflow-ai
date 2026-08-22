"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { baselineConfirmedAssignmentIds } from "@/data/planning-fixtures";
import { baselineCompletedCommitmentIds } from "@/data/follow-up-fixtures";

type PlanningContextValue = {
  confirmedAssignmentIds: string[];
  confirmAssignment: (assignmentId: string) => void;
  resetAssignments: () => void;
  completedCommitmentIds: string[];
  completeCommitment: (commitmentId: string) => void;
  resetFollowUp: () => void;
};

const PlanningContext = createContext<PlanningContextValue | null>(null);

export function EngagementPlanningProvider({ children }: { children: React.ReactNode }) {
  const [confirmedAssignmentIds, setConfirmedAssignmentIds] = useState<string[]>(
    () => [...baselineConfirmedAssignmentIds],
  );
  const [completedCommitmentIds, setCompletedCommitmentIds] = useState<string[]>(
    () => [...baselineCompletedCommitmentIds],
  );
  const value = useMemo<PlanningContextValue>(() => ({
    confirmedAssignmentIds,
    confirmAssignment: (assignmentId) => setConfirmedAssignmentIds((current) =>
      current.includes(assignmentId) ? current : [...current, assignmentId]
    ),
    resetAssignments: () => setConfirmedAssignmentIds([...baselineConfirmedAssignmentIds]),
    completedCommitmentIds,
    completeCommitment: (commitmentId) => setCompletedCommitmentIds((current) =>
      current.includes(commitmentId) ? current : [...current, commitmentId]
    ),
    resetFollowUp: () => setCompletedCommitmentIds([...baselineCompletedCommitmentIds]),
  }), [completedCommitmentIds, confirmedAssignmentIds]);

  return <PlanningContext.Provider value={value}>{children}</PlanningContext.Provider>;
}

export function useEngagementPlanning(): PlanningContextValue {
  const context = useContext(PlanningContext);
  if (!context) throw new Error("useEngagementPlanning must be used within EngagementPlanningProvider");
  return context;
}
