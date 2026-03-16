<?php

use App\Http\Controllers\CertificateController;
use Illuminate\Support\Facades\Route;
use App\Models\Certificate;
use App\Models\VerificationLog;
use Inertia\Inertia;



Route::middleware(['auth', 'issuer'])->group(function () {
    Route::get('/issuer', function () {
        return Inertia::render('issuer/dashboard', [
            'stats' => [
                'certificate_issued' => Certificate::count(),
                'pending_certificates' => 2,
                'verification_requests' => VerificationLog::count()
            ],
            'recent_certificates' => Certificate::latest()->take(10)->get()->toArray()
        ]);
    })->name('issuer');
    Route::resource('certificates', CertificateController::class);
});
