import { useSession } from "../../context/SessionContext";
import { Role } from "../../types/user";
import { organizations } from "../../data/organizations";

export function OrgSwitcher() {
  const { currentUser, activeOrgId, switchOrg } = useSession();

  const isPlatformLevel = currentUser.role === Role.SUPER_ADMIN || currentUser.role === Role.AUDITOR;
  if (!isPlatformLevel) return null;

  return (
    <select
      value={activeOrgId ?? ""}
      onChange={(e) => switchOrg(e.target.value)}
      className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700"
    >
      {organizations.map((org) => (
        <option key={org.id} value={org.id}>
          {org.name}
        </option>
      ))}
    </select>
  );
}