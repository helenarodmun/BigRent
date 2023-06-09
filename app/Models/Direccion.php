<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'direccion',
        'cp',
        'localidad',
        'municipio',
        'provincia',
        'predeterminada'
    ];
    protected $table = 'direcciones';

    //Relación N:1 con la tabla clientes
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    //relación tabla contratos 1:N
    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }
    
    //Método para comprobar si existe una dirección predeterminada
    public static function compruebaDireccion($predeterminada)
    {
        if ($predeterminada == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static function buscaDireccionPredeterminada($cliente)
    {
        $direccion_predeterminada = Direccion::where('cliente_id', $cliente)
        ->where('predeterminada', true)->first();

        return $direccion_predeterminada;
    }
}
