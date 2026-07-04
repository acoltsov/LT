export type TierId = "lead" | "solid" | "reliable" | "backup" | "general";

/** A fictional-but-typical profile for someone sitting at this tier. */
export interface TierProfile {
  name: string;
  initials: string;
  role: string;
  verified: boolean;
  rating: number;
  hireAgain: number;
  jobs: number;
  noShows: number;
  onTime: number;
  reviewers: number;
}

export interface Tier {
  id: TierId;
  name: string;
  /** One-liner shown in the explorer row. */
  tagline: string;
  /** Punchy 2–3 word verdict. */
  summary: string;
  /** Expanded description shown when the tier is selected. */
  detail: string;
  /** Star-rating range typical for this tier. */
  ratingBand: string;
  /** 5 = top of the ladder. */
  level: number;
  /** Tailwind classes — kept as full literals so the compiler picks them up. */
  text: string;
  chip: string;
  bar: string;
  dot: string;
  profile: TierProfile;
}

export const tiers: Tier[] = [
  {
    id: "lead",
    name: "Lead",
    tagline: "Fully independent — can be left alone on site.",
    summary: "Fully skilled",
    detail:
      "Runs the work start to finish without supervision. Reads the job, solves problems on the spot, and can be trusted with the site, the customer, and the crew.",
    ratingBand: "4.8 – 5.0",
    level: 5,
    text: "text-emerald-600 dark:text-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    profile: {
      name: "Denis K.",
      initials: "DK",
      role: "Window & door install · Lead installer · Mississauga",
      verified: true,
      rating: 4.9,
      hireAgain: 98,
      jobs: 124,
      noShows: 0,
      onTime: 99,
      reviewers: 41,
    },
  },
  {
    id: "solid",
    name: "Solid",
    tagline: "Needs some guidance. A strong helping hand.",
    summary: "Follows direction",
    detail:
      "Skilled enough to carry real weight on an install once pointed in the right direction. Give clear instructions and the work gets done, done well.",
    ratingBand: "3.9 – 4.8",
    level: 4,
    text: "text-teal-600 dark:text-teal-400",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300 ring-teal-500/30",
    bar: "bg-teal-500",
    dot: "bg-teal-500",
    profile: {
      name: "Luis R.",
      initials: "LR",
      role: "Window & door install · Helper · Vaughan",
      verified: true,
      rating: 4.4,
      hireAgain: 90,
      jobs: 34,
      noShows: 0,
      onTime: 96,
      reviewers: 19,
    },
  },
  {
    id: "reliable",
    name: "Reliable",
    tagline: "Assist role — prep, carrying, shows up and works.",
    summary: "Shows up & works",
    detail:
      "The dependable extra pair of hands: prep, carrying, cleanup, staging. Not running the install yet — but on time, every time, and working the whole day.",
    ratingBand: "3.0 – 3.8",
    level: 3,
    text: "text-sky-600 dark:text-sky-400",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-sky-500/30",
    bar: "bg-sky-500",
    dot: "bg-sky-500",
    profile: {
      name: "Sam T.",
      initials: "ST",
      role: "Window & door install · Helper · Brampton",
      verified: true,
      rating: 3.4,
      hireAgain: 80,
      jobs: 22,
      noShows: 0,
      onTime: 96,
      reviewers: 14,
    },
  },
  {
    id: "backup",
    name: "Backup",
    tagline: "Does what's asked, but can be slow or late.",
    summary: "Only if needed",
    detail:
      "Gets the task done when told exactly what to do, but pace and punctuality are hit-and-miss. Book when you're short-handed and can absorb the risk.",
    ratingBand: "2.0 – 2.9",
    level: 2,
    text: "text-amber-600 dark:text-amber-400",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/30",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    profile: {
      name: "Jordan P.",
      initials: "JP",
      role: "Window & door install · Helper · Scarborough",
      verified: false,
      rating: 2.5,
      hireAgain: 45,
      jobs: 12,
      noShows: 1,
      onTime: 78,
      reviewers: 8,
    },
  },
  {
    id: "general",
    name: "General Labor",
    tagline: "Unreliable — a history of no-shows.",
    summary: "Not recommended",
    detail:
      "Reviews report no-shows or work that didn't hold up. On LinkTrades this history is visible, weighted heavily, and impossible to shake off by hopping to a new group chat.",
    ratingBand: "1.0 – 1.9",
    level: 1,
    text: "text-rose-600 dark:text-rose-400",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-rose-500/30",
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    profile: {
      name: "Chris B.",
      initials: "CB",
      role: "Window & door install · Helper · North York",
      verified: false,
      rating: 1.5,
      hireAgain: 12,
      jobs: 7,
      noShows: 3,
      onTime: 41,
      reviewers: 5,
    },
  },
];

export const defaultTierId: TierId = "solid";
