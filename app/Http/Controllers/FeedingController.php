<?php

namespace App\Http\Controllers;

use App\Http\Resources\StorageWireResource;
use App\Models\StorageWire;
use Illuminate\Http\Request;

class FeedingController extends Controller
{
    public function index()
    {
        $wires = StorageWireResource::collection(StorageWire::paginate(10));
        return inertia('feeding/feeding', [
            'wires' => $wires
        ]);
    }
}
