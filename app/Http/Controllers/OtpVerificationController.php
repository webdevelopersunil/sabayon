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

    public function showLoginOtpPage(Request $request, $token)
    {
        // Check if token matches session
        if ($request->session()->get('login_auth_token') !== $token || !$request->session()->has('login_auth_user_id')) {
            return redirect()->route('login')->with('error', 'Invalid or expired OTP session.');
        }

        $userId = $request->session()->get('login_auth_user_id');
        $user = \App\Models\User::find($userId);

        if (!$user) {
            return redirect()->route('login')->with('error', 'User not found.');
        }

        return Inertia::render('auth/login-otp', [
            'username' => $user->cpf_no ?? $user->email,
            'email' => $user->email,
            'token' => $token,
            'status' => session('success') ?? session('status'),
            'error' => session('error'),
        ]);
    }

    public function verifyLoginOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
            'token' => 'required|string',
        ]);

        if ($request->session()->get('login_auth_token') !== $request->token || !$request->session()->has('login_auth_user_id')) {
            return redirect()->route('login')->with('error', 'Invalid or expired OTP session.');
        }

        $userId = $request->session()->get('login_auth_user_id');
        $user = \App\Models\User::find($userId);

        if (!$user) {
            return redirect()->route('login')->with('error', 'User not found.');
        }

        $response = $this->otpService->verifyOtp($user, $request->otp);

        if($response['status'] == false){
            return back()->with('error', $response['message']);
        }

        // Success -> clear session
        $request->session()->forget(['login_auth_token', 'login_auth_user_id']);

        // Log the user in
        \Illuminate\Support\Facades\Auth::login($user);

        // Redirect after success
        return redirect()->intended(route('dashboard'))->with('success', 'Logged in successfully');
    }

    public function resendLoginOtp(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        if ($request->session()->get('login_auth_token') !== $request->token || !$request->session()->has('login_auth_user_id')) {
            return redirect()->route('login')->with('error', 'Invalid or expired OTP session.');
        }

        $userId = $request->session()->get('login_auth_user_id');
        $user = \App\Models\User::find($userId);

        if (!$user) {
            return redirect()->route('login')->with('error', 'User not found.');
        }

        $this->otpService->generateOtp($user, 'login', 300);

        return back()->with('success', 'OTP Re-Sent successfully.');
    }
}