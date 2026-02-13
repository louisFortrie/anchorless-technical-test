<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\File;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        File::factory()->fixture('demo-1.pdf', 'application/pdf')->create();
        File::factory()->fixture('demo-2.png', 'image/png')->create();
    }
}
