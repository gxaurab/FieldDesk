import { type User, Role } from "../types/user";
import { users } from "../data/users";
import { organizations } from "../data/organizations";
import { delay } from "./delay";

export interface CreateUserInput {
  firstName: string;
  role: Role;
  organizationId: string;
}

export async function fetchUsers(organizationId?: string): Promise<User[]> {
  await delay();
  if (!organizationId) return [...users]; // this is for super admin and auditors as they have no organization
  return [ ...users.filter((u) => u.organizationId === organizationId)];
}

export async function createUser(input: CreateUserInput): Promise<User> {
  await delay();
  const organization = organizations.find((org) => org.id === input.organizationId);
  const user: User = {
    id: crypto.randomUUID(),
    firstName: input.firstName.trim(),
    lastName: organization?.name ?? "FieldDesk",
    role: input.role,
    organizationId: input.organizationId,
  };
  users.push(user);
  return user;
}

export async function deleteUser(id: string): Promise<void> {
  await delay();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) throw new Error("Staff member not found.");
  users.splice(index, 1);
}
