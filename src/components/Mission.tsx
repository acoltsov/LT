import {
  BellRing,
  MapPin,
  MessageSquareOff,
  Network,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/SectionReveal";

const points = [
  {
    icon: Network,
    title: "One network, whole industry",
    description:
      "Instant access to every contractor, helper and sales office around you — instead of hunting through a dozen fragmented group chats.",
  },
  {
    icon: ShieldCheck,
    title: "Reputation you can trust",
    description:
      "Ratings are tied to real, confirmed jobs. You can finally see who shows up and does good work — before you hire or accept.",
  },
  {
    icon: MapPin,
    title: "Set it once, get matched",
    description:
      "Pick your area and skills one time. Matching jobs come to you with a notification — post-and-forget.",
  },
  {
    icon: BellRing,
    title: "Never miss the good jobs",
    description:
      "New job nearby, a contact joining, an offer landing — the network works while you're on site.",
  },
];

const chatMess = [
  { name: "GTA Installers 3", text: "anyone free tmrw for 6 windows??", rotate: "-rotate-2" },
  { name: "Window Guys West", text: "need 2 helpers ASAP, cash", rotate: "rotate-1" },
  { name: "Door Install Crew", text: "who was that guy from last week?", rotate: "-rotate-1" },
  { name: "Jobs & Help GTA", text: "does anyone know if he shows up?", rotate: "rotate-2" },
];

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Why LinkTrades"
          title="The trades run on group chats. They deserve a network."
          lede="Right now, finding work — or workers — means scrolling a dozen WhatsApp and Facebook groups with no search, no history and no way to know who's reliable. LinkTrades puts the whole local industry in one place and attaches a reputation to every name."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Before: the fragmented mess */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-cream p-6 sm:p-8 dark:border-slate-800 dark:bg-night-soft">
              <div className="flex items-center gap-2">
                <MessageSquareOff
                  className="size-4 text-slate-400"
                  aria-hidden="true"
                />
                <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  Today — 12 group chats, zero memory
                </h3>
              </div>
              <div className="mt-6 flex flex-1 flex-col gap-3">
                {chatMess.map((chat) => (
                  <div
                    key={chat.name}
                    className={`w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-2.5 shadow-sm ${chat.rotate} dark:border-slate-700 dark:bg-slate-900`}
                  >
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {chat.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {chat.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                Every group sees a different slice of the industry. Reputation
                lives in people's heads — and leaves when they do.
              </p>
            </div>
          </Reveal>

          {/* After: one network */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-lime-500/40 bg-white p-6 shadow-lg shadow-lime-500/10 sm:p-8 dark:border-lime-500/35 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Network className="size-4 text-lime-600" aria-hidden="true" />
                <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-lime-700 uppercase dark:text-lime-300">
                  With LinkTrades — one searchable network
                </h3>
              </div>
              <div className="mt-6 flex flex-1 flex-col gap-3">
                {[
                  {
                    title: "Casement install — 12 units · Etobicoke",
                    meta: "Posted by Alex M. · ⭐ 4.7 · 125 jobs",
                  },
                  {
                    title: "Patio door swap · Oakville · $260/day",
                    meta: "3 applicants · all with verified job history",
                  },
                  {
                    title: "Marco D. — Solid · available this week",
                    meta: "⭐ 4.8 · 96% would hire again · 0 no-shows",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="rounded-xl border border-slate-200 bg-cream px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {row.title}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {row.meta}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                Jobs, people and reputations in one place — searchable, matched
                to your area, and backed by confirmed work.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.08}>
              <div className="flex flex-col gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-lime-500/15">
                  <point.icon
                    className="size-5 text-lime-700 dark:text-lime-300"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
