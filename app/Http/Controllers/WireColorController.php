<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireColorRequest;
use App\Http\Resources\WireColorResource;
use App\Models\WireColor;
use Illuminate\Http\Request;

class WireColorController extends Controller
{
    public function index()
    {
        $wireColors = WireColorResource::collection(WireColor::all());
        return inertia('wire/colors/wire-color', [
            'wireColors' => $wireColors
        ]);
    }

    public function store(WireColorRequest $request)
    {
        $data = $request->validated();
        WireColor::create($data);

        return to_route('wireColors.index')->with('success', 'Цвет провода ' . $data['name'] . ' успешно добавлен');

    }
}
