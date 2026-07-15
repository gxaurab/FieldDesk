import { useState } from "react";
import { type Ticket } from "../../types/ticket";
import { deleteTicket } from "../../services/ticketService";
import { TicketRow } from "./TicketRow";

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  refetch: () => void;
  onSelect: (ticket: Ticket) => void;
  onDeleted: (id: string) => void;
}

export function TicketList({ tickets, loading, refetch, onSelect, onDeleted }: TicketListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    await deleteTicket(id);
    refetch();
    setDeletingId(null);
    onDeleted(id);
  }

  if (loading) {
    return <p className="text-sm text-gray-500 py-8 text-center">Loading tickets...</p>;
  }

  if (tickets.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">No tickets to show.</p>;
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white">
      <p className="px-4 pt-3 text-xs text-gray-400 sm:hidden">Swipe sideways to see all ticket details.</p>
      <div className="overflow-x-auto touch-pan-x">
        <table className="min-w-[760px] w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="text-left py-2 px-4">Title</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Priority</th>
              <th className="text-left py-2 px-4">Assigned to</th>
              <th className="text-right py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onSelect={onSelect}
                onDelete={handleDelete}
                isDeleting={deletingId === ticket.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
