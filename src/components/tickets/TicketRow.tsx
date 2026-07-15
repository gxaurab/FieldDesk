import { type Ticket, TicketStatus, TicketPriority } from "../../types/ticket";
import { Permission } from "../../types/permission";
import { usePermission } from "../../hooks/usePermission";
import { getUserName } from "../../utils/getUserName";

const statusStyles: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: "bg-blue-50 text-blue-700",
  [TicketStatus.IN_PROGRESS]: "bg-amber-50 text-amber-700",
  [TicketStatus.RESOLVED]: "bg-green-50 text-green-700",
  [TicketStatus.CLOSED]: "bg-gray-100 text-gray-600",
};

const priorityStyles: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: "text-gray-500",
  [TicketPriority.MEDIUM]: "text-amber-600",
  [TicketPriority.HIGH]: "text-red-600",
};

interface TicketRowProps {
  ticket: Ticket;
  onSelect: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function TicketRow({ ticket, onSelect, onDelete, isDeleting }: TicketRowProps) {
  const canEdit = usePermission(Permission.EDIT_TICKETS);
  const canDelete = usePermission(Permission.DELETE_TICKETS);

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 ${isDeleting ? "opacity-50" : ""}`}>
      <td className="py-3 px-4">
        <button onClick={() => onSelect(ticket)} className="text-sm font-medium text-gray-800 hover:underline text-left">
          {ticket.title}
        </button>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[ticket.status]}`}>
          {ticket.status}
        </span>
      </td>
      <td className={`py-3 px-4 text-sm ${priorityStyles[ticket.priority]}`}>
        {ticket.priority}
      </td>
      <td className="py-3 px-4 text-sm text-gray-500">
        {getUserName(ticket.assignedTo)}
      </td>
      <td className="py-3 px-4 text-right space-x-3">
        {canEdit && (
          <button onClick={() => onSelect(ticket)} className="text-sm text-blue-600 hover:underline">
            Edit
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onDelete(ticket.id)}
            disabled={isDeleting}
            className="text-sm text-red-600 hover:underline disabled:opacity-50 disabled:pointer-events-none"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </td>
    </tr>
  );
}