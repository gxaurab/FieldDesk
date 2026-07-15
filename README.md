# FieldDesk
FieldDesk is a small React and TypeScript support-ticket dashboard. It uses mock data only from src/data so there is no backend.

Deployed URL: https://field-desk-ten.vercel.app/

## Install and run

```bash
npm install
npm run dev
```

Open the local address shown by Vite in the terminal.

Checks:

```bash
npm run lint
npm run build
```

## Test users and organizations

Testing different users means using the **Signed in as** dropdown at the top of the app. It changes the simulated logged in user, so you can see the permissions and ticket scope for that person.

Super Admins and the Auditor also see a **Viewing organization** dropdown. Use it to switch between organizations. Users who belong to an organization are locked to their own organization.

Hardcoded data consists: 
* 4 organizations
* 2 super admins
* 1 Auditor
* 1 each Org Admin, Team Lead and Agent

Things to try:

- Switch from a Super Admin to an Agent. An Agent only sees tickets assigned to that Agent in their own organization.
- Switch organizations as a Super Admin or Auditor and confirm that the ticket list and analytics change together.
- Open an Agent ticket and edit it. Description and status can be changed, but title and priority are locked by default.

## How permissions are stored and updated

Permissions are stored in `PermissionContext` as a TypeScript `Record<Role, Permission[]>`. like every role has a list of actions it is allowed to do.

For example, the Agent role has `EDIT_TICKETS`, but it does not have `EDIT_TICKET_TITLE_AND_PRIORITY`. This means Agents can update a ticket's description and status, but cannot change its title or priority.

Components ask for permission through the `usePermission` hook, for example:

```ts
const canDelete = usePermission(Permission.DELETE_TICKETS);
```

The permission page changes the matrix with `setRolePermission`. This updates React state, so menus, buttons, routes, and fields update straight away without a page refresh.

Only a Super Admin can open the permission page. This screen uses a direct Super Admin check because it manages the same permission matrix that normally controls access.

## Important technical decisions
- **Permissions** Super Admin can view and CRUD all org and data. Auditor can only view all org and data, cannot CRUD.
- **Permissions and data scope are separate.** A permission answers “can this user do this action?” Organization scope answers “which tickets can this user see?” `useScopedTickets` handles organization scope and the Agent's assigned-ticket rule.
- **Hooks keep the pages simple.** `usePermission` contains permission lookup logic, while `useScopedTickets` and `useScopedStaff` handle loading and scoped data. The ticket page passes one ticket array to both the table and analytics so they stay in sync.
- **Mock services act like a small fake backend.** Ticket, user, and organization service functions read or change the mock arrays and wait 200 ms. This gives the UI realistic loading states without needing a real API.
- **Data is in memory, not in a database.** When a ticket or staff member is added, edited, or removed, the mock array changes only while the app is open. Refreshing the page loads the original seed data again. Permission changes are React state and also reset on refresh.
- **Recharts is used for the priority chart.** The status section is a small custom progress-bar view based on the same scoped ticket data.

### UI inspiration

- Ticket analytics and charts were inspired by [DevDesk UI](https://devdesk-ui.vercel.app/).
- Permission and role management were inspired from the Strapi dashboard.

## Known limitations

- Nothing persists after refresh as it is stateless. Tickets, staff changes, and permission changes return to the seeded harcoded state.
- Using of Tanstack could have made it more simpler to handle the states but since there is no real login, API, database, or server-side authorization, i didnt use it. 
