import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Extra delay in seconds — used for staggered grids. */
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade-and-rise entrance when the element scrolls into view. */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.65, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
