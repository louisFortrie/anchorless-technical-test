<?php

namespace Database\Factories;

use App\Enums\FileStatus;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $storageName = Str::uuid() . '-placeholder.txt';
        return [
            'original_name' => 'placeholder.txt',
            'storage_name' => $storageName,
            'storage_path' => 'uploads/' . $storageName,
            'size' => 0,
            'mime_type' => 'text/plain',
            'status' => 'uploaded',
        ];
    }

    public function fixture(string $filename, string $mimeType, FileStatus $status): static
    {
        return $this->state(function () use ($filename, $mimeType, $status) {
            $sourcePath = database_path('fixtures/' . $filename);
            $storageName = Str::uuid() . '-' . $filename;
            $storagePath = 'uploads/' . $storageName;

            if (is_file($sourcePath)) {
                Storage::disk('local')->put($storagePath, file_get_contents($sourcePath));
                $size = filesize($sourcePath) ?: 0;
            } else {
                $size = 0;
            }

            return [
                'original_name' => $filename,
                'storage_name' => $storageName,
                'storage_path' => $storagePath,
                'size' => $size,
                'mime_type' => $mimeType,
                'status' => $status,
            ];
        });
    }
}
