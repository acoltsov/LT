import { useCountUp } from "../../hooks/useCountUp";
import type { ReactNode } from "react";

interface StatCounterProps {
  value: number;
  /** Decimal places to render while counting (e.g. 1 for "4.8"). */
  decimals?: number;
  suffix?: string;
  label: string;
  icon?: ReactNode;
  /** Kick off the animation (usually when the parent scrolls into view). */
  started: boolean;
  accent?: "default" | "trust";
}

export function StatCounter({
  value,
  decimals = 0,
  suffix = "",
  label,
  icon,
  started,
  accent = "default",
}: StatCounterProps) {
  const current = useCountUp(value, started);
  const display = current.toFixed(decimals);
  const color =
    accent === "trust"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-slate-900 dark:text-white";

  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-baseline gap-1 ${color}`}>
        {icon}
        <span className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">
          {display}
          {suffix}
        </span>
      </div>
      <span className="text-xs leading-snug font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}
