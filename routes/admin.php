<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationLogController;
use App\Http\Controllers\AuditLogController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::get('/admin/reports', [AdminController::class, 'reports'])->name('admin.reports');
    Route::get('/admin/verification-logs', [VerificationLogController::class, 'index'])->name('admin.verification');
    Route::get('/admin/audit-logs', [AuditLogController::class, 'index'])->name('admin.audit');

    Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])->name('user.delete');
});
