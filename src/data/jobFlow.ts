export interface FlowStage {
  id: string;
  /** Status name shown in the stepper. */
  label: string;
  /** The action wording that moves the flow here (product naming). */
  action?: string;
  /** Badge styling for the demo job card. */
  badgeClass: string;
  headline: string;
  description: string;
}

export const flowStages: FlowStage[] = [
  {
    id: "open",
    label: "Open",
    badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-sky-500/30",
    headline: "The job is live",
    description:
      "A contractor posts the details once — where, when, what work, what pay. Every matching helper in the area gets notified.",
  },
  {
    id: "applied",
    label: "Applied",
    action: "Apply",
    badgeClass: "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/30",
    headline: "Helpers raise their hand",
    description:
      "Applying means “I'm interested”, not “I'm booked”. The contractor reviews applicants — each with a rating, tier and job history — and can message anyone in chat.",
  },
  {
    id: "offer",
    label: "Offer Sent",
    action: "Send Job Offer",
    badgeClass: "bg-lime-500/15 text-lime-700 dark:text-lime-300 ring-lime-500/40",
    headline: "The contractor picks their person",
    description:
      "A Job Offer is pre-filled from the post and can be adjusted after the chat. It names the final terms: who, where, when, what work, what pay.",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    action: "Accept Job",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30",
    headline: "Accepting locks the agreement",
    description:
      "The moment the helper accepts, the offer becomes a locked snapshot of the agreed terms. No “that's not what we said” — both sides keep the same record.",
  },
  {
    id: "completed",
    label: "Completed",
    badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 ring-slate-500/30",
    headline: "Work done — reviews unlock",
    description:
      "Only now can either side leave a review, tied to this exact job and date. That's what keeps LinkTrades ratings honest.",
  },
];

/** Product naming for the happy path, shown under the stepper. */
export const flowWording = ["Apply", "Send Job Offer", "Accept Job", "Job Confirmed"];

export const offRamps = {
  labels: ["Cancelled", "No-show"],
  note: "Off-ramps exist — jobs can be cancelled or end in a no-show. A no-show is a serious reliability signal and weighs double on a profile.",
};
