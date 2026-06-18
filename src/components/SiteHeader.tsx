import Link from "next/link";
import { FolderOpen, Sparkles } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-3">
        <Link
          href="/folders"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-ink transition hover:border-accent"
        >
          <FolderOpen size={18} className="text-accent" />
          My documents
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          <Sparkles size={16} /> ClarityView
        </Link>
      </div>
    </header>
  );
}
