import {type Ticket } from "../../types/ticket";
import { getUserName } from "../../utils/getUserName";
import { usePermission } from "../../hooks/usePermission";
import { Permission } from "../../types";

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
  onEdit: () => void;
}

export function TicketDetail({ ticket, onClose, onEdit }: TicketDetailProps) {
  const canEdit = usePermission(Permission.EDIT_TICKETS);
  return (
    <div className="border border-gray-200 rounded-lg p-6 mt-4">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-medium text-gray-800">{ticket.title}</h2>
        <div className="flex gap-3">
          {canEdit && (
            <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">
              Edit
            </button>
          )}
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
            Close
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
      <dl className="grid grid-cols-2 gap-y-2 text-sm mt-4">
        <dt className="text-gray-400">Status</dt>
        <dd className="text-gray-700">{ticket.status}</dd>
        <dt className="text-gray-400">Priority</dt>
        <dd className="text-gray-700">{ticket.priority}</dd>
        <dt className="text-gray-400">Assigned to</dt>
        <dd className="text-gray-700">{getUserName(ticket.assignedTo)}</dd>
        <dt className="text-gray-400">Created by</dt>
        <dd className="text-gray-700">{getUserName(ticket.createdBy)}</dd>
      </dl>
    </div>
  );
}