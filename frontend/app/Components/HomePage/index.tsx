import { UploadForm } from "../UploadForm";
import { useFilesContext } from "../../context/FilesContext";
import { FileCard } from "../FileCard";
import { useEffect } from "react";
import type { FilesByCategory } from "../../types/file";

export function HomePage() {
  const { files, fetchFiles } = useFilesContext();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">File Manager</h1>
        <p className="text-gray-600">Upload and manage your documents</p>
      </div>

      <div className="mb-8">
        <UploadForm />
      </div>
      {/* Ici on peut utiliser un map pour éviter de ce répéter au choix pour avoir quelquechose de plus clair */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Identity Files
          </h2>
          <div className="space-y-3">
            {files.Identity && files.Identity.length > 0 ? (
              files.Identity.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  name={file.original_name}
                  size={file.size}
                  status={file.status}
                  createdAt={file.created_at}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No files available</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Legal Files</h2>
          <div className="space-y-3">
            {files.Legal && files.Legal.length > 0 ? (
              files.Legal.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  name={file.original_name}
                  size={file.size}
                  status={file.status}
                  createdAt={file.created_at}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No files available</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Supporting Files
          </h2>
          <div className="space-y-3">
            {files.Supporting && files.Supporting.length > 0 ? (
              files.Supporting.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  name={file.original_name}
                  size={file.size}
                  status={file.status}
                  createdAt={file.created_at}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No files available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
