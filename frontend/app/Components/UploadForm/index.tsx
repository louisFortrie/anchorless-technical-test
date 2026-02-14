import { useState } from "react";
import { useFilesContext } from "../../context/FilesContext";
import { toast } from "sonner";
import type { FileCategory } from "~/types/file";

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<FileCategory>("Identity");
  const [isUploading, setIsUploading] = useState(false);
  const { postFile } = useFilesContext();

  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 4MB limit");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    await postFile(selectedFile, category);
    setSelectedFile(null);
    setIsUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Upload File</h2>

      <div className="mb-6">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select File
        </label>
        <input
          id="file"
          type="file"
          accept=".pdf,.png,.jpg"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
      </div>

      {selectedFile && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {selectedFile.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="mb-3 max-h-48 object-contain rounded"
            />
          )}
          <p className="text-sm font-semibold text-gray-900">
            {selectedFile.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Type: {selectedFile.type || "application/pdf"}
          </p>
          <p className="text-xs text-gray-500">
            Size: {formatFileSize(selectedFile.size)}
          </p>
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as FileCategory)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Identity">Identity</option>
          <option value="Legal">Legal</option>
          <option value="Supporting">Supporting</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!selectedFile || isUploading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uploading...
          </>
        ) : (
          "Upload File"
        )}
      </button>
    </form>
  );
}
