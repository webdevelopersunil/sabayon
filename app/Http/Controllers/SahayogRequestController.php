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
}
