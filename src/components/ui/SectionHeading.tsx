import { Reveal } from "./SectionReveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  kicker,
  title,
  lede,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment} ${align === "center" ? "mx-auto" : ""}`}>
      <p className="font-mono text-xs font-medium tracking-[0.22em] text-lime-700 uppercase dark:text-lime-300">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {lede && (
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
