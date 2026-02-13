<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\FileStatus;

class File extends Model
{
    /** @use HasFactory<\Database\Factories\FileFactory> */
    use HasFactory;
    protected $casts = [
        'status' => FileStatus::class
    ];

    protected $fillable = [
        'original_name',
        'storage_name',
        'size',
        'mime_type',
        'storage_path',
    ];
}
