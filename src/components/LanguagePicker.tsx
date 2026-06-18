"use client";

import { Languages } from "lucide-react";
import { LANGUAGES } from "@/lib/session";

export default function LanguagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-ink">
      <Languages size={18} className="text-accent" />
      <span>Show me the result in</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-card px-3 py-2 text-ink focus:border-accent focus:outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
