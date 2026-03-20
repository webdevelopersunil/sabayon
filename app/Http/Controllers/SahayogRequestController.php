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
        $wizardData  = WizardData::where(['status'=> 'Draft', 'user_id' => auth()->user()->id])->with(['step1Data', 'step2Data', 'step3Data'])->first();
        
        return Inertia::render('user/sahayog-requests/create/index', [
            'title' => 'Sahayog Request - Create',
            'workCenters' => $workCenters,
            'step1' => $wizardData ? $wizardData->step1Data : null,
            'step2' => $wizardData ? $wizardData->step2Data : null,
            'step3' => $wizardData ? $wizardData->step3Data : null,
            'selectedBeneficiary' => $wizardData ? $wizardData->selected_beneficiary : null,
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

    public function saveStep(Request $request, WizardData $wizard)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.create');

        $userId = auth()->id();
        // dd($request->all());
        // Check if wizard data exists for the user and step is in progress, else create new
        $data = WizardData::where('user_id', $userId)->whereIn('step', [1, 2, 3, 4])->where('hr_status', 'Draft')->latest()->first();
        // If not found create One wizard entry
        if (!$data) {
            $data = WizardData::create( [ 'user_id' => $userId, 'hr_status' => 'Draft', ] );
        }
        
        $payload = $request->validate([
            'step' => 'required|integer|min:1|max:4',
            'wizard_data_id' => 'nullable|integer|exists:wizard_data,id',
            'step1' => 'nullable|array',
            'step2' => 'nullable|array',
            'step3' => 'nullable|array',
            'step4' => 'nullable|array',
        ]);

        $step = (int) $payload['step'];

        if ($step === 1 && isset($payload['step1'])) {
            // Step 1 specific business validation
            $this->step1FormProcessing($payload);

            $step1 = $payload['step1'];
            
            $data->step1Data()->updateOrCreate(
                            [], // ✅ DO NOT pass wizard_data_id
                            [
                                'name' => $step1['name'] ?? '',
                                'type' => $step1['type'] ?? '',
                                'cpfno' => $step1['cpfno'] ?? '',
                                'doj_ongc' => $step1['doj_ongc'] ?? null,
                                'designation' => $step1['designation'] ?? '',

                                'doj_ongc' => date('Y-m-d'),
                                'user_id'   => $userId,

                                'date_of_seperation' => $step1['date_of_seperation'] ?? null,
                                'work_center' => $step1['work_center'] ?? '',
                                'place_of_posting' => $step1['place_of_posting'] ?? '',
                                'seperation_reason' => $step1['seperation_reason'] ?? '',
                                'bank_and_branch' => $step1['bank_and_branch'] ?? '',
                                'seperation_benefits' => $step1['seperation_benefits'] ?? null,
                                'savingaccount_No' => $step1['savingaccount_No'] ?? '',
                                'dependants_no' => $step1['dependants_no'] ?? 0,
                                'ifsc_code' => $step1['ifsc_code'] ?? '',
                                'gross_annual_income' => $step1['gross_annual_income'] ?? 0,
                            ]
                        );
        }

        if ($step === 2 && isset($payload['step2'])) {

            $request->validate([
                'step2.beneficiaries' => 'required|array|min:1',
                'step2.beneficiaries.*.name' => 'required|string|max:255',
                'step2.beneficiaries.*.relationship' => 'required|string|max:255',
                'step2.selected_beneficiary' => 'required|string|max:255',
            ], [
                'step2.beneficiaries.*.name.required' => 'Beneficiary name is required.',
                'step2.beneficiaries.*.relationship.required' => 'Relationship is required.',
                'step2.selected_beneficiary.required' => 'Please select an option.',
            ]);

            $step2 = $payload['step2'];
            
            $providedIds = collect($step2['beneficiaries'])->pluck('id')->filter()->all();

            // Delete records that exist in the database but were removed from the form
            if (!empty($providedIds)) {
                Step2Data::where('wizard_data_id', $data->id)->whereNotIn('id', $providedIds)->delete();
            } else {
                Step2Data::where('wizard_data_id', $data->id)->delete();
            }
            
            foreach ($step2['beneficiaries'] as $beneficiary) {
                if (!empty($beneficiary['id'])) {
                    // Update existing record
                    Step2Data::where('id', $beneficiary['id'])
                        ->where('wizard_data_id', $data->id)
                        ->update([
                            'name' => $beneficiary['name'] ?? '',
                            'relationship' => $beneficiary['relationship'] ?? '',
                        ]);
                } else {
                    // Create new record
                    Step2Data::create([
                        'wizard_data_id' => $data->id,
                        'name' => $beneficiary['name'] ?? '',
                        'relationship' => $beneficiary['relationship'] ?? '',
                        'is_editable' => true,
                    ]);
                }
            }

            $data->where('id', $data->id)->update([
                'selected_beneficiary' => $step2['selected_beneficiary'] ?? '',
            ]);
        }

        if ($step === 3 && isset($payload['step3'])) {
            $request->validate([
                'step3.financialOption' => 'required|string',
                'step3.amount' => 'required|numeric|min:1',
                'step3.otherDetails' => 'required_if:step3.financialOption,other',
            ], [
                'step3.financialOption.required' => 'Please select a financial option.',
                'step3.amount.required' => 'Please enter the amount needed.',
                'step3.amount.numeric' => 'Amount must be a valid number.',
                'step3.otherDetails.required_if' => 'Please provide details for the other purpose.',
            ]);

            $step3 = $payload['step3'];
            $data->step3Data()->updateOrCreate(
                ['wizard_data_id' => $data->id],
                [
                    'requested_amount' => $step3['amount'] ?? 0,
                    'other_details' => $step3['otherDetails'] ?? null,
                    'eligible_amount'=> 40000,
                    'financialoptions' => $step3['financialOption'] ?? '',
                ]
            );
        }

        if ($step === 4 && isset($payload['step4'])) {
            // dd($payload);
            $request->validate([
                'step4.files' => 'required|array|min:1|max:5',
                'step4.files.*' => 'file|max:10240', // 10MB max limit
                'step4.cliamearlier' => 'required|accepted',
                'step4.timelimit' => 'required|accepted',
            ], [
                'step4.files.required' => 'Please upload at least one document.',
                'step4.files.max' => 'You can upload a maximum of 5 documents.',
                'step4.cliamearlier.required' => 'You must accept this declaration.',
                'step4.cliamearlier.accepted' => 'You must accept this declaration.',
                'step4.timelimit.required' => 'You must accept this declaration.',
                'step4.timelimit.accepted' => 'You must accept this declaration.',
            ]);

            $step4 = $payload['step4'];

            if ($request->hasFile('step4.files')) {
                $data->step4Data()->delete(); // Clear previously uploaded file entries for this request

                foreach ($request->file('step4.files') as $file) {
                    $filePath = $file->store('sahayog-documents', 'public');
                    $data->step4Data()->create([
                        'attachment' => $filePath,
                    ]);
                }
            }

            // $data->status = 'Complete';
            $data->hr_status = 'Under-Process';
        }

        $data->step = max($data->step ?? 1, $step);
        $data->save();

        if ($step === 4) {
            return redirect('/dashboard')->with('message', 'Sahayog Request submitted successfully.');
        }

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
