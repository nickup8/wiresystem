<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WireDetail extends Model
{
    protected $fillable = [
        'wire_type_id',
        'wire_size_id',
        'wire_color_id',
    ];

    public function type()
    {
        return $this->belongsTo(WireType::class);
    }

    public function size()
    {
        return $this->belongsTo(WireSize::class);
    }

    public function color()
    {
        return $this->belongsTo(WireColor::class);
    }
}
