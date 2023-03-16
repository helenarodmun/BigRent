<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'clientes';

    /**
     * Run the migrations.
     * @table clientes
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('nombre_fiscal', 75)->nullable();
            $table->string('nif', 9)->nullable();
            $table->string('nombre_comercial', 75);
            $table->enum('tipo', ['Empresa', 'Autónomo/Particular', 'Organismo/Institución', 'Asociación']);
            $table->string('administrador', 45);
            $table->string('dni_administrador', 9);
            $table->string('url_escrituras')->nullable();
            $table->string('url_dni_administrator')->nullable();
            $table->string('url_cif')->nullable();
            $table->text('anotaciones')->nullable();
            $table->timestamps();
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
