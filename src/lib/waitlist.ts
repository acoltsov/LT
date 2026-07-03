export type WaitlistRole = "helper" | "contractor" | "sales-office";

export interface WaitlistEntry {
  email: string;
  role: WaitlistRole;
}

export interface WaitlistResult {
  /** Local demo counter — NOT a real signup number. See TODO below. */
  localPosition: number;
}

/**
 * ── BACKEND INTEGRATION POINT ─────────────────────────────────────────────
 * This is a stub. To make the waitlist real, replace the body with a call to
 * your backend — e.g. a Supabase insert:
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   const supabase = createClient(
 *     import.meta.env.VITE_SUPABASE_URL,
 *     import.meta.env.VITE_SUPABASE_ANON_KEY,
 *   );
 *   await supabase.from("waitlist").insert({ email: entry.email, role: entry.role });
 *
 * The current implementation only simulates latency and keeps a per-device
 * counter in localStorage so the success state has something honest to show.
 * ──────────────────────────────────────────────────────────────────────────
 */
export async function submitWaitlist(
  entry: WaitlistEntry,
): Promise<WaitlistResult> {
  void entry; // unused until a real backend is wired up
  await new Promise((resolve) => setTimeout(resolve, 900));

  let count = 1;
  try {
    count = Number(localStorage.getItem("lt-waitlist-count") ?? "0") + 1;
    localStorage.setItem("lt-waitlist-count", String(count));
  } catch {
    // localStorage unavailable — fall back to 1
  }
  return { localPosition: count };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}
