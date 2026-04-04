<?php

use App\Http\Controllers\OtpVerificationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
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

// There will be route for show login otp page START
    Route::get('login-otp/{token}', [OtpVerificationController::class, 'showLoginOtpPage'])->name('login.otp');
    Route::post('login-otp-verify', [OtpVerificationController::class, 'verifyLoginOtp'])->name('login.otp.verify');
    Route::post('login-otp-resend', [OtpVerificationController::class, 'resendLoginOtp'])->name('login.otp.resend');
// There will be route for show login otp page END

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('otp-verification', [OtpVerificationController::class, 'showOtpPage'])->name('otp.verification');
    Route::post('verify-otp', [OtpVerificationController::class, 'verifyOtp'])->name('verify.otp');
    Route::post('resend-otp', [OtpVerificationController::class, 'resendOtp'])->name('resend.otp');


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
