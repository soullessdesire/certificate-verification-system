<?php

namespace App\Models;

use App\Policies\CertificatePolicy;
use Database\Factories\CertificateFactory;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

#[UsePolicy(CertificatePolicy::class)]
class Certificate extends Model
{
    /** @use HasFactory<CertificateFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'course',
        'issued_at',
        'issued_by',
        'hash',
        'status',
        'email'
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'create_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function ($certificate) {
            if (empty($certificate->id)) {
                $certificate->id = (string) Str::uuid();
            }

            if (empty($certificate->hash)) {
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
        return url("/verify/{$this->hash}");
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}
