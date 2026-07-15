import { Role } from "../../types/user";
import { Permission } from "../../types/permission";
import { usePermissionMatrix } from "../../context/PermissionContext";

export function PermissionMatrixTable() {
  const { matrix, setRolePermission } = usePermissionMatrix();

  return (
    <table className="w-full border border-gray-100 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="text-left py-2 px-4">Role</th>
          {Object.values(Permission).map((perm) => (
            <th key={perm} className="text-center py-2 px-2">{perm.replace("_", " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.values(Role).map((role) => (
          <tr key={role} className="border-b border-gray-100">
            <td className="py-2 px-4 text-gray-800">{role}</td>
            {Object.values(Permission).map((perm) => (
              <td key={perm} className="text-center py-2 px-2">
                <input
                  type="checkbox"
                  checked={matrix[role].includes(perm)}
                  onChange={(e) => setRolePermission(role, perm, e.target.checked)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}