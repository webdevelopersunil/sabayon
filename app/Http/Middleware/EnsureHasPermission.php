<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureHasPermission
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();
        
        if (!$user || !method_exists($user, 'hasPermission') || !$user->hasPermission($permission)) {
            abort(403, 'Unauthorized. Permission required: '.$permission);
        }

        return $next($request);
    }
}
