<?php

use App\Http\Controllers\CertificateController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Certificate;
use App\Models\VerificationLog;
use Inertia\Inertia;



Route::middleware(['auth', 'issuer'])->group(function () {
    Route::get('/issuer', function () {
        return Inertia::render('issuer/dashboard', [
            'stats' => [
                'certificates_issued' => Certificate::where('issued_by', Auth::id())->get()->count(),
                'revoked_certificates' => Certificate::where('status', 'revoked')->get()->count(),
                'verification_requests' => VerificationLog::where('user_id', Auth::id())->get()->count()
            ],
            'recent_certificates' => Certificate::where('issued_by', Auth::id())->get()
        ]);
    })->name('issuer');
    Route::resource('issuer/certificates', CertificateController::class);
});
