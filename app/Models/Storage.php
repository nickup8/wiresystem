<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'zone_id',
    ];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function machine()
    {
        return $this->belongsToMany(Machine::class, 'machine_storages');
    }
    public function storageWires()
    {
        return $this->hasMany(StorageWire::class);
    }
}
