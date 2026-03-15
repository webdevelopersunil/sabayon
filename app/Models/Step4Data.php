<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Step4Data extends Model
{
    protected $table = 'step4_data';

    protected $fillable = [
        'wizard_data_id',
        'attachment',
    ];

    public function wizardData()
    {
        return $this->belongsTo(WizardData::class, 'wizard_data_id');
    }
}
