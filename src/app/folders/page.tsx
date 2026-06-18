"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Scale,
  Stethoscope,
  Landmark,
  DollarSign,
  FileText,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { getSessionId } from "@/lib/session";

interface DocRow {
  id: string;
  created_at: string;
  doc_type: string;
  urgency: "urgent" | "normal" | "informational";
  what_this_means: string;
}

const FOLDERS: {
  type: string;
  label: string;
  Icon: typeof FileText;
}[] = [
  { type: "school", label: "School", Icon: GraduationCap },
  { type: "legal", label: "Legal", Icon: Scale },
  { type: "medical", label: "Medical", Icon: Stethoscope },
  { type: "government", label: "Government", Icon: Landmark },
  { type: "financial", label: "Financial", Icon: DollarSign },
  { type: "other", label: "Other", Icon: FileText },
];

const URGENCY_DOT: Record<DocRow["urgency"], string> = {
  urgent: "var(--urgent)",
  normal: "var(--normal)",
  informational: "var(--info)",
};

export default function FoldersPage() {
  const [docs, setDocs] = useState<DocRow[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();
    fetch(`/api/documents?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => setDocs(d.documents ?? []))
      .catch(() => setDocs([]));
  }, []);

  const countFor = (type: string) =>
    docs?.filter((d) => d.doc_type === type).length ?? 0;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Back to ClarityView
      </Link>

      <h1 className="mt-6 flex items-center gap-2 text-3xl font-bold text-ink">
        <FolderOpen size={28} className="text-accent" /> My documents
      </h1>
      <p className="mt-2 text-muted">
        Every document you explain is saved here, sorted by type.
      </p>

      {docs === null ? (
        <p className="mt-8 text-muted">Loading…</p>
      ) : docs.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-ink">You haven&apos;t explained any documents yet.</p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Explain your first document
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {FOLDERS.filter((f) => countFor(f.type) > 0).map(
            ({ type, label, Icon }) => {
              const items = docs.filter((d) => d.doc_type === type);
              const isOpen = open === type;
              return (
                <div
                  key={type}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : type)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={22} />
                    </span>
                    <span className="flex-1 font-semibold text-ink">{label}</span>
                    <span className="text-sm text-muted">
                      {items.length} {items.length === 1 ? "file" : "files"}
                    </span>
                    <ChevronRight
                      size={18}
                      className={`text-muted transition ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="border-t border-border">
                      {items.map((d) => (
                        <li key={d.id}>
                          <Link
                            href={`/result/${d.id}`}
                            className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-bg"
                          >
                            <span
                              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: URGENCY_DOT[d.urgency] }}
                            />
                            <span className="flex-1">
                              <span className="block text-sm text-ink">
                                {d.what_this_means}
                              </span>
                              <span className="text-xs text-muted">
                                {new Date(d.created_at).toLocaleDateString(
                                  undefined,
                                  { month: "short", day: "numeric", year: "numeric" }
                                )}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </main>
  );
}
