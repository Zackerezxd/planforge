"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import { normalizePlan } from "@/lib/validate";
import type { PlanDoc } from "@/lib/types";

export default function Home() {
  const [warnings, setWarnings] = useState<string[]>([]);

  function runTest() {
    const monday = DateTime.local().startOf("week").plus({ days: 1 }).toFormat("yyyy-LL-dd"); // ISO Monday
    const plan: PlanDoc = {
      calendar_title: "Weekly Plan",
      timezone: "Europe/Sofia",
      anchor_monday: monday,
      events: [
        {
          title: "Valid Event",
          start: `${monday}T10:00:00`,
          end: `${monday}T11:00:00`,
        } as any,
        {
          title: "Broken Event (end <= start)",
          start: `${monday}T12:00:00`,
          end: `${monday}T12:00:00`,
        } as any
      ]
    };

    const { warnings } = normalizePlan(plan);
    setWarnings(warnings);
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-3xl font-semibold">
        Weekly Planner — <span className="text-emerald-600">MVP</span>
      </h1>
      <p className="text-gray-600">
        Milestone 2: shared types + basic validator are installed.
      </p>

      <button
        onClick={runTest}
        className="border rounded px-4 py-2 hover:bg-gray-50"
      >
        Run validator test
      </button>

      {warnings.length > 0 && (
        <div className="border rounded p-3">
          <h2 className="font-medium mb-2">Warnings</h2>
          <ul className="list-disc pl-5 text-sm">
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </main>
  );
}
