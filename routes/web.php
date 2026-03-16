<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified', 'issuer||admin'])->group(function () {
    Route::inertia('verify', 'verify')->name('verify');
});

Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact-page', 'contact')->name('contact');

require __DIR__ . '/settings.php';
require __DIR__ . '/issuer.php';
require __DIR__ . '/admin.php';
