<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTelefonosTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'telefonos';

    /**
     * Run the migrations.
     * @table contactos
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('contacto', 255);
            $table->enum('via_comunicacion', ['T', 'C']);//teléfono o correo
            $table->enum('tipo', ['T', 'A']);//titular o autorizado
            $table->timestamps();

            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->tableName);
    }
}
