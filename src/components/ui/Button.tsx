import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-lime-400 text-slate-950 shadow-lg shadow-lime-500/25 hover:bg-lime-300 disabled:opacity-60 disabled:hover:bg-lime-400",
  secondary:
    "border border-slate-300 bg-white/60 text-slate-800 hover:border-slate-400 hover:bg-cream dark:border-slate-700 dark:bg-white/5 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-white/10",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const reducedMotion = useReducedMotion();
  const classes = `inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors select-none disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const motionProps = reducedMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.97 } };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
