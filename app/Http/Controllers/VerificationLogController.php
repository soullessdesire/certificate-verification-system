<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VerificationLog;
use Inertia\Inertia;

class VerificationLogController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/verification-logs', [
            'logs' => VerificationLog::with('certificate')->get()
        ]);
    }
}
