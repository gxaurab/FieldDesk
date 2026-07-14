export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  AUDITOR = "AUDITOR",

  ORG_ADMIN = "ORG_ADMIN",

  TEAM_LEAD = "TEAM_LEAD",

  AGENT = "AGENT",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  organizationId: string | null;
}