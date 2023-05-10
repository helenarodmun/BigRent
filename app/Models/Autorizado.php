<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autorizado extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_persona_autorizada',
        'dni',
        'notas',
        'url_dni'
    ];
    protected $table = 'autorizados';

    //Relación N:1 con la tabla clientes
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    
    //Relación N:1 con la tabla contratos
    public function contratos()
    {
        return $this->hasMany(Cliente::class);
    }

    static function existeAutorizado($cliente_id, $nombre, $dni){

        $autorizados = Autorizado::where('cliente_id', $cliente_id);
        if (static::where('nombre_persona_autorizada', $nombre)->where('dni', $dni)->first()) 
        {
            return true;

        } else {

            return false;
        }
    }
}
