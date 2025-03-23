<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->string('last_name')->nullable();

            // Перед изменением делаем email временно неуникальным
            $table->dropUnique(['email']);

            $table->string('email')->nullable()->change();

            // Добавляем поле login, но сначала проверяем существующие данные
            if (!Schema::hasColumn('users', 'login')) {
                $table->integer('login')->unique();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Обновляем email перед возвратом к unique
        DB::table('users')->whereNull('email')->update(['email' => DB::raw("CONCAT('default_', id, '@example.com')")]);

        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
            $table->string('email')->nullable(false)->unique()->change();
            $table->dropColumn('last_name');
            $table->dropColumn('login');
        });
    }
};
