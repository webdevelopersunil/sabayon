<?php

namespace App\Http\Controllers;

use App\Models\Step1Data;
use App\Models\Step2Data;
use App\Models\Step3Data;
use App\Models\Step4Data;
use App\Models\WizardData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Support\Str;
use App\Http\Requests\SahayogStep1Request;

class SahayogRequestController extends Controller
{
    private function ensureUserPermissions(Request $request, string $permission)
    {
        abort_unless($request->user()?->hasRole('user'), 403, 'User role required.');
        abort_unless($request->user()?->hasPermission($permission), 403, 'Permission required: '.$permission);
    }

    public function create(Request $request)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.create');

        $workCenters = Admin::where('designation', 'HR-ER')->pluck('name');

        return Inertia::render('user/sahayog-requests/create/index', [
            'title' => 'Sahayog Request - Create',
            'workCenters' => $workCenters,
            'steps' => [
                'Enter details of your employement.',
                'Add Dependent details.(You have mentioned 4 in previous step):',
                'Review',
                'Submit',
            ],
        ]);
    }

    public function history(Request $request)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.history');
        return Inertia::render('user/sahayog-requests/list/index');
    }

    public function show(Request $request, $id)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.view');
        $applicationDetails = [
            ['label' => 'Request ID', 'value' => $id],
            ['label' => 'Applicant Name', 'value' => 'Rajesh Kumar'],
            ['label' => 'Employee ID', 'value' => 'ONGC12345'],
            ['label' => 'Designation', 'value' => 'Senior Engineer'],
            ['label' => 'Department', 'value' => 'Operations'],
            ['label' => 'Request Type', 'value' => 'Financial Assistance'],
            ['label' => 'Date Submitted', 'value' => '2025-01-15'],
            ['label' => 'Purpose', 'value' => 'Medical treatment'],
            ['label' => 'Amount Requested', 'value' => '₹120,000'],
            ['label' => 'Beneficiary Name', 'value' => 'Sunita Devi'],
            ['label' => 'Relationship', 'value' => 'Spouse'],
            ['label' => 'Priority', 'value' => 'High'],
        ];

        $financialDetails = [
            ['label' => 'Total Hospital Bill', 'value' => '₹150,000'],
            ['label' => 'Insurance Cover', 'value' => '₹50,000'],
            ['label' => 'Net Request Amount', 'value' => '₹100,000'],
            ['label' => 'Existing Aid', 'value' => '₹20,000'],
            ['label' => 'Balance Amount', 'value' => '₹80,000'],
            ['label' => 'Bank Account', 'value' => 'XXXX-XXXX-XXXX-1234'],
            ['label' => 'IFSC Code', 'value' => 'SBIN0000456'],
            ['label' => 'PAN', 'value' => 'ABCDEFGHIJ1Z2'],
            ['label' => 'Requested Disbursement Date', 'value' => '2025-02-01'],
        ];

        $attachments = [
            ['name' => 'Hospital bill.pdf', 'type' => 'PDF'],
            ['name' => 'Doctor recommendation.jpg', 'type' => 'Image'],
            ['name' => 'Bank statement.pdf', 'type' => 'PDF'],
        ];

        return Inertia::render('user/sahayog-requests/view/index', [
            'id' => $id,
            'applicationDetails' => $applicationDetails,
            'financialDetails' => $financialDetails,
            'attachments' => $attachments,
        ]);
    }

    public function saveStep(Request $request)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.create');

        $payload = $request->validate([
            'step' => 'required|integer|min:1|max:4',
            'wizard_data_id' => 'nullable|integer|exists:wizard_data,id',
            'step1' => 'nullable|array',
            'step2' => 'nullable|array',
            'step3' => 'nullable|array',
            'step4' => 'nullable|array',
        ]);



        // Step 1 specific business validation
        $this->step1FormProcessing($payload);



        // $wizard = WizardData::updateOrCreate(
        //     ['id' => $payload['wizard_data_id'] ?? null],
        //     [
        //         'request_no' => $request->input('request_no', Str::uuid()),
        //         'user_id' => $request->user()->id,
        //         'step' => $payload['step'],
        //         'status' => 'draft',
        //         'data' => $request->input('data', []),
        //     ]
        // );

        if ($payload['step'] === 1 && isset($payload['step1'])) {
            $step1 = $payload['step1'];
            $wizard->step1Data()->updateOrCreate(
                ['wizard_data_id' => $wizard->id],
                [
                    'name' => $step1['name'] ?? '',
                    'type' => $step1['type'] ?? '',
                    'cpfno' => $step1['cpfno'] ?? '',
                    'doj_ongc' => $step1['doj_ongc'] ?? null,
                    'ifsc_code' => $step1['ifsc_code'] ?? '',
                    'designation' => $step1['designation'] ?? '',
                    'work_center' => $step1['work_center'] ?? '',
                    'dependants_no' => $step1['dependants_no'] ?? 0,
                    'bank_and_branch' => $step1['bank_and_branch'] ?? '',
                    'place_of_posting' => $step1['place_of_posting'] ?? '',
                    'savingaccount_No' => $step1['savingaccount_No'] ?? '',
                    'seperation_reason' => $step1['seperation_reason'] ?? '',
                    'date_of_seperation' => $step1['date_of_seperation'] ?? null,
                    'gross_annual_income' => $step1['gross_annual_income'] ?? 0,
                    'seperation_benefits' => $step1['seperation_benefits'] ?? null,
                ]
            );
        }

        if ($payload['step'] === 2 && isset($payload['step2'])) {
            $step2 = $payload['step2'];
            $wizard->step2Data()->updateOrCreate(
                ['wizard_data_id' => $wizard->id],
                [
                    'name' => $step2['name'] ?? '',
                    'relationship' => $step2['relationship'] ?? 'Spouse',
                    'is_editable' => $step2['is_editable'] ?? true,
                ]
            );
        }

        if ($payload['step'] === 3 && isset($payload['step3'])) {
            $step3 = $payload['step3'];
            $wizard->step3Data()->updateOrCreate(
                ['wizard_data_id' => $wizard->id],
                [
                    'requested_amount' => $step3['requested_amount'] ?? 0,
                    'other_details' => $step3['other_details'] ?? null,
                    'eligible_amount' => $step3['eligible_amount'] ?? 0,
                    'financialoptions' => $step3['financialoptions'] ?? '',
                ]
            );
        }

        if ($payload['step'] === 4 && isset($payload['step4'])) {
            $step4 = $payload['step4'];
            $wizard->step4Data()->updateOrCreate(
                ['wizard_data_id' => $wizard->id],
                [
                    'attachment' => $step4['attachment'] ?? '',
                ]
            );
        }

        $wizard->step = max($wizard->step, $payload['step']);
        $wizard->save();

        return back()->with('message', 'Step saved successfully.');
    }

    public function step1FormProcessing($payload)
{
        $requestClass = new SahayogStep1Request();

        $step1Validator = \Validator::make(
            $payload['step1'],
            $requestClass->rules(),
            $requestClass->messages(),
            $requestClass->attributes()
        );

    $step1Validator->validate();
}
    
}
