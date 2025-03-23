<?php

namespace App\Http\Controllers;

use App\Http\Resources\MachineResource;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineModuleController extends Controller
{
    public function index() {
        $machines = MachineResource::collection(Machine::all());
        return inertia('machineOper/machineOper', [
            'machines' => $machines
        ]);
    }

    public function show(Machine $machine) {
        return inertia('machineOper/selected-machine', [
            'machine' => new MachineResource($machine)
        ]);
    }
}
