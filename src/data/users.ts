import {type User, Role } from "../types/user";

export const users: User[] = [
  // Platform-level 2ta admins
  { id: "user-1", firstName: "Ramu", lastName: "Admin", role: Role.SUPER_ADMIN, organizationId: null },
  { id: "user-15", firstName: "Hari", lastName: "Admin", role: Role.SUPER_ADMIN, organizationId: null },
  { id: "user-2", firstName: "Prakash", lastName: "Auditor", role: Role.AUDITOR, organizationId: null },

  // org-1
  { id: "user-3", firstName: "Anita", lastName: "Gurung", role: Role.ORG_ADMIN, organizationId: "org-1" },
  { id: "user-4", firstName: "Bikash", lastName: "Thapa", role: Role.TEAM_LEAD, organizationId: "org-1" },
  { id: "user-5", firstName: "Sita", lastName: "Rai", role: Role.AGENT, organizationId: "org-1" },

  // org-2
  { id: "user-6", firstName: "Rajesh", lastName: "Adhikari", role: Role.ORG_ADMIN, organizationId: "org-2" },
  { id: "user-7", firstName: "Nisha", lastName: "Maharjan", role: Role.TEAM_LEAD, organizationId: "org-2" },
  { id: "user-8", firstName: "Kiran", lastName: "Tamang", role: Role.AGENT, organizationId: "org-2" },

  // org-3
  { id: "user-9", firstName: "Deepak", lastName: "Basnet", role: Role.ORG_ADMIN, organizationId: "org-3" },
  { id: "user-10", firstName: "Manisha", lastName: "Poudel", role: Role.TEAM_LEAD, organizationId: "org-3" },
  { id: "user-11", firstName: "Suman", lastName: "Lama", role: Role.AGENT, organizationId: "org-3" },

  // org-4
  { id: "user-12", firstName: "Rupak", lastName: "Basnet", role: Role.ORG_ADMIN, organizationId: "org-4" },
  { id: "user-13", firstName: "Anish", lastName: "Poudel", role: Role.TEAM_LEAD, organizationId: "org-4" },
  { id: "user-14", firstName: "Sathi", lastName: "Lama", role: Role.AGENT, organizationId: "org-4" },



];
