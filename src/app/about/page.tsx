import Link from "next/link";
import { ArrowLeft, Users, ShieldAlert, Ban } from "lucide-react";

export const metadata = {
  title: "About ClarityView",
  description:
    "Who ClarityView is for, the risk we identified, and what it will never decide for you.",
};

const NEVER_DECIDES = [
  "Signing contracts or forms",
  "Taking or changing medications",
  "Accepting plea deals or legal settlements",
  "Sharing your personal information",
  "Agreeing to terms on your behalf",
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Back to ClarityView
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-ink">About ClarityView</h1>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
          <Users size={22} className="text-accent" /> Who this is for
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          ClarityView is built for first-generation immigrant parents who work
          hourly jobs and receive English-only documents about their children —
          from schools, doctors, courts, and government offices. These letters
          often hide important deadlines in dense paragraphs, and missing them
          can cost families opportunities, services, or even housing. Anyone
          facing a confusing document can use ClarityView, but this parent is
          who we designed every choice around.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
          <ShieldAlert size={22} className="text-accent" /> The risk we identified
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">
          AI can misread legal language or miss a deadline buried in fine print.
          For a parent making a real decision, a confident-sounding mistake is
          dangerous. We address this directly:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-6 text-ink/90">
          <li>
            Every checklist item reminds you to double-check dates against the
            original document.
          </li>
          <li>
            Your original document text stays accessible — we explain, we
            don&apos;t replace it.
          </li>
          <li>
            A &quot;Human Review&quot; note on every result names what a person
            still has to decide.
          </li>
          <li>
            We instruct the AI to say when it is unsure instead of guessing.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
          <Ban size={22} className="text-accent" /> What ClarityView will never
          decide for you
        </h2>
        <ul className="mt-3 space-y-2">
          {NEVER_DECIDES.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-ink/90"
            >
              <Ban size={18} className="shrink-0 text-urgent" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-2xl border-2 border-accent bg-accent-soft p-4 font-medium text-ink">
          ClarityView explains. You decide. For legal action, hospital consent,
          or money decisions, talk to a person you trust or a professional.
        </p>
      </section>
    </main>
  );
}
