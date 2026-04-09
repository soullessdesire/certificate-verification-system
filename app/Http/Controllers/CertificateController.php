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
use Illuminate\Support\Str;
use Inertia\Inertia;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Writer;

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
        $certificate = Certificate::create(
            [
                'name' => $request->input('first_name') . ' ' . $request->input('last_name'),
                'course' => $request->input('course'),
                'issued_at' => $request->input('issued_at'),
                'issued_by' => Auth::id(),
                'status' => 'valid'
            ]
        );

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'certificate_created',
            'model_type' => Certificate::class,
            'model_id' => $certificate->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->route('certificates.show', ['certificate' => $certificate->id]);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, Certificate $certificate)
    {
        $path = $request->user()->hasRole('issuer')
            ? 'issuer/certificate/show'
            : 'verify';

        // Log verification
        VerificationLog::create([
            'user_id' => $request->user()->id,
            'certificate_id' => $certificate->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $verificationUrl = route('verify.verify', $certificate->hash);

        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        $qrSvg = $writer->writeString($verificationUrl);

        return Inertia::render($path, [
            'certificate' => $certificate,
            'qrSvg' => $qrSvg,
            'verificationUrl' => $verificationUrl,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        return Inertia::render('issuer/certificate/edit', [
            'certificate' => $certificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
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
        return redirect()->route('certificates.index');
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
