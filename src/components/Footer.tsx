import { Apple, AtSign, Camera, MessageCircle, Play } from "lucide-react";

const productLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#reputation", label: "Reputation" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "#mission", label: "Why LinkTrades" },
  { href: "#audiences", label: "Who it's for" },
  { href: "#faq", label: "FAQ" },
  { href: "#waitlist", label: "Join the waitlist" },
];

const socials = [
  { icon: Camera, label: "Instagram (coming soon)" },
  { icon: MessageCircle, label: "Facebook (coming soon)" },
  { icon: AtSign, label: "LinkedIn (coming soon)" },
];

function StoreButton({
  icon: Icon,
  store,
}: {
  icon: typeof Apple;
  store: string;
}) {
  return (
    <div
      className="flex cursor-not-allowed items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 opacity-90 dark:border-slate-700 dark:bg-transparent"
      title="Coming soon"
    >
      <Icon className="size-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
      <div className="text-left leading-tight">
        <p className="font-mono text-[9px] tracking-widest text-lime-700 uppercase dark:text-lime-300">
          Coming soon
        </p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{store}</p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-[#070c18]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <a href="#top" className="flex items-center gap-2" aria-label="LinkTrades — back to top">
              <span className="flex size-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-800">
                <svg viewBox="0 0 64 64" className="size-5" aria-hidden="true">
                  <path
                    d="M20 38a10 10 0 0 1 0-14l6-6a10 10 0 0 1 14 0"
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M44 26a10 10 0 0 1 0 14l-6 6a10 10 0 0 1-14 0"
                    fill="none"
                    stroke="#F8FAFC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Link<span className="text-lime-600 dark:text-lime-400">Trades</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              One network for the trades. Find work, post work, and build a
              reputation that follows real jobs — starting with window & door
              install.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#top"
                  aria-label={social.label}
                  title={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-white"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product">
            <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              Product
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              Get the app
            </h3>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <StoreButton icon={Apple} store="App Store" />
              <StoreButton icon={Play} store="Google Play" />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              The mobile app is in development — waitlist members get it first.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © 2026 LinkTrades. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pre-launch site — pricing indicative, app store links coming soon.
          </p>
        </div>
      </div>
    </footer>
  );
}
