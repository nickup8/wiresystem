<?php

namespace App\Events;

use App\Http\Resources\StorageWireResource;
use App\Models\Machine;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WireWithMachine implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Machine $machine)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('wire_with_machine'),
        ];
    }

    public function broadcastWith()
    {
        $storages = $this->machine->storages()->with('storageWires')->get();

        $wires = $storages->flatMap(fn($storage) => $storage->storageWires);
        return [
            'wires' => StorageWireResource::collection($wires),
        ];
    }
}
