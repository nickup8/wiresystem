<?php

namespace App\Http\Controllers;

use App\Http\Resources\MachineResource;
use App\Http\Resources\StorageWireResource;
use App\Models\Machine;
use App\Models\StorageWire;
use Illuminate\Http\Request;

class MachineModuleController extends Controller
{
    public function index() {
        $machines = MachineResource::collection(Machine::all());
        return inertia('machineOper/machineOper', [
            'machines' => $machines
        ]);
    }

    public function show(Machine $machine)
    {
        $storages = $machine->storages()->with('storageWires')->get();

        $wires = $storages->flatMap(fn($storage) => $storage->storageWires);

        return inertia('machineOper/selected-machine', [
            'machine' => new MachineResource($machine),
            'wires' => StorageWireResource::collection($wires),
        ]);
    }
}
