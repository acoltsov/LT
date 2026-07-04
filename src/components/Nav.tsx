import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { Button, scrollToAnchor } from "./ui/Button";

const navLinks = [
  { id: "how-it-works", label: "How it works" },
  { id: "reputation", label: "Reputation" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2"
      aria-label="LinkTrades — back to top"
    >
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
        Link<span className="text-lime-600">Trades</span>
      </span>
    </a>
  );
}

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => navLinks.map((l) => l.id), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || menuOpen
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-night/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(event) => scrollToAnchor(`#${link.id}`, event, reducedMotion)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 34 }
                    }
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-lime-600 dark:bg-lime-400"
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>
          <div className="hidden md:block">
            <Button href="#waitlist" size="sm">
              Join waitlist
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-white/10"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.65, 0.32, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-night"
          >
            <ul className="flex flex-col px-4 py-3">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.25 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      setMenuOpen(false);
                      scrollToAnchor(`#${link.id}`, event, reducedMotion);
                    }}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active === link.id
                        ? "text-lime-700 dark:text-lime-300"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="px-3 pt-2 pb-3">
                <Button
                  href="#waitlist"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Join waitlist
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
