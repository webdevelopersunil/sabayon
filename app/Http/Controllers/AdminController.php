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
        
        $search = $request->input('search');
        $status = $request->input('status');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('cpf_no', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                if ($status === 'verified') {
                    $query->where('admin_verified', true);
                } elseif ($status === 'unverified') {
                    $query->where('admin_verified', false);
                }
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $stats = [
            'total' => User::count(),
            'approved' => User::where('admin_verified', true)->count(),
            'pending' => User::where('admin_verified', false)->count(),
            'retired' => User::where('employee_type', 'like', '%retired%')->count(),
        ];

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'status']),
            'stats' => $stats,
        ]);
    }

    public function sahayogRequest(Request $request)
    {

        $this->ensureAdminPermissions($request, 'admin.sahayog_requests.view');
        // return Inertia::render('admin/sahayog-requests/index');

                

        $search = $request->input('search');
        $status = $request->input('status');

        $requests = WizardData::select('id', 'request_no', 'step', 'status', 'hr_status', 'created_at')
            ->where('work_center', auth()->user()->username)
            ->when($search, function ($query, $search) {
                $query->where('request_no', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where(fn($q) => $q->where('status', $status)->orWhere('hr_status', $status));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
                
        return Inertia::render('admin/sahayog-requests/index', [
            'requests' => $requests,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}
