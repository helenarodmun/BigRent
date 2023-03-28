<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDireccionesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'direcciones';

    /**
     * Run the migrations.
     * @table direcciones
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('direccion', 255);
            $table->string('cp', 15);
            $table->string('localidad', 150);
            $table->string('municipio', 150);
            $table->string('provincia', 150)->default('Las Palmas');
            $table->boolean('predeterminada')->default(true);
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
