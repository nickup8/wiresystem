<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wire extends Model
{
    protected $fillable = [
        'material',
        'barcode',
        'wire_detail_id'
    ];

    public function wireDetail()
    {
        return $this->hasManyThrough(WireDetail::class, Wire::class, 'wire_id', 'id', 'id', 'material_detail_id');
    }
}
