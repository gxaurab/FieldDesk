import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Role } from "../../types/user";
import { type Organization } from "../../types/organization";
import { fetchOrganizations } from "../../services/organizationService";

export function OrgSwitcher() {
  const { currentUser, activeOrgId, switchOrg } = useSession();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    async function loadOrganizations() {
      setOrganizations(await fetchOrganizations());
    }
    void loadOrganizations();
  }, []);

  const isPlatformLevel = currentUser.role === Role.SUPER_ADMIN || currentUser.role === Role.AUDITOR;
  const activeOrganization = organizations.find((organization) => organization.id === activeOrgId);

  if (!isPlatformLevel) {
    return (
      <div className="min-w-44 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Organization</p>
        <p className="mt-0.5 text-sm font-medium text-slate-700">{activeOrganization?.name ?? "Loading organization..."}</p>
      </div>
    );
  }

  return (
    <label className="relative block min-w-44 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-400">Viewing organization</span>
      <select
        value={activeOrgId ?? ""}
        onChange={(e) => switchOrg(e.target.value)}
        disabled={organizations.length === 0}
        className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-medium text-slate-700 outline-none"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-slate-400">⌄</span>
    </label>
  );
}
