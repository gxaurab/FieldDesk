import { StaffList } from "../components/staff/StaffList";
import { OrgList } from "../components/staff/OrgList";
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/permission";

export function StaffPage() {
  const canManageOrgs = usePermission(Permission.MANAGE_ORGANIZATIONS);

  return (
    <div className="p-6">
      <h1 className="text-xl font-medium text-gray-800 mb-4">Staff</h1>
      <StaffList />
      {canManageOrgs && <OrgList />}
    </div>
  );
}