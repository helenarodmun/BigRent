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

}
