<?php

namespace App\Services;

use App\Mail\SendOtpMail;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\VerificationOtp;
use Illuminate\Http\Request;
use Carbon\Carbon;


class OtpService
{

    /**
     * Generate a random 6-digit OTP.
     *
     * @return string
     */
    public function generateOtp($user, string $type = 'login', int $ttl = 300): VerificationOtp
    {
        // Step 1: Check existing valid OTP first
        $existing = VerificationOtp::where('user_id', $user->id)
            ->where('type', $type)
            ->where('is_used', false)
            ->where('expired_at', '>', now())
            ->latest()
            ->first();

        // If a valid OTP exists and was created recently, reuse it. Otherwise, create a new one.
        if ($existing && $existing->created_at->diffInSeconds(now()) < 300) {
            $otpRecord = $existing;
        } else {
            // Invalidate previous OTPs for this user and type
            VerificationOtp::where('user_id', $user->id)
                ->where('type', $type)
                ->where('is_used', false)
                ->update([
                    'is_used' => true,
                    'used_at' => now()
                ]);

            // $plainOtp = random_int(100000, 999999);
            // $hashedOtp = Hash::make($plainOtp);

            // Generate a new 6-digit OTP
            $otp = random_int(100000, 999999);

            $otpRecord = VerificationOtp::create([
                'user_id'     => $user->id,
                'otp'         => (string) $otp,
                'expired_at'  => Carbon::now()->addSeconds($ttl),
                'time_limit'  => $ttl,
                'type'        => $type,
                'ip_address'  => request()->ip(),
                'user_agent'  => request()->userAgent(),
            ]);
        }

        // Dispatch the email with the OTP
        Mail::to($user->email)->send(new SendOtpMail($otpRecord->otp, $user->name));

        return $otpRecord;
    }

    public function resend(Request $request)
    {
        $user = $request->user();

        $this->generateOtp( $user, type: 'login', ttl: 300 );

        return back()->with('success', 'OTP resent successfully.');
    }

    public function verifyOtp($user, string $otp): array
    {
        $record = VerificationOtp::where('user_id', $user->id)
            ->where('otp', $otp)
            ->where('is_used', false)
            ->latest()
            ->first();

        // No record
        if (!$record) {
            return [
                'status' => false,
                'message' => 'Invalid OTP',
            ];
        }

        //  Expired
        if ($record->expired_at->isPast()) {
            return [
                'status' => false,
                'message' => 'OTP expired',
            ];
        }

        //  Mark used
        $record->update([
            'is_used' => true,
            'used_at' => now(),
        ]);

        //  Success
        return [
            'status' => true,
            'message' => 'OTP verified successfully',
        ];
    }
}