import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Heart,
  Home,
  MapPin,
  MessagesSquare,
  Star,
  User,
} from "lucide-react";

interface DemoJob {
  id: number;
  title: string;
  area: string;
  pay: string;
  tag: string;
  tagClass: string;
}

const demoJobs: DemoJob[] = [
  {
    id: 1,
    title: "Casement install — 12 units",
    area: "Etobicoke",
    pay: "$28/hr",
    tag: "New",
    tagClass: "bg-lime-500/15 text-lime-700 dark:text-lime-300",
  },
  {
    id: 2,
    title: "Patio door swap — 2nd floor",
    area: "Oakville",
    pay: "$260/day",
    tag: "Open",
    tagClass: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Entry door + capping",
    area: "Mississauga",
    pay: "$25/hr",
    tag: "Open",
    tagClass: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    id: 4,
    title: "Bay window install help",
    area: "North York",
    pay: "$30/hr",
    tag: "New",
    tagClass: "bg-lime-500/15 text-lime-700 dark:text-lime-300",
  },
];

const ROTATE_MS = 3400;

/** CSS-built phone showing a live-feeling job feed + a rated profile. */
export function PhoneMockup() {
  const reducedMotion = useReducedMotion();
  const [order, setOrder] = useState([0, 1, 2, 3]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setOrder((prev) => [prev[3], prev[0], prev[1], prev[2]]);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const visibleJobs = order.slice(0, 3).map((i) => demoJobs[i]);

  return (
    <div className="relative" aria-hidden="true">
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] rounded-[2.6rem] border border-slate-700/60 bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/40 sm:w-[300px] dark:border-slate-600/60 dark:shadow-black/60">
        <div className="absolute top-2.5 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900 dark:bg-slate-900" />
        <div className="relative overflow-hidden rounded-[2.1rem] bg-cream dark:bg-slate-950">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 font-mono text-[10px] text-slate-500">
            <span>7:42</span>
            <span className="tracking-widest">▲ ▮ ●</span>
          </div>

          {/* App header */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-md bg-slate-900 dark:bg-slate-800">
                <svg viewBox="0 0 64 64" className="size-3.5">
                  <path
                    d="M20 38a10 10 0 0 1 0-14l6-6a10 10 0 0 1 14 0"
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M44 26a10 10 0 0 1 0 14l-6 6a10 10 0 0 1-14 0"
                    fill="none"
                    stroke="#F8FAFC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-display text-xs font-extrabold text-slate-900 dark:text-white">
                LinkTrades
              </span>
            </div>
            <div className="relative">
              <Bell className="size-4 text-slate-500" />
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-lime-500" />
            </div>
          </div>

          {/* Profile snippet */}
          <div className="mx-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-slate-900 font-display text-[11px] font-bold text-white dark:bg-slate-700">
                MD
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                    Marco D.
                  </span>
                  <span className="rounded bg-teal-500/10 px-1 py-0.5 font-mono text-[8px] font-bold tracking-wider text-teal-600 uppercase dark:text-teal-400">
                    Solid
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Star className="size-2.5 fill-amber-400 text-amber-400" />
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    4.8
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Available this week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Job feed */}
          <div className="px-3 pt-3 pb-1">
            <p className="px-1 pb-1.5 font-mono text-[9px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
              Jobs near you
            </p>
            <div className="flex flex-col gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={reducedMotion ? false : { opacity: 0, y: -14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.21, 0.65, 0.32, 1] }}
                    className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] leading-tight font-semibold text-slate-900 dark:text-white">
                        {job.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase ${job.tagClass}`}
                      >
                        {job.tag}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="size-2.5" />
                        {job.area}
                      </span>
                      <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {job.pay}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Tab bar */}
          <div className="mt-1 flex items-center justify-around border-t border-slate-200 px-2 py-2.5 dark:border-slate-800">
            <Home className="size-4 text-lime-600" />
            <MessagesSquare className="size-4 text-slate-400" />
            <Heart className="size-4 text-slate-400" />
            <User className="size-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Floating reputation card */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -left-3 z-30 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl shadow-slate-900/10 sm:-left-12 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
      >
        <div className="flex items-center gap-1.5">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
            4.8
          </span>
          <span className="text-[10px] text-slate-400">·</span>
          <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            96%
          </span>
          <span className="text-[11px] text-slate-500">would hire again</span>
        </div>
        <p className="mt-0.5 font-mono text-[9px] tracking-wide text-slate-400 uppercase">
          38 confirmed jobs · 0 no-shows
        </p>
      </motion.div>

      {/* Floating notification toast */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-4 right-0 z-30 flex w-max max-w-[240px] items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-xl shadow-slate-900/10 sm:-right-4 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
      >
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-lime-500/15">
          <Bell className="size-3 text-lime-600" />
        </span>
        <div>
          <p className="text-[11px] leading-tight font-semibold text-slate-900 dark:text-white">
            New job near you
          </p>
          <p className="text-[10px] leading-tight text-slate-500">
            Casement install · Etobicoke · $28/hr
          </p>
        </div>
      </motion.div>
    </div>
  );
}
