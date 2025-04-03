<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\WireColor;
use App\Models\WireSize;
use App\Models\WireType;
use App\Models\Zone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create([
            'name' => RolesEnum::LOGISTIC->value,
        ]);

        Role::create([
            'name' => RolesEnum::TECHNICAL->value,
        ]);

        Role::create([
            'name' => RolesEnum::FEEDING->value,
        ]);

        Role::create([
            'name' => RolesEnum::MACHINE->value,
        ]);

        Role::create([
            'name' => RolesEnum::USERMANAGER->value,
        ]);

        User::create([
            'name' => 'Николай',
            'last_name' => 'Сироткин',
            'login' => '4500',
            'password' => Hash::make('password'),
        ])->assignRole(['logistic', 'technical', 'user_manager']);
        User::create([
            'name' => 'Иван',
            'last_name' => 'Сорокин',
            'login' => '1234',
            'password' => Hash::make('password'),
        ])->assignRole(['feeding']);
        User::create([
            'name' => 'Петр',
            'last_name' => 'Стрижов',
            'login' => '4321',
            'password' => Hash::make('password'),
        ])->assignRole(['machine']);

        Zone::create([
            'zone' => 'Зона 1',
        ]);
        Zone::create([
            'zone' => 'Зона 2',
        ]);
        Zone::create([
            'zone' => 'Зона 3',
        ]);

        WireType::create([
            'name' => 'ПВАМ',
            'barcode' => 'BR2',
        ]);
        WireType::create([
            'name' => 'T3',
            'barcode' => 'G03',
        ]);
        WireColor::create([
            'name' => 'Ч',
            'barcode' => '30',
        ]);
        WireColor::create([
            'name' => 'Б',
            'barcode' => '40',
        ]);
        WireColor::create([
            'name' => 'ГБ',
            'barcode' => '94',
        ]);

        WireSize::create([
            'name' => '0,5',
            'barcode' => '039',
        ]);
        WireSize::create([
            'name' => '0,35',
            'barcode' => '069',
        ]);
        WireSize::create([
            'name' => '0,75',
            'barcode' => '040',
        ]);

    }
}
