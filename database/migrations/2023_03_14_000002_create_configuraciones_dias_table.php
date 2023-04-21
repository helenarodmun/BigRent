<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Configuración dias
     * 1 - Particular
     * 2 - Empresa
     * 3 - Autónomo
     * 4 - Organismo/Institución
     * 5- Asociación
     * Campo en true se contabiliza para el cobro
     */
    public function up(): void
    {
        Schema::create('configuraciones_dias', function (Blueprint $table) {
            $table->id();
            $table->boolean('laborables');
            $table->boolean('sabados');
            $table->boolean('domingos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuraciones_dias');
    }
};
