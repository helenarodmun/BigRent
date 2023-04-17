<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha',
        'fecha_retirada',
        'fecha_entrega',
        'importe_total',
        'notas1',
        'notas2'

    ];
    protected $table = 'contratos';
    //relacion 1:1 con la tabla clientes
    public function cliente()
    {
        return $this->HasOne(Cliente::class);
    }
    //relacion 1:1 con la tabla direcciones
    public function direccion()
    {
        return $this->HasOne(Direccion::class);
    }
    //relacion 1:1 con la tabla direcciones
    public function autorizados()
    {
        return $this->HasOne(Autorizado::class);
    }
    //relacion 1:N con la tabla series
    public function series()
    {
        return $this->hasMany(Serie::class);
    }
    
}
