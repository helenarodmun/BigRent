<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;

    protected $fillable = [
        'contacto',
        'via_comunicacion',
        'tipo'
    ];
    protected $table = 'telefonos';

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
}
