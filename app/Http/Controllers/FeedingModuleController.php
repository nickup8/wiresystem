<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;

class FeedingModuleController extends Controller
{
    public function index()
    {
        $zones = Zone::all();
        return inertia('feedingOper/feddingOper', [
            'zones' => $zones
        ]);
    }
}
