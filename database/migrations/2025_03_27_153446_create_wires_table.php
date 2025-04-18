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
        Schema::create('wires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wire_detail_id');
            $table->string('material');
            $table->string('barcode')->unique();
            $table->timestamps();

            $table->foreign('wire_detail_id')->references('id')->on('wire_details')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wires');
    }
};
