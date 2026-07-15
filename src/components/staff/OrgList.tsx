import { organizations } from "../../data/organizations";

export function OrgList() {
  return (
    <table className="w-full border border-gray-100 rounded-lg overflow-hidden mt-6">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="text-left py-2 px-4">Organization</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org) => (
          <tr key={org.id} className="border-b border-gray-100">
            <td className="py-3 px-4 text-sm text-gray-800">{org.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}