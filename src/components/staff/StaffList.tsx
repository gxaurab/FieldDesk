import { useScopedStaff } from "../../hooks/useScopedStaff";

export function StaffList() {
  const { staff, loading } = useScopedStaff();

  if (loading) {
    return <p className="text-sm text-gray-500 py-8 text-center">Loading staff...</p>;
  }

  if (staff.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">No staff to show.</p>;
  }

  return (
    <table className="w-full border border-gray-100 rounded-lg overflow-hidden">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="text-left py-2 px-4">Name</th>
          <th className="text-left py-2 px-4">Role</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((u) => (
          <tr key={u.id} className="border-b border-gray-100">
            <td className="py-3 px-4 text-sm text-gray-800">{u.firstName} {u.lastName}</td>
            <td className="py-3 px-4 text-sm text-gray-500">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}