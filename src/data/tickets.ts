import { type Ticket, TicketStatus, TicketPriority } from "../types/ticket";

export const tickets: Ticket[] = [
  // org-1
  { id: "tkt-1", title: "Delivery delayed to Pokhara", description: "Shipment stuck at checkpoint.", status: TicketStatus.OPEN, priority: TicketPriority.HIGH, organizationId: "org-1", createdBy: "user-4", assignedTo: "user-5" },
  { id: "tkt-2", title: "Damaged package reported", description: "Customer reports crushed box.", status: TicketStatus.IN_PROGRESS, priority: TicketPriority.MEDIUM, organizationId: "org-1", createdBy: "user-3", assignedTo: "user-5" },
  { id: "tkt-3", title: "Wrong address on manifest", description: "Address mismatch flagged by driver.", status: TicketStatus.OPEN, priority: TicketPriority.LOW, organizationId: "org-1", createdBy: "user-4", assignedTo: null },
  { id: "tkt-4", title: "Warehouse scanner offline", description: "Barcode scanner not syncing.", status: TicketStatus.RESOLVED, priority: TicketPriority.MEDIUM, organizationId: "org-1", createdBy: "user-3", assignedTo: "user-5" },

  // org-2
  { id: "tkt-5", title: "Fabric batch quality complaint", description: "Client flagged dye inconsistency.", status: TicketStatus.OPEN, priority: TicketPriority.HIGH, organizationId: "org-2", createdBy: "user-7", assignedTo: "user-8" },
  { id: "tkt-6", title: "Loom machine 3 malfunction", description: "Repeated thread snapping.", status: TicketStatus.IN_PROGRESS, priority: TicketPriority.HIGH, organizationId: "org-2", createdBy: "user-6", assignedTo: "user-8" },
  { id: "tkt-7", title: "Invoice mismatch with client", description: "Billing discrepancy on order #204.", status: TicketStatus.OPEN, priority: TicketPriority.LOW, organizationId: "org-2", createdBy: "user-7", assignedTo: null },
  { id: "tkt-8", title: "Staff shift scheduling conflict", description: "Two agents booked same shift.", status: TicketStatus.CLOSED, priority: TicketPriority.LOW, organizationId: "org-2", createdBy: "user-6", assignedTo: "user-8" },

  // org-3
  { id: "tkt-9", title: "Power output drop at Site B", description: "10% below expected output.", status: TicketStatus.OPEN, priority: TicketPriority.HIGH, organizationId: "org-3", createdBy: "user-10", assignedTo: "user-11" },
  { id: "tkt-10", title: "Turbine maintenance overdue", description: "Scheduled check missed last month.", status: TicketStatus.IN_PROGRESS, priority: TicketPriority.MEDIUM, organizationId: "org-3", createdBy: "user-9", assignedTo: "user-11" },
  { id: "tkt-11", title: "Sensor data gap detected", description: "Missing readings for 6 hours.", status: TicketStatus.OPEN, priority: TicketPriority.MEDIUM, organizationId: "org-3", createdBy: "user-10", assignedTo: null },
  { id: "tkt-12", title: "Grid sync alarm triggered", description: "False alarm, needs confirmation.", status: TicketStatus.RESOLVED, priority: TicketPriority.LOW, organizationId: "org-3", createdBy: "user-9", assignedTo: "user-11" },

  // org-4
  { id: "tkt-13", title: "Maintaience", description: "maintaience output.", status: TicketStatus.OPEN, priority: TicketPriority.HIGH, organizationId: "org-4", createdBy: "user-13", assignedTo: "user-15" },
  { id: "tkt-14", title: "Visit overdue", description: "Overdue missed last month.", status: TicketStatus.IN_PROGRESS, priority: TicketPriority.MEDIUM, organizationId: "org-4", createdBy: "user-14", assignedTo: "user-13" },
  { id: "tkt-15", title: "Fraud Detected", description: "Fraud readings detected.", status: TicketStatus.OPEN, priority: TicketPriority.MEDIUM, organizationId: "org-4", createdBy: "user-15", assignedTo: null },
  { id: "tkt-16", title: "Sync data", description: "False sync data.", status: TicketStatus.RESOLVED, priority: TicketPriority.LOW, organizationId: "org-4", createdBy: "user-16", assignedTo: "user-15" },

  // new tickets haru CRUD bhako yeha add del kk hunxa

];
