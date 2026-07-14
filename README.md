# FieldDesk

## Install and run

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal. A production check is available with `npm run build`.

## Test users and organizations

Use the **User** selector in the top bar to change the simulated session. Super Admin and Auditor sessions also receive an **Organization** selector; everyone else is fixed to their organization.

| User | Role | Organization |
| --- | --- | --- |
| Sarah Karki | Super Admin | Platform-level |
| Prakash Shrestha | Auditor | Platform-level |
| Anita Gurung | Organization Admin | Nvdia Corp |
| Bikash Thapa | Team Lead | Nvdia Corp |
| Sita Rai | Agent | Nvdia Corp |
| Rajesh Adhikari | Organization Admin | Wallmart Corp |
| Nisha Maharjan | Team Lead | Wallmart Corp |
| Kiran Tamang | Agent | Wallmart Corp |
| Deepak Basnet | Organization Admin | Global IME Bank |
| Manisha Poudel | Team Lead | Global IME Bank |
| Suman Lama | Agent | Global IME Bank |

Agents only see tickets assigned to themselves. Switch to an Agent and a different organization to confirm that no tickets outside that user's organization are exposed.

## Permissions

`PermissionContext` owns a `Record<Role, Permission[]>` matrix in React state. All permission-gated navigation, routes, and ticket controls use the `usePermission` hook, so the Permission Management table updates access immediately without a reload.

The matrix is available to Sarah Karki on **Permissions**. Toggle a checkbox, then visit the relevant navigation item or action to see it disappear or become restricted straight away.

## Key technical decisions

- Permission capability and organization scope are separate. `usePermission` answers whether an action is allowed; `useScopedTickets` applies the active organization and the Agent-only assignment filter.
- The Permission Management screen is the deliberate, documented exception to role-comparison avoidance: it checks for Super Admin directly because it manages the permissions that would otherwise gate itself.
- Components access mock data only through `src/services`, whose calls include a simulated delay. This keeps loading behavior consistent.
- The session provider always selects an active organization, including for platform users, which keeps ticket requests explicitly scoped.

## Known limitations

- This is mock-data only: there is no authentication, backend, or persistence after refresh.
- Ticket edits, creates, assignments, and deletes are in-memory for the current browser session.
- Permission changes reset on refresh.
- Organization management and staff role editing are intentionally not implemented; the directory is read-only.
- Styling is intentionally lightweight and focused on clarity over a complete design system.
