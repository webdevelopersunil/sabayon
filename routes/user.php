<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SahayogRequestController;
use App\Http\Middleware\EnsureHasPermission;
use App\Http\Middleware\EnsureHasRole;
use App\Http\Middleware\CheckAdminVerified;
use App\Http\Middleware\CheckVerified;
use App\Http\Controllers\user\DashboardController;

Route::middleware(['auth', 'verified', EnsureHasRole::class.':user', CheckVerified::class])->group(function () {


    Route::get('user/dashboard', [DashboardController::class, 'index'])
            ->name('user.dashboard')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');

    
    Route::middleware(CheckAdminVerified::class)->group( function (){

        Route::get('sahayog-request/create', [SahayogRequestController::class, 'create'])
            ->name('sahayog-request.create')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');
            
        Route::get('sahayog-request/edit/{request_number}', [SahayogRequestController::class, 'edit'])
            ->name('sahayog-request.edit')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');

        Route::post('sahayog-request/save-step', [SahayogRequestController::class, 'saveStep'])
            ->name('sahayog-request.saveStep')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.create');

        Route::get('sahayog-requests/history', [SahayogRequestController::class, 'history'])
            ->name('sahayog-requests.history')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.history');

        Route::post('sahayog-requests/search/find', [SahayogRequestController::class, 'find'])
            ->name('sahayog-requests.find')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.view');

        Route::get('sahayog-requests/{request_number}', [SahayogRequestController::class, 'show'])
            ->name('sahayog-requests.show')
            ->middleware(EnsureHasPermission::class.':user.sahayog_requests.view');
    });

});
