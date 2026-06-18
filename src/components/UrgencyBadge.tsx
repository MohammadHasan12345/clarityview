import { AlertTriangle, Clock, Info } from "lucide-react";

type Urgency = "urgent" | "normal" | "informational";

const CONFIG: Record<
  Urgency,
  { label: string; color: string; bg: string; Icon: typeof Info }
> = {
  urgent: {
    label: "Urgent — act soon",
    color: "var(--urgent)",
    bg: "#FBE4E0",
    Icon: AlertTriangle,
  },
  normal: {
    label: "Needs attention",
    color: "var(--normal)",
    bg: "#FBF1D9",
    Icon: Clock,
  },
  informational: {
    label: "For your information",
    color: "var(--info)",
    bg: "#DEEFE4",
    Icon: Info,
  },
};

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const { label, color, bg, Icon } = CONFIG[urgency] ?? CONFIG.normal;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-semibold"
      style={{ color, backgroundColor: bg }}
    >
      <Icon size={20} strokeWidth={2.5} />
      {label}
    </span>
  );
}
