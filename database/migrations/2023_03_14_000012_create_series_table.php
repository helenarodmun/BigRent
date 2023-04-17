<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeriesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'series';

    /**
     * Run the migrations.
     * @table numeros_serie
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->boolean('horometro')->nullable();
            $table->time('hora_inicio')->nullable();
            $table->string('numero_serie', 100);
            $table->boolean('disponible')->nullable();
            $table->timestamps();

            $table->foreignId('maquina_id')
                ->constrained('maquinas')
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
