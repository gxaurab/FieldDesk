import { type ReactNode } from "react";
import { Permission } from "./../types/permission";
import { usePermission } from "./../hooks/usePermission";

interface ProtectedRouteProps {
  permission: Permission;
  children: ReactNode;
}

export function ProtectedRoute({ permission, children }: ProtectedRouteProps) {
  const allowed = usePermission(permission);

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-gray-700">Access restricted</p>
        <p className="text-sm text-gray-500 mt-1">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}