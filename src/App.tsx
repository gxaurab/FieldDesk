// import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
// import { BrowserRouter, NavLink, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
// import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import { PermissionProvider, usePermissionMatrix } from "./context/PermissionContext";
// import { SessionProvider, useSession } from "./context/SessionContext";
// import { usePermission } from "./hooks/usePermission";
// import { useScopedTickets } from "./hooks/useScopedTickets";
// import { deleteTicket, fetchOrganizations, fetchUsers, updateTicket, createTicket } from "./services";
// import { Permission, Role, TicketPriority, TicketStatus, type Organization, type Ticket, type User } from "./types";

// const label = (value: string) => value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
// const fullName = (user?: User) => user ? `${user.firstName} ${user.lastName}` : "Unassigned";

// function RestrictedAccess() { return <div className="state"><h2>Restricted access</h2><p>Your current permissions do not allow access to this area.</p></div>; }
// function Loading() { return <div className="state"><div className="spinner" /><p>Loading…</p></div>; }
// function Empty({ children }: { children: ReactNode }) { return <div className="state"><h2>Nothing here yet</h2><p>{children}</p></div>; }
// function Guard({ permission, children }: { permission: Permission; children: ReactNode }) { return usePermission(permission) ? <>{children}</> : <RestrictedAccess />; }

// function Shell() {
//   const { currentUser, activeOrgId, switchUser, switchOrg } = useSession();
//   const canViewTickets = usePermission(Permission.VIEW_TICKETS);
//   const canManageStaff = usePermission(Permission.MANAGE_STAFF);
//   const canViewAnalytics = usePermission(Permission.VIEW_ANALYTICS);
//   const canManageOrganizations = usePermission(Permission.MANAGE_ORGANIZATIONS);
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   useEffect(() => { fetchOrganizations().then(setOrganizations); fetchUsers().then(setUsers); }, []);
//   const activeOrg = organizations.find((org) => org.id === activeOrgId);
//   const isPlatformUser = currentUser.organizationId === null;
//   return <div className="app-shell">
//     <aside className="sidebar">
//       <NavLink className="brand" to="/tickets"><span className="brand-mark">F</span><span>FieldDesk</span></NavLink>
//       <nav>
//         {canViewTickets && <NavLink to="/tickets">Tickets</NavLink>}
//         <NavLink to="/organizations">Organizations</NavLink>
//         {canManageStaff && <NavLink to="/staff">Staff</NavLink>}
//         {canViewAnalytics && <NavLink to="/analytics">Analytics</NavLink>}
//         {canManageOrganizations && <NavLink to="/settings/permissions">Permissions</NavLink>}
//       </nav>
//       <div className="sidebar-note">Support operations<br />workspace</div>
//     </aside>
//     <main>
//       <header className="topbar">
//         <div><p className="eyebrow">Workspace</p><h1>{activeOrg?.name ?? "FieldDesk"}</h1></div>
//         <div className="session-controls">
//           {isPlatformUser ? <label>Organization<select value={activeOrgId ?? ""} onChange={(event) => switchOrg(event.target.value)}>{organizations.map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}</select></label> : <div className="readonly-org"><span>Organization</span>{activeOrg?.name ?? "Loading…"}</div>}
//           <label>User<select value={currentUser.id} onChange={(event) => switchUser(event.target.value)}>{users.map((user) => <option key={user.id} value={user.id}>{fullName(user)} · {label(user.role)}</option>)}</select></label>
//         </div>
//       </header>
//       <section className="page"><Routes>
//         <Route path="/" element={<Navigate to="/tickets" replace />} />
//         <Route path="/tickets" element={<Guard permission={Permission.VIEW_TICKETS}><Tickets /></Guard>} />
//         <Route path="/tickets/new" element={<Guard permission={Permission.CREATE_TICKETS}><TicketForm /></Guard>} />
//         <Route path="/tickets/:id" element={<Guard permission={Permission.VIEW_TICKETS}><TicketDetail /></Guard>} />
//         <Route path="/organizations" element={<Organizations />} />
//         <Route path="/staff" element={<Guard permission={Permission.MANAGE_STAFF}><Staff /></Guard>} />
//         <Route path="/analytics" element={<Guard permission={Permission.VIEW_ANALYTICS}><Analytics /></Guard>} />
//         <Route path="/settings/permissions" element={<PermissionSettings />} />
//         <Route path="*" element={<Navigate to="/tickets" replace />} />
//       </Routes></section>
//     </main>
//   </div>;
// }

// function Tickets() {
//   const { tickets, loading } = useScopedTickets(); const canCreate = usePermission(Permission.CREATE_TICKETS); const navigate = useNavigate();
//   const [people, setPeople] = useState<User[]>([]); useEffect(() => { fetchUsers().then(setPeople); }, []);
//   return <><div className="page-title"><div><p className="eyebrow">Support queue</p><h2>Tickets</h2></div>{canCreate && <button onClick={() => navigate("/tickets/new")}>+ New ticket</button>}</div>
//     {loading ? <Loading /> : tickets.length === 0 ? <Empty>No tickets are assigned to you in this organization.</Empty> : <div className="table-wrap"><table><thead><tr><th>Ticket</th><th>Status</th><th>Priority</th><th>Assignee</th></tr></thead><tbody>{tickets.map((ticket) => <tr key={ticket.id} className="clickable" onClick={() => navigate(`/tickets/${ticket.id}`)}><td><strong>{ticket.title}</strong><span>{ticket.id}</span></td><td><Status value={ticket.status} /></td><td><Status value={ticket.priority} /></td><td>{fullName(people.find((user) => user.id === ticket.assignedTo))}</td></tr>)}</tbody></table></div>}</>;
// }
// function Status({ value }: { value: string }) { return <span className={`badge ${value.toLowerCase()}`}>{label(value)}</span>; }

// function TicketDetail() {
//   const { id } = useParams(); const { tickets, loading, refetch } = useScopedTickets(); const [people, setPeople] = useState<User[]>([]); const [editing, setEditing] = useState(false); const [assigning, setAssigning] = useState(false); const navigate = useNavigate();
//   const canEdit = usePermission(Permission.EDIT_TICKETS), canAssign = usePermission(Permission.ASSIGN_TICKETS), canDelete = usePermission(Permission.DELETE_TICKETS);
//   const ticket = tickets.find((item) => item.id === id);
//   useEffect(() => { if (ticket) fetchUsers(ticket.organizationId).then(setPeople); }, [ticket]);
//   if (loading) return <Loading />; if (!ticket) return <Empty>This ticket is unavailable in your current organization scope.</Empty>;
//   const save = async (changes: Partial<Ticket>) => { await updateTicket({ ...ticket, ...changes }); refetch(); setEditing(false); setAssigning(false); };
//   const remove = async () => { if (window.confirm("Delete this ticket?")) { await deleteTicket(ticket.id); navigate("/tickets"); } };
//   return <><button className="back" onClick={() => navigate("/tickets")}>← All tickets</button><div className="detail-head"><div><p className="eyebrow">{ticket.id}</p><h2>{ticket.title}</h2></div><div className="actions">{canEdit && <button className="secondary" onClick={() => setEditing((value) => !value)}>Edit</button>}{canAssign && <button className="secondary" onClick={() => setAssigning((value) => !value)}>Assign</button>}{canDelete && <button className="danger" onClick={remove}>Delete</button>}</div></div>
//     {editing && <TicketFields ticket={ticket} onSave={save} onCancel={() => setEditing(false)} />}
//     {assigning && <div className="panel inline-form"><label>Assign to<select defaultValue={ticket.assignedTo ?? ""} onChange={(event) => save({ assignedTo: event.target.value || null })}><option value="">Unassigned</option>{people.map((person) => <option key={person.id} value={person.id}>{fullName(person)}</option>)}</select></label><button className="secondary" onClick={() => setAssigning(false)}>Cancel</button></div>}
//     <div className="detail-grid"><article className="panel"><p className="eyebrow">Description</p><p>{ticket.description}</p></article><article className="panel facts"><div><span>Status</span><Status value={ticket.status} /></div><div><span>Priority</span><Status value={ticket.priority} /></div><div><span>Assignee</span><strong>{fullName(people.find((person) => person.id === ticket.assignedTo))}</strong></div></article></div></>;
// }

// function TicketFields({ ticket, onSave, onCancel }: { ticket: Ticket; onSave: (changes: Partial<Ticket>) => Promise<void>; onCancel: () => void }) {
//   const [form, setForm] = useState(ticket); const submit = (event: FormEvent) => { event.preventDefault(); void onSave(form); };
//   return <form className="panel form-grid" onSubmit={submit}><label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label><label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as TicketStatus })}>{Object.values(TicketStatus).map((item) => <option key={item}>{label(item)}</option>)}</select></label><label>Priority<select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as TicketPriority })}>{Object.values(TicketPriority).map((item) => <option key={item}>{label(item)}</option>)}</select></label><label className="full">Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label><div className="actions full"><button type="submit">Save changes</button><button type="button" className="secondary" onClick={onCancel}>Cancel</button></div></form>;
// }

// function TicketForm() {
//   const { currentUser, activeOrgId } = useSession(); const navigate = useNavigate(); const [saving, setSaving] = useState(false); const [form, setForm] = useState({ title: "", description: "", status: TicketStatus.OPEN, priority: TicketPriority.MEDIUM });
//   const submit = async (event: FormEvent) => { event.preventDefault(); if (!activeOrgId) return; setSaving(true); const ticket: Ticket = { ...form, id: `tkt-${Date.now()}`, organizationId: activeOrgId, createdBy: currentUser.id, assignedTo: null }; await createTicket(ticket); navigate(`/tickets/${ticket.id}`); };
//   return <><div className="page-title"><div><p className="eyebrow">Support queue</p><h2>Create ticket</h2></div></div><form className="panel form-grid" onSubmit={submit}><label className="full">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as TicketStatus })}>{Object.values(TicketStatus).map((item) => <option key={item}>{label(item)}</option>)}</select></label><label>Priority<select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as TicketPriority })}>{Object.values(TicketPriority).map((item) => <option key={item}>{label(item)}</option>)}</select></label><label className="full">Description<textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><div className="full"><button disabled={saving}>{saving ? "Creating…" : "Create ticket"}</button></div></form></>;
// }

// function Organizations() {
//   const { currentUser } = useSession(); const canManage = usePermission(Permission.MANAGE_ORGANIZATIONS); const [items, setItems] = useState<Organization[]>([]); const [loading, setLoading] = useState(true);
//   useEffect(() => { fetchOrganizations().then((organizations) => setItems(currentUser.organizationId ? organizations.filter((org) => org.id === currentUser.organizationId) : organizations)).finally(() => setLoading(false)); }, [currentUser.organizationId]);
//   return <><div className="page-title"><div><p className="eyebrow">Directory</p><h2>Organizations</h2></div>{canManage && <button disabled title="Mock data only">Manage organizations</button>}</div>{loading ? <Loading /> : items.length === 0 ? <Empty>No organizations are available.</Empty> : <div className="cards">{items.map((org) => <article className="panel org-card" key={org.id}><div className="org-icon">{org.name[0]}</div><div><h3>{org.name}</h3><p>{org.id}</p></div></article>)}</div>}</>;
// }

// function Staff() {
//   const { activeOrgId } = useSession(); const [staff, setStaff] = useState<User[]>([]); const [loading, setLoading] = useState(true);
//   useEffect(() => { if (!activeOrgId) return; void Promise.resolve().then(() => { setLoading(true); return fetchUsers(activeOrgId).then(setStaff).finally(() => setLoading(false)); }); }, [activeOrgId]);
//   return <><div className="page-title"><div><p className="eyebrow">Directory</p><h2>Staff</h2></div></div>{loading ? <Loading /> : staff.length === 0 ? <Empty>There are no staff members in this organization.</Empty> : <div className="cards">{staff.map((person) => <article className="panel staff-card" key={person.id}><div className="avatar">{person.firstName[0]}{person.lastName[0]}</div><div><h3>{fullName(person)}</h3><p>{label(person.role)}</p></div></article>)}</div>}</>;
// }

// function Analytics() {
//   const { tickets, loading } = useScopedTickets();
//   const statusData = useMemo(() => Object.values(TicketStatus).map((status) => ({ name: label(status), tickets: tickets.filter((ticket) => ticket.status === status).length })), [tickets]);
//   const priorityData = useMemo(() => Object.values(TicketPriority).map((priority) => ({ name: label(priority), tickets: tickets.filter((ticket) => ticket.priority === priority).length })), [tickets]);
//   if (loading) return <Loading />; if (!tickets.length) return <Empty>There is no ticket data available for this scope.</Empty>;
//   return <><div className="page-title"><div><p className="eyebrow">Reporting</p><h2>Analytics</h2></div></div><div className="chart-grid"><Chart title="Tickets by status" data={statusData} /><Chart title="Tickets by priority" data={priorityData} /></div></>;
// }
// function Chart({ title, data }: { title: string; data: { name: string; tickets: number }[] }) { return <article className="panel chart"><h3>{title}</h3><ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid vertical={false} stroke="#e5e7eb" /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="tickets" fill="#2563eb" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></article>; }

// function PermissionSettings() {
//   const { currentUser } = useSession(); const { matrix, setRolePermission } = usePermissionMatrix();
//   // Deliberate exception: this screen cannot rely on a permission it is allowed to edit.
//   if (currentUser.role !== Role.SUPER_ADMIN) return <RestrictedAccess />;
//   return <><div className="page-title"><div><p className="eyebrow">Administration</p><h2>Permission management</h2><p className="subtle">Changes apply throughout the app immediately.</p></div></div><div className="table-wrap permissions"><table><thead><tr><th>Role</th>{Object.values(Permission).map((permission) => <th key={permission}>{label(permission)}</th>)}</tr></thead><tbody>{Object.values(Role).map((role) => <tr key={role}><td><strong>{label(role)}</strong></td>{Object.values(Permission).map((permission) => <td key={permission}><input aria-label={`${label(role)} ${label(permission)}`} type="checkbox" checked={matrix[role].includes(permission)} onChange={(event) => setRolePermission(role, permission, event.target.checked)} /></td>)}</tr>)}</tbody></table></div></>;
// }

// export default function App() { return <BrowserRouter><SessionProvider><PermissionProvider><Shell /></PermissionProvider></SessionProvider></BrowserRouter>; }

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { PermissionProvider } from "./context/PermissionContext";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Permission } from "./types/permission";
import { TicketsPage } from "./pages/TicketsPage";
import { StaffPage } from "./pages/StaffPage";
import { PermissionsPage } from "./pages/PermissionsPage";

function App() {
  return (
    <SessionProvider>
      <PermissionProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<TicketsPage />} />
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute permission={Permission.VIEW_TICKETS}>
                    <TicketsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <ProtectedRoute permission={Permission.MANAGE_STAFF}>
                    <StaffPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/permissions" element={<PermissionsPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PermissionProvider>
    </SessionProvider>
  );
}

export default App;