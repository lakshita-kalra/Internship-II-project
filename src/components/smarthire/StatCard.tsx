import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: number;
  hint?: string;
  tone?: "primary" | "success" | "warning" | "info";
}

const tones: Record<string, string> = {
  primary: "text-primary bg-primary-soft",
  success: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300",
  warning: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300",
  info: "text-sky-700 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300",
};

export function StatCard({ label, value, icon: Icon, delta, hint, tone = "primary" }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="card-elevated group relative overflow-hidden p-5 transition-all hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {(delta !== undefined || hint) && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              {delta !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
                    positive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                  )}
                >
                  {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(delta)}%
                </span>
              )}
              {hint && <span className="text-muted-foreground">{hint}</span>}
            </div>
          )}
        </div>
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
