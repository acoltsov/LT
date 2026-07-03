import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "../data/faq";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          kicker="FAQ"
          title="Fair questions, straight answers"
        />

        <div className="mt-12 flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    open
                      ? "border-slate-300 bg-white shadow-md shadow-slate-900/5 dark:border-slate-600 dark:bg-slate-900 dark:shadow-black/20"
                      : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                        open
                          ? "bg-lime-400 text-slate-950"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-button-${index}`}
                        initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={
                          reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
                        }
                        exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.21, 0.65, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-6 dark:text-slate-400">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
