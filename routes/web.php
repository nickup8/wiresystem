<?php

use App\Enum\RolesEnum;
use App\Events\WireOnMachine;
use App\Http\Controllers\FeedingController;
use App\Http\Controllers\FeedingModuleController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\MachineModuleController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\WireColorController;
use App\Http\Controllers\WireController;
use App\Http\Controllers\WireSizeController;
use App\Http\Controllers\WireTypeController;
use App\Http\Controllers\ZoneController;
use App\Models\Machine;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', sprintf('role:%s|%s',
            RolesEnum::LOGISTIC->value,
            RolesEnum::TECHNICAL->value,
        )])->group(function () {

    Route::get('/', function () {
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

    Route::get('/feeding', [FeedingController::class, 'index'])->name('feeding.index');
    Route::get('/wire-types', [WireTypeController::class, 'index'])->name('wireTypes.index');
    Route::post('/wire-types', [WireTypeController::class, 'store'])->name('wireTypes.store');

    Route::get('/wire-colors', [WireColorController::class, 'index'])->name('wireColors.index');
    Route::post('/wire-colors', [WireColorController::class, 'store'])->name('wireColors.store');


    Route::get('/wire-sizes', [WireSizeController::class, 'index'])->name('wireSizes.index');
    Route::post('/wire-sizes', [WireSizeController::class, 'store'])->name('wireSizes.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/feeding-module', [FeedingModuleController::class, 'index'])->name('feedingModule.index');
    Route::post('/wire/new', [WireController::class, 'store'])->name('wire.store');
    Route::post('wire/moving', [WireController::class, 'movingWire'])->name('wire.moving');
    Route::get('/machine-module', [MachineModuleController::class, 'index'])->name('machineModule.index');
    Route::get('/machine-module/{machine}', [MachineModuleController::class, 'show'])->name('machines.show');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
