<?php

use App\Http\Controllers\ZoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/zones', [ZoneController::class, 'index'])->name('zones.index');
    Route::post('/zones', [ZoneController::class, 'store'])->name('zones.store');
    Route::delete('/zones/{zone}', [ZoneController::class, 'destroy'])->name('zones.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
