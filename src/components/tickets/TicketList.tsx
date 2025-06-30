/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTickets } from "../../graphql/hooks";
import TicketItem from "./TicketItem";
import PaginationControls from "../common/PaginationControls";
import { useState } from "react";
import ExportButton from "./ExportButton";
import { useAuth } from "../../contexts/AuthContext";
import {
  RiTicketLine,
  RiInboxArchiveLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiListUnordered,
} from "react-icons/ri";
import TicketSkeleton from "./TicketSkeleton";
import EmptyTicketState from "./EmptyTicketState";

const TicketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const { user } = useAuth();

  const perPage = 10;

  const { loading, error, data, fetchMore, refetch } = useTickets({
    variables: {
      first: perPage,
      after: null,
      status,
    },
  });

  const handlePageChange = (newPage: number) => {
    // Don't proceed if trying to go back past page 1
    if (newPage < 1) return;

    // Don't proceed if trying to go forward when there's no next page
    if (newPage > currentPage && !hasNextPage) return;
    const edges =
      user?.role === "agent"
        ? data?.allTickets?.edges || data?.tickets?.edges
        : data?.myTickets?.edges;
    const after = edges?.[perPage * (newPage - 1) - 1]?.cursor;
    fetchMore({
      variables: {
        after,
        first: perPage,
        status,
      },
    }).then(() => setCurrentPage(newPage));
  };

  const handleStatusFilter = async (newStatus: string | null) => {
    setStatus(newStatus);
    setCurrentPage(1);
    await refetch({
      first: perPage,
      after: null,
      status: newStatus,
    });
  };

  if (loading) return <TicketSkeleton />;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const tickets =
    user?.role === "agent"
      ? (data?.allTickets?.edges || data?.tickets?.edges || []).map(
          (edge: any) => edge.node
        )
      : (data?.myTickets?.edges || []).map((edge: any) => edge.node);

  const hasNextPage =
    user?.role === "agent"
      ? data?.allTickets?.pageInfo?.hasNextPage ||
        data?.tickets?.pageInfo?.hasNextPage
      : data?.myTickets?.pageInfo?.hasNextPage;

  const isCustomer = user?.role === "customer";

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <RiTicketLine className="text-blue-500" />
            Tickets ({tickets.length})
          </h1>
          {user?.role === "agent" && <ExportButton />}
        </div>
        {user?.role === "agent" && (
          <div className="space-x-2">
            <button
              onClick={() => handleStatusFilter(null)}
              className={`px-3 py-1 rounded ${
                !status ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <RiListUnordered className="inline-block mr-1" />
              All
            </button>
            <button
              onClick={() => handleStatusFilter("open")}
              className={`px-3 py-1 rounded ${
                status === "open" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <RiInboxArchiveLine className="inline-block mr-1" />
              Open
            </button>
            <button
              onClick={() => handleStatusFilter("in_progress")}
              className={`px-3 py-1 rounded ${
                status === "in_progress"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <RiTimeLine className="inline-block mr-1" />
              In Progress
            </button>
            <button
              onClick={() => handleStatusFilter("closed")}
              className={`px-3 py-1 rounded ${
                status === "closed" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <RiCheckboxCircleLine className="inline-block mr-1" />
              Closed
            </button>
          </div>
        )}
      </div>
      {tickets.length === 0 ? (
        <EmptyTicketState isCustomer={isCustomer} />
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket: any) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              isAgent={user?.role === "agent"}
            />
          ))}
        </div>
      )}
      {tickets && tickets.length < 1 ? null : (
        <PaginationControls
          currentPage={currentPage}
          hasNextPage={hasNextPage ?? false}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TicketList;
