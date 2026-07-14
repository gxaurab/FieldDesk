import { useCallback, useEffect, useState } from "react";
import { fetchTickets } from "../services";
import { Role, type Ticket } from "../types";
import { useSession } from "../context/SessionContext";

export function useScopedTickets() {
  const { currentUser, activeOrgId } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    if (!activeOrgId) {
      setTickets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchTickets(activeOrgId)
      .then((items) => setTickets(
        currentUser.role === Role.AGENT ? items.filter((ticket) => ticket.assignedTo === currentUser.id) : items,
      ))
      .finally(() => setLoading(false));
  }, [activeOrgId, currentUser.id, currentUser.role]);

  useEffect(() => { void Promise.resolve().then(refetch); }, [refetch]);
  return { tickets, loading, refetch };
}
