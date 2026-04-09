<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/verify', [VerificationController::class, 'index'])->name('verify.index');
    Route::get('/verify/{hash}', [VerificationController::class, 'verify'])->name('verify.verify');
    Route::post('/verify/{hash}', [VerificationController::class, 'show'])->name('verify.show');
});
