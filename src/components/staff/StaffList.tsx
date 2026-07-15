import { useScopedStaff } from "../../hooks/useScopedStaff";
import { deleteUser } from "../../services/userService";
import { usePermission } from "../../hooks/usePermission";
import { Permission } from "../../types/permission";
import { useSession } from "../../context/SessionContext";

export function StaffList() {
  const { staff, loading, refetch } = useScopedStaff();
  const { currentUser } = useSession();
  const canManageStaff = usePermission(Permission.MANAGE_STAFF);

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this staff member?")) return;
    await deleteUser(id);
    await refetch();
  }

  if (loading) {
    return <p className="text-sm text-gray-500 py-8 text-center">Loading staff...</p>;
  }

  if (staff.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">No staff to show.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
      <table className="w-full min-w-[520px]">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Role</th>
            {canManageStaff && <th className="py-2 px-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {staff.map((u) => (
            <tr key={u.id} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-800">{u.firstName} {u.lastName}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{u.role}</td>
              {canManageStaff && (
                <td className="py-3 px-4 text-right">
                  {u.id === currentUser.id ? (
                    <span className="text-xs text-gray-400">Current user</span>
                  ) : (
                    <button onClick={() => void handleDelete(u.id)} className="text-sm text-red-600 hover:underline">
                      Remove
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
