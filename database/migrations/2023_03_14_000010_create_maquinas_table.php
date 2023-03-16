<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaquinasTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'maquinas';

    /**
     * Run the migrations.
     * @table maquinas
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('marca', 45);
            $table->text('descripcion');
            $table->tinyInteger('inventario');
            $table->string('referencia', 10);            
            $table->string('url_manual')->nullable();
            $table->string('url_ficha')->nullable();


            $table->foreignId('subfamilia_id')
                ->references('id')->on('subfamilias')
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
