<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AuditLog;

class AuditLogController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/audit-logs', ['logs' => AuditLog::all()]);
    }
}
