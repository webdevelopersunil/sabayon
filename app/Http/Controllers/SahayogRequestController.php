<?php

namespace App\Http\Controllers;

use App\Models\Step1Data;
use App\Models\Step2Data;
use App\Models\Step3Data;
use App\Models\Step4Data;
use App\Models\WizardData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Requests\SahayogStep1Request;
use App\Http\Requests\SahayogStep1ContractorRequest;


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
        $user = $request->user();
        
        if($user->aadhar_no == null){
            return redirect()->route('profile.edit')
                ->with('error', 'Please update your Aadhar number in your profile to proceed with the Sahayog request.');
        }
        $workCenters = Admin::where('designation', 'HR-ER')->pluck('name');
        $wizardData  = WizardData::where(['status'=> 'Draft', 'user_id' => $user->id])->with(['step1Data', 'step2Data', 'step3Data', 'step4Data'])->first();
        
        return Inertia::render('user/sahayog-requests/create/index', [
            'title' => 'Sahayog Request - Create',
            'wizardDataId' => $wizardData ? $wizardData->id : null,
            'workCenters' => $workCenters,
            'step1' => $wizardData ? $wizardData->step1Data : null,
            'step2' => $wizardData ? $wizardData->step2Data : null,
            'step3' => $wizardData ? $wizardData->step3Data : null,
            'step4' => $wizardData ? $wizardData->step4Data()->get() : [],
            'selectedBeneficiary' => $wizardData ? $wizardData->selected_beneficiary : null,
            'steps' => [
                'Enter details of your employement.',
                'Add Dependent details.(You have mentioned 4 in previous step):',
                'Financial Assitance Required Purpose',
                'Documents and Declarations',
            ],
        ]);
    }

    public function find(Request $request)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.view');
        $user = $request->user();
        $request->validate([
            'search' => ['required', 'string']
        ]);

        $request_no = $request->input('search');

        if (WizardData::where('request_no', $request_no)->where('user_id', $user->id)->exists()) {
            return redirect()->route('sahayog-requests.show', ['request_number' => $request_no]);
        }

        return back()->withErrors(['search' => 'No record found.']);
    }

    public function edit(Request $request, $request_number)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.create');

        $user = $request->user();
        
        $wizardData  = WizardData::where('request_no', $request_number)
            ->where('user_id', $user->id)
            ->with(['step1Data', 'step2Data', 'step3Data', 'step4Data'])
            ->firstOrFail();
        
        if ($wizardData->status !== 'Draft' && $wizardData->hr_status !== 'Returned') {
            return redirect()->route('sahayog-requests.history')
                ->with('error', 'This request is no longer editable.');
        }

        $workCenters = Admin::where('designation', 'HR-ER')->pluck('name');
        
        return Inertia::render('user/sahayog-requests/create/index', [
            'title' => 'Sahayog Request - Edit',
            'wizardDataId' => $wizardData->id,
            'workCenters' => $workCenters,
            'step1' => $wizardData->step1Data,
            'step2' => $wizardData->step2Data,
            'step3' => $wizardData->step3Data,
            'step4' => $wizardData->step4Data()->get(),
            'selectedBeneficiary' => $wizardData->selected_beneficiary,
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

        $user = $request->user();
        
        $search = $request->input('search');
        $status = $request->input('status');

        $requests = WizardData::select('id', 'request_no', 'step', 'status', 'hr_status', 'created_at')
            ->where('user_id', $user->id)
            ->when($search, function ($query, $search) {
                $query->where('request_no', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where(fn($q) => $q->where('status', $status)->orWhere('hr_status', $status));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
                
        return Inertia::render('user/sahayog-requests/list/index', [
            'requests' => $requests,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(Request $request, $request_number)
    {
        $this->ensureUserPermissions($request, 'user.sahayog_requests.view');

        $wizardData = WizardData::where('request_no', $request_number)->with(['step1Data', 'step2Data', 'step3Data', 'step4Data'])->first();
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

        return Inertia::render('user/sahayog-requests/view/index', [
            'id' => $request_number,
            'applicationDetails' => $applicationDetails,
            'basicInformation' => $basicInformation,
            'financialDetails' => $financialDetails,
            'attachments' => $attachments,  
            'hrUpdate' => $hrUpdate,
            'recent' => $recent 
        ]);
    }

    public function saveStep(Request $request, WizardData $wizard)
    {
        $user = $request->user();

        $this->ensureUserPermissions($request, 'user.sahayog_requests.create');

        $payload = $request->validate([
            'step' => 'required|integer|min:1|max:4',
            'wizard_data_id' => 'nullable|integer|exists:wizard_data,id',
            'step1' => 'nullable|array',
            'step2' => 'nullable|array',
            'step3' => 'nullable|array',
            'step4' => 'nullable|array',
        ]);

        $data = null;
        // If an ID is passed, we are editing.
        if (!empty($payload['wizard_data_id'])) {
            $data = WizardData::where('user_id', $user->id)
                ->where('id', $payload['wizard_data_id'])
                ->first();
        }

        // If not editing, try to find an existing draft to continue.
        if (!$data) {
            $data = WizardData::where('user_id', $user->id)->where('status', 'Draft')->latest()->first();
        }
        
        // If still no record found, create a new one.
        if (!$data) {
            $data = WizardData::create(['user_id' => $user->id, 'status' => 'Draft', 'hr_status' => 'Draft']);
        }

        $step = (int) $payload['step'];

        if ($step === 1 && isset($payload['step1'])) {
            // Step 1 specific business validation
            $this->step1FormProcessing($payload, $user->employee_type);

            $step1 = $payload['step1'];
            // Assign the work_center 
            $data->work_center = $step1['work_center'] ?? '';

            $fields = [
                'name' => $step1['name'] ?? '',
                'type' => $step1['type'] ?? '',
                'cpfno' => $step1['cpfno'] ?? '',
                'doj_ongc' => $step1['doj_ongc'] ?? null,
                'designation' => $step1['designation'] ?? '',


                // Contractor Reqhired Fields Start
                // 'pan' => $step1['pan'] ?? '',
                // 'contractor_name' => $step1['contractor_name'] ?? '',
                // 'work_years_contact' => $step1['work_years_contact'] ?? 0,
                // 'total_years_in_ongc_different_contact' => $step1['total_years_in_ongc_different_contact'] ?? 0,
                // 'funding_source' => $step1['funding_source'] ?? '',
                // Contractor Reqhired Fields End

                // For Active Users Start
                // 'place_of_posting' => $step1['place_of_posting'] ?? '',
                // 'seperation_reason' => $step1['seperation_reason'] ?? '',
                // 'seperation_benefits' => $step1['seperation_benefits'] ?? null,
                // For Active Users End

                'doj_ongc' => date('Y-m-d'),
                'user_id'   => $user->id,

                'date_of_seperation' => $step1['date_of_seperation'] ?? null,
                'work_center' => $step1['work_center'] ?? '',
                'bank_and_branch' => $step1['bank_and_branch'] ?? '',
                'savingaccount_No' => $step1['savingaccount_No'] ?? '',
                'dependants_no' => $step1['dependants_no'] ?? 0,
                'ifsc_code' => $step1['ifsc_code'] ?? '',
                'gross_annual_income' => $step1['gross_annual_income'] ?? 0,
            ];

            if ($user->employee_type === 'contractor') {
                $fields = array_merge($fields, [
                    // Contractor Reqhired Fields Start
                    'pan' => $step1['pan'] ?? '',
                    'contractor_name' => $step1['contractor_name'] ?? '',
                    'work_years_contact' => $step1['work_years_contact'] ?? 0,
                    'total_years_in_ongc_different_contact' => $step1['total_years_in_ongc_different_contact'] ?? 0,
                    'funding_source' => $step1['funding_source'] ?? '',
                    // Contractor Reqhired Fields End
                ]);
            }

            if ($user->employee_type === 'active') {
                $fields = array_merge($fields, [
                    // For Active Users Start
                    'place_of_posting' => $step1['place_of_posting'] ?? '',
                    'seperation_reason' => $step1['seperation_reason'] ?? '',
                    'seperation_benefits' => $step1['seperation_benefits'] ?? null,
                    // For Active Users End
                ]);
            }
            
            $data->step1Data()->updateOrCreate( [], $fields );
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
            $step4 = $payload['step4'];

            // Custom validation for file counts (New + Existing)
            $newFilesCount = $request->hasFile('step4.files') ? count($request->file('step4.files')) : 0;
            $existingFilesCount = isset($step4['existing_files']) ? count($step4['existing_files']) : 0;

            if (($newFilesCount + $existingFilesCount) === 0) {
                throw \Illuminate\Validation\ValidationException::withMessages(['step4.files' => 'Please upload at least one document.']);
            }
            if (($newFilesCount + $existingFilesCount) > 5) {
                throw \Illuminate\Validation\ValidationException::withMessages(['step4.files' => 'You can upload a maximum of 5 documents.']);
            }

            $request->validate([
                'step4.files' => 'nullable|array',
                'step4.files.*' => 'file|max:10240', // 10MB max limit
                'step4.cliamearlier' => 'required|accepted',
                'step4.timelimit' => 'required|accepted',
            ], [
                'step4.cliamearlier.required' => 'You must accept this declaration.',
                'step4.cliamearlier.accepted' => 'You must accept this declaration.',
                'step4.timelimit.required' => 'You must accept this declaration.',
                'step4.timelimit.accepted' => 'You must accept this declaration.',
            ]);

            $keptFileIds = $step4['existing_files'] ?? [];

            // Find files that were removed on the frontend and delete them securely
            $removedFiles = $data->step4Data()->whereNotIn('id', $keptFileIds)->get();
            foreach ($removedFiles as $removedFile) {
                Storage::disk('public')->delete($removedFile->attachment); // Remove physical file
                $removedFile->delete(); // Remove DB entry
            }

            if ($request->hasFile('step4.files')) {
                foreach ($request->file('step4.files') as $file) {
                    $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    $extension = $file->getClientOriginalExtension();
                    $fileName = Str::slug($originalName) . '_' . date('Ymd_His') . '.' . $extension;

                    $filePath = $file->storeAs('sahayog-documents', $fileName, 'public');
                    $data->step4Data()->create([
                        'attachment' => $filePath,
                    ]);
                }
            }

            $data->status = 'Complete';
            $data->hr_status = 'Under-Process';
        }

        $data->step = max($data->step ?? 1, $step);
        $data->save();

        return back()->with('message', 'Step saved successfully.');
    }

    public function step1FormProcessing($payload, $employee_type)
    {       
            // $requestClass = new SahayogStep1Request();
            $requestClass = $employee_type == 'contractor' ? new SahayogStep1ContractorRequest() : new SahayogStep1Request();

            $step1Validator = Validator::make(
                $payload['step1'],
                $requestClass->rules(),
                $requestClass->messages(),
                $requestClass->attributes()
            );

        $step1Validator->validate();
    }
    
}
