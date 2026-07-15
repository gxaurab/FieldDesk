import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useScopedTickets } from "../../hooks/useScopedTickets";
import { TicketStatus } from "../../types/ticket";

export function TicketsChart() {
  const { tickets, loading } = useScopedTickets();

  if (loading) {
    return <p className="text-sm text-gray-500 py-8 text-center">Loading analytics...</p>;
  }

  if (tickets.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">No ticket data to show.</p>;
  }

  const data = Object.values(TicketStatus).map((status) => ({
    status,
    count: tickets.filter((t) => t.status === status).length,
  }));

  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Tickets by status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="status" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}