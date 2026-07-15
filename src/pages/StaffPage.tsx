import { useState, type FormEvent } from "react";
import { StaffList } from "../components/staff/StaffList";
import { OrgList } from "../components/staff/OrgList";
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/permission";
import { Role } from "../types/user";
import { useSession } from "../context/SessionContext";
import { createUser } from "../services/userService";

export function StaffPage() {
  const canManageOrgs = usePermission(Permission.MANAGE_ORGANIZATIONS);
  const canManageStaff = usePermission(Permission.MANAGE_STAFF);
  const { activeOrgId } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState<Role>(Role.AGENT);
  const [listKey, setListKey] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!activeOrgId) return;
    await createUser({ firstName, role, organizationId: activeOrgId });
    setFirstName("");
    setRole(Role.AGENT);
    setShowForm(false);
    setListKey((key) => key + 1);
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium text-gray-800">Staff</h1>
        {canManageStaff && (
          <button onClick={() => setShowForm((shown) => !shown)} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            {showForm ? "Cancel" : "Add staff member"}
          </button>
        )}
      </div>
      {showForm && canManageStaff && (
        <form onSubmit={(event) => void handleSubmit(event)} className="mb-4 grid gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-sm text-gray-600">First name
            <input required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2" />
          </label>
          <label className="text-sm text-gray-600">Role
            <select value={role} onChange={(event) => setRole(event.target.value as Role)} className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2">
              <option value={Role.ORG_ADMIN}>Organization admin</option>
              <option value={Role.TEAM_LEAD}>Team lead</option>
              <option value={Role.AGENT}>Agent</option>
            </select>
          </label>
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Add staff</button>
        </form>
      )}
      <StaffList key={listKey} />
      {canManageOrgs && <OrgList />}
    </div>
  );
}
