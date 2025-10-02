// src/lib/validate.ts
import { DateTime } from "luxon";
import { PlanDoc, PlanEvent } from "./types";

/**
 * normalizePlan:
 *  - Drops events with invalid dates.
 *  - If end <= start, auto-extends to +30m and warns.
 *  - Returns normalized plan + warnings (strings you can show in UI).
 */
export function normalizePlan(plan: PlanDoc): { plan: PlanDoc; warnings: string[] } {
  const warnings: string[] = [];
  const tz = plan.timezone;
  const normEvents: PlanEvent[] = [];

  for (const ev of plan.events) {
    const start = DateTime.fromISO(ev.start, { zone: tz });
    const end   = DateTime.fromISO(ev.end,   { zone: tz });

    if (!start.isValid || !end.isValid) {
      warnings.push(`Invalid date in event "${ev.title}". Dropped.`);
      continue;
    }

    if (end <= start) {
      warnings.push(`"${ev.title}" had end <= start. Auto-extended by 30 minutes.`);
      const fixedEnd = start.plus({ minutes: 30 }).toISO({ suppressMilliseconds: true });
      normEvents.push({ ...ev, end: fixedEnd! });
      continue;
    }

    normEvents.push(ev);
  }

  return { plan: { ...plan, events: normEvents }, warnings };
}
