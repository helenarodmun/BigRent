<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoCliente extends Model
{
    /**
     * Cada tipo de cliente tiene una configuración de días de cobro
     * campo en true se contabiliza
     * 
     * id: 1 - Particular - configuraciones_dias_id(FK) => 1
     * id: 2 - Empresa - configuraciones_dias_id(FK) => 2
     * id: 3 - Autónomo - configuraciones_dias_id(FK) => 3
     * id: 4 - Organismo/Institución - configuraciones_dias_id(FK) => 4
     * id: 5 - Asociación - configuraciones_dias_id(FK) => 5
     * 
     * 
     */
    use HasFactory;

    protected $fillable = [
        'tipo'
    ];

    protected $table = 'tipos_clientes';
    //clave primaria no es auto-incremental
    public $incrementing = false;
    //Relación con tabla configuraciones dias
    public function confDias()
    {
        return $this->belongsTo(ConfiguracionDia::class, 'configuraciones_dias_id');
    }
    //Relación tabla clientes n:1
    public function cliente()
    {
        return $this->hasMany(Cliente::class);
    }
}
