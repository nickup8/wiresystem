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
        Schema::create('wire_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wire_type_id');
            $table->unsignedBigInteger('wire_size_id');
            $table->unsignedBigInteger('wire_color_id');
            $table->timestamps();

            $table->foreign('wire_type_id')->references('id')->on('wire_types')->onDelete('cascade');
            $table->foreign('wire_size_id')->references('id')->on('wire_sizes')->onDelete('cascade');
            $table->foreign('wire_color_id')->references('id')->on('wire_colors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wire_details');
    }
};
