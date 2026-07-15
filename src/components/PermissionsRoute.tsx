import { useSession } from "../context/SessionContext";
import { PermissionsPage } from "../pages/PermissionsPage";
import { Role } from "../types";

export function PermissionsRoute() {
  const { currentUser } = useSession();
  if (currentUser.role !== Role.SUPER_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-gray-700">Access restricted</p>
        <p className="text-sm text-gray-500 mt-1">Only Super Admin can manage permissions.</p>
      </div>
    );
  }
  return <PermissionsPage />;
}