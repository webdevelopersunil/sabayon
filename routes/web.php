<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        if ($user && method_exists($user, 'hasRole')) {
            if ($user->hasRole('super-admin')) {
                return redirect('/s-admin/dashboard');
            }

            if ($user->hasRole('admin')) {
                return redirect('/admin/dashboard');
            }
        }

        return redirect('/user/dashboard');
    })->name('dashboard');
});

require __DIR__.'/user.php';
require __DIR__.'/admin.php';

require __DIR__.'/settings.php';
