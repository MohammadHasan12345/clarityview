import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";
import UrgencyBadge from "@/components/UrgencyBadge";
import Checklist, { ChecklistItem } from "@/components/Checklist";
import HumanReviewBanner from "@/components/HumanReviewBanner";

type KeyDate = { date: string; event: string };

function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: doc, error } = await supabaseAdmin
    .from("documents")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !doc) notFound();

  const checklist = (doc.checklist ?? []) as ChecklistItem[];
  const keyDates = (doc.key_dates ?? []) as KeyDate[];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Analyze another document
      </Link>

      {/* 1. Urgency badge */}
      <div className="mt-6">
        <UrgencyBadge urgency={doc.urgency} />
      </div>

      {/* 2. What this means */}
      <h1 className="mt-5 text-2xl font-bold leading-snug text-ink sm:text-3xl">
        {doc.what_this_means}
      </h1>

      {/* 3. Action checklist */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-ink">
          What you need to do
        </h2>
        <Checklist items={checklist} />
      </section>

      {/* 4. Full summary — collapsed by default */}
      <section className="mt-8">
        <details className="rounded-2xl border border-border bg-card p-5">
          <summary className="cursor-pointer text-lg font-semibold text-ink">
            Full explanation
          </summary>
          <p className="mt-3 leading-relaxed text-ink/90">{doc.summary}</p>
        </details>
      </section>

      {/* 5. Key dates */}
      {keyDates.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-ink">
            <CalendarDays size={20} className="text-accent" /> Important dates
          </h2>
          <ul className="space-y-2">
            {keyDates.map((kd, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="font-semibold text-accent">
                  {formatDate(kd.date)}
                </span>
                <span className="text-ink/90">{kd.event}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6. Human review note — always visible */}
      <section className="mt-8">
        <HumanReviewBanner note={doc.human_review_note} />
      </section>

      <footer className="mt-10 border-t border-border pt-5 text-center text-xs text-muted">
        This is not legal, medical, or financial advice. ClarityView explains
        documents — it does not make decisions for you. Always check important
        dates and details against your original document.
      </footer>
    </main>
  );
}
