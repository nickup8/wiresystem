<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireSizeRequest;
use App\Models\WireSize;
use Illuminate\Http\Request;

class WireSizeController extends Controller
{
    public function index()
    {
        return inertia('wire/sizes/wire-sizes');
    }

    public function store(WireSizeRequest $request)
    {
        $data= $request->validated();
        WireSize::create($data);
        return to_route('wireSizes.index')->with('success', 'Размер провода ' . $data['name'] . ' успешно добавлен');
    }
}
