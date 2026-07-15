import { type Ticket, TicketStatus } from "../../types/ticket";

interface StatCardsProps {
  tickets: Ticket[];
}

export function StatCards({ tickets }: StatCardsProps) {
  const total = tickets.length;
  const statuses = [
    { label: "Open", value: tickets.filter((t) => t.status === TicketStatus.OPEN).length, color: "bg-blue-500" },
    { label: "In progress", value: tickets.filter((t) => t.status === TicketStatus.IN_PROGRESS).length, color: "bg-amber-500" },
    { label: "Resolved", value: tickets.filter((t) => t.status === TicketStatus.RESOLVED).length, color: "bg-green-500" },
  ];

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-gray-700">Ticket status</h3>
        <span className="text-sm text-gray-400">{total} total</span>
      </div>
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.label}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-gray-600">{status.label}</span>
              <span className="font-medium text-gray-800">{status.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${status.color} transition-all`}
                style={{ width: `${total === 0 ? 0 : (status.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
