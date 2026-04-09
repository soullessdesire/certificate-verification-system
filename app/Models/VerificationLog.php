<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VerificationLog extends Model
{
    protected $table = 'verification-logs';

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'certificate_id'
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    protected static function booted()
    {
        static::creating(function ($verification_log) {
            if (empty($verification_log->id)) {
                $verification_log->id = (string) Str::uuid();
            }
        });
    }
}
