<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubFamilia extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcion',
        'precio_semana',
        'precio_dia',
        'fianza'
    ];
protected $table = 'subfamilias';
    //Relación de N:1 con la tabla familias
    public function familia()
    {
        return $this->belongsTo(Familia::class);
    }
    //Relación 1:N con la tabla maquinas
    public function maquinas()
    {
        return $this->hasMany((Maquina::class));
    }
}
