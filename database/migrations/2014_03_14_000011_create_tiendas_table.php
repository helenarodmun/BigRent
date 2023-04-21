<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tiendas:
     * 1 - Puerto del Rosario
     * 2 - Gran Tarajal
     * 3 - Corralejo
     * 4 - Lanzarote
     */

    public function up(): void
    {
        Schema::create('tiendas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiendas');
    }
};
