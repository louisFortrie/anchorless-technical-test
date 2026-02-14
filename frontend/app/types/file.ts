export type FileStatus = 'uploaded' | 'approved' | 'disapproved' | 'in review';
export type FileCategory = 'Identity' | 'Legal' | 'Supporting';

export interface FileData {
  created_at: string;
  original_name: string;
  size: number;
  status: FileStatus;
  category: FileCategory;
  id:number;
}

export interface FilesByCategory {
    Identity?: FileData[];
    Legal?: FileData[];
    Supporting?: FileData[];
}

export interface FilesResponse {
  files: {
    Identity?: FileData[];
    Legal?: FileData[];
    Supporting?: FileData[];
  };
}
