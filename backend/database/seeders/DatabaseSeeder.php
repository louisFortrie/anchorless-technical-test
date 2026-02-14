<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\File;
use App\Enums\FileStatus;
use App\Enums\FileCategory;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        File::factory()->fixture('demo-1.pdf', 'application/pdf', FileStatus::IN_REVIEW, FileCategory::IDENTITY)->create();
        File::factory()->fixture('demo-2.png', 'image/png', FileStatus::UPLOADED, FileCategory::LEGAL)->create();
        File::factory()->fixture('demo-1.pdf', 'application/pdf', FileStatus::APPROVED, FileCategory::SUPPORTING)->create();
    }
}
