import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Role = "helper" | "contractor";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

/** Shared Helper ⇄ Contractor toggle state (hero, audiences, waitlist). */
export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("helper");
  const value = useMemo(() => ({ role, setRole }), [role]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}
