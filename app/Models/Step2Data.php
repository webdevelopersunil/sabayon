<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Step2Data extends Model
{
    protected $table = 'step2_data';

    protected $fillable = [
        'wizard_data_id',
        'name',
        'relationship',
        'is_editable',
    ];

    protected $casts = [
        'is_editable' => 'boolean',
    ];

    public function wizardData()
    {
        return $this->belongsTo(WizardData::class, 'wizard_data_id');
    }
}
