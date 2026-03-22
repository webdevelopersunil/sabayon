<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WizardData;
use App\Models\User;


class AdminController extends Controller
{
    private function ensureAdminPermissions(Request $request, string $permission)
    {
        abort_unless($request->user('admin'), 403, 'Admin access required.');
    }

    public function dashboard(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.dashboard.view');

        $admin = $request->user('admin');
        $wizard_data = WizardData::where('work_center', $admin->username)->get();

        return Inertia::render('admin/dashboard/index', [
            'userName' => $admin?->name ?? 'Admin User',
            'verifiedUsers' => User::where('admin_verified', true)->count(),
            'notVerifiedUsers' => User::where('admin_verified', false)->count(),
            'underProcess' => $wizard_data->where('hr_status', 'Under-Process')->count(),
            'approved' => $wizard_data->where('hr_status', 'Approved')->count(),
            'rejected' => $wizard_data->whereIn('hr_status', ['Rejected', 'Returned'])->count(),
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
