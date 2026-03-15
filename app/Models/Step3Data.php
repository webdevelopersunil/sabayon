<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Step3Data extends Model
{
    protected $table = 'step3_data';

    protected $fillable = [
        'wizard_data_id',
        'requested_amount',
        'other_details',
        'eligible_amount',
        'financialoptions',
    ];

    protected $casts = [
        'other_details' => 'array',
    ];

    public function wizardData()
    {
        return $this->belongsTo(WizardData::class, 'wizard_data_id');
    }
}
