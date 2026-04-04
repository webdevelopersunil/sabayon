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
use Illuminate\Support\Facades\Http;


class OtpService
{


    public function SmsForRegistration($mobileNumber, string $otp)
    {
        $url = "http://10.205.48.190:13013/cgi-bin/sendsms?username=ongc&password=ongc12&from=ONGC&to=$mobileNumber&text=".urlencode($otp)."+\nRegards+Ongc&charset=UTF-8&meta-data=%3Fsmpp%3FEntityID%3D1001186049255234740%26ContentID%3D1407165363567411666";
        // return Http::get($url);
        return true;
    }

    /**
     * Generate a random 6-digit OTP.
     *
     * @return string
     */
    public function generateOtp($user, string $type = 'login', int $ttl = 300): VerificationOtp
    {
        $ttl = $ttl > 0 ? $ttl : 300; // Default to 5 minutes if invalid TTL provided
        $ttl = 10; 
        // Step 1: Check existing valid OTP first
        $existing = VerificationOtp::where('user_id', $user->id)
            ->where('type', $type)
            ->where('is_used', false)
            ->where('expired_at', '>', now())
            ->latest()
            ->first();

        // If a valid OTP exists and was created recently, reuse it. Otherwise, create a new one.
        if ($existing && $existing->created_at->diffInSeconds(now()) < $ttl) {
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
    
        $this->SmsForRegistration($user->mobile_number, $otpRecord->otp);
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