<?php

namespace App\Services;

use App\Models\Storage;

class StorageServices
{
    public function transformRequestStaraheName($request)
    {
        $prefix = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $name = [];
        $count = 0;

        // data = rack = A, zona = 1, start_level = 1, level_count = 2, start_storage = 1, finish_storage = 2
        for ($level = $request['start_level']; $level <= ($request['start_level'] + $request['level_count'] - 1); $level++) {
            for ($shelf = $request['start_storage']; $shelf <= $request['finish_storage']; $shelf++) {
                if ($shelf < 10) {
                    $shelf = '00' . $shelf;
                } elseif ($shelf >= 10 && $shelf < 100) {
                    $shelf = '0' . $shelf;
                }

                    $name[] = $request['rack'] . '-' . $shelf . '-' . $prefix[$level-1];

                $count++;
            }
        };

        return $name;


    }
}
