import { useState } from 'react';
import { useFilesContext } from "../../context/FilesContext";

import type { FileCategory } from '~/types/file';


export function UploadForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [category, setCategory] = useState<FileCategory>('Identity');
    const [isUploading, setIsUploading] = useState(false);
    const { postFile } = useFilesContext();

    const MAX_FILE_SIZE = 4  * 1024 * 1024; // 4MB
    


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            console.log("max size", MAX_FILE_SIZE, "file size", file.size);
            if (file.size > MAX_FILE_SIZE) {
                alert("File size exceeds 4MB limit.");
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
        if (bytes < 1024) return bytes + ' b';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' Kb';
        return (bytes / (1024 * 1024)).toFixed(2) + ' Mb';
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded p-4">
            <h2 className="text-lg font-bold mb-4">Upload File</h2>
            
            <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                className="mb-4 w-full"
            />

            {selectedFile && (
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    {selectedFile.type.startsWith('image/') && (
                        <img
                            src={URL.createObjectURL(selectedFile)
                            }
                            alt="Preview"
                            className="mb-2 max-h-40 object-contain"
                        />
                    )}

                    <p className="text-sm font-semibold text-black">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">Type: {selectedFile.type || 'application/pdf'}</p>
                    <p className="text-sm text-gray-500">Taille: {formatFileSize(selectedFile.size)}</p>
                </div>
            )}

            <select name="category" id="category" className="mb-4 w-full" value={category} onChange={(e) => setCategory(e.target.value as FileCategory)}>
                <option value="Identity">Identity</option>
                <option value="Legal">Legal</option>
                <option value="Supporting">Supporting</option>
            </select>

            <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                {isUploading ? 'Upload en cours...' : 'Envoyer'}
                {isUploading && (
                   <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
   
  </span>
</div>
                )}
            </button>
        </form>
    );
}