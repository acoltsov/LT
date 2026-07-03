import {
  Bell,
  CalendarClock,
  ClipboardList,
  Heart,
  History,
  MapPin,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "Job posting & applications",
    description:
      "Post the details once — or apply in two taps. Repost a proven job with one click.",
  },
  {
    icon: MessagesSquare,
    title: "Chat with job context",
    description:
      "Conversations carry a card of the job they started from, so nobody loses the thread.",
  },
  {
    icon: MapPin,
    title: "Area & skill matching",
    description:
      "Set your area and skills once. Matching jobs find you — post-and-forget.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description:
      "A new job nearby, a contact joining, an offer landing — you hear about it first.",
  },
  {
    icon: Heart,
    title: "Favourites",
    description:
      "Follow the people and companies you trust and get pinged when they post.",
  },
  {
    icon: CalendarClock,
    title: "Availability status",
    description:
      "Available today, tomorrow, or this week — flip a switch and let work come to you.",
  },
  {
    icon: ShieldCheck,
    title: "Verified skills",
    description:
      "Skills backed by reviews from real, confirmed jobs — not a self-written resume.",
  },
  {
    icon: History,
    title: "Job history",
    description:
      "Every confirmed job builds a track record that travels with you, job to job.",
  },
];

/** Trade types for the marquee strip. */
export const tradeTypes = [
  "Windows",
  "Doors",
  "Siding",
  "Framing",
  "Trim & finish",
  "Glazing",
  "Capping",
  "Flashing",
  "Screens",
  "Sliding doors",
  "Service & repair",
  "Installs",
];
