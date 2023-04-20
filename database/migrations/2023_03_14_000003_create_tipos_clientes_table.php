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
