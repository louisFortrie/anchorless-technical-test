import { UploadForm } from "../UploadForm";
import { useFilesContext } from "../../context/FilesContext";
import { FileCard } from "../FileCard";
import { useEffect } from "react";


export function HomePage() {
  const { files, fetchFiles } = useFilesContext();
      
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);
 

  return (
    <main className="p-6">
  <UploadForm/>
  
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
      <h2 className="text-xl font-bold mb-4">Identity Files</h2>
      {files.Identity && files.Identity.length > 0 ? (
      files.Identity.map((file) => (
       <FileCard
          key={file.id}
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
          id={file.id}
            key={file.id}
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

            id={file.id}
            key={file.id}
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
