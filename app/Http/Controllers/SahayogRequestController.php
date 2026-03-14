<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SahayogRequestController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('user/sahayog-requests/create/index', [
            'title' => 'Sahayog Request - Create',
            'steps' => [
                'Step 1: Basic info',
                'Step 2: Request details',
                'Step 3: Review',
                'Step 4: Submit',
            ],
        ]);
    }

    public function history(Request $request)
    {
        return Inertia::render('user/sahayog-requests/list/index');
    }

    public function show(Request $request, $id)
    {
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
}
