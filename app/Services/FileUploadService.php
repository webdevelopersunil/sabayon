<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a file and return its stored path.
     */
    public function upload($request_number,UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): string
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::slug($originalName) . '_' . date('Ymd_His') . '.' . $extension;

        // Determine the employee type (active, retired, contractor), defaulting to 'other' if unauthenticated
        $user = auth()->user();
        $employeeType = $user && $user->employee_type ? Str::slug($user->employee_type) : 'other';
        
        // Get the current real-time month name (e.g., January)
        $month = date('F');

        // Construct the new directory structure: parent_folder/employee_type/month/
        $finalDirectory = trim($request_number, '/').'/'.trim($directory, '/') . '/' . $employeeType . '/' . $month;

        return $file->storeAs($finalDirectory, $fileName, $disk);
    }

    /**
     * Upload a file specifically for admin and return its stored path.
     */
    public function uploadForAdmin($request_number,UploadedFile $file, string $directory = 'sahayog-documents', string $disk = 'public'): string
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::slug($originalName) . '_' . date('Ymd_His') . '.' . $extension;

        // Get the current real-time month name (e.g., January)
        $month = date('F');
        $finalDirectory = trim($request_number, '/').'/'.trim($directory, '/') . '/admin/' . $month;

        return $file->storeAs($finalDirectory, $fileName, $disk);
    }
}