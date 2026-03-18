<?php

namespace App\Services;

use App\Models\WizardData;
use App\Models\User;

class RequestNumberService
{
    public function generate($userId)
    {
        $user = User::find($userId);

        $aadharLast4Digits = substr($user->aadhar_no ?? '0000', -4);
        $currentYear = date('Y');

        $lastRecord = WizardData::orderByDesc('id')->first();

        $sequence = 1;

        if ($lastRecord && $lastRecord->request_no) {
            $lastSequence = (int) substr($lastRecord->request_no, -4);
            $sequence = $lastSequence + 1;
        }

        do {
            $formattedSequence = str_pad($sequence, 4, '0', STR_PAD_LEFT);

            $requestNumber = $aadharLast4Digits . $currentYear . $formattedSequence;

            $exists = WizardData::where('request_no', $requestNumber)->exists();

            if ($exists) {
                $sequence++;
            }

        } while ($exists);

        return $requestNumber;
    }
}