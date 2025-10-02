// src/lib/types.ts

export type Recurrence = {
  freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  interval?: number;
  byDay?: string[];   // e.g., ["MO","WE","FR"]
  until?: string;     // ISO string (prefer Zulu "YYYY-MM-DDTHH:mm:ssZ")
};

export type Alarm = {
  minutes_before_start: number; // 10 => 10 minutes before
};

export type PlanEvent = {
  title: string;
  description?: string | null;
  location?: string | null;
  all_day?: boolean;
  start: string;  // "2025-10-06T10:00:00" (local naive in the chosen timezone)
  end: string;    // same format as start
  hard?: boolean; // true = timelocked (cannot be moved)
  priority?: 'must' | 'should' | 'nice';
  recurrence?: Recurrence | null;
  alarms?: Alarm[];
};

export type PlanDoc = {
  calendar_title: string; // e.g., "Weekly Plan"
  timezone: string;       // IANA TZ like "Europe/Sofia"
  anchor_monday: string;  // "YYYY-MM-DD" Monday of the target week
  events: PlanEvent[];
  notes?: string[];
};
