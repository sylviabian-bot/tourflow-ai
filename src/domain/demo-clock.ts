export const DEMO_TODAY = "2026-08-22" as const;
export const DEMO_SNAPSHOT_LABEL = "Demo snapshot · 22 Aug 2026" as const;

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function toUtcDate(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}

export function daysFromDemoToday(date: string): number {
  return Math.round(
    (toUtcDate(date).getTime() - toUtcDate(DEMO_TODAY).getTime()) / DAY_IN_MS,
  );
}

export function isOverdue(date: string): boolean {
  return daysFromDemoToday(date) < 0;
}

export type DateUrgency = "overdue" | "urgent" | "upcoming" | "later";

export function getDateUrgency(date: string): DateUrgency {
  const days = daysFromDemoToday(date);

  if (days < 0) return "overdue";
  if (days <= 7) return "urgent";
  if (days <= 30) return "upcoming";
  return "later";
}
