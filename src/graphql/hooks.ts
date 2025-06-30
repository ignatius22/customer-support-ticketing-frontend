import {
  useQuery,
  useMutation,
  type QueryHookOptions,
  type MutationHookOptions,
} from "@apollo/client";
import { useAuth } from '../contexts/AuthContext';
import {
  GET_MY_TICKETS,
  GET_ALL_TICKETS,
  GET_TICKETS,
  GET_ME,
  type GetTicketsData,
  type GetTicketsVars,
  type GetCurrentUserData,
  type GetCommentsVars,
  type GetCommentsData,
  GET_COMMENTS,
} from "./queries";
import {
  CREATE_TICKET,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_TICKET_STATUS,
  EXPORT_CLOSED_TICKETS,
  type LoginData,
  type RegisterData,
  type CreateTicketData,
  type UpdateTicketStatusData,
  type CreateCommentData,
  type ExportClosedTicketsData,
  CREATE_COMMENT,
} from "./mutations";
import type {
  CreateCommentMutationVariables,
  CreateTicketMutationVariables,
  LoginMutationVariables,
  RegisterMutationVariables,
} from "./types";

export const useTickets = (
  options?: QueryHookOptions<GetTicketsData, GetTicketsVars>
) => {
  const { user } = useAuth();
  const query = user?.role === 'agent' 
    ? (options?.variables?.status ? GET_TICKETS : GET_ALL_TICKETS)
    : GET_MY_TICKETS;
  return useQuery<GetTicketsData, GetTicketsVars>(query, options);
};

export const useCurrentUser = (
  options?: QueryHookOptions<GetCurrentUserData>
) => {
  return useQuery<GetCurrentUserData>(GET_ME, options);
};

export const useLogin = (
  options?: MutationHookOptions<LoginData, LoginMutationVariables>
) => {
  return useMutation<LoginData, LoginMutationVariables>(LOGIN_USER, options);
};

export const useRegister = (
  options?: MutationHookOptions<RegisterData, RegisterMutationVariables>
) => {
  return useMutation<RegisterData, RegisterMutationVariables>(
    REGISTER_USER,
    options
  );
};

export const useCreateTicket = (
  options?: MutationHookOptions<
    CreateTicketData,
    CreateTicketMutationVariables
  >
) => {
  return useMutation<CreateTicketData, CreateTicketMutationVariables>(
    CREATE_TICKET,
    options
  );
};

export const useComments = (
  options?: QueryHookOptions<GetCommentsData, GetCommentsVars>
) => {
  return useQuery<GetCommentsData, GetCommentsVars>(GET_COMMENTS, options);
};

export const useCreateComment = (
  options?: MutationHookOptions<
    CreateCommentData,
    CreateCommentMutationVariables
  >
) => {
  return useMutation<CreateCommentData, CreateCommentMutationVariables>(
    CREATE_COMMENT,
    options
  );
};

export const useExportClosedTickets = (
  options?: MutationHookOptions<ExportClosedTicketsData, Record<string, never>>
) => {
  return useMutation<ExportClosedTicketsData, Record<string, never>>(
    EXPORT_CLOSED_TICKETS,
    options
  );
};

export const useUpdateTicketStatus = (
  options?: MutationHookOptions<UpdateTicketStatusData, { id: string; status: string }>
) => {
  return useMutation<UpdateTicketStatusData, { id: string; status: string }>(
    UPDATE_TICKET_STATUS,
    options
  );
};

