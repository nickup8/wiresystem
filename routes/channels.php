<?php

use App\Models\Machine;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('machines', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('wire.{machineId}', function ($user, $machineId) {
   return true;
});
