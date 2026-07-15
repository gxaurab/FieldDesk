import { users } from "../data/users";

export function getUserName(userId: string | null): string {
  if (!userId) return "Unassigned";
  const user = users.find((u) => u.id === userId);
  return user ? `${user.firstName} ${user.lastName}` : "Unknown user";
}