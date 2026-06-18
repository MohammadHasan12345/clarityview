import { ShieldCheck } from "lucide-react";

export default function HumanReviewBanner({ note }: { note?: string }) {
  return (
    <div className="rounded-2xl border-2 border-accent bg-accent-soft p-5">
      <div className="flex items-start gap-3">
        <ShieldCheck
          size={28}
          strokeWidth={2.2}
          className="shrink-0 text-accent"
        />
        <div>
          <p className="font-semibold text-ink">
            ClarityView explains. You decide.
          </p>
          <p className="mt-1 text-sm text-ink/80">
            For legal action, hospital consent, or money decisions — talk to a
            person you trust or a professional. ClarityView never signs, agrees,
            or replies for you.
          </p>
          {note && (
            <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm font-medium text-ink">
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
