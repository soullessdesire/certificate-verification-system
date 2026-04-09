<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\VerificationController;

Route::inertia('/', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact-page', 'contact')->name('contact');

require __DIR__ . '/settings.php';
require __DIR__ . '/issuer.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/verify.php';
