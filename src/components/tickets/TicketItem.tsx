import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  RiTicketLine,
  RiMailLine,
  RiTimeLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import CommentList from "../comments/CommentList";
import { UPDATE_TICKET_STATUS } from "../../graphql/mutations";
import {
  TicketStatus,
  TicketStatusLabels,
  TicketStatusColors,
} from "../../types/ticket";
import FileUpload from "./FileUpload";
import AttachmentList from "./AttachmentList";

interface TicketItemProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    created_at: string;
    fileUrls: string[];
    customer: {
      id: string;
      email: string;
      role: string;
    };
  };
  isAgent: boolean;
}

const TicketItem = ({ ticket, isAgent }: TicketItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateStatus] = useMutation(UPDATE_TICKET_STATUS, {
    refetchQueries: ["GetTickets"],
    onCompleted: () => {
      // Status update completed, but we don't need to do anything
      // The refetchQueries will update the UI while maintaining local state
    },
  });

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({
        variables: {
          input: {
            ticketId: ticket.id,
            status: newStatus,
          },
        },
      });
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const statusColor =
    TicketStatusColors[ticket.status] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-gray-300 transition-colors duration-200 group">
      <div className="w-full rounded-lg transition-colors duration-200">
        <div className="flex justify-between items-start">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center flex-1 focus:outline-none hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="mr-2">
                <RiArrowRightSLine
                  className={`w-5 h-5 transform transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
                  <RiTicketLine className="flex-shrink-0" />
                  {ticket.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <RiMailLine className="flex-shrink-0" />
                  {ticket.customer.email}
                </p>
              </div>
            </div>
          </button>
          <div
            className="flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`px-2 py-1 rounded-full text-sm ${statusColor}`}>
              {TicketStatusLabels[ticket.status]}
            </span>
            {isAgent && (
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="ml-2 border rounded-md px-2 py-1 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-200"
              >
                <option value={TicketStatus.OPEN}>
                  {TicketStatusLabels[TicketStatus.OPEN]}
                </option>
                <option value={TicketStatus.IN_PROGRESS}>
                  {TicketStatusLabels[TicketStatus.IN_PROGRESS]}
                </option>
                <option value={TicketStatus.CLOSED}>
                  {TicketStatusLabels[TicketStatus.CLOSED]}
                </option>
              </select>
            )}
          </div>
        </div>
      </div>
      <div
        className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 mt-2 leading-relaxed">
          {ticket.description}
        </p>
        <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
          <RiTimeLine className="flex-shrink-0" />
          Created: {new Date(ticket.created_at).toLocaleDateString()}
        </div>
        <div className="mt-4 border-t pt-4">
          {!isAgent && (
            <FileUpload
              ticketId={ticket.id}
              onUploadComplete={() => setIsExpanded(true)}
            />
          )}
          <AttachmentList fileUrls={ticket.fileUrls} />
          <CommentList ticketId={ticket.id} />
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
