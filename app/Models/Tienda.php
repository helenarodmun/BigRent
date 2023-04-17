<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    use HasFactory;
    protected $fillable = [
        'codigo',
        'nombre'
    ];

    protected $tabla = 'tiendas';

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
