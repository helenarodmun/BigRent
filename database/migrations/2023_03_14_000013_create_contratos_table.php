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
            $table->unsignedSmallInteger('importe_total');
            $table->text('notas1')->nullable();
            $table->text('notas2')->nullable();
            $table->timestamps();


            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreignId('serie_id')
                ->constrained('series')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreignId('direccion_id')
                ->constrained('direcciones')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreignId('autorizado_id')
                ->constrained('autorizados')
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
