import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently occupying the middle of the
 * viewport — drives the active-link highlight in the nav.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = visible.get(id);
          if (ratio !== undefined && ratio >= bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
        else if (visible.size === 0) setActive(null);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
