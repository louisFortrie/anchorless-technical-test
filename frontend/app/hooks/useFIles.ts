import { useCallback, useState } from "react";
import type { FilesByCategory, FilesResponse } from "../types/file";

const EMPTY_FILES_RESPONSE: FilesByCategory = {
  Identity: [],
  Legal: [],
  Supporting: [],
};

export function useFiles() {
  const [files, setFiles] = useState<FilesByCategory>(EMPTY_FILES_RESPONSE);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/files");
      if (response.ok) {
        const data: FilesResponse = await response.json();
        setFiles(data.files || EMPTY_FILES_RESPONSE);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []);

  const postFile = useCallback(async (file: File, category: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const response = await fetch("http://localhost:8000/api/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await fetchFiles();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, [fetchFiles]);

  const deleteFile = useCallback(async (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this file?");
    if (!ok) return;

    try {
      const response = await fetch(`http://localhost:8000/api/files/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchFiles();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }, [fetchFiles]);

  return { files, fetchFiles, deleteFile, postFile };
}