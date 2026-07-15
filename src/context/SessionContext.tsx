import { createContext, useContext, useState,type ReactNode } from "react";
import {type User, Role } from "../types/user";
import { users } from "../data/users";
import { organizations } from "../data/organizations";

interface SessionContextType {
  currentUser: User;
  activeOrgId: string | null;
  switchUser: (userId: string) => void;
  switchOrg: (orgId: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [activeOrgId, setActiveOrgId] = useState<string | null>(
    users[0].organizationId ?? organizations[0].id
  );

  function switchUser(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setCurrentUser(user);
    setActiveOrgId(user.organizationId ?? organizations[0].id);
  }

  function switchOrg(orgId: string) {
    if (currentUser.role === Role.SUPER_ADMIN || currentUser.role === Role.AUDITOR) {
      setActiveOrgId(orgId);
    }
  }

  return (
    <SessionContext.Provider value={{ currentUser, activeOrgId, switchUser, switchOrg }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within a SessionProvider");
  return context;
}