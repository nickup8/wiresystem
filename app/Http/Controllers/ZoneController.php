<?php

namespace App\Http\Controllers;

use App\Http\Requests\ZoneRequest;
use App\Models\Zone;
use Illuminate\Http\Request;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('zones/zones', [
            'zones' => Zone::all(),
            'error' => session('error'),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ZoneRequest $request)
    {
        $data = $request->validated();
        $zone_name = 'Зона ' . $data['zone'];

        $zone  = Zone::where('zone', $zone_name)->first();

        if ($zone) {
            return back()->with('error', 'Зона ' . $data['zone'] . ' уже существует');
        }
        Zone::create([
            'zone' => $zone_name
        ]);

        return back()->with('success', 'Зона ' . $data['zone'] . ' успешно создана');

    }


    public function destroy(Zone $zone)
    {

        Zone::destroy($zone->id);
        return back()->with('success', 'Зона ' . $zone->zone . ' успешно удалена');
    }
}
