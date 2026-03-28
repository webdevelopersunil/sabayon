<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HrErModel extends Model
{
    use HasFactory;

    protected $table = 'hr_er_files';

    protected $fillable = [
        'wizard_data_id',
        'file_path',
        'hr_updates',
        'file_type',
    ];

    public function wizardData(): BelongsTo
    {
        return $this->belongsTo(WizardData::class, 'wizard_data_id');
    }
}