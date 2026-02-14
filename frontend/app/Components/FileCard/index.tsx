import React from "react";
import { useFilesContext } from "../../context/FilesContext";
import { ConfirmModal } from "~/ConfirmModal";

interface FileCardProps {
  name: string;
  size: number;
  status: string;
  createdAt: string;
  id: number;
}

export function FileCard({
  name,
  size,
  status,
  createdAt,
  id,
}: Readonly<FileCardProps>) {
  const { deleteFile } = useFilesContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      uploaded: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      disapproved: "bg-red-100 text-red-800",
      "in review": "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <ConfirmModal
        onOpenChange={(open) => setIsOpen(open)}
        open={isOpen}
        onConfirm={() => {
          deleteFile(id);
          setIsOpen(false);
        }}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
      />

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-900 truncate flex-1">
            {name}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(status)}`}
          >
            {status}
          </span>
        </div>

        <div className="text-xs text-gray-600 space-y-1 mb-4">
          <p>Size: {formatFileSize(size)}</p>
          <p>Uploaded: {new Date(createdAt).toLocaleString()}</p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-3 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </>
  );
}
