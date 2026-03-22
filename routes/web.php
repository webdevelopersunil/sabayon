<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::guard('admin')->check()) {
        return redirect()->route('admin.dashboard');
    }
    if (Auth::guard('web')->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');



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
