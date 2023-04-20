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
            $table->string('nombre_fiscal', 100)->nullable();
            $table->string('nif', 15)->nullable();
            $table->string('nombre_comercial', 100);
            $table->string('administrador', 75);
            $table->string('dni_administrador', 15);
            $table->string('url_escrituras')->nullable();
            $table->string('url_dni_administrador')->nullable();
            $table->string('url_cif')->nullable();
            $table->text('anotaciones')->nullable();
            $table->timestamps();

            $table->foreignId('tipoCliente_id')
            ->constrained('tipos_clientes')
            ->onDelete('no action')
            ->onUpdate('no action');
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
