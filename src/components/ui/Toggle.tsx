import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the whole switch group. */
  label: string;
  size?: "sm" | "md";
  className?: string;
}

/** Segmented control with a sliding active indicator. */
export function Toggle<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  className = "",
}: ToggleProps<T>) {
  const layoutId = useId();
  const reducedMotion = useReducedMotion();
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex rounded-full border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`relative rounded-full font-semibold whitespace-nowrap transition-colors ${pad} ${
              active
                ? "text-white dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 32 }
                }
                className="absolute inset-0 rounded-full bg-slate-900 dark:bg-lime-400"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
