<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function ensureAdminPermissions(Request $request, string $permission)
    {
        abort_unless($request->user()?->hasRole('admin'), 403, 'Admin role required.');
        abort_unless($request->user()?->hasPermission($permission), 403, 'Permission required: '.$permission);
    }

    public function dashboard(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.dashboard.view');

        return Inertia::render('admin/dashboard/index', [
            'userName' => $request->user()?->name ?? 'Admin User',
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
