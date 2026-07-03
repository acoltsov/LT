import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, EyeOff, Hourglass, Lock, Star } from "lucide-react";
import {
  directionLabels,
  maxStandoutTags,
  reviewQuestions,
  standoutTags,
} from "../data/reviewQuestions";
import type { ReviewDirection } from "../data/reviewQuestions";
import { Toggle } from "./ui/Toggle";

type RevealMode = "both" | "one";

/** 6d 22h 14m — demo countdown start for the one-sided reveal. */
const COUNTDOWN_START = 6 * 86400 + 22 * 3600 + 14 * 60;

function formatCountdown(totalSeconds: number): string {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}

const revealedReviews = [
  {
    author: "Alex M. → Marco D.",
    stars: 5,
    chips: ["On time", "Skill: yes", "Comm: good", "Would hire again"],
    tags: ["Reliable", "Productive"],
  },
  {
    author: "Marco D. → Alex M.",
    stars: 5,
    chips: ["Accurate post", "Paid as agreed", "Comm: good", "Would work again"],
    tags: ["Professional"],
  },
];

function RevealedCard({ review }: { review: (typeof revealedReviews)[number] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {review.author}
        </p>
        <span className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`size-3 ${
                star <= review.stars
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300 dark:text-slate-600"
              }`}
              aria-hidden="true"
            />
          ))}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {review.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"
          >
            {chip}
          </span>
        ))}
        {review.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReviewDemo() {
  const reducedMotion = useReducedMotion();
  const [direction, setDirection] = useState<ReviewDirection>("contractorToHelper");
  const [answers, setAnswers] = useState<Record<ReviewDirection, number[]>>({
    contractorToHelper: reviewQuestions.contractorToHelper.map((q) => q.demoAnswer),
    helperToContractor: reviewQuestions.helperToContractor.map((q) => q.demoAnswer),
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(["Reliable", "Productive"]);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<RevealMode>("both");
  const [countdown, setCountdown] = useState(COUNTDOWN_START);

  // Tick the demo countdown while the one-sided state is shown.
  useEffect(() => {
    if (mode !== "one") return;
    const interval = setInterval(() => {
      setCountdown((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const questions = reviewQuestions[direction];

  const pickAnswer = (questionIndex: number, optionIndex: number) => {
    setSubmitted(false);
    setAnswers((prev) => ({
      ...prev,
      [direction]: prev[direction].map((current, i) =>
        i === questionIndex ? optionIndex : current,
      ),
    }));
  };

  const toggleTag = (tag: string) => {
    setSubmitted(false);
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= maxStandoutTags) return prev;
      return [...prev, tag];
    });
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {/* The review form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
            The review: four taps, done
          </h4>
          <Toggle
            label="Review direction"
            size="sm"
            options={[
              { value: "contractorToHelper", label: "Contractor → Helper" },
              { value: "helperToContractor", label: "Helper → Contractor" },
            ]}
            value={direction}
            onChange={(value) => {
              setDirection(value);
              setSubmitted(false);
            }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {directionLabels[direction].reviewer} reviewing{" "}
          {directionLabels[direction].subject} — structured answers, built for a
          phone between jobs.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={direction}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-col gap-4"
          >
            {questions.map((question, questionIndex) => (
              <div key={question.question}>
                <p className="pb-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {question.question}
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label={question.question}
                >
                  {question.options.map((option, optionIndex) => {
                    const active = answers[direction][questionIndex] === optionIndex;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        onClick={() => pickAnswer(questionIndex, optionIndex)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          active
                            ? "border-lime-500 bg-lime-500/15 text-lime-700 dark:text-lime-300"
                            : "border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
          <p className="pb-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
            What stood out?{" "}
            <span className="font-normal text-slate-500 dark:text-slate-400">
              (optional, up to {maxStandoutTags})
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {standoutTags.map((tag) => {
              const active = selectedTags.includes(tag);
              const full = !active && selectedTags.length >= maxStandoutTags;
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  disabled={full}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40 ${
                    active
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500"
                  }`}
                >
                  {active && <Check className="mr-1 inline size-3" aria-hidden="true" />}
                  {tag}
                </button>
              );
            })}
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Optional comment</span>
            <textarea
              rows={2}
              maxLength={200}
              placeholder="Optional short comment…"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200"
            />
          </label>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={submitted}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {submitted ? "Review locked ✓" : "Submit review (demo)"}
            </button>
            <AnimatePresence>
              {submitted && (
                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-slate-500 dark:text-slate-400"
                >
                  In the app this locks your review — no edits after reveal.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The double-blind reveal */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
            The double-blind reveal
          </h4>
          <Toggle
            label="Reveal scenario"
            size="sm"
            options={[
              { value: "both", label: "Both submitted" },
              { value: "one", label: "Only one submitted" },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Nobody writes their review knowing what the other side said.
        </p>

        <div className="mt-5 min-h-[15rem]">
          <AnimatePresence mode="wait" initial={false}>
            {mode === "both" ? (
              <motion.div
                key="both"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <Check className="size-3.5" aria-hidden="true" />
                  Both sides reviewed — both reviews visible immediately.
                </p>
                {revealedReviews.map((review) => (
                  <RevealedCard key={review.author} review={review} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="one"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                <p className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <Hourglass className="size-3.5" aria-hidden="true" />
                  Only Alex reviewed — hidden until Marco reviews or 7 days pass.
                </p>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="pointer-events-none blur-[6px] select-none" aria-hidden="true">
                    <RevealedCard review={revealedReviews[0]} />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/40 dark:bg-slate-950/40">
                    <EyeOff className="size-4 text-slate-500 dark:text-slate-300" aria-hidden="true" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Alex's review is sealed
                    </p>
                    <p
                      className="rounded-full bg-slate-900 px-3 py-1 font-mono text-[11px] font-bold text-white tabular-nums dark:bg-white dark:text-slate-900"
                      role="timer"
                      aria-label="Time until the review is revealed"
                    >
                      Reveals in {formatCountdown(countdown)}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center dark:border-slate-600">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Marco hasn't reviewed yet
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    “Leave a review to see what this person says about you” —
                    reviewing now reveals both instantly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 flex items-start gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          One review per side per job, tied to the job ID and date. No edits
          once revealed.
        </p>
      </div>
    </div>
  );
}
