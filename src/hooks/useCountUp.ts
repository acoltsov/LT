import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to `target` once `start` becomes true.
 * Jumps straight to the target when the user prefers reduced motion.
 */
export function useCountUp(
  target: number,
  start: boolean,
  { duration = 1400 }: { duration?: number } = {},
) {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reducedMotion || duration <= 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reducedMotion]);

  return value;
}
