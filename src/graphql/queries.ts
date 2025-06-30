import { gql } from '@apollo/client';
import type { Maybe, TicketConnection, User } from './types';

/* ──────── Ticket Types ──────── */
export interface GetTicketsData {
  tickets?: TicketConnection;
  myTickets?: TicketConnection;
  allTickets?: TicketConnection;
}
export interface GetMyTicketsData {
  myTickets: TicketConnection;
}
export interface GetAllTicketsData {
  allTickets: TicketConnection;
}
export interface GetTicketsVars {
  first?: Maybe<number>;
  after?: Maybe<string>;
  status?: Maybe<string>;
  customerId?: Maybe<string>;
}

/* ──────── User Types ──────── */
export interface GetCurrentUserData {
  me: User;
}

/* ──────── Comment Types ──────── */
export interface GetCommentsData {
  comments: Comment[];
}
export interface GetCommentsVars {
  ticketId: string;
}

/* ──────── Reminder Settings ──────── */
export interface GetReminderSettingsData {
  reminderSettings: {
    enabled: boolean;
    time: string;
  };
}

/* ──────── Fragments ──────── */
const TICKET_FIELDS = gql`
  fragment TicketFields on Ticket {
    id
    title
    description
    status
    customer {
      id
      email
      name
      role
    }
  }
`;

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    email
    name
    role
  }
`;

/* ──────── Ticket Queries ──────── */
export const GET_MY_TICKETS = gql`
  ${TICKET_FIELDS}
  query GetMyTickets($first: Int!, $after: String) {
    myTickets(first: $first, after: $after) {
      edges {
        node {
          ...TicketFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_TICKETS = gql`
  ${TICKET_FIELDS}
  query GetAllTickets($first: Int!, $after: String) {
    allTickets(first: $first, after: $after) {
      edges {
        node {
          ...TicketFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_TICKETS = gql`
  ${TICKET_FIELDS}
  query GetTickets($first: Int!, $after: String, $status: String, $customerId: ID) {
    tickets(first: $first, after: $after, status: $status, customerId: $customerId) {
      edges {
        node {
          ...TicketFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/* ──────── Comment Query ──────── */
export const GET_COMMENTS = gql`
  ${USER_FIELDS}
  query GetComments($ticketId: ID!) {
    comments(ticketId: $ticketId) {
      id
      content
      createdAt
      user {
        ...UserFields
      }
    }
  }
`;

/* ──────── Reminder Settings ──────── */
export const GET_REMINDER_SETTINGS = gql`
  query GetReminderSettings {
    reminderSettings {
      enabled
      time
    }
  }
`;

/* ──────── Current User ──────── */
export const GET_ME = gql`
  ${USER_FIELDS}
  query GetMe {
    me {
      ...UserFields
    }
  }
`;
