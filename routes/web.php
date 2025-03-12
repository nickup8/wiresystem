<?php

use App\Http\Controllers\MachineController;
use App\Http\Controllers\StorageController;
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

    Route::get('/storages', [StorageController::class, 'index'])->name('storages.index');
    Route::post('/storages', [StorageController::class, 'store'])->name('storages.store');

    Route::get('/machines', [MachineController::class, 'index'])->name('machines.index');
    Route::post('/machines', [MachineController::class, 'store'])->name('machines.store');
    Route::get('/machines/{machine}/edit', [MachineController::class, 'edit'])->name('machines.edit');
    Route::put('/machines/{machine}', [MachineController::class, 'update'])->name('machines.update');
    Route::get('/machines/{machine}/edit/storages', [MachineController::class, 'storages'])->name('machines.storages');
    Route::post('/machines/{machine}/storages', [MachineController::class, 'storagesStore'])->name('machines.storages.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
