<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Certificate;
use App\Models\VerificationLog;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $stats = [
            'total_certificates' => Certificate::count(),
            'verification_request_24h' => VerificationLog::count(),
            'revoked_certificates' => Certificate::where('status', 'revoked')->get()->count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_verifications' => VerificationLog::with('certificate')->latest()->take(10)->get()->toArray(),
            'recent_activity' => AuditLog::latest()->take(10)->get()->toArray(),
        ]);
    }

    public function reports()
    {
        return Inertia::render('admin/reports', [
            'summary' => [
                'total_certificates' => Certificate::count(),
                'total_revocations' => Certificate::where('status', 'revoked')->get()->count(),
                'total_verifications' => VerificationLog::count(),
            ],
        ]);
    }
}
