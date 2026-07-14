import { useSession } from "../context/SessionContext";
import { usePermissionMatrix } from "../context/PermissionContext";
import { Permission } from "../types";

export function usePermission(permission: Permission): boolean {
  const { currentUser } = useSession();
  const { matrix } = usePermissionMatrix();
  return matrix[currentUser.role].includes(permission);
}
