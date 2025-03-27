<?php

namespace App\Http\Controllers;

use App\Http\Resources\WireResource;
use App\Models\Wire;
use App\Models\WireColor;
use App\Models\WireDetail;
use App\Models\WireSize;
use App\Models\WireType;
use App\Services\WireServices;
use Illuminate\Http\Request;

class WireController extends Controller
{
    public function __construct(WireServices $wireServices){
        $this->wireServices = $wireServices;
    }

    // (20)BR203940(123)M012345236(123)10000

    public function store(Request $request)
    {
        $array = $this->wireServices->transformRequestNametoArray($request['barcode']);
        $material = $this->wireServices->splitMaterialByTypeColorSize($array['YPN']);

        $type = WireType::where('barcode', $material['type'])->first();
        $size = WireSize::where('barcode', $material['size'])->first();
        $color = WireColor::where('barcode', $material['color'])->first();

        if (!$type || !$size || !$color) {
            throw new \InvalidArgumentException("Неверный штрих-код: $request");
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

        dd( new WireResource($wire));
    }
}
