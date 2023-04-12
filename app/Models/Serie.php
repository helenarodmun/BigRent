<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serie extends Model
{
    use HasFactory;

    protected $fillable = [
        'horometro',
        'hora_inicio',
        'numero_serie',
        'disponible',
        'maquina_id',
    ];

    protected $tabla = 'series';

    //Relacion N:1 con tabla maquinas
    public function maquina()
    {
        return $this->belongsTo(Maquina::class);
    }

    //Relación 1:N con la tabla contratos
    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }
    //Relacion N:1 con tabla tiendas
    public function tienda()
    {
        return $this->belongsTo(Tienda::class);
    }
    
}
