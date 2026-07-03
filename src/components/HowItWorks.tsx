import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Lock,
  MapPin,
  MessageSquare,
  Pause,
  Play,
  Star,
} from "lucide-react";
import { flowStages, flowWording, offRamps } from "../data/jobFlow";
import { useInView } from "../hooks/useInView";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";

const AUTOPLAY_MS = 4600;

const offerTerms = [
  { label: "Who", value: "Marco D. + Alex M." },
  { label: "Where", value: "Oakville, ON" },
  { label: "When", value: "Tue · 7:00 AM" },
  { label: "Work", value: "Casement install ×12" },
  { label: "Pay", value: "$28/hr" },
];

/** Stage-specific body of the demo job card. */
function StageContent({ stageId }: { stageId: string }) {
  switch (stageId) {
    case "open":
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-mono font-semibold text-slate-900 dark:text-white">
              3 helpers
            </span>{" "}
            applied so far — each with a rating, tier and job history.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-slate-950">
              Apply
            </span>
            <span className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-300">
              Save
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-300">
              <MessageSquare className="size-3.5" aria-hidden="true" /> Message
            </span>
          </div>
        </div>
      );
    case "applied":
      return (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-700 dark:text-violet-300">
            Application sent — you're in the running.
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Applying means “I'm interested”, not “I'm booked”. Alex can message
            you in chat — the conversation keeps this job pinned as context.
          </p>
        </div>
      );
    case "offer":
      return (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-lime-500/40 bg-lime-500/10 p-4">
            <p className="pb-2 font-mono text-[10px] font-bold tracking-[0.2em] text-lime-700 uppercase dark:text-lime-300">
              Job Offer — final terms
            </p>
            <dl className="grid grid-cols-1 gap-y-1.5 sm:grid-cols-2 sm:gap-x-4">
              {offerTerms.map((term) => (
                <div key={term.label} className="flex items-baseline gap-2">
                  <dt className="w-12 shrink-0 text-xs text-slate-500 dark:text-slate-400">
                    {term.label}
                  </dt>
                  <dd className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {term.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex gap-2">
            <span className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950">
              Accept Job
            </span>
            <span className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-300">
              Decline
            </span>
          </div>
        </div>
      );
    case "confirmed":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3">
            <Lock
              className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Terms locked — who, where, when, work, pay.
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Both sides now hold the same snapshot of the agreement. If plans
            change, cancel properly — a no-show here hits your reputation hard.
          </p>
        </div>
      );
    case "completed":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-slate-500/10 px-4 py-3">
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Review unlocked for both sides
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Alex reviews Marco, Marco reviews Alex — tied to this exact job and
            date. That's the only way a review ever gets written on LinkTrades.
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.35,
    once: false,
  });

  // Auto-advance until paused; also paused off-screen & for reduced motion.
  useEffect(() => {
    if (reducedMotion || !inView || paused) return;
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % flowStages.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [reducedMotion, inView, paused]);

  const selectStage = (index: number) => {
    setPaused(true);
    setActiveIndex(index);
  };

  const stage = flowStages[activeIndex];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-slate-200 bg-cream py-20 sm:py-28 dark:border-slate-800 dark:bg-night-soft"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6" ref={ref}>
        <SectionHeading
          kicker="How it works"
          title="One job, one clean flow"
          lede="From an open post to a locked agreement to a review — every job on LinkTrades moves through the same clear stages. Click through them below."
        />

        {/* Stepper */}
        <Reveal className="mt-12">
          <div
            className="relative mx-auto flex max-w-3xl items-start justify-between"
            role="group"
            aria-label="Job flow stages"
          >
            {/* Track */}
            <div
              className="absolute top-4 right-7 left-7 h-0.5 bg-slate-300 dark:bg-slate-700"
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-4 left-7 h-0.5 bg-lime-600 dark:bg-lime-400"
              style={{ right: "auto" }}
              animate={{
                width: `calc((100% - 3.5rem) * ${activeIndex / (flowStages.length - 1)})`,
              }}
              transition={
                reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
              }
              aria-hidden="true"
            />
            {flowStages.map((s, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => selectStage(index)}
                  className="relative z-10 flex w-14 flex-col items-center gap-2 sm:w-24"
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-colors ${
                      isActive
                        ? "border-lime-500 bg-lime-400 text-slate-950"
                        : isPast
                          ? "border-lime-500 bg-white text-lime-700 dark:bg-slate-900 dark:text-lime-300"
                          : "border-slate-300 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400"
                    }`}
                  >
                    {isPast ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={`text-center text-[11px] leading-tight font-semibold sm:text-xs ${
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
          {!reducedMotion && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-400 dark:hover:text-white"
              >
                {paused ? (
                  <Play className="size-3" aria-hidden="true" />
                ) : (
                  <Pause className="size-3" aria-hidden="true" />
                )}
                {paused ? "Play auto-advance" : "Pause auto-advance"}
              </button>
            </div>
          )}
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          {/* Stage narration */}
          <div className="flex flex-col gap-6">
            <div className="min-h-[14rem] min-[470px]:min-h-[12rem] lg:min-h-[10.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {stage.action && (
                    <p className="pb-2 font-mono text-xs font-bold tracking-[0.2em] text-lime-700 uppercase dark:text-lime-300">
                      Action: {stage.action}
                    </p>
                  )}
                  <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stage.headline}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                    {stage.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product naming of the happy path */}
            <div>
              <p className="pb-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-600 uppercase dark:text-slate-400">
                The wording you'll see in the app
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {flowWording.map((word, index) => (
                  <span key={word} className="flex items-center gap-2">
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {word}
                    </span>
                    {index < flowWording.length - 1 && (
                      <span className="text-slate-400" aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Off-ramps */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {offRamps.labels.join(" / ")}:
                </span>{" "}
                {offRamps.note}
              </p>
            </div>
          </div>

          {/* Demo job card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-display text-lg leading-snug font-bold text-slate-900 dark:text-white">
                    Casement install — 12 units
                  </h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      Oakville, ON
                    </span>
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                      $28/hr
                    </span>
                    <span>Tue · 7:00 AM</span>
                  </p>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={stage.id}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase ring-1 ${stage.badgeClass}`}
                  >
                    {stage.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-700">
                <span className="flex size-8 items-center justify-center rounded-full bg-slate-900 font-display text-[10px] font-bold text-white dark:bg-slate-700">
                  AM
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Alex M. · contractor
                  </p>
                  <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Star
                      className="size-3 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <span className="font-mono">4.7</span> · 125 jobs posted
                  </p>
                </div>
              </div>

              <div className="mt-5 min-h-[14rem] sm:min-h-[11rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={stage.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StageContent stageId={stage.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
