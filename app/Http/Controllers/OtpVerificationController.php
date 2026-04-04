<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);
        
        $user = $request->user();

        $response = $this->otpService->verifyOtp($user, $request->otp);

        if($response['status'] == false){
            return back()->with('error', $response['message']);
        }

        //  Success → mark verified
        $user->update([
            'mobile_verified_at' => Carbon::now(),
        ]);

        //  Redirect after success
        return redirect()->route('dashboard')->with('success', 'OTP verified successfully');
    }

    public function resendOtp(Request $request)
    {
        $user = $request->user();

        $this->otpService->generateOtp( $user, type: 'login', ttl: 300 );

        return back()->with('success', 'OTP Re-Sent successfully.');
    }

}