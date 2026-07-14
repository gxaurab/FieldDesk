import { type User } from "../types/user";
import { users } from "../data/users";
import { delay } from "./delay";

export async function fetchUsers(organizationId?: string): Promise<User[]> {
  await delay();
  if (!organizationId) return users; //this is for super admin and auditors as they have no organization
  return [ ...users.filter((u) => u.organizationId === organizationId)];
}