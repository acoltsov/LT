import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { isValidEmail, submitWaitlist } from "../lib/waitlist";
import type { WaitlistRole } from "../lib/waitlist";
import { useRole } from "../hooks/useRole";
import { Reveal } from "./ui/SectionReveal";
import { WarpGrid } from "./ui/WarpGrid";

type FormState = "idle" | "submitting" | "success";

const roleOptions: { value: WaitlistRole; label: string }[] = [
  { value: "helper", label: "Helper" },
  { value: "contractor", label: "Contractor / Installer" },
  { value: "sales-office", label: "Sales office" },
];

export function Waitlist() {
  const { role } = useRole();
  const reducedMotion = useReducedMotion();
  const [selectedRole, setSelectedRole] = useState<WaitlistRole>(role);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [position, setPosition] = useState<number | null>(null);
  const roleTouched = useRef(false);

  // Follow the Helper ⇄ Contractor toggle from the hero/audiences sections —
  // but never override a role the user picked in this form directly.
  useEffect(() => {
    if (!roleTouched.current) setSelectedRole(role);
  }, [role]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state === "submitting") return;
    if (!isValidEmail(email)) {
      setError("That email doesn't look right — mind checking it?");
      return;
    }
    setError(null);
    setState("submitting");
    const result = await submitWaitlist({ email: email.trim(), role: selectedRole });
    setPosition(result.localPosition);
    setState("success");
  };

  return (
    <section
      id="waitlist"
      className="relative scroll-mt-20 overflow-hidden border-t border-slate-200 py-20 sm:py-28 dark:border-slate-800"
    >
      <div className="absolute inset-0 bg-cream dark:bg-night-soft" aria-hidden="true" />
      <WarpGrid className="absolute inset-0 size-full opacity-70" />
      <div
        className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-lime-400/25 blur-3xl dark:bg-lime-400/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium tracking-[0.22em] text-lime-700 uppercase dark:text-lime-300">
            Get in first
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            The network is only as good as who's on it. Start with you.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            We'll onboard the first wave of window & door crews at launch.
            Early testers shape the product — and get launch perks.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-sm">
            <AnimatePresence mode="wait" initial={false}>
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center gap-3 py-6"
                  role="status"
                >
                  <motion.span
                    initial={reducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                  >
                    <CheckCircle2 className="size-14 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                  </motion.span>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                    You're on the list.
                  </h3>
                  <p className="max-w-sm text-sm text-slate-600 dark:text-slate-300">
                    We'll email you as soon as onboarding opens in your area.
                    {position !== null && (
                      <>
                        {" "}
                        You're{" "}
                        <span className="font-mono font-bold text-lime-700 dark:text-lime-300">
                          #{position}
                        </span>{" "}
                        on this device's demo counter.
                      </>
                    )}
                  </p>
                  <p className="font-mono text-[10px] tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Demo form — signups aren't stored yet
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setState("idle");
                      setEmail("");
                    }}
                    className="mt-2 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white"
                  >
                    Add another email
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <fieldset>
                    <legend className="pb-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-200">
                      I'm joining as a…
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {roleOptions.map((option) => {
                        const active = selectedRole === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              roleTouched.current = true;
                              setSelectedRole(option.value);
                            }}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                              active
                                ? "border-lime-500 bg-lime-400 text-slate-950"
                                : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-white/20 dark:text-slate-300 dark:hover:border-white/40 dark:hover:text-white"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <label className="relative flex-1">
                      <span className="sr-only">Email address</span>
                      <Mail
                        className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError(null);
                        }}
                        placeholder="you@crew.com"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? "waitlist-error" : undefined}
                        className={`w-full rounded-xl border bg-white py-3 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-500 ${
                          error
                            ? "border-rose-500 dark:border-rose-400"
                            : "border-slate-300 dark:border-white/20"
                        }`}
                      />
                    </label>
                    <motion.button
                      type="submit"
                      disabled={state === "submitting"}
                      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-lime-500/25 transition-colors hover:bg-lime-300 disabled:cursor-wait disabled:opacity-80"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                          Joining…
                        </>
                      ) : (
                        "Join the waitlist"
                      )}
                    </motion.button>
                  </div>

                  <div aria-live="polite">
                    {error && (
                      <p
                        id="waitlist-error"
                        className="mt-2 text-left text-sm font-medium text-rose-600 dark:text-rose-300"
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-left text-xs text-slate-500 dark:text-slate-400">
                    No spam — one email when your area opens, maybe two.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
