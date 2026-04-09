<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\VerificationLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerificationController
{
    /**
     * GET /verify — blank verify page (no lookup yet).
     */
    public function index()
    {
        return Inertia::render('verify');
    }

    /**
     * GET /verify/{hash} — look up the certificate and redirect with flash.
     */
    public function show(Request $request, string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->first();

        // Log every attempt — valid or not
        VerificationLog::create([
            'user_id'        => Auth::id(),
            'ip_address'     => $request->ip(),
            'user_agent'     => $request->userAgent(),
            'certificate_id' => $certificate?->id,
            'status'         => $certificate ? 'valid' : 'invalid',
        ]);

        if (! $certificate) {
            return redirect()
                ->route('verify.index')
                ->with('flash', [
                    'type'    => 'error',
                    'message' => 'Certificate not found. The code may be incorrect or the certificate may have been revoked.',
                ]);
        }

        return redirect()
            ->route('verify.index')
            ->with('flash', [
                'type'        => 'success',
                'message'     => 'Certificate verified successfully.',
                'certificate' => [
                    'name' => $certificate->name,
                    'course'        => $certificate->course,
                    'issued_at'     => $certificate->issued_at,
                    'status'        => $certificate->status,
                ],
            ]);
    }
    public function verify(Request $request, string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->first();

        // Log every attempt — valid or not
        VerificationLog::create([
            'user_id'        => Auth::id(),
            'ip_address'     => $request->ip(),
            'user_agent'     => $request->userAgent(),
            'certificate_id' => $certificate?->id,
            'status'         => $certificate ? 'valid' : 'invalid',
        ]);

        if (! $certificate) {
            return redirect()
                ->route('verify.index')
                ->with('flash', [
                    'type'    => 'error',
                    'message' => 'Certificate not found. The code may be incorrect or the certificate may have been revoked.',
                ]);
        }

        return redirect()
            ->route('verify.index')
            ->with('flash', [
                'type'        => 'success',
                'message'     => 'Certificate verified successfully.',
                'certificate' => [
                    'name' => $certificate->name,
                    'course'        => $certificate->course,
                    'issued_at'     => $certificate->issued_at,
                    'status'        => $certificate->status,
                ],
            ]);
    }
}
