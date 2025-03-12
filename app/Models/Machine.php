<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Machine extends Model
{
    protected $fillable = [
        'name',
    ];

    public function zone()
    {
        return $this->hasOneThrough(
            Zone::class,
            MachineZone::class,
            'machine_id',
            'id',
            'id',
            'zone_id'
        );
    }

    public function storages()
    {
        return $this->belongsToMany(Storage::class, 'machine_storages');
    }
}
