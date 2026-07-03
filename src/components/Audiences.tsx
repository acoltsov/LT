import { motion, useReducedMotion } from "framer-motion";
import { Check, HardHat, Megaphone } from "lucide-react";
import { useRole } from "../hooks/useRole";
import type { Role } from "../hooks/useRole";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";
import { Toggle } from "./ui/Toggle";

const audienceContent: Record<
  Role,
  { title: string; subtitle: string; benefits: string[] }
> = {
  helper: {
    title: "For helpers",
    subtitle: "Find window & door jobs — and get credit for every one.",
    benefits: [
      "One feed of every install job in your area — no more chasing group chats",
      "Set your area and skills once; matching jobs come to you",
      "Apply in two taps, chat with the job pinned as context",
      "Offers lock the agreed pay and terms before you commit the day",
      "Every confirmed job builds your rating and Crew Card tier",
      "Flip on availability when you're free and let work find you",
    ],
  },
  contractor: {
    title: "For contractors & sales offices",
    subtitle: "Post a job, get vetted install help — without the gamble.",
    benefits: [
      "Post once and reach every helper in the local industry",
      "See who actually shows up: no-show signals and on-time rates",
      "Applicants come with ratings from real, confirmed jobs",
      "Job offers lock who / where / when / work / pay — no misunderstandings",
      "Favourite proven helpers and rebuild a crew in minutes",
      "Repost a past job in one tap when the next install lands",
    ],
  },
};

function AudienceCard({ role, active }: { role: Role; active: boolean }) {
  const reducedMotion = useReducedMotion();
  const content = audienceContent[role];
  const Icon = role === "helper" ? HardHat : Megaphone;

  return (
    <motion.div
      animate={
        reducedMotion
          ? undefined
          : { scale: active ? 1 : 0.985, opacity: active ? 1 : 0.72 }
      }
      transition={{ duration: 0.3 }}
      className={`flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${
        active
          ? "border-lime-500/50 bg-white shadow-xl shadow-lime-500/10 dark:border-lime-500/40 dark:bg-slate-900"
          : "border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/50"
      }`}
    >
      <span
        className={`flex size-11 items-center justify-center rounded-xl ${
          active ? "bg-lime-500/15" : "bg-slate-500/10"
        }`}
      >
        <Icon
          className={`size-5 ${
            active
              ? "text-lime-700 dark:text-lime-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
          aria-hidden="true"
        />
      </span>
      <h3 className="mt-4 font-display text-xl font-extrabold text-slate-900 dark:text-white">
        {content.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {content.subtitle}
      </p>
      <ul className="mt-5 flex flex-1 flex-col gap-3">
        {content.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <Check
              className={`mt-0.5 size-4 shrink-0 ${
                active ? "text-emerald-500" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
            {benefit}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button href="#waitlist" variant={active ? "primary" : "secondary"} className="w-full sm:w-auto">
          {role === "helper" ? "Join as a helper" : "Join as a contractor"}
        </Button>
      </div>
    </motion.div>
  );
}

export function Audiences() {
  const { role, setRole } = useRole();

  return (
    <section id="audiences" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Who it's for"
          title="Two sides. One handshake."
          lede="LinkTrades only works because both sides win — helpers get steady work and a portable reputation; contractors get crews they can count on."
        />

        <Reveal className="mt-8 flex justify-center">
          <Toggle
            label="Show benefits for"
            options={[
              { value: "helper", label: "For helpers" },
              { value: "contractor", label: "For contractors" },
            ]}
            value={role}
            onChange={setRole}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <AudienceCard role="helper" active={role === "helper"} />
          </Reveal>
          <Reveal delay={0.1}>
            <AudienceCard role="contractor" active={role === "contractor"} />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Manufacturers & dealers — you're next on the roadmap.{" "}
            <a
              href="#waitlist"
              className="font-semibold text-lime-700 underline-offset-2 hover:underline dark:text-lime-300"
            >
              Join the waitlist
            </a>{" "}
            to hear when Business accounts open up.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
