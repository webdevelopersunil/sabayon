<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function ensureAdminPermissions(Request $request, string $permission)
    {
        abort_unless($request->user('admin'), 403, 'Admin access required.');
    }

    public function dashboard(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.dashboard.view');
        return Inertia::render('admin/dashboard/index', [
            'userName' => $request->user('admin')?->name ?? 'Admin User',
            'verifiedUsers' => 180,
            'notVerifiedUsers' => 32,
            'underProcess' => 12,
            'approved' => 45,
            'rejected' => 9,
        ]);
    }

    public function verifyUsers(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.users.view');
        return Inertia::render('admin/users/index');
    }

    public function sahayogRequest(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.sahayog_requests.view');
        return Inertia::render('admin/sahayog-requests/index');
    }
}
