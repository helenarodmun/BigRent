<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfiguracionDia extends Model
{
    /**
     * Configuración dias
     * id: 1 - Particular
     * id: 2 - Empresa
     * id: 3 - Autónomo
     * id: 4 - Organismo/Institución
     * id: 5- Asociación
     * 
     * Campo en true se contabiliza para el cobro
     */
    use HasFactory;

    protected $fillable = [
        'laborables',
        'sabados',
        'domingos'
    ];

    protected $table = 'configuraciones_dias';

    //clave primaria no es auto-incremental
    public $incrementing = false;

    //relación tabla tipos_cliente
    public function tipoCliente()
    {
        return $this->hasOne(TipoCliente::class);
    }
}
