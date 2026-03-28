<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\EnsureHasPermission;
use App\Http\Middleware\EnsureHasRole;


Route::get('admin/login', [AuthController::class, 'loginView'])->name('admin.login.view');
Route::post('admin/login', [AuthController::class, 'login'])->name('admin.login');
Route::post('admin/logout', [AuthController::class, 'logout'])->name('admin.logout');
Route::get('admin/logout', [AuthController::class, 'logout']); // Allows normal links to log out successfully


Route::middleware(['auth:admin'])->group(function () {

    Route::get('admin', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard');

    Route::get('admin/dashboard', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard-page');

    Route::get('admin/verify-users', [AdminController::class, 'verifyUsers'])
        ->name('admin.verifyUsers');

    Route::get('admin/sahayog-requests', [AdminController::class, 'sahayogRequest'])
        ->name('admin.sahayogRequest');

    Route::post('admin/sahayog-requests/search/find', [AdminController::class, 'find'])
        ->name('admin.find');

    Route::get('admin/sahayog-requests/{request_number}', [AdminController::class, 'show'])
        ->name('admin.show');

    // Route for Request Update Status
    Route::post('admin/sahayog-requests/{request_number}/update-status', [AdminController::class, 'updateRequestStatus'])
        ->name('admin.update.status');

    

    Route::post('/admin/users/{id}/reject', [AdminController::class, 'rejectUser']);
    Route::post('/admin/users/{id}/approve', [AdminController::class, 'approveUser']);


});

Route::middleware(['auth', 'verified', EnsureHasRole::class.':super-admin'])->group(function () {
    Route::get('s-admin/dashboard', function () {
        return Inertia::render('admin/dashboard/index');
    })->name('superadmin.dashboard');
});
