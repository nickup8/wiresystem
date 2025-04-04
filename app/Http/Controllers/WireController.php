<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStorageRequest;
use App\Http\Resources\WireResource;
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
        $array = $this->wireServices->transformRequestNametoArray($data['barcode']);
        $wire = Wire::where('barcode', $array['barcode'])->first();
        $storage = Storage::where('name', $data['storage_name'])->first();
        if (!$wire) {
            $wire = $this->store($request);

            StorageWire::create([
                'storage_id' => $storage->id,
                'wire_id' => $wire->id
            ]);
        } else {
            $storageWire = StorageWire::where('wire_id', $wire->id)->first();
            if (!$storageWire) {
                throw new \InvalidArgumentException("Катушка " . $data['barcode'] . " уже пуста");
            }
            $storageWire->update([
                'storage_id' => $storage->id,
                'wire_id' => $wire->id,
            ]);
        }
        return to_route('feedingModule.index')->with('success', 'Провод успешно перемещен в ячейку ' . $data['storage_name']);
    }
}
