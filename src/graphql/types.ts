// src/graphql/types.ts

/* ────────────── Helpers ────────────── */
export type Maybe<T> = T | null;
export type Upload = File;

/* ────────────── File Upload ────────────── */
export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  upload: Upload;
}

/* ────────────── User ────────────── */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

/* ────────────── Ticket ────────────── */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  customer: User;
  createdAt: string;
  updatedAt: string;
}

/* ────────────── Pagination ────────────── */
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface TicketEdge {
  node: Ticket;
  cursor: string;
}

export interface TicketConnection {
  edges: TicketEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

/* ────────────── Comment ────────────── */
export interface Comment {
  id: string;
  content: string;
  user: User;
  ticket: Ticket;
  createdAt: string;
  updatedAt: string;
}

/* ────────────── Auth ────────────── */
export interface AuthPayload {
  token: string;
  user: User;
  errors: string[];
}

/* ────────────── Mutation Payloads ────────────── */
export interface TicketMutationPayload {
  ticket: Ticket;
  errors: string[];
}

export interface CommentMutationPayload {
  comment: Comment;
  errors: string[];
}

/* ────────────── Input Types ────────────── */
// Auth
export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginMutationVariables {
  input: LoginInput;
}

// Register
export interface RegisterInput {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterMutationVariables {
  input: RegisterInput;
}

// Ticket
export interface CreateTicketInput {
  title: string;
  description: string;
}

export interface CreateTicketMutationVariables {
  input: CreateTicketInput;
}

export interface TicketsQueryVariables {
  first?: Maybe<number>;
  after?: Maybe<string>;
  status?: Maybe<string>;
}

// Comment
export interface AddCommentInput {
  ticketId: string;
  content: string;
}

export interface CreateCommentMutationVariables {
  input: AddCommentInput;
}
