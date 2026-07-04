import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertOctagon,
  BadgeCheck,
  EyeOff,
  FileCheck2,
  Radar,
  Scale,
  Star,
  Users,
} from "lucide-react";
import { defaultTierId, tiers } from "../data/tiers";
import type { TierId } from "../data/tiers";
import { useInView } from "../hooks/useInView";
import { CrewCard } from "./CrewCard";
import { ReviewDemo } from "./ReviewDemo";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";
import { StatCounter } from "./ui/StatCounter";
import { WarpGrid } from "./ui/WarpGrid";

const trustRules = [
  {
    icon: FileCheck2,
    title: "Confirmed jobs only",
    description:
      "A review can only follow a Confirmed Job — one per side per job, tied to the job ID and date. No job, no review.",
  },
  {
    icon: EyeOff,
    title: "Double-blind reveal",
    description:
      "Both sides review → both reviews appear immediately. Only one side reviews → it reveals after 7 days. No edits after reveal.",
  },
  {
    icon: Users,
    title: "Unique reviewers counted",
    description:
      "Profiles show how many different people reviewed you — “worked together 5 times” is visible, but it isn't 5 independent endorsements.",
  },
  {
    icon: Scale,
    title: "Repeat reviews weigh less",
    description:
      "Reviews from the same person carry progressively lower weight, so one friendly relationship can't inflate a rating.",
  },
  {
    icon: AlertOctagon,
    title: "No-shows weigh double",
    description:
      "Not showing up is the cardinal sin of the trades. A reported no-show is a serious negative signal with double weight.",
  },
  {
    icon: Radar,
    title: "Patterns get flagged",
    description:
      "Suspicious review patterns — like two accounts confirming each other's fake jobs — are flagged and investigated.",
  },
];

function SampleProfile({ tierId, statsStarted }: { tierId: TierId; statsStarted: boolean }) {
  const tier = tiers.find((t) => t.id === tierId) ?? tiers[1];
  const profile = tier.profile;
  const reducedMotion = useReducedMotion();

  const onTimeBar =
    profile.onTime >= 90
      ? "bg-emerald-500"
      : profile.onTime >= 70
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/25">
      <span className="absolute -top-3 left-6 rounded-full border border-slate-300 bg-cream px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-slate-500 uppercase dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
        Sample profile — typical for this tier
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tier.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 font-display text-lg font-bold text-white dark:bg-slate-700">
              {profile.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                  {profile.name}
                </h3>
                {profile.verified ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-500/10 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Unverified
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {profile.role}
              </p>
              <span
                className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-bold tracking-wider uppercase ring-1 ${tier.chip}`}
              >
                Crew Card: {tier.name}
                <span className="font-sans font-medium normal-case opacity-80">
                  — {tier.summary}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200 pt-6 sm:grid-cols-4 dark:border-slate-700">
            <StatCounter
              value={profile.rating}
              decimals={1}
              label="rating"
              started={statsStarted}
              icon={
                <Star
                  className="size-5 translate-y-[-2px] fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              }
            />
            <StatCounter
              value={profile.hireAgain}
              suffix="%"
              label="would hire again"
              started={statsStarted}
              accent={
                profile.hireAgain >= 85
                  ? "trust"
                  : profile.hireAgain >= 70
                    ? "default"
                    : "risk"
              }
            />
            <StatCounter
              value={profile.jobs}
              label="completed jobs"
              started={statsStarted}
            />
            <StatCounter
              value={profile.noShows}
              label={profile.noShows === 1 ? "no-show reported" : "no-shows reported"}
              started={statsStarted}
              accent={profile.noShows === 0 ? "trust" : "risk"}
            />
          </div>

          <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-200 pt-5 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">On-time rate</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {profile.onTime}%
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
              role="img"
              aria-label={`On-time rate: ${profile.onTime} percent`}
            >
              <motion.div
                className={`h-full rounded-full ${onTimeBar}`}
                initial={reducedMotion ? { width: `${profile.onTime}%` } : { width: 0 }}
                animate={{
                  width: statsStarted
                    ? `${profile.onTime}%`
                    : reducedMotion
                      ? `${profile.onTime}%`
                      : 0,
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <p className="flex items-center gap-1.5 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <Users className="size-3.5" aria-hidden="true" />
              Reviewed by{" "}
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                {profile.reviewers} different people
              </span>{" "}
              across {profile.jobs} confirmed jobs
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Reputation() {
  const [selectedTier, setSelectedTier] = useState<TierId>(defaultTierId);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section id="reputation" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <WarpGrid className="absolute inset-0 size-full opacity-70" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-night dark:to-night"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="The reputation system"
          title="A reputation earned on real jobs — not group-chat hearsay"
          lede="Every number on a LinkTrades profile traces back to a confirmed job. Explore the sample profile, the Crew Card tier ladder, and how the double-blind review works."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]" ref={ref}>
          <Reveal>
            <SampleProfile tierId={selectedTier} statsStarted={inView} />
          </Reveal>
          <Reveal delay={0.12}>
            <CrewCard selectedId={selectedTier} onSelect={setSelectedTier} />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <ReviewDemo />
        </Reveal>

        <div className="mt-20">
          <SectionHeading
            kicker="How trust works"
            title="Hard to game. Easy to trust."
            lede="The rating is only worth something if it can't be farmed. Six rules keep it honest."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustRules.map((rule, index) => (
              <Reveal key={rule.title} delay={(index % 3) * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/10">
                    <rule.icon
                      className="size-5 text-slate-700 dark:text-slate-300"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {rule.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {rule.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
