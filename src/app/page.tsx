"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Sparkles, Loader2, FileUp } from "lucide-react";
import LanguagePicker from "@/components/LanguagePicker";
import Toast from "@/components/Toast";
import { getSessionId } from "@/lib/session";
import { getSamples } from "@/lib/samples";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError(null);
    // Vercel caps upload bodies at ~4.5 MB. Stop big files before they fail.
    if (file.size > 4 * 1024 * 1024) {
      setError(
        "That PDF is too big to upload (4 MB max). Try a smaller file, or copy and paste the text instead."
      );
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        throw new Error(
          data?.error ||
            "We couldn't read that PDF. Try a smaller file, or paste the text instead."
        );
      }
      setText(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that PDF.");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    noClick: false,
  });

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
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
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
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-muted">
            New here? Try a sample document:
          </p>
          <div className="flex flex-wrap gap-2">
            {getSamples().map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setText(s.text);
                  setLanguage(s.language);
                  setError(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-ink transition hover:border-accent"
              >
                <span>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
            isDragActive ? "border-accent bg-accent-soft" : "border-border bg-card"
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <Loader2 size={20} className="animate-spin" /> Reading your PDF…
            </span>
          ) : (
            <>
              <FileUp size={28} className="text-accent" />
              <span className="mt-2 text-sm font-medium text-ink">
                Drop a PDF here, or tap to choose a file
              </span>
              <span className="mt-1 text-xs text-muted">
                We&apos;ll pull out the text — or just paste it below.
              </span>
            </>
          )}
        </div>

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

      </section>

      <Toast message={error} onClose={() => setError(null)} />

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
