"use client";

import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export default function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="animate-toast-in fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-urgent bg-card p-4 shadow-lg"
    >
      <AlertCircle size={22} className="mt-0.5 shrink-0 text-urgent" />
      <p className="flex-1 text-sm font-medium text-ink">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 rounded-md p-0.5 text-muted hover:bg-bg hover:text-ink"
      >
        <X size={18} />
      </button>
    </div>
  );
}
