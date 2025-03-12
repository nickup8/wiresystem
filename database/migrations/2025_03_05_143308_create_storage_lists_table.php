<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('storage_lists', function (Blueprint $table) {
            $table->id();
            $table->string('rack');
            $table->foreignId('zone_id')->constrained()->onDelete   ('cascade');
            $table->integer('start_level');
            $table->integer('level_count');
            $table->integer('start_storage');
            $table->integer('finish_storage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_lists');
    }
};
