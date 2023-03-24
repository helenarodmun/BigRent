<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_fiscal',
        'nif',
        'nombre_comercial',
        'tipo',
        'administrador',
        'dni_administrador',
        'url_escrituras',
        'url_dni_administrador',
        'url_cif',
        'anotaciones'

    ];
    protected $table = 'clientes';
    //relacion 1:N con la tabla direcciones
    public function direcciones()
    {
        return $this->hasMany(Direccion::class);
    }
    //relacion 1:N con la tabla telefonos
    public function telefonos()
    {
        return $this->hasMany(Telefono::class);
    }
    public function autorizados()
    {
        return $this->hasMany(Autorizado::class);
    }
}
