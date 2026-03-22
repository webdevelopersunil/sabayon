<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function loginView(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        if (Auth::guard('web')->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/admin-login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'admin_id' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::guard('admin')->attempt([
            'username' => $credentials['admin_id'],
            'password' => $credentials['password']
        ], $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended('/admin/dashboard');
        }

        return back()->withErrors([
            'admin_id' => 'The provided credentials do not match our records.',
        ])->onlyInput('admin_id');
    }
}
