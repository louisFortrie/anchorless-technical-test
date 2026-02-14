import { useState } from 'react';
import type { FileCategory } from '~/types/file';

interface UploadFormProps {
    onFileSubmit?: (file: File) => void;
}

export function UploadForm({ onFileSubmit }: Readonly<UploadFormProps>) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [category, setCategory] = useState<FileCategory>('Identity');
    const [isUploading, setIsUploading] = useState(false);

    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (file.size > MAX_FILE_SIZE) {
                alert("File size exceeds 5MB limit.");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            // Envoi au backend
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('category', category);

            const response = await fetch('http://localhost:8000/api/files', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                onFileSubmit?.(selectedFile);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
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
                    {selectedFile.type.startsWith('image/') ? (
                        <img
                            src={URL.createObjectURL(selectedFile)
                            }
                            alt="Preview"
                            className="mb-2 max-h-40 object-contain"
                        />
                    ) : (
                        <div className="mb-2 p-3 bg-gray-200 rounded text-center">PDF Preview</div>
                    )}

                    <p className="text-sm font-semibold text-black">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">Type: {selectedFile.type || 'application/pdf'}</p>
                    <p className="text-sm text-gray-500">Taille: {formatFileSize(selectedFile.size)}</p>
                </div>
            )}

            <select name="category" id="category" className="mb-4 w-full">
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
            </button>
        </form>
    );
}