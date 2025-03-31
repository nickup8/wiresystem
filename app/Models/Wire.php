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

    public function wireDetails()
    {
        return $this->belongsTo(WireDetail::class, 'wire_detail_id');
    }
}
