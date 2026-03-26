<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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

    public function showOtpPage(Request $request){

        $user = $request->user();

        // Generate OTP
        $this->otpService->generateOtp($user);

        // TODO: send OTP via SMS / Email here
        // example: dispatch(new SendOtpJob($user, $otp->otp));

        return Inertia::render('user/dashboard/otp-verification', [
                    'success' => 'OTP sent successfully.',
                ]);
    }

}