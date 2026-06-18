"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export interface ChecklistItem {
  step: string;
  deadline: string | null;
  priority: "high" | "medium" | "low";
}

const PRIORITY_COLOR: Record<ChecklistItem["priority"], string> = {
  high: "var(--urgent)",
  medium: "var(--normal)",
  low: "var(--muted)",
};

function formatDeadline(deadline: string): string {
  const d = new Date(deadline + "T00:00:00");
  if (isNaN(d.getTime())) return deadline;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Checklist({ items }: { items: ChecklistItem[] }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  if (!items.length) {
    return (
      <p className="text-muted">No specific actions needed for this document.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() =>
              setDone((prev) => prev.map((v, j) => (j === i ? !v : v)))
            }
            className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition hover:border-accent"
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2"
              style={{
                borderColor: done[i] ? "var(--info)" : "var(--border)",
                backgroundColor: done[i] ? "var(--info)" : "transparent",
              }}
            >
              {done[i] && <Check size={16} strokeWidth={3} color="#fff" />}
            </span>
            <span className="flex-1">
              <span
                className={`block font-medium ${
                  done[i] ? "text-muted line-through" : "text-ink"
                }`}
              >
                {item.step}
              </span>
              {item.deadline && (
                <span
                  className="mt-1 inline-block text-sm font-semibold"
                  style={{ color: PRIORITY_COLOR[item.priority] }}
                >
                  Due {formatDeadline(item.deadline)}
                </span>
              )}
              <span className="mt-1 block text-xs text-muted">
                Double-check this date against the original document.
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
