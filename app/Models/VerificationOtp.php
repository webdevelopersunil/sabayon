<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VerificationOtp extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'otp',
        'expired_at',
        'attempts',
        'time_limit',
        'type',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'expired_at' => 'datetime',
        'is_used' => 'boolean',
    ];
}