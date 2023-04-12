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
            $table->string('marca', 100);
            $table->text('descripcion');
            $table->tinyInteger('inventario');
            $table->string('referencia', 10);            
            $table->string('url_manual')->nullable();
            $table->string('url_ficha')->nullable();
            $table->string('url_imagen')->nullable();
            $table->timestamps();


            $table->foreignId('subfamilia_id')
                ->constrained('subfamilias')
                ->onDelete('restrict')
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
