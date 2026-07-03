export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  audience: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Everything you need to start.",
    audience: "For everyone getting on the network",
    features: [
      "Post jobs & apply to jobs",
      "Profile with reputation & Crew Card tier",
      "Reviews on confirmed jobs",
      "In-app chat with job context",
      "Area & skill matching + notifications",
    ],
    highlighted: false,
    cta: "Join the waitlist",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    tagline: "Stand out and stay booked.",
    audience: "For active helpers & installers",
    features: [
      "Priority placement in search",
      "Verified badge on your profile",
      "Availability boosts when you're free",
      "Unlimited favourites",
      "See who viewed your profile",
    ],
    highlighted: true,
    cta: "Join the waitlist",
  },
  {
    id: "business",
    name: "Business",
    price: "$79",
    period: "/month",
    tagline: "Hire at crew scale.",
    audience: "For sales offices, dealers & manufacturers",
    features: [
      "Team & multi-seat accounts",
      "Featured / sponsored job listings",
      "Bulk job posting",
      "Hiring analytics",
      "Everything in Pro",
    ],
    highlighted: false,
    cta: "Join the waitlist",
  },
];

export const featuredJobAddon = {
  name: "Featured Job",
  price: "from $10",
  period: "/post",
  description:
    "Pay to pin a single post to the top of local search until it's filled. Available on any plan.",
};

export const pricingDisclaimer =
  "Indicative — pre-launch pricing. Final plans and prices will be confirmed at launch.";
