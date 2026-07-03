export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How is this different from WhatsApp or Facebook groups?",
    answer:
      "Those groups are fragmented — a dozen chats, each with a slice of the local industry, and no memory of who's actually good. LinkTrades is one network for the whole local trade: every job in one searchable feed, and a reputation attached to every profile that's earned on real, confirmed jobs — not vibes in a group chat.",
  },
  {
    question: "How do ratings work?",
    answer:
      "A review only unlocks after a Confirmed Job — the locked agreement both sides accepted. Both sides review each other with a handful of quick, structured questions (show up? skill match? communication? would hire again?). Reviews are double-blind: once both sides submit, both become visible immediately; if only one side reviews, it's revealed after 7 days. No edits after reveal.",
  },
  {
    question: "How do you stop fake reviews?",
    answer:
      "Several layers. Only confirmed jobs can be reviewed — one review per side per job, tied to the job ID and date. Profiles show the number of unique reviewers, not just a review total, and repeat reviews from the same person carry lower weight. Suspicious patterns are flagged internally. Working with the same crew five times is visible and useful — it just doesn't count as five independent endorsements.",
  },
  {
    question: "What does a “no-show” do to a profile?",
    answer:
      "In the trades, not showing up is the cardinal sin — so we treat it that way. A reported no-show is a serious negative reliability signal and carries double weight. It stays on the record, and repeated no-shows affect visibility on the platform.",
  },
  {
    question: "Is LinkTrades free?",
    answer:
      "Yes — posting, applying, chat, reviews and your reputation profile are free. Pro (for individuals) and Business (for teams) are optional upgrades, and pricing shown here is indicative pre-launch.",
  },
  {
    question: "When does it launch?",
    answer:
      "We're launching in the window & door install niche first, then expanding trade by trade. Join the waitlist — early testers get first access and launch perks.",
  },
];
