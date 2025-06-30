import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { RiAttachmentLine, RiLoader4Line, RiCloseLine } from "react-icons/ri"; // Ensure RiCloseLine is imported

import { Tooltip } from "../common/Tooltip";
import { useAuth } from "../../contexts/AuthContext";
import {
  ADD_ATTACHMENT,
  type AddAttachmentData,
} from "../../graphql/mutations";

interface FileUploadProps {
  ticketId: string;
  onUploadComplete?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  ticketId,
  onUploadComplete,
}) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [addAttachment] = useMutation<AddAttachmentData>(ADD_ATTACHMENT, {
    onCompleted: (data) => {
      setUploading(false);

      const errors = data.addAttachment.errors;
      if (errors?.length) {
        setError(errors.join(", "));
        return;
      }

      // Ensure we only add *new* URLs to avoid duplicates if the same file is uploaded again
      const newUrls = data.addAttachment.ticket?.fileUrls ?? [];
      setUploadedFiles((prev) => {
        const currentUrls = new Set(prev);
        const uniqueNewUrls = newUrls.filter((url) => !currentUrls.has(url));
        return [...prev, ...uniqueNewUrls];
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
      onUploadComplete?.();
    },
    onError: (err) => {
      setUploading(false);
      setError(err.message);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError(null);

    try {
      await addAttachment({
        variables: {
          ticketId,
          files: Array.from(files),
        },
      });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleRemoveFile = (urlToRemove: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((url) => url !== urlToRemove)
    );
  };

  // Only allow customers to upload
  if (user?.role !== "customer") return null;

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center gap-2">
        <Tooltip
          content="Add Attachments (Images, PDF, DOC, DOCX, TXT)"
          side="right"
        >
          <label
            className={`relative inline-flex items-center justify-center w-8 h-8 rounded transition-all duration-200
              ${
                uploading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
          >
            {uploading ? (
              <RiLoader4Line className="w-5 h-5 animate-spin text-gray-400" />
            ) : (
              <RiAttachmentLine className="w-5 h-5 text-gray-600" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />
          </label>
        </Tooltip>
        <span className="text-sm text-gray-500">Add attachments</span>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {uploadedFiles.map((url, index) => {
            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
            return (
              <div
                key={url}
                className="relative w-24 h-24 border rounded overflow-hidden group"
              >
                {isImage ? (
                  <img
                    src={url}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full text-xs text-blue-600 underline p-1 text-center break-words"
                    title={url.split("/").pop()}
                  >
                    {url.split("/").pop()}
                  </a>
                )}
                <button
                  onClick={() => handleRemoveFile(url)}
                  className="absolute top-0 right-0  text-white rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove attachment"
                >
                  {/* Replaced generic icon with RiCloseLine */}
                  <RiCloseLine className=" text-red-400" size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
