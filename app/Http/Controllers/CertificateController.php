<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\VerifyCertificate;
use App\Models\Certificate;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use App\Models\VerificationLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificate::all();

        return Inertia::render('issuer/certificate/index', [
            'certificates' => $certificates
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('issuer/certificate/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {
        $certificate = Certificate::create($request->validated());

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'certificate_created',
            'model_type' => Certificate::class,
            'model_id' => $certificate->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        return redirect()->to('issuer/certificates/show', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->get();

        $path = $request->user()->hasRole('issuer') ? 'issuer/certificate/show' : 'verify';

        VerificationLog::create([
            'user_id' => $request->user(),
            'certificate_id' => $certificate,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return Inertia::render($path, [
            'certificate' => $certificate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->get();

        return Inertia::render('issuer/certificate/edit', [
            'certificate' => $certificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->get();

        $certificate->update($request->validated());

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'certificate_changed',
            'model_type' => Certificate::class,
            'model_id' => $certificate->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'changes' => 'certificate status has been changed to {$certificate->status}'
        ]);
        return redirect()->to('issuer/certificates/show', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $hash)
    {
        $certificate = Certificate::where('hash', $hash)->get();

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'certificate_deleted',
            'model_type' => Certificate::class,
            'model_id' => $certificate->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);
        $certificate->delete();

        return redirect()->to('issuer/certificates/index', 200);
    }
}
