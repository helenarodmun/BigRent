<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAutorizadosTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'autorizados';

    /**
     * Run the migrations.
     * @table autorizados
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('nombre_persona_autorizada', 75)->nullable();
            $table->string('dni', 9)->nullable();
            $table->string('telefono1', 9)->nullable();
            $table->string('telefono2', 9)->nullable();
            $table->text('anotaciones')->nullable();
            $table->string('url_dni')->nullable();
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
