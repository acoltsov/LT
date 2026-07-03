import { tradeTypes } from "../../data/features";

/** Looping strip of trade types. Decorative — content repeats for the loop. */
export function Marquee() {
  return (
    <div className="border-y border-slate-200 bg-cream py-4 dark:border-slate-800 dark:bg-night-soft">
      <p className="sr-only">
        Trades we cover: {tradeTypes.join(", ")} — and more as we expand.
      </p>
      <div className="marquee-mask overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {tradeTypes.map((trade) => (
                <span
                  key={`${copy}-${trade}`}
                  className="flex items-center gap-6 pr-6"
                >
                  <span className="font-display text-sm font-bold tracking-[0.18em] whitespace-nowrap text-slate-500 uppercase dark:text-slate-400">
                    {trade}
                  </span>
                  <span className="text-xs text-lime-600/70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
