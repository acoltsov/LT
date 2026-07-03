import { motion, useReducedMotion } from "framer-motion";
import { Check, Info, Pin } from "lucide-react";
import { featuredJobAddon, plans, pricingDisclaimer } from "../data/pricing";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";

export function Pricing() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-y border-slate-200 bg-cream py-20 sm:py-28 dark:border-slate-800 dark:bg-night-soft"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Pricing"
          title="Free to start. Upgrade when it pays for itself."
          lede="The network, the reputation and the core job flow are free for everyone. Pro and Business add reach for the people hiring and working the most."
        />

        <Reveal className="mt-6 flex justify-center">
          <p className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <Info className="size-3.5" aria-hidden="true" />
            {pricingDisclaimer}
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.09} className="h-full">
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? "border-lime-500/60 bg-white shadow-xl shadow-lime-500/15 dark:border-lime-500/50 dark:bg-slate-900"
                    : "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime-400 px-3 py-0.5 font-mono text-[10px] font-bold tracking-widest text-slate-950 uppercase">
                    Most useful solo
                  </span>
                )}
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {plan.audience}
                </p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-600 italic dark:text-slate-300">
                  {plan.tagline}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button
                    href="#waitlist"
                    variant={plan.highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-500/15">
              <Pin className="size-5 text-lime-700 dark:text-lime-300" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                Add-on: {featuredJobAddon.name}{" "}
                <span className="ml-1 font-mono text-sm font-semibold text-lime-700 dark:text-lime-300">
                  {featuredJobAddon.price}
                  {featuredJobAddon.period}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                {featuredJobAddon.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
