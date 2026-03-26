<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated and not admin verified
        if ($request->user() && $request->user()->admin_verified == false) {
            
            // Allow access to the OTP verification page, the verification submission route, and logout
            if (!in_array($request->route()->getName(), ['otp.verification', 'otp.verify', 'otp.resend', 'logout'])) {
                return redirect()->route('otp.verification');
            }
        }

        return $next($request);
    }
}