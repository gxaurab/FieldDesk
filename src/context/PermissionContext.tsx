/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState,type ReactNode } from "react";
import { Role } from "../types/user";
import { Permission } from "../types/permission";
import { defaultPermissionMatrix } from "../data/permissionMatrix";

interface PermissionContextType {
  matrix: Record<Role, Permission[]>;
  setRolePermission: (role: Role, permission: Permission, allowed: boolean) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [matrix, setMatrix] = useState<Record<Role, Permission[]>>(defaultPermissionMatrix);

  function setRolePermission(role: Role, permission: Permission, allowed: boolean) {
    setMatrix((prev) => {
      const current = prev[role];
      const updated = allowed
        ? [...new Set([...current, permission])]
        : current.filter((p) => p !== permission);
      return { ...prev, [role]: updated };
    });
  }

  return (
    <PermissionContext.Provider value={{ matrix, setRolePermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionMatrix() {
  const context = useContext(PermissionContext);
  if (!context) throw new Error("usePermissionMatrix must be used within a PermissionProvider");
  return context;
}
