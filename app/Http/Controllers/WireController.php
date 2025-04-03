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

        $type = WireType::where('barcode', $material['type'])->first();
        $size = WireSize::where('barcode', $material['size'])->first();
        $color = WireColor::where('barcode', $material['color'])->first();

        if (!$type || !$size || !$color) {
            throw new \InvalidArgumentException("Неверный штрих-код: " . $request['barcode']);
        }

        $wireDetail = WireDetail::where('wire_type_id', $type->id)
            ->where('wire_size_id', $size->id)
            ->where('wire_color_id', $color->id)
            ->first();

        if (!$wireDetail) {
            $wireDetail = WireDetail::create([
                'wire_type_id' => $type->id,
                'wire_size_id' => $size->id,
                'wire_color_id' => $color->id
            ]);
        }

        $wire = Wire::create([
            'wire_detail_id' => $wireDetail->id,
            'material' => $array['YPN'],
            'barcode' => $array['barcode']
        ]);



        $storage = $data['storage_name'];

        $storageId = Storage::where('name', $storage)->first();

        if (!$storageId) {
            throw new \InvalidArgumentException("Ячейка не найдена: " . $storage);
        }


        StorageWire::create([
            'storage_id' => $storageId->id,
            'wire_id' => $wire->id
        ]);

        return to_route('feedingModule.index')->with('success', 'Провод успешно перемещен в ячейку ' . $storage);
    }

    public function movingWire(WireStorageRequest $request)
    {
        $data = $request->validated();
        $array = $this->wireServices->transformRequestNametoArray($data['barcode']);
        $wire = Wire::where('barcode', $array['barcode'])->first();

        if (!$wire) {
            $this->store($request);
        } else {
            $wire = StorageWire::where('wire_id', $wire->id)->first();

            $storageWire = StorageWire::where('storage_id', Storage::where('name', $data['storage_name'])->first()->id)->first();
            $storage = Storage::where('name', $data['storage_name'])->first();
            if(!$storage) {
                throw new \InvalidArgumentException("Ячейка не найдена: " . $data['storage_name']);
            }
            // if (!$storageWire) {
            //     throw new \InvalidArgumentException("Ячейка не найдена: " . $data['storage_name']);
            // }

            if ($storageWire->wire_id !== $wire->wire_id) {
                throw new \InvalidArgumentException("Ячейка занята");
            }

            $wire->update([
                'storage_id' => Storage::where('name', $data['storage_name'])->first()->id,
                'wire_id' => $wire->id
            ]);
        }
        return to_route('feedingModule.index')->with('success', 'Провод успешно перемещен в ячейку ' . $data['storage_name']);
    }
}
