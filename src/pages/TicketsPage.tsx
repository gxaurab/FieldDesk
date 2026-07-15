import { useState } from "react";
import { type Ticket } from "../types/ticket";
import { useScopedTickets } from "../hooks/useScopedTickets";
import { TicketList } from "../components/tickets/TicketList";
import { TicketDetail } from "../components/tickets/TicketDetail";
import { TicketForm } from "../components/tickets/TicketForm";
import { StatCards } from "../components/analytics/StatCards";
import { PriorityDonutChart } from "../components/analytics/PriorityDonutChart";
import { createTicket, updateTicket } from "../services/ticketService";
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/permission";

type ViewMode = "detail" | "create" | "edit" | null;

export function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [listKey, setListKey] = useState(0);

  const canCreate = usePermission(Permission.CREATE_TICKETS);
  const canViewAnalytics = usePermission(Permission.VIEW_ANALYTICS);

  // reused for both the dashboard widgets and the list below, same scoped data
  const { tickets } = useScopedTickets();

  function handleSelect(ticket: Ticket) {
    setSelectedTicket(ticket);
    setViewMode("detail");
  }

  function handleCreate() {
    setSelectedTicket(null);
    setViewMode("create");
  }

  function handleEdit() {
    setViewMode("edit");
  }

  function handleDeleted(id: string) {
    if (selectedTicket?.id === id) {
      setSelectedTicket(null);
      setViewMode(null);
    }
  }

  async function handleFormSubmit(ticket: Ticket) {
    if (viewMode === "edit") {
      await updateTicket(ticket);
    } else {
      await createTicket(ticket);
    }
    setSelectedTicket(null);
    setViewMode(null);
    setListKey((k) => k + 1);
  }

  function handleClose() {
    setSelectedTicket(null);
    setViewMode(null);
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {canViewAnalytics && (
        <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <PriorityDonutChart tickets={tickets} />
          <StatCards tickets={tickets} />
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-medium text-gray-800">Tickets</h1>
          {canCreate && (
            <button
              onClick={handleCreate}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              New ticket
            </button>
          )}
        </div>

        <TicketList key={listKey} onSelect={handleSelect} onDeleted={handleDeleted} />

        {viewMode === "detail" && selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleClose} onEdit={handleEdit} />
        )}

        {(viewMode === "create" || viewMode === "edit") && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="presentation"
            onMouseDown={handleClose}
          >
            <div
              className="w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ticket-form-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <TicketForm
                existingTicket={viewMode === "edit" ? selectedTicket ?? undefined : undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleClose}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
