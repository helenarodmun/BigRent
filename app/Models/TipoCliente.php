<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoCliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo'
    ];

    protected $table = 'tipos_clientes';

    //Relación con tabla configuraciones dias
    public function confDias() {
        return $this->hasOne(CongiguracionDia::class);
    }
    //Relación tabla clientes n:1
    public function clientes() {
        return $this->hasMany(Cliente::class);
    }

}
