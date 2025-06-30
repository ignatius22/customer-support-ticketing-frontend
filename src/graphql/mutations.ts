
import { gql } from '@apollo/client';
import type {
  AuthPayload,
  CommentMutationPayload,
  TicketMutationPayload,
} from './types';

/* ---------------------------------- AUTH ---------------------------------- */

export interface LoginData {
  login: AuthPayload;
}

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      errors
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export interface RegisterData {
  signup: AuthPayload;
}

export const REGISTER_USER = gql`
  mutation Signup($email: String!, $password: String!, $name: String!, $role: String!) {
    signup(input: { email: $email, password: $password, name: $name, role: $role }) {
      token
      errors
    }
  }
`;

/* ---------------------------------- TICKETS ---------------------------------- */

export interface CreateTicketData {
  createTicket: TicketMutationPayload;
}

export const CREATE_TICKET = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      ticket {
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
      errors
    }
  }
`;

export interface UpdateTicketStatusData {
  updateTicketStatus: TicketMutationPayload;
}

export const UPDATE_TICKET_STATUS = gql`
  mutation UpdateTicketStatus($input: UpdateTicketStatusInput!) {
    updateTicketStatus(input: $input) {
      ticket {
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
      errors
    }
  }
`;

export interface ExportClosedTicketsData {
  exportClosedTickets: {
    downloadUrl: string;
    errors: string[];
    export: {
      id: string;
    };
  };
}

export const EXPORT_CLOSED_TICKETS = gql`
  mutation ExportClosedTickets($input: ExportClosedTicketsInput!) {
    exportClosedTickets(input: $input) {
      downloadUrl
      errors
      export {
        id
      }
    }
  }
`;

export interface AddAttachmentData {
  addAttachment: {
    ticket: {
      id: string;
      fileUrls: string[];
    };
    errors: string[];
  };
}

export const ADD_ATTACHMENT = gql`
  mutation AddAttachment($ticketId: ID!, $files: [Upload!]!) {
    addAttachment(input: {
      ticketId: $ticketId,
      files: $files
    }) {
      ticket {
        id
        fileUrls
      }
      errors
    }
  }
`;


/* --------------------------------- COMMENTS -------------------------------- */

export interface CreateCommentData {
  addComment: CommentMutationPayload;
}

export const CREATE_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        content
        createdAt
        user {
          id
          email
          name
          role
        }
      }
      errors
    }
  }
`;

/* ----------------------------- REMINDER SETTINGS ---------------------------- */

export interface UpdateReminderSettingsData {
  updateReminderSettings: {
    settings: {
      enabled: boolean;
      time: string;
    };
    errors: string[];
  };
}

export const UPDATE_REMINDER_SETTINGS = gql`
  mutation UpdateReminderSettings($input: UpdateReminderSettingsInput!) {
    updateReminderSettings(input: $input) {
      settings {
        enabled
        time
      }
      errors
    }
  }
`;
