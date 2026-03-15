<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    
    public function index(Request $request)
    {
        return inertia('user/dashboard/index', [
            'userName' => $request->user()?->name ?? 'User',
        ]);
    }

    
}
