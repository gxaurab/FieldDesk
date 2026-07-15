import { useEffect, useState } from "react";
import { type Ticket, TicketStatus, TicketPriority } from "../../types/ticket";
import { type User } from "../../types/user";
import { useSession } from "../../context/SessionContext";
import { usePermission } from "../../hooks/usePermission";
import { Permission } from "../../types/permission";
import { fetchUsers } from "../../services/userService";

interface TicketFormProps {
  existingTicket?: Ticket;
  onSubmit: (ticket: Ticket) => void;
  onCancel: () => void;
}

export function TicketForm({ existingTicket, onSubmit, onCancel }: TicketFormProps) {
  const { currentUser, activeOrgId } = useSession();
  const isEditing = !!existingTicket;

  const canAssign = usePermission(Permission.ASSIGN_TICKETS);
  const canEditTitleAndPriority = usePermission(Permission.EDIT_TICKET_TITLE_AND_PRIORITY);
  const restrictTitleAndPriority = isEditing && !canEditTitleAndPriority;

  const [title, setTitle] = useState(existingTicket?.title ?? "");
  const [description, setDescription] = useState(existingTicket?.description ?? "");
  const [status, setStatus] = useState<TicketStatus>(existingTicket?.status ?? TicketStatus.OPEN);
  const [priority, setPriority] = useState<TicketPriority>(existingTicket?.priority ?? TicketPriority.MEDIUM);
  const [assignedTo, setAssignedTo] = useState<string>(existingTicket?.assignedTo ?? "");
  const [orgUsers, setOrgUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    async function loadOrgUsers() {
      if (!activeOrgId) return;
      setLoadingUsers(true);
      setOrgUsers(await fetchUsers(activeOrgId));
      setLoadingUsers(false);
    }
    void loadOrgUsers();
  }, [activeOrgId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ticket: Ticket = {
      id: existingTicket?.id ?? crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      organizationId: activeOrgId!,
      createdBy: existingTicket?.createdBy ?? currentUser.id,
      // if the user can't assign, keep whatever assignment already existed (or null on create)
      assignedTo: canAssign ? (assignedTo || null) : (existingTicket?.assignedTo ?? null),
    };
    onSubmit(ticket);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 id="ticket-form-title" className="text-lg font-medium text-gray-800">
        {isEditing ? "Edit ticket" : "New ticket"}
      </h2>

      <div>
        <label className="text-sm text-gray-500 block mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={restrictTitleAndPriority}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500 block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            {Object.values(TicketStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500 block mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            disabled={restrictTitleAndPriority}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
          >
            {Object.values(TicketPriority).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500 block mb-1">
          Assign to {!canAssign && <span className="text-gray-400">(no permission)</span>}
        </label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          disabled={!canAssign || loadingUsers}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="">{loadingUsers ? "Loading staff..." : "Unassigned"}</option>
          {orgUsers.map((u) => (
            <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {isEditing ? "Save changes" : "Create ticket"}
        </button>
        <button type="button" onClick={onCancel} className="text-sm text-gray-500 px-4 py-2 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </form>
  );
}
