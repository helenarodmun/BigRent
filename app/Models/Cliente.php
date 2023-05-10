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
        'administrador',
        'dni_administrador',
        'url_escrituras',
        'url_dni_administrador',
        'url_cif',
        'anotaciones',
        'tipo_cliente_id'

    ];
    protected $table = 'clientes';

    //relacion N:1 con la tabla tipos_cliente
    public function tipo()
    {
        return $this->belongsTo(TipoCliente::class, 'tipo_cliente_id');
    }

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

    //relacion 1:N con la tabla autorizados
    public function autorizados()
    {
        return $this->hasMany(Autorizado::class);
    }

    //relacion 1:N con la tabla contratos
    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }

    static function existeCliente($nif, $nombre_fiscal)
    {
        if (static::where('nif', $nif)->orWhere('nombre_fiscal', $nombre_fiscal)->count() == 0) 
        {
            return true;

        } else {

            return false;
        }
    }
}
