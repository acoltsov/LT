import { motion, useReducedMotion } from "framer-motion";
import { features } from "../data/features";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";

export function Features() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="scroll-mt-20 border-y border-slate-200 bg-cream py-20 sm:py-28 dark:border-slate-800 dark:bg-night-soft"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Features"
          title="Everything the group chats never gave you"
          lede="The whole job cycle — finding, agreeing, working, reviewing — in one app that respects how the trades actually operate."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 4) * 0.07}>
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -5 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group flex h-full flex-col gap-3.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-900/8 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/25"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-lime-500/15 transition-colors group-hover:bg-lime-500/20">
                  <feature.icon
                    className="size-5 text-lime-700 transition-transform group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none dark:text-lime-300"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
