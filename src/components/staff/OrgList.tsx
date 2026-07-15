import { useEffect, useState } from "react";
import { type Organization } from "../../types/organization";
import { fetchOrganizations } from "../../services/organizationService";

export function OrgList() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrganizations() {
      setOrganizations(await fetchOrganizations());
      setLoading(false);
    }
    void loadOrganizations();
  }, []);

  if (loading) {
    return <p className="py-8 text-center text-sm text-gray-500">Loading organizations...</p>;
  }

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
