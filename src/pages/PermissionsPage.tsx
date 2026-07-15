import { PermissionMatrixTable } from "../components/permissions/PermissionMatrixTable";

export function PermissionsPage() {
  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-xl font-medium text-gray-800 mb-4">Manage permissions</h1>
      <PermissionMatrixTable />
    </div>
  );
}