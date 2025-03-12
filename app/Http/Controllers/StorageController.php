<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageRequest;
use App\Http\Resources\StorageListResource;
use App\Models\Storage;
use App\Models\StorageList;
use App\Models\StoragesList;
use App\Models\Zone;
use App\Services\StorageServices;
use DB;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

class StorageController extends Controller
{

    protected $storageService;

    public function __construct(StorageServices $storageService){
        $this->storageService = $storageService;
    }
    public function index()
    {
        $zones = Zone::all();
        $storagesList = StorageListResource::collection(StorageList::paginate(10));
        return inertia('storages/storages', [
            'zones' => $zones,
            'storagesList' => $storagesList,
            'error' => session('error')

        ]);
    }

    public function store(StorageRequest $request){
        $data = $request->validated();
        $storageName = $this->storageService->transformRequestStaraheName($data);

        $exist = DB::table('storages')->whereIn('name', $storageName)->exists();

        if (! $exist) {
            foreach ($storageName as $storage) {
                Storage::create([
                    'name' => $storage,
                    'zone_id' => $data['zone_id']
                ]);
            }
            StorageList::create([
                'rack' => $data['rack'],
                'zone_id' => $data['zone_id'],
                'start_level' => $data['start_level'],
                'level_count' => $data['level_count'],
                'start_storage' => $data['start_storage'],
                'finish_storage' => $data['finish_storage'],
            ]);
        } else {
            return redirect()->back()->with('error', 'В выбранном диапазоне уже есть существующие ячейки');
        }
    }

    public function destroy(StorageList $storagesList){
        $storages = $this->storageService->transformRequestStaraheName($storagesList);
        Storage::whereIn('name', $storages)->delete();
        $storagesList->delete();
        return redirect()->back();
    }
}
