<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageWire extends Model
{
    protected $fillable = [
        'storage_id',
        'wire_id',
    ];

    public function storage()
    {
        return $this->belongsTo(Storage::class);
    }

    public function wire()
    {
        return $this->belongsTo(Wire::class);
    }
}
