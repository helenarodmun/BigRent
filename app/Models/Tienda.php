<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    /**
     * Tiendas:
     * id: 1 - Puerto del Rosario
     * id: 2 - Gran Tarajal
     * id: 3 - Corralejo
     * id: 4 - Lanzarote
     */
    use HasFactory;
    protected $fillable = [
        'codigo',
        'nombre'
    ];

    protected $tabla = 'tiendas';

    //clave primaria no es auto-incremental
    public $incrementing = false;

    //Relación 1:N con la tabla users
    public function empleados()
    {
        return $this->hasMany(User::class);
    }
    
    //Relación 1:N con la tabla series
    public function series()
    {
        return $this->hasMany(User::class);
    }
}
