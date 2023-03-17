<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContratosTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'contratos';

    /**
     * Run the migrations.
     * @table contratos
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->timestamp('fecha');
            $table->date('fecha_retirada');
            $table->date('fecha_entrega');
            $table->unsignedTinyInteger('semanas');
            $table->unsignedSmallInteger('dias');
            $table->unsignedSmallInteger('precio');
            $table->text('notas1')->nullable();
            $table->text('notes2')->nullable();
            $table->timestamps();


            $table->foreignId('cliente_id')
                ->references('id')->on('clientes')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreignId('serie_id')
                ->references('id')->on('series')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreignId('direccion_id')
                ->references('id')->on('direcciones')
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
