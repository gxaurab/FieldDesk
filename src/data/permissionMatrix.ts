import { Role } from "../types/user";
import { Permission } from "../types/permission";

export const defaultPermissionMatrix: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    Permission.VIEW_TICKETS,
    Permission.CREATE_TICKETS,
    Permission.EDIT_TICKETS,
    Permission.DELETE_TICKETS,
    Permission.ASSIGN_TICKETS,
    Permission.MANAGE_STAFF,
    Permission.MANAGE_ORGANIZATIONS,
    Permission.VIEW_ANALYTICS,
  ],
  [Role.AUDITOR]: [
    Permission.VIEW_TICKETS,
    Permission.VIEW_ANALYTICS,
  ],
  [Role.ORG_ADMIN]: [
    Permission.VIEW_TICKETS,
    Permission.CREATE_TICKETS,
    Permission.EDIT_TICKETS,
    Permission.DELETE_TICKETS,
    Permission.ASSIGN_TICKETS,
    Permission.MANAGE_STAFF,
    Permission.VIEW_ANALYTICS,
  ],
  [Role.TEAM_LEAD]: [
    Permission.VIEW_TICKETS,
    Permission.CREATE_TICKETS,
    Permission.EDIT_TICKETS,
    Permission.ASSIGN_TICKETS,
    Permission.VIEW_ANALYTICS,
  ],
  [Role.AGENT]: [
    Permission.VIEW_TICKETS,
    Permission.EDIT_TICKETS,
  ],
};