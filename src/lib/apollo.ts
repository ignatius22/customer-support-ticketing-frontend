// src/graphql/client.ts
import {
  ApolloClient,
  InMemoryCache,
  from,
  type NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"; // ✅ for file uploads

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;

// ✅ createUploadLink supports file uploads
const uploadLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
}) as any;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function mergeTicketsByStatus() {
  return {
    keyArgs: ["status"],
    merge(_existing = { edges: [] }, incoming: any) {
      return incoming;
    },
  };
}

const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tickets: mergeTicketsByStatus(),
          allTickets: mergeTicketsByStatus(),
          myTickets: mergeTicketsByStatus(),
        },
      },
    },
  });

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([authLink, uploadLink]), // ✅ Correct link order
  cache: createCache(),
});
