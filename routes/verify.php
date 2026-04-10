<?php

use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/verify', [VerificationController::class, 'index'])->name('verify.index');
    Route::get('/verify/{hash}', [VerificationController::class, 'verify'])->name('verify.verify');
    Route::post('/verify/{hash}', [VerificationController::class, 'show'])->name('verify.show');
});
