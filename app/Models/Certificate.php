<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    /** @use HasFactory<\Database\Factories\CertificateFactory> */
    use HasFactory;


    protected $fillable = [
        'name',
        'course',
        'issued_at',
        'hash'
    ];

    protected $casts = [
        'issued_at' => 'datetime'
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * Boot function to automatically generate UUID for id
     * and optionally generate signed hash if not provided.
     */
    protected static function booted()
    {
        static::creating(function ($certificate) {
            // Generate UUID for primary key if not set
            if (empty($certificate->id)) {
                $certificate->id = (string) Str::uuid();
            }

            // Generate a signed hash if not set
            if (empty($certificate->hash)) {
                // Using HMAC with app key for signature
                $certificate->hash = hash_hmac(
                    'sha256',
                    $certificate->id,
                    config('app.key')
                );
            }
        });
    }
    public function getVerificationUrl()
    {
        return url('/verify/{$this->hash}');
    }
}
