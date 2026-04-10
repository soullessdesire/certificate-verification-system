<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactMessageController;

Route::inertia('/', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/about', 'about')->name('about');
Route::get('/contact',  [ContactMessageController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');

require __DIR__ . '/settings.php';
require __DIR__ . '/issuer.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/verify.php';
