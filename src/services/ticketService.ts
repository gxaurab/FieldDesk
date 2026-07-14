import { type Ticket } from "../types/ticket";
import { tickets } from "../data/tickets";
import { delay } from "./delay";

export async function fetchTickets(organizationId: string): Promise<Ticket[]> {
  await delay();
  return tickets.filter((t) => t.organizationId === organizationId);
}

export async function fetchTicketById(id: string): Promise<Ticket | undefined> {
  await delay();
  return tickets.find((t) => t.id === id);
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  await delay();
  tickets.push(ticket);
  return ticket;
}

// -1 is Javascirpt's way of saying not found hai

export async function updateTicket(updated: Ticket): Promise<Ticket> {
    await delay();

    const index = tickets.findIndex(
        t => t.id === updated.id
    );

    if (index === -1) {
        throw new Error("Ticket not found.");
    }

    tickets[index] = updated;

    return updated;
}

export async function deleteTicket(id: string): Promise<void> {
  await delay();
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1){
    throw new Error(
      "Couldn't delete, system error"
    )
  }

  tickets.splice(index, 1);
}