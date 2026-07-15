import { useEffect, useState } from "react";
import { type User } from "../types/user";
import { useSession } from "../context/SessionContext";
import { fetchUsers } from "../services/userService";

export function useScopedStaff() {
  const { currentUser, activeOrgId } = useSession();
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // platform-level users viewing "all" would need a different toggle later;
    // for now staff view always scopes to the active org, same as tickets
    fetchUsers(activeOrgId ?? undefined).then((orgUsers) => {
      setStaff(orgUsers);
      setLoading(false);
    });
  }, [currentUser, activeOrgId]);

  return { staff, loading };
}