"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import LanguagePicker from "@/components/LanguagePicker";
import { getSessionId } from "@/lib/session";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (text.trim().length < 30) {
      setError("Please paste a bit more text so we can understand the document.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          sessionId: getSessionId(),
          targetLanguage: language,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      router.push(`/result/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-10 sm:py-16">
      <header className="text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
          <Sparkles size={16} /> ClarityView
        </p>
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Understand any confusing document in 15 seconds.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted sm:text-lg">
          Paste any letter, form, or notice — from school, a doctor, a court,
          the government, or anywhere else. We&apos;ll explain it in plain
          English and tell you exactly what to do.
        </p>
      </header>

      <section className="mt-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text of your letter here…"
          rows={10}
          className="w-full resize-y rounded-2xl border border-border bg-card p-4 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <LanguagePicker value={language} onChange={setLanguage} />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Reading your
                document…
              </>
            ) : (
              "Explain this for me"
            )}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-[#FBE4E0] p-3 text-sm font-medium text-urgent">
            {error}
          </p>
        )}
      </section>

      <footer className="mt-auto pt-10 text-center text-xs text-muted">
        <p>
          ClarityView explains documents. It does not give legal or medical
          advice. No information is shared without your choice.
        </p>
        <a href="/about" className="mt-2 inline-block font-medium text-accent hover:underline">
          How ClarityView keeps you in control →
        </a>
      </footer>
    </main>
  );
}
