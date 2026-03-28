<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a file and return its stored path.
     */
    public function upload(UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): string
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::slug($originalName) . '_' . date('Ymd_His') . '.' . $extension;

        return $file->storeAs($directory, $fileName, $disk);
    }
}