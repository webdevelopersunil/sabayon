<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\WizardData;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class AdminController extends Controller
{

    private function ensureAdminPermissions(Request $request, string $permission)
    {
        abort_unless($request->user('admin'), 403, 'Admin access required.');
    }

    public function dashboard(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.dashboard.view');

        $admin = $request->user();
        $wizard_data = WizardData::where('work_center', $admin->username)->get();
        
        return Inertia::render('admin/dashboard/index', [

            'userName' => $admin?->name ?? 'Admin User',
            'verifiedUsers' => User::where(['location' => $admin->location,'admin_verified' => true ])->count(),
            'notVerifiedUsers' => User::where(['location' => $admin->location,'admin_verified' => false ])->count(),
            'underProcess' => $wizard_data->where('hr_status', 'Under-Process')->count(),
            'approved' => $wizard_data->where('hr_status','Approved')->count(),
            'rejected' => $wizard_data->whereIn('hr_status', ['Rejected', 'Returned'])->where('work_center' , $admin->location)->count(),
        ]);
    }

    public function verifyUsers(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.users.view');
        $user = $request->user();
        
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
            ->where('location', $user->location)
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
        
        $user = $request->user();
                
        $search = $request->input('search');
        $status = $request->input('status');

        $requests = WizardData::select('id', 'request_no', 'step', 'status', 'hr_status', 'created_at')
            ->where('work_center', $user->location)->where('status', 'Complete')
            ->when($search, function ($query, $search) {
                $query->where('request_no', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where(fn($q) => $q->where('status', $status)->orWhere('hr_status', $status));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
                
        return Inertia::render('admin/sahayog-requests/list/index', [
            'requests' => $requests,
            'filters' => $request->only(['search', 'status']),
        ]);
        
    }

    public function find(Request $request)
    {
        $this->ensureAdminPermissions($request, 'admin.sahayog_requests.view');

        $request->validate([
            'search' => ['required', 'string']
        ]);

        $request_no = $request->input('search');

        if (WizardData::where('request_no', $request_no)->exists()) {
            return redirect()->route('admin.show', ['request_number' => $request_no]);
        }

        return back()->withErrors(['search' => 'Request Number not found.']);
    }

    public function show(Request $request, $request_number)
    {

        $this->ensureAdminPermissions($request, 'admin.sahayog_requests.view');

        $wizardData = WizardData::where(['work_center' => $request->user()->location, 'request_no'=> $request_number])
                        ->with(['step1Data', 'step2Data', 'step3Data', 'step4Data'])->first();
        $user = User::where('id', $wizardData->user_id)->first();
        // dd($user);

        $step1 = $wizardData->step1Data;
        $step2 = $wizardData->step2Data;
        $step3 = $wizardData->step3Data;
        $step4 = $wizardData->step4Data;

        $beneficiary = $step2 ? ($step2->firstWhere('name', $wizardData->selected_beneficiary) ?? $step2->firstWhere('id', $wizardData->selected_beneficiary)) : null;
        $beneficiaryName = $wizardData->selected_beneficiary ?? ($beneficiary->name ?? 'N/A');
        $relationship = $beneficiary->relationship ?? 'N/A';

        $applicationDetails = [
            ['label' => 'Applicant Name', 'value' => $user?->name ?? 'N/A'],
            ['label' => 'User Type', 'value' => $user?->employee_type ?? 'N/A'],
            ['label' => 'CPF Number', 'value' => $user?->cpf_no ?? 'N/A'],
            ['label' => 'Date of Joining ONGC', 'value' => $step1?->doj_ongc ?? ($user?->date_of_joining_ongc ? $user->date_of_joining_ongc->format('Y-m-d') : 'N/A')],
            ['label' => 'Designation', 'value' => $user?->designation ?? $user?->designation ?? 'N/A'],
            ['label' => 'Employee Level', 'value' => $step1?->level ?? $user?->level ?? 'N/A'],
            ['label' => 'Work Center', 'value' => $step1?->work_center ?? 'N/A'],
            ['label' => 'Place of Posting', 'value' => $step1?->place_of_posting ?? 'N/A'],
        ];

        $basicInformation = [
            ['label' => 'Seperation Reason', 'value' => $step1?->seperation_reason ?? 'N/A'],
            ['label' => 'Date of Seperation', 'value' => !empty($step1?->date_of_seperation) ? date('d-M-Y', strtotime($step1->date_of_seperation)) : 'N/A'],
            ['label' => 'Dependants No', 'value' => $step1?->dependants_no ?? 'N/A'],
            ['label' => 'Request Type', 'value' => $step3?->financialoptions ?? 'N/A'],
            ['label' => 'Seperation Benefits', 'value' => $step1?->seperation_benefits ?? 'N/A'],
        ];

        $financialDetails = [
            ['label' => 'Eligible Amount', 'value' => '₹' . number_format($step3?->eligible_amount ?? 0)],
            ['label' => 'Gross Annual Income', 'value' => '₹' . number_format($step1?->gross_annual_income ?? 0)],
            ['label' => 'Bank & Branch', 'value' => $step1?->bank_and_branch ?? 'N/A'],
            ['label' => 'Bank Account', 'value' => $step1?->savingaccount_No ?? 'N/A'],
            ['label' => 'IFSC Code', 'value' => $step1?->ifsc_code ?? 'N/A'],
            ['label' => 'No. of Dependents (with relationship)', 'value' => $step1?->dependants_no ?? 'N/A'],
        ];

        // dd($step4);
        $attachments = $step4 ? $step4->map(function ($doc) {
            $fileName = basename($doc->attachment ?? '');
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
            return [
                'name' => $fileName ?: 'Document',
                'type' => strtoupper($extension) ?: 'FILE',
                'url'  => $doc->attachment ? Storage::url($doc->attachment) : '#',
            ];
        })->toArray() : [];

        $hrUpdate = [
            'status' => $wizardData->hr_status ?? 'Under-Process',
            'review_date' => $wizardData->returned_at ? $wizardData->returned_at->format('d F Y') : 'N/A',
            'comments' => $wizardData->hr_updates ?? 'Awaiting review.',
            'updated_by' => 'A. Sharma (HR Manager)', // This is likely a placeholder.
            'attachment_url' => $wizardData->hr_attchament ? Storage::url($wizardData->hr_attchament) : null,
            'attachment_name' => $wizardData->hr_attchament ? basename($wizardData->hr_attchament) : null,
        ];

        $recent = [
            'claimed_at' => $wizardData->claimed_at ? $wizardData->claimed_at->format('d F Y') : 'N/A',
            'claimed_by' => $wizardData->claimed_by ?? 'N/A',
        ];

        return Inertia::render('admin/sahayog-requests/view/index', [
            'id' => $request_number,
            'applicationDetails' => $applicationDetails,
            'basicInformation' => $basicInformation,
            'financialDetails' => $financialDetails,
            'attachments' => $attachments,
            'hrUpdate' => $hrUpdate,
            'recent' => $recent
        ]);
    }

    public function updateRequestStatus(Request $request, $request_number)
    {
        $this->ensureAdminPermissions($request, 'admin.sahayog_requests.view');

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:Approved,Rejected,Returned'],
            'amount_approved' => ['nullable', 'numeric'],
            'sahayog_number' => ['nullable', 'string', 'max:255'],
            'details' => ['required', 'string'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,jpg,png', 'max:5120'], // Max 5MB
        ]);

        $wizardData = WizardData::where(['work_center' => $request->user()->location, 'request_no' => $request_number])->firstOrFail();

        $wizardData->hr_status = $validated['status'];
        // Note: Uncomment & map the other validated fields to columns depending on your DB schema.
        $wizardData->amount_approved = $validated['amount_approved'];
        $wizardData->sahayog_number = $validated['sahayog_number'];
        $wizardData->hr_updates = $validated['details'];
        $wizardData->returned_at = now();

        if ($request->hasFile('attachment')) {
            $wizardData->hr_attchament = $request->file('attachment')->store('sahayog-documents', 'public');
            // $wizardData->status_attachment = $path; // or whichever db column persists it
        }

        $wizardData->save();

        return back()->with('success', 'Request status updated successfully.');
    }

    public function rejectUser(Request $request, $id)
    {
        $this->ensureAdminPermissions($request, 'admin.users.view');

        $validated = $request->validate([
            'reason' => ['required', 'string'],
        ]);

        $user = User::where('id', $id)->where('location', $request->user()->location)->firstOrFail();
        $user->admin_verified = false;
        $user->admin_rejected_remarks = $validated['reason'];
        $user->save();

        return back()->with('success', 'User verification rejected.');
    }

    public function approveUser(Request $request, $id)
    {
        $this->ensureAdminPermissions($request, 'admin.users.view');

        $user = User::where('id', $id)->where('location', $request->user()->location)->firstOrFail();
        $user->admin_verified = true;
        $user->admin_rejected_remarks = Null;
        $user->save();

        return back()->with('success', 'User verification approved.');
    }

}
