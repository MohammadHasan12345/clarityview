"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Sparkles, Loader2, FileUp } from "lucide-react";
import LanguagePicker from "@/components/LanguagePicker";
import Toast from "@/components/Toast";
import { getSessionId } from "@/lib/session";
import { getSamples } from "@/lib/samples";
import { getUI, isRTL } from "@/lib/i18n";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = getUI(language);

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      setError(null);
      // Vercel caps upload bodies at ~4.5 MB. Stop big files before they fail.
      if (file.size > 4 * 1024 * 1024) {
        setError(t.errPdfBig);
        return;
      }
      setUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data) {
          throw new Error(data?.error || t.errPdfRead);
        }
        setText(data.text);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errPdfRead);
      } finally {
        setUploading(false);
      }
    },
    [t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    noClick: false,
  });

  async function handleSubmit() {
    setError(null);
    if (text.trim().length < 30) {
      setError(t.errShort);
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
        throw new Error(data?.error || t.errGeneric);
      }
      router.push(`/result/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errGeneric);
      setLoading(false);
    }
  }

  return (
    <main
      dir={isRTL(language) ? "rtl" : "ltr"}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-10 sm:py-16"
    >
      <header className="text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
          <Sparkles size={16} /> ClarityView
        </p>
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted sm:text-lg">
          {t.heroSub}
        </p>
      </header>

      <section className="mt-8">
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-muted">{t.tryHeading}</p>
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
                {t.samples[s.id as keyof typeof t.samples] ?? s.label}
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
              <Loader2 size={20} className="animate-spin" /> {t.uploading}
            </span>
          ) : (
            <>
              <FileUp size={28} className="text-accent" />
              <span className="mt-2 text-sm font-medium text-ink">
                {t.dropMain}
              </span>
              <span className="mt-1 text-xs text-muted">{t.dropSub}</span>
            </>
          )}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          rows={10}
          className="w-full resize-y rounded-2xl border border-border bg-card p-4 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <LanguagePicker
            value={language}
            onChange={setLanguage}
            label={t.resultIn}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </div>
      </section>

      <Toast message={error} onClose={() => setError(null)} />

      <footer className="mt-auto pt-10 text-center text-xs text-muted">
        <p>{t.footer}</p>
        <a
          href="/about"
          className="mt-2 inline-block font-medium text-accent hover:underline"
        >
          {t.aboutLink}
        </a>
      </footer>
    </main>
  );
}
