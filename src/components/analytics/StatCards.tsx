import { type Ticket, TicketStatus } from "../../types/ticket";

interface StatCardsProps {
  tickets: Ticket[];
}

export function StatCards({ tickets }: StatCardsProps) {
  const cards = [
    { label: "Total", value: tickets.length, accent: "border-gray-200 text-gray-800" },
    { label: "Open", value: tickets.filter((t) => t.status === TicketStatus.OPEN).length, accent: "border-blue-100 text-blue-700" },
    { label: "In progress", value: tickets.filter((t) => t.status === TicketStatus.IN_PROGRESS).length, accent: "border-amber-100 text-amber-700" },
    { label: "Resolved", value: tickets.filter((t) => t.status === TicketStatus.RESOLVED).length, accent: "border-green-100 text-green-700" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl border bg-white px-4 py-3 ${c.accent}`}>
          <p className="text-xs text-gray-400">{c.label}</p>
          <p className="text-2xl font-medium mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  );
}