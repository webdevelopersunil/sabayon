<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\SendOtpNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
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

        // Prevent regeneration within 60 seconds
        if ($existing && $existing->created_at->diffInSeconds(now()) < 300) {
            return $existing;
        }

        //  Step 2: Invalidate previous OTPs (only after check)
        VerificationOtp::where('user_id', $user->id)
            ->where('type', $type)
            ->where('is_used', false)
            ->update([
                'is_used' => true,
                'used_at' => now()
            ]);

        //  Step 3: Generate new OTP
        $otp = random_int(100000, 999999);

        // $plainOtp = random_int(100000, 999999);
        // $hashedOtp = Hash::make($plainOtp);

        return VerificationOtp::create([
            'user_id'     => $user->id,
            'otp'         => (string) $otp,
            'expired_at'  => Carbon::now()->addSeconds($ttl),
            'time_limit'  => $ttl,
            'type'        => $type,
            'ip_address'  => request()->ip(),
            'user_agent'  => request()->userAgent(),
        ]);
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