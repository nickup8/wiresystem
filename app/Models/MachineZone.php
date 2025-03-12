<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MachineZone extends Model
{
    protected $table = 'machine_zones';
    protected $fillable = [
        'machine_id',
        'zone_id',
    ];
}
