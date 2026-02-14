import { createContext, useContext, useEffect } from "react";
import { useFiles } from "../hooks/useFiles";
import type { FilesByCategory } from "../types/file";

type FilesContextValue = {
  files: FilesByCategory;
  fetchFiles: () => Promise<void>;
  postFile: (file: File, category: string) => Promise<void>;
  deleteFile: (id: number) => Promise<void>;
};

const FilesContext = createContext<FilesContextValue | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const { files, fetchFiles, postFile, deleteFile } = useFiles();

  

  return (
    <FilesContext.Provider value={{ files, fetchFiles, postFile, deleteFile }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFilesContext() {
  const ctx = useContext(FilesContext);
  if (!ctx) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return ctx;
}