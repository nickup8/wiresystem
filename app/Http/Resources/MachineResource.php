<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MachineResource extends JsonResource
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
            'name' => $this->name,
            'zone' => $this->zone,
            'type' => $this->type,
            'storages' => StorageResourse::collection($this->storages),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
