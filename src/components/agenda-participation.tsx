import { getAgendaParticipation } from "@/domain/planning-rules";
import type { AgendaItem, InternalStakeholder, StakeholderAssignment } from "@/domain/types";

export function AgendaParticipation({
  item,
  assignments,
  stakeholders,
}: {
  item: AgendaItem;
  assignments: StakeholderAssignment[];
  stakeholders: InternalStakeholder[];
}) {
  const participation = getAgendaParticipation(item, assignments);
  const stakeholderById = new Map(stakeholders.map((stakeholder) => [stakeholder.id, stakeholder]));

  return (
    <dl className="mt-3 space-y-2 text-xs leading-5 text-[var(--muted)]">
      <ParticipationGroup
        assignments={participation.confirmed}
        label="Confirmed host"
        stakeholderById={stakeholderById}
      />
      <ParticipationGroup
        assignments={participation.proposed}
        label="Proposed participant"
        stakeholderById={stakeholderById}
      />
    </dl>
  );
}

function ParticipationGroup({
  assignments,
  label,
  stakeholderById,
}: {
  assignments: StakeholderAssignment[];
  label: string;
  stakeholderById: Map<string, InternalStakeholder>;
}) {
  if (assignments.length === 0) return null;
  const names = assignments.flatMap((assignment) => {
    const stakeholder = stakeholderById.get(assignment.stakeholderId);
    return stakeholder ? [stakeholder.name] : [];
  });

  return (
    <div>
      <dt className="font-medium text-[var(--ink)]">
        {label}{names.length === 1 ? "" : "s"}
      </dt>
      <dd>{names.join(", ")}</dd>
    </div>
  );
}
