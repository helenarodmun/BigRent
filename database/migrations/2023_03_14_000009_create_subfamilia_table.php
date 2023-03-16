<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubfamiliaTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'subfamilia';

    /**
     * Run the migrations.
     * @table subfamilia
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('descripcion');
            $table->unsignedSmallInteger('precio_semana');
            $table->unsignedSmallInteger('precio_dia');
            $table->unsignedSmallInteger('fianza');

            $table->foreignId('id_familia')
                ->references('id')->on('familia')
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
