import {type User, Role } from "../types/user";

export const users: User[] = [
  // Platform-level 2ta admins
  { id: "user-1", firstName: "Ramu", lastName: "Boss", role: Role.SUPER_ADMIN, organizationId: null },
  { id: "user-15", firstName: "Hari", lastName: "Boss2", role: Role.SUPER_ADMIN, organizationId: null },
  { id: "user-2", firstName: "Prakash", lastName: "subboss", role: Role.AUDITOR, organizationId: null },

  // org-1
  { id: "user-3", firstName: "Anita", lastName: "Nvdia ", role: Role.ORG_ADMIN, organizationId: "org-1" },
  { id: "user-4", firstName: "Bikash", lastName: "Nvdia ", role: Role.TEAM_LEAD, organizationId: "org-1" },
  { id: "user-5", firstName: "Sita", lastName: "Nvdia ", role: Role.AGENT, organizationId: "org-1" },

  // org-2
  { id: "user-6", firstName: "Rajesh", lastName: "Wallmart ", role: Role.ORG_ADMIN, organizationId: "org-2" },
  { id: "user-7", firstName: "Nisha", lastName: "Wallmart ", role: Role.TEAM_LEAD, organizationId: "org-2" },
  { id: "user-8", firstName: "Kiran", lastName: "Wallmart ", role: Role.AGENT, organizationId: "org-2" },

  // org-3
  { id: "user-9", firstName: "Deepak", lastName: "Global  ", role: Role.ORG_ADMIN, organizationId: "org-3" },
  { id: "user-10", firstName: "Manisha", lastName: "Global  ", role: Role.TEAM_LEAD, organizationId: "org-3" },
  { id: "user-11", firstName: "Suman", lastName: "Global  ", role: Role.AGENT, organizationId: "org-3" },

  // org-4
  { id: "user-12", firstName: "Rupak", lastName: "Alphabet ", role: Role.ORG_ADMIN, organizationId: "org-4" },
  { id: "user-13", firstName: "Anish", lastName: "Alphabet ", role: Role.TEAM_LEAD, organizationId: "org-4" },
  { id: "user-14", firstName: "Sathi", lastName: "Alphabet ", role: Role.AGENT, organizationId: "org-4" },



];
