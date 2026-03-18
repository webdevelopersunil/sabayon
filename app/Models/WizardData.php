<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Services\RequestNumberService;

class WizardData extends Model
{
    protected $table = 'wizard_data';

    protected $fillable = [
        'request_no',
        'user_id',
        'step',
        'data',
        'status',
        'hr_status',
        'trust_admin_payment_status',
        'hr_updates',
        'trust_admin_updates',
        'finance_admin_updates',
        'hr_details',
        'trust_admin_details',
        'finance_admin_details',
        'sent_to_finance',
        'sent_to_trust_admin',
        'hr_attchament',
        'sahayog_number',
        'work_center',
        'disha_file_no',
        'returned_at',
        'amount_received',
        'amount_demanded',
        'amount_approved',
        'level',
    ];

    protected $casts = [
        'data' => 'array',
        'sent_to_finance' => 'boolean',
        'sent_to_trust_admin' => 'boolean',
        'returned_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($wizardData) {

            if (!$wizardData->request_no) {

                // Resolve service from container
                $service = app(RequestNumberService::class);

                $wizardData->request_no = $service->generate($wizardData->user_id);
            }
        });
    }

    public function step1Data()
    {
        return $this->hasOne(Step1Data::class, 'wizard_data_id');
    }

    public function step2Data()
    {
        return $this->hasOne(Step2Data::class, 'wizard_data_id');
    }

    public function step3Data()
    {
        return $this->hasOne(Step3Data::class, 'wizard_data_id');
    }

    public function step4Data()
    {
        return $this->hasOne(Step4Data::class, 'wizard_data_id');
    }

    public static function generateRequestNumber($aadhar)
    {
        $aadharLast4Digits = substr($aadhar ?? '0000000000000000', -4);
        $currentYear = date('Y');

        $lastRecord = self::orderByDesc('id')->first();

        $sequence = 1;

        if ($lastRecord && $lastRecord->request_no) {
            $lastSequence = (int) substr($lastRecord->request_no, -4);
            $sequence = $lastSequence + 1;
        }

        do {
            $formattedSequence = str_pad($sequence, 4, '0', STR_PAD_LEFT);

            $requestNumber = $aadharLast4Digits . $currentYear . $formattedSequence;

            $exists = self::where('request_no', $requestNumber)->exists();

            if ($exists) {
                $sequence++;
            }

        } while ($exists);

        return $requestNumber;
    }
}
