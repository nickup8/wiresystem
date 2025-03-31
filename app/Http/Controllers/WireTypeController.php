<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireTypeRequest;
use App\Http\Resources\WireTypeResource;
use App\Models\WireType;
use DB;
use Illuminate\Http\Request;

class WireTypeController extends Controller
{
    public function index()
    {
        $wireTypes = WireTypeResource::collection(WireType::all());
        return inertia('wire/types/wire-types', [
            'wireTypes' => $wireTypes
        ]);
    }

    public function store(WireTypeRequest $request)
    {
        $data = $request->validated();
        WireType::create($data);

        return to_route('wireTypes.index')->with('success', 'Тип провода ' . $data['name'] . ' успешно добавлен');

    }
}
