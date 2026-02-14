<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Models\File;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Throwable;

class FileController extends Controller
{
    public function index(): JsonResponse
    {
        $filesByStatus = File::latest()
            ->select(['status', 'original_name', 'size', 'created_at'])
            ->get()
            ->groupBy(fn($file) => $file->status?->value ?? (string) $file->status)
            ->map(fn($files) => $files->map(fn($file) => [
                'created_at' => $file->created_at,
                'original_name' => $file->original_name,
                'size' => $file->size,
                'status' => $file->status,
            ])->values());

        return response()->json(['files' => $filesByStatus], 200);
    }

    public function store(StoreFileRequest $request): JsonResponse
    {
        $storedPath = null;

        try {
            $validated = $request->validated();

            $uploadedFile = $validated['file'];

            $storedPath = $uploadedFile->store('uploads');

            if ($storedPath === false) {
                return response()->json([
                    'message' => 'Unable to store uploaded file.',
                ], 500);
            }

            $record = File::create([
                'original_name' => $uploadedFile->getClientOriginalName(),
                'storage_name' => basename($storedPath),
                'storage_path' => $storedPath,
                'size' => $uploadedFile->getSize(),
                'mime_type' => $uploadedFile->getMimeType(),
                'status' => 'uploaded',
            ]);

            return response()->json([
                'message' => 'File uploaded successfully',
                'data' => $record,
            ], 201);
        } catch (Throwable $e) {
            if ($storedPath !== null && Storage::exists($storedPath)) {
                Storage::delete($storedPath);
            }

            report($e);

            return response()->json([
                'message' => 'Unexpected error while uploading file.',
            ], 500);
        }
    }

    public function delete(int $id): JsonResponse
    {
        try {
            $file = File::findOrFail($id);

            if (Storage::exists($file->storage_path)) {
                Storage::delete($file->storage_path);
            }

            $file->delete();

            return response()->json(['message' => 'File deleted'], 204);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'File not found.',
            ], 404);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Unexpected error while deleting file.',
            ], 500);
        }
    }
}
