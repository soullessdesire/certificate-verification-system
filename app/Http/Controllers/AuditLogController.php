<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/audit-logs', ['logs' => AuditLog::with('user')->get()]);
    }
}
