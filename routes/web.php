<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('sahayog-request/create', [\App\Http\Controllers\SahayogRequestController::class, 'create'])->name('sahayog-request.create');
    Route::get('sahayog-requests/history', [\App\Http\Controllers\SahayogRequestController::class, 'history'])->name('sahayog-requests.history');
});

require __DIR__.'/settings.php';
