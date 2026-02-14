import { UploadForm } from "../UploadForm";
import { useEffect, useState } from "react";
import type { FileData, FilesByCategory, FilesResponse } from "../../types/file";
import { FileCard } from "../FileCard";


export function HomePage() {
  const EMPTY_FILES_RESPONSE: FilesByCategory = {
      Identity: [],
      Legal: [],
      Supporting: [],
  };
  const [files, setFiles] = useState<FilesByCategory>(EMPTY_FILES_RESPONSE);
      
  
  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/files');
      if (response.ok) {
        const data: FilesResponse = await response.json();
         setFiles(data.files || EMPTY_FILES_RESPONSE);
        console.log( data.files)
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <main className="p-6">
  <UploadForm onFileSubmit={fetchFiles} />
  
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
      <h2 className="text-xl font-bold mb-4">Identity Files</h2>
      {files.Identity && files.Identity.length > 0 ? (
      files.Identity.map((file) => (
       <FileCard
          onFileDeleted={fetchFiles}
          key={file.created_at}
          name={file.original_name}
          size={file.size}
          status={file.status}
          createdAt={file.created_at}
          id={file.id}
        />
      ))
    ) : (
      <p>No files available</p>
    )}
    </div>
    <div>
      <h2 className="text-xl font-bold mb-4">Legal Files</h2>
      {files.Legal && files.Legal.length > 0 ? (
        files.Legal.map((file) => (
          <FileCard
            onFileDeleted={fetchFiles}
          id={file.id}
            key={file.created_at}
            name={file.original_name}
            size={file.size}
            status={file.status}
            createdAt={file.created_at}
          />
        ))
      ) : (
        <p>No files available</p>
      )}
    </div>
    <div>
      <h2 className="text-xl font-bold mb-4">Disapproved Files</h2>
      {files.Supporting && files.Supporting.length > 0 ? (
        files.Supporting.map((file) => (
          <FileCard

            onFileDeleted={fetchFiles}
            id={file.id}
            key={file.created_at}
            name={file.original_name}
            size={file.size}
            status={file.status}
            createdAt={file.created_at}
          />
        ))
      ) : (
        <p>No files available</p>
      )}
    </div>
    
  </div>
</main>
  );
}
