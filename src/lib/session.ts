// Anonymous session id stored in localStorage. No login for the MVP.
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("cv_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("cv_session", id);
  }
  return id;
}

export const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
];
