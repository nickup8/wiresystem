<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageList extends Model
{
    use HasFactory;

    protected $fillable = [
        'rack',
        'zone_id',
        'start_level',
        'level_count',
        'start_storage',
        'finish_storage',
    ];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }
}
