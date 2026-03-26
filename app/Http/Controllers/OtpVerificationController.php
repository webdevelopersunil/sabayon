<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OtpVerificationController extends Controller
{
    protected OtpService $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    /**
     * Resend the OTP.
     */
    public function resend(Request $request)
    {
        $this->otpService->resendOtp($request->user());

        return back()->with('status', 'A new OTP has been sent.');
    }

    public function CodeForRetiredUser(){

        return Inertia::render('user/dashboard/otp-verification', [
                    'success' => 'OTP sent successfully.',
                ]);
    }
}