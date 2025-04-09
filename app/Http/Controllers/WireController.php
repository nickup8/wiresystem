<?php

namespace App\Http\Controllers;

use App\Events\WireMachineEvent;
use App\Events\WireOnMachine;
use App\Events\WireWithMachine;
use App\Http\Requests\WireStorageRequest;
use App\Http\Resources\WireResource;
use App\Models\Machine;
use App\Models\Storage;
use App\Models\StorageWire;
use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireDetail;
use App\Models\WireSize;
use App\Models\WireType;
use App\Services\WireServices;
use Illuminate\Http\Request;

class WireController extends Controller
{
    protected $wireServices;
    public function __construct(WireServices $wireServices){
        $this->wireServices = $wireServices;
    }

    // (20)BR203940(123)M012345236(123)10000

    public function store(WireStorageRequest $request)
    {
        $data = $request->validated();
        $array = $this->wireServices->transformRequestNametoArray($data['barcode']);
        $material = $this->wireServices->splitMaterialByTypeColorSize($array['YPN']);


        $wireDetailsId = $this->wireServices->getIdByDetais($material);

        $wire = Wire::create([
            'wire_detail_id' => $wireDetailsId,
            'material' => $array['YPN'],
            'barcode' => $array['barcode']
        ]);

        return $wire;
    }

    public function movingWire(WireStorageRequest $request)
{
    $data = $request->validated();
    $storage = Storage::where('name', $data['storage_name'])->firstOrFail();

    ['wire' => $wire, 'machinePrev' => $machinePrev] = $this->wireServices
        ->getOrCreateWireAndAttachToStorage($data, $storage, function () use ($request) {
            return $this->store($request); // вызываем store из контроллера
        });

    $machineCurrent = $storage->machine ?? [];

    if (count($machineCurrent) > 0) {
        broadcast(new WireOnMachine($machineCurrent[0]))->toOthers();
    }

    if (count($machinePrev) > 0 && (!isset($machineCurrent[0]) || $machinePrev[0]->id !== $machineCurrent[0]->id)) {
        broadcast(new WireOnMachine($machinePrev[0]))->toOthers();
    }

    return to_route('feedingModule.index')
        ->with('success', 'Провод успешно перемещен в ячейку ' . $data['storage_name']);
}
}
