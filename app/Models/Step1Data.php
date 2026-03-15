<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Step1Data extends Model
{
    protected $table = 'step1_data';

    protected $fillable = [
        'wizard_data_id',
        'name',
        'type',
        'cpfno',
        'doj_ongc',
        'ifsc_code',
        'designation',
        'work_center',
        'dependants_no',
        'bank_and_branch',
        'place_of_posting',
        'savingaccount_No',
        'seperation_reason',
        'date_of_seperation',
        'gross_annual_income',
        'seperation_benefits',
    ];

    public function wizardData()
    {
        return $this->belongsTo(WizardData::class, 'wizard_data_id');
    }
}
