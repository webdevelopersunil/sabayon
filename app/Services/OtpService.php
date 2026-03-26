<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\SendOtpNotification;
use Illuminate\Support\Facades\Log;

class OtpService
{
    /**
     * Generate and send an OTP to the user.
     *
     * @param User $user
     * @return bool
     */
    public function sendOtp(User $user): bool
    {
        try {
            $otpCode = $this->generateOtp();

            $user->otp_code = $otpCode;
            $user->otp_expires_at = now()->addMinutes(10);
            $user->save();

            $user->notify(new SendOtpNotification($otpCode));

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send OTP for user ' . $user->id . ': ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Alias for sendOtp, for login context.
     *
     * @param User $user
     * @return bool
     */
    public function sendLoginOtp(User $user): bool
    {
        return $this->sendOtp($user);
    }

    /**
     * Resend OTP to the user.
     *
     * @param User $user
     * @return bool
     */
    public function resendOtp(User $user): bool
    {
        // You could add rate-limiting logic here to prevent spam.
        return $this->sendOtp($user);
    }

    /**
     * Send a confirmation OTP.
     *
     * @param User $user
     * @return bool
     */
    public function sendConfirmationOtp(User $user): bool
    {
        return $this->sendOtp($user);
    }

    /**
     * Verify the provided OTP for a user.
     *
     * @param User $user
     * @param string $otp
     * @return bool
     */
    public function verifyOtp(User $user, string $otp): bool
    {
        if ($user->otp_code === $otp && $user->otp_expires_at && now()->isBefore($user->otp_expires_at)) {
            // OTP is correct and not expired.
            $user->otp_code = null;
            $user->otp_expires_at = null;
            $user->admin_verified = true; // Mark as verified
            $user->save();

            return true;
        }

        return false;
    }

    /**
     * Generate a random 6-digit OTP.
     *
     * @return string
     */
    protected function generateOtp(): string
    {
        // For production, consider a more secure random number generator if needed.
        return (string) random_int(100000, 999999);
    }
}