export type ReviewDirection = "contractorToHelper" | "helperToContractor";

export interface ReviewQuestion {
  question: string;
  options: string[];
  /** Index of the option pre-selected in the demo review. */
  demoAnswer: number;
}

export const reviewQuestions: Record<ReviewDirection, ReviewQuestion[]> = {
  contractorToHelper: [
    { question: "Did they show up?", options: ["On time", "Late", "No-show"], demoAnswer: 0 },
    { question: "Skill matched the job?", options: ["Yes", "Partially", "No"], demoAnswer: 0 },
    { question: "Communication?", options: ["Good", "Okay", "Poor"], demoAnswer: 0 },
    { question: "Would hire again?", options: ["Yes", "Maybe", "No"], demoAnswer: 0 },
  ],
  helperToContractor: [
    { question: "Job description accurate?", options: ["Yes", "Partially", "No"], demoAnswer: 0 },
    { question: "Paid as agreed?", options: ["Yes", "Issue", "N/A"], demoAnswer: 0 },
    { question: "Communication?", options: ["Good", "Okay", "Poor"], demoAnswer: 0 },
    { question: "Would work again?", options: ["Yes", "Maybe", "No"], demoAnswer: 0 },
  ],
};

export const directionLabels: Record<ReviewDirection, { label: string; reviewer: string; subject: string }> = {
  contractorToHelper: {
    label: "Contractor → Helper",
    reviewer: "Alex M. (contractor)",
    subject: "Marco D. (helper)",
  },
  helperToContractor: {
    label: "Helper → Contractor",
    reviewer: "Marco D. (helper)",
    subject: "Alex M. (contractor)",
  },
};

/** Optional "what stood out?" tags — pick up to 3. */
export const standoutTags = [
  "Reliable",
  "Quality work",
  "Productive",
  "Good communication",
  "Safety-conscious",
  "Professional",
];

export const maxStandoutTags = 3;
