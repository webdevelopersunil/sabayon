<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\EnsureHasPermission;
use App\Http\Middleware\EnsureHasRole;

Route::middleware(['auth', 'verified', EnsureHasRole::class.':admin'])->group(function () {
    Route::get('admin', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard')
        ->middleware(EnsureHasPermission::class.':admin.dashboard.view');

    Route::get('admin/verify-users', [AdminController::class, 'verifyUsers'])
        ->name('admin.verifyUsers')
        ->middleware(EnsureHasPermission::class.':admin.users.view');

    Route::get('admin/sahayog-requests', [AdminController::class, 'sahayogRequest'])
        ->name('admin.sahayogRequest')
        ->middleware(EnsureHasPermission::class.':admin.sahayog_requests.view');
});
