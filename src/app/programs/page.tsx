import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProgramCard } from "@/components/dashboard/program-card";
import { milestones, participants, programs, requirements } from "@/data/fixtures";
import { DEMO_SNAPSHOT_LABEL } from "@/domain/demo-clock";
import { getProgramSummary } from "@/domain/rules";

export const metadata: Metadata = { title: "Programs" };

export default function ProgramsPage() {
  const summaries = programs.map((program) =>
    getProgramSummary(program, participants, requirements, milestones),
  );

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Portfolio"
        title="Programs"
        description="A concise view of lifecycle, readiness, cohort size, and departure timing."
        meta={DEMO_SNAPSHOT_LABEL}
      />
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {summaries.map((summary) => (
          <ProgramCard key={summary.program.id} summary={summary} />
        ))}
      </div>
    </div>
  );
}
