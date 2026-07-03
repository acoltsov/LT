import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { useRole } from "../hooks/useRole";
import { Button } from "./ui/Button";
import { Magnetic } from "./ui/Magnetic";
import { Marquee } from "./ui/Marquee";
import { PhoneMockup } from "./ui/PhoneMockup";
import { Toggle } from "./ui/Toggle";
import { WarpGrid } from "./ui/WarpGrid";
import type { Role } from "../hooks/useRole";

const heroCopy: Record<Role, { headline: [string, string]; sub: string }> = {
  helper: {
    headline: ["Find window &", "door jobs."],
    sub: "Every install job in your area, in one feed — posted by contractors whose reputation you can check before you commit to a day of work.",
  },
  contractor: {
    headline: ["Post a job. Get", "vetted install help."],
    sub: "Reach every helper in your local industry at once — and know who actually shows up, backed by reviews from real, confirmed jobs.",
  },
};

const trustPoints = [
  "Free to start",
  "Launching in window & door install",
  "Reviews only from confirmed jobs",
];

export function Hero() {
  const { role, setRole } = useRole();
  const reducedMotion = useReducedMotion();
  const copy = heroCopy[role];

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      {/* Backdrop: interactive blueprint grid + soft glow */}
      <WarpGrid className="absolute inset-0 size-full" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-night"
        aria-hidden="true"
      />
      <div
        className="absolute top-24 right-[-10%] h-96 w-96 rounded-full bg-lime-500/20 blur-3xl dark:bg-lime-500/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-36 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-full border border-slate-300 bg-white/70 px-3.5 py-1.5 font-mono text-xs font-medium tracking-[0.18em] text-slate-600 uppercase dark:border-slate-700 dark:bg-white/5 dark:text-slate-300"
          >
            One network for the trades
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Toggle
              label="I am a…"
              options={[
                { value: "helper", label: "I'm a helper" },
                { value: "contractor", label: "I'm a contractor" },
              ]}
              value={role}
              onChange={setRole}
            />
          </motion.div>

          <div className="min-h-[8.2rem] sm:min-h-[10rem] lg:min-h-[11.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={role}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.21, 0.65, 0.32, 1] }}
                className="font-display text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                {copy.headline[0]}
                <br />
                <span className="text-lime-600">{copy.headline[1]}</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="min-h-[4.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={role}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
              >
                {copy.sub}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button href="#waitlist" size="lg">
                Join the waitlist
              </Button>
            </Magnetic>
            <Button href="#how-it-works" variant="secondary" size="lg">
              See how it works
              <ArrowDown className="size-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.ul
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400"
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5">
                <CheckCircle2
                  className="size-4 text-emerald-500"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </motion.ul>

          <p className="text-sm font-medium text-slate-500 italic dark:text-slate-400">
            Find work. Post work. Build your reputation.
          </p>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.65, 0.32, 1] }}
          className="mx-auto w-full max-w-md px-6 pt-6 pb-8 sm:px-12 lg:px-0"
        >
          <PhoneMockup />
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}
