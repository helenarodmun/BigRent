<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Cada tipo de cliente tiene una configuración de días de cobro
     * campo en true se contabiliza
     * 
     * Particular - configuraciones_dias_id(FK) => 1
     * Empresa - configuraciones_dias_id(FK) => 2
     * Autónomo - configuraciones_dias_id(FK) => 3
     * Organismo/Institución - configuraciones_dias_id(FK) => 4
     * Asociación - configuraciones_dias_id(FK) => 5
     * 
     * 
     */
    public function up(): void
    {
        Schema::create('tipos_clientes', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            $table->timestamps();

            $table->foreignId('configuraciones_dias_id')
                ->constrained('configuraciones_dias')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipos_clientes');
    }
};
