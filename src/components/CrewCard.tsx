import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { tiers } from "../data/tiers";
import type { TierId } from "../data/tiers";

interface CrewCardProps {
  selectedId: TierId;
  onSelect: (id: TierId) => void;
}

/**
 * The Crew Card tier explorer — five competency tiers, click to expand.
 * The selected tier also updates the sample profile card next to it.
 */
export function CrewCard({ selectedId, onSelect }: CrewCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
        The Crew Card
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        A competency title that headlines every profile — like Junior → Senior,
        but for the site. Pick your tier, then let reviews from confirmed jobs
        back it up. Tap a tier to see what it means.
      </p>

      <ul className="mt-5 flex flex-col gap-2">
        {tiers.map((tier) => {
          const selected = tier.id === selectedId;
          return (
            <li key={tier.id}>
              <div
                className={`w-full rounded-xl border transition-all ${
                  selected
                    ? "border-slate-300 bg-white shadow-md shadow-slate-900/5 dark:border-slate-600 dark:bg-slate-900 dark:shadow-black/20"
                    : "border-slate-200 bg-white/50 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(tier.id)}
                  aria-expanded={selected}
                  aria-controls={`tier-detail-${tier.id}`}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
                >
                  {/* Level bars */}
                  <span
                    className="flex h-6 items-end gap-0.5"
                    aria-hidden="true"
                  >
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <span
                        key={bar}
                        className={`w-1 rounded-sm ${
                          bar <= tier.level ? tier.bar : "bg-slate-200 dark:bg-slate-700"
                        }`}
                        style={{ height: `${6 + bar * 3.5}px` }}
                      />
                    ))}
                  </span>
                  <span
                    className={`font-display text-sm font-extrabold tracking-wide uppercase ${
                      selected ? tier.text : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {tier.name}
                  </span>
                  <span
                    className={`ml-auto rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase ring-1 ${tier.chip}`}
                  >
                    {tier.summary}
                  </span>
                  <ChevronRight
                    className={`size-4 shrink-0 text-slate-400 transition-transform ${
                      selected ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.div
                      id={`tier-detail-${tier.id}`}
                      initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={
                        reducedMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.65, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className={`text-sm font-semibold ${tier.text}`}>
                          {tier.tagline}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {tier.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
