<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SahayogRequestController;
use App\Http\Middleware\EnsureHasPermission;
use App\Http\Middleware\EnsureHasRole;
use App\Http\Controllers\user\DashboardController;

Route::middleware(['auth', 'verified', EnsureHasRole::class.':user'])->group(function () {


    Route::get('user/dashboard', [DashboardController::class, 'index'])
        ->name('user.dashboard')
        ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');


    Route::get('sahayog-request/create', [SahayogRequestController::class, 'create'])
        ->name('sahayog-request.create')
        ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');

    Route::post('sahayog-request/save-step', [SahayogRequestController::class, 'saveStep'])
        ->name('sahayog-request.saveStep')
        ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');

    Route::get('sahayog-requests/history', [SahayogRequestController::class, 'history'])
        ->name('sahayog-requests.history')
        ->middleware(EnsureHasPermission::class.':user.sahayog_requests.history');

    Route::get('sahayog-requests/{id}', [SahayogRequestController::class, 'show'])
        ->name('sahayog-requests.show')
        ->middleware(EnsureHasPermission::class.':user.sahayog_requests.view');
});
