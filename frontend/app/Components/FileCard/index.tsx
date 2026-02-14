interface FileCardProps {
    name: string;
    size: number;
    status: string;
    createdAt: string;
    id: number;
    onFileDeleted: () => void;
}

export function FileCard({ name, size, status, createdAt, id, onFileDeleted }: Readonly<FileCardProps>) {
    const handleDelete = async () => {
        console.log("Deleting file:", name);
        alert(`Are you sure you want to delete ${name}?`);
        await fetch(`http://localhost:8000/api/files/${id}`, {
            method: 'DELETE',
        });
        onFileDeleted();
    };

  return (
    <div className="p-4 border">
      <h3 className="font-bold">{name}</h3>
    <p>{size > 1024 * 1024 ? (size / (1024 * 1024)).toFixed(2) + ' MB' : (size / 1024).toFixed(2) + ' KB'}</p>
      <p>Status: {status}</p>
      <p>Uploaded: {new Date(createdAt).toLocaleString()}</p>
      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleDelete}>Delete</button>
    </div>
  );
}