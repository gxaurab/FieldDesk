import { createContext, useContext, useState, type ReactNode } from "react";
import { type User } from "../types/user";
import { users } from "../data/users";

interface SessionContextType {
  currentUser: User;
  activeOrgId: string | null;
  switchUser: (userId: string) => void;
  switchOrg: (orgId: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [activeOrgId, setActiveOrgId] = useState<string | null>(users[0].organizationId);

  function switchUser(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setCurrentUser(user);
    // org-scoped users always default to their own org; platform users default to first org
    setActiveOrgId(user.organizationId ?? "org-1");
  }

  function switchOrg(orgId: string) {
    // only meaningful for platform-level users; org-scoped users shouldn't call this
    if (currentUser.organizationId === null) {
      setActiveOrgId(orgId);
    }
  }

  return (
    <SessionContext.Provider value={{ currentUser, activeOrgId, switchUser, switchOrg }}>
      {children}
    </SessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within a SessionProvider");
  return context;
}
