<?php

namespace App\Http\Controllers;

use App\Http\Requests\MachineRequest;
use App\Http\Requests\MachineStorageRequest;
use App\Http\Requests\MachineUpdateRequest;
use App\Http\Resources\MachineResource;
use App\Http\Resources\StorageResourse;
use App\Models\Machine;
use App\Models\MachineZone;
use App\Models\Storage;
use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class MachineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $zones = Zone::all();
        $machhines = MachineResource::collection(Machine::paginate(10));
        return inertia('machines/machines', [
            'error' => session('error'),
            'success' => session('success'),
            'zones' => $zones,
            'machines' => $machhines
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(MachineRequest $request)
    {
        $data = $request->validated();
        $machine = Machine::create(['name' => $data['name']]);
        MachineZone::create([
            'machine_id' => $machine->id,
            'zone_id' => $data['zone_id']
        ]);

        return back()->with('success', 'Машина ' . $data['name'] . ' успешно создана');
    }

    /**
     * Display the specified resource.
     */
    public function show(Machine $machine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Machine $machine)
    {
        $zones = Zone::all();
        return inertia('machines/settings/machine-info', [
            'machine' => new MachineResource($machine),
            'zones' => $zones,
            'error' => session('error'),
            'success' => session('success')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MachineUpdateRequest $request, Machine $machine)
    {

        $data = $request->validated();
        $machineZone = MachineZone::where('machine_id', $machine->id)->first();

       $machine->update(['name' => $data['name']]);
       if($machineZone)
       {
        $machineZone->update(['zone_id' => $data['zone_id']]);
       } else {
        MachineZone::create([
            'machine_id' => $machine->id,
            'zone_id' => $data['zone_id']
        ]);
       }

        return to_route('machines.edit', $machine)->with('success', 'Машина ' . $data['name'] . ' успешно обновлена');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Machine $machine)
    {
        //
    }

    public function storages(Machine $machine)
    {
        $storages = $machine->storages;
        return inertia('machines/settings/machine-storages', [
            'machine' => new MachineResource($machine),
            'error' => session('error'),
            'success' => session('success'),
            'storages' => StorageResourse::collection($storages)
        ]);
    }

    public function storagesStore(MachineStorageRequest $request, Machine $machine)
    {

        $data = $request->validated();
        $storage = Storage::where('name', $data['storage_name'])->first();
        $storageZoneId = $storage->zone->id;
        $machineZoneId = $machine->zone->id;
        $storageId = $storage->id;


        if($storageZoneId === $machineZoneId) {
            $machine->storages()->syncWithoutDetaching($storageId);
            return back()->with('success', 'Ячейка ' . $data['storage_name'] . ' привязана для ' . $machine->name);
        } else {
            return back()->with('error', 'Ячека ' . $data['storage_name'] . ' не пренадлежит зоне оборудования');
        }
    }
    public function type(Machine $machine)
    {
        return inertia('machines/settings/machine-type', [
            'machine' => new MachineResource($machine)
        ]);
    }

    public function updateType(Request $request, Machine $machine)

    {

        $data = $request->validate([
            'type' => 'required'
        ]);
        $machine->update(['type' => $data['type']]);

        return to_route('machines.type', $machine)->with('success', 'Тип оборудования успешно обновлен');
    }


}
