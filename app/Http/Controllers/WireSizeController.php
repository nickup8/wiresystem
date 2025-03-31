<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireSizeRequest;
use App\Http\Resources\WireSizeResource;
use App\Models\WireSize;
use Illuminate\Http\Request;

class WireSizeController extends Controller
{
    public function index()
    {
        $wireSizes = WireSizeResource::collection(WireSize::all());
        return inertia('wire/sizes/wire-sizes', [
            'wireSizes' => $wireSizes
        ]);
    }

    public function store(WireSizeRequest $request)
    {
        $data= $request->validated();
        WireSize::create($data);
        return to_route('wireSizes.index')->with('success', 'Размер провода ' . $data['name'] . ' успешно добавлен');
    }
}
