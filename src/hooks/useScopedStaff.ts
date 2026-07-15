import { useCallback, useEffect, useState } from "react";
import { type User } from "../types/user";
import { useSession } from "../context/SessionContext";
import { fetchUsers } from "../services/userService";

export function useScopedStaff() {
  const { activeOrgId } = useSession();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialStaff() {
      const orgUsers = await fetchUsers(activeOrgId ?? undefined);
      if (cancelled) return;
      setStaff(orgUsers);
      setLoading(false);
    }

    void loadInitialStaff();
    return () => {
      cancelled = true;
    };
  }, [activeOrgId]);

  const refetch = useCallback(async () => {
    setLoading(true);
    const orgUsers = await fetchUsers(activeOrgId ?? undefined);
    setStaff(orgUsers);
    setLoading(false);
  }, [activeOrgId]);

  return { staff, loading, refetch };
}
