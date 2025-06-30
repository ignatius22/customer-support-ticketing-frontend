// src/types/ticket.ts
export const TicketStatus = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
} as const;

export type TicketStatus = typeof TicketStatus[keyof typeof TicketStatus];


export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Open',
  [TicketStatus.IN_PROGRESS]: 'In Progress',
  [TicketStatus.CLOSED]: 'Closed'
};

export const TicketStatusColors: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'bg-green-100 text-green-800',
  [TicketStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
  [TicketStatus.CLOSED]: 'bg-red-100 text-red-800'
};
