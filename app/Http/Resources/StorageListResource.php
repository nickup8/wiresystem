<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StorageListResource extends JsonResource
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
            'rack' => $this->rack,
            'zone' => $this->zone,
            'start_level' => $this->start_level,
            'level_count' => $this->level_count,
            'start_storage' => $this->start_storage,
            'finish_storage' => $this->finish_storage
        ];
    }
}
