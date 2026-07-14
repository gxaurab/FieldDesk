import { type Organization } from "../types/organization";
import { organizations } from "../data/organizations";
import { delay } from "./delay";

export async function fetchOrganizations(): Promise<Organization[]> {
  await delay();
  return [...organizations];
}