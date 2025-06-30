/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import {
  RiTicketLine,
  RiFileTextLine,
  RiAttachmentLine,
  RiLoader4Line,
  RiSendPlaneLine,
  RiCloseLine,
  RiAlertLine,
} from "react-icons/ri";
import { useCreateTicket } from "../../graphql/hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  ADD_ATTACHMENT,
  type AddAttachmentData,
} from "../../graphql/mutations";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-empty-pattern
  const [] = useMutation<AddAttachmentData>(ADD_ATTACHMENT, {
    onCompleted: () => {
      navigate("/");
    },
    onError: (error) => {
      setError(error.message);
      setIsUploading(false);
    },
  });

  const [createTicket, { loading }] = useCreateTicket({
    onCompleted: async (data) => {
      if (selectedFiles && selectedFiles.length > 0) {
        setIsUploading(true);
        try {
          // Create form data for the multipart request
          const formData = new FormData();

          // Add the operations
          const operations = {
            query: `
              mutation AddAttachment($ticketId: ID!, $files: [Upload!]!) {
                addAttachment(input: { ticketId: $ticketId, files: $files }) {
                  ticket { id title fileUrls }
                  errors
                }
              }
            `,
            variables: {
              ticketId: data.createTicket.ticket.id,
              files: Array.from(selectedFiles).map(() => null),
            },
          };
          formData.append("operations", JSON.stringify(operations));

          // Create the map
          const map: { [key: number]: string[] } = {};

          Array.from(selectedFiles).forEach((_, i) => {
            map[i] = [`variables.files.${i}`];
          });
          formData.append("map", JSON.stringify(map));

          // Add the files
          Array.from(selectedFiles).forEach((file, i) => {
            formData.append(i.toString(), file);
          });

          // Send the multipart request
          const response = await fetch("https://customersupportticketapi-production.up.railway.app/graphql", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
          });

          const result = await response.json();
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
        } catch (err) {
          console.error("File upload error:", err);
          // Still navigate even if file upload fails
          navigate("/");
        }
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
    refetchQueries: ["GetTickets"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      await createTicket({
        variables: {
          input: {
            title: title.trim(),
            description: description.trim(),
          },
        },
      });
    } catch (err) {
      // Error handled by onError callback
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <RiTicketLine className="text-blue-500" />
          Create New Support Ticket
        </h2>

        {error && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 flex items-center gap-2"
            role="alert"
          >
            <RiAlertLine className="flex-shrink-0 text-red-500" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <RiFileTextLine className="text-gray-400" />
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <RiFileTextLine className="text-gray-400" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Detailed description of your issue"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <RiAttachmentLine className="text-gray-400" />
              Attachments
            </label>
            <div className="flex items-center space-x-2">
              <label
                className="relative cursor-pointer inline-flex items-center justify-center gap-2
                hover:bg-gray-100 w-auto h-8 rounded px-3 transition-all duration-200 text-gray-700 hover:text-gray-900
                border border-gray-300 hover:border-gray-400 bg-white"
              >
                <RiAttachmentLine className="text-gray-500" />
                <span className="text-sm">Add Files</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </label>
              <span className="text-sm text-gray-500">
                Supported: Images, PDF, DOC, DOCX, TXT
              </span>
            </div>
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected files:{" "}
                {Array.from(selectedFiles)
                  .map((file) => file.name)
                  .join(", ")}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                inline-flex items-center transition-colors duration-200"
            >
              <RiCloseLine className="-ml-1 mr-1 h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                inline-flex items-center transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {loading || isUploading ? (
                <>
                  <RiLoader4Line className="-ml-1 mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <RiSendPlaneLine className="-ml-1 mr-2 h-4 w-4" />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
