<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WireResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'material' => $this->material,
            'barcode' => $this->barcode,
            'details' => new WireDetailResource($this->wireDetails),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
